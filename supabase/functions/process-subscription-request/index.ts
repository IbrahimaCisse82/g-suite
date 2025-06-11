
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProcessRequestData {
  requestId: string
  action: 'approved' | 'rejected'
  adminEmail: string
  adminNotes?: string
}

// Input validation helpers
const validateUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

const sanitizeText = (text: string): string => {
  return text.replace(/<[^>]*>/g, '').trim().substring(0, 1000)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    const { requestId, action, adminEmail, adminNotes }: ProcessRequestData = body

    // Input validation
    if (!requestId || !validateUUID(requestId)) {
      return new Response(
        JSON.stringify({ error: 'ID de demande invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!action || !['approved', 'rejected'].includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Action invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!adminEmail || !validateEmail(adminEmail)) {
      return new Response(
        JSON.stringify({ error: 'Email administrateur invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Sanitize inputs
    const sanitizedAdminEmail = adminEmail.trim().toLowerCase()
    const sanitizedAdminNotes = adminNotes ? sanitizeText(adminNotes) : null

    // Verify admin authorization
    const { data: admin, error: adminError } = await supabaseClient
      .from('system_admins')
      .select('email, name, is_active')
      .eq('email', sanitizedAdminEmail)
      .eq('is_active', true)
      .single()

    if (adminError || !admin) {
      console.log(`Unauthorized admin access attempt: ${sanitizedAdminEmail}`)
      return new Response(
        JSON.stringify({ error: 'Administrateur non autorisé' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get request with security validation
    const { data: request, error: requestError } = await supabaseClient
      .from('paid_account_requests')
      .select(`
        *,
        subscription_plans (
          name,
          duration_months,
          price
        ),
        companies (
          name,
          email,
          representative_first_name,
          representative_last_name
        )
      `)
      .eq('id', requestId)
      .eq('status', 'pending')
      .single()

    if (requestError || !request) {
      return new Response(
        JSON.stringify({ error: 'Demande non trouvée ou déjà traitée' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update request status with transaction safety
    const { error: updateError } = await supabaseClient
      .from('paid_account_requests')
      .update({
        status: action,
        admin_notes: sanitizedAdminNotes,
        processed_by: sanitizedAdminEmail,
        processed_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .eq('status', 'pending') // Ensure we only update pending requests

    if (updateError) {
      console.error('Error updating request:', updateError)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la mise à jour de la demande' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle approval process
    if (action === 'approved') {
      try {
        const { data: plan } = await supabaseClient
          .from('subscription_plans')
          .select('*')
          .eq('id', request.plan_id)
          .eq('is_active', true)
          .single()

        if (plan) {
          const startDate = new Date()
          const endDate = new Date()
          endDate.setMonth(endDate.getMonth() + plan.duration_months)

          // Deactivate existing subscription if any
          await supabaseClient
            .from('company_subscriptions')
            .update({ is_active: false })
            .eq('company_id', request.company_id)
            .eq('is_active', true)

          // Create new subscription
          const { error: subscriptionError } = await supabaseClient
            .from('company_subscriptions')
            .insert({
              company_id: request.company_id,
              plan_id: request.plan_id,
              request_id: requestId,
              start_date: startDate.toISOString().split('T')[0],
              end_date: endDate.toISOString().split('T')[0],
              is_active: true,
            })

          if (subscriptionError) {
            console.error('Error creating subscription:', subscriptionError)
            throw subscriptionError
          }

          // Send approval notification email
          if (request.companies?.email && validateEmail(request.companies.email)) {
            try {
              await supabaseClient.functions.invoke('send-approval-notification', {
                body: {
                  email: request.companies.email,
                  companyName: request.companies.name,
                  planName: request.subscription_plans?.name,
                  startDate: startDate.toISOString(),
                  endDate: endDate.toISOString(),
                  companyId: request.company_id,
                },
              })
            } catch (emailError) {
              console.error('Error sending approval email:', emailError)
              // Don't fail the entire process if email fails
            }
          }
        }
      } catch (approvalError) {
        console.error('Error in approval process:', approvalError)
        return new Response(
          JSON.stringify({ error: 'Erreur lors du processus d\'approbation' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Log the action for audit trail
    console.log(`Admin ${sanitizedAdminEmail} ${action} request ${requestId} for company ${request.company_id}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Demande ${action === 'approved' ? 'approuvée' : 'rejetée'} avec succès`,
        action,
        requestId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Process subscription request error:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur interne' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
