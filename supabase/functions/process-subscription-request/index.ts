
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { requestId, action, adminEmail, adminNotes } = await req.json()

    // Vérifier que l'admin est autorisé
    const { data: admin } = await supabaseClient
      .from('system_admins')
      .select('*')
      .eq('email', adminEmail)
      .eq('is_active', true)
      .single()

    if (!admin) {
      return new Response(
        JSON.stringify({ error: 'Administrateur non autorisé' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer la demande
    const { data: request } = await supabaseClient
      .from('paid_account_requests')
      .select('*')
      .eq('id', requestId)
      .single()

    if (!request) {
      return new Response(
        JSON.stringify({ error: 'Demande non trouvée' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Mettre à jour le statut de la demande
    const { error: updateError } = await supabaseClient
      .from('paid_account_requests')
      .update({
        status: action,
        admin_notes: adminNotes,
        processed_by: adminEmail,
        processed_at: new Date().toISOString(),
      })
      .eq('id', requestId)

    if (updateError) {
      throw updateError
    }

    // Si approuvé, créer l'abonnement
    if (action === 'approved') {
      // Récupérer les détails du plan
      const { data: plan } = await supabaseClient
        .from('subscription_plans')
        .select('*')
        .eq('id', request.plan_id)
        .single()

      if (plan) {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + plan.duration_months)

        // Désactiver l'ancien abonnement s'il existe
        await supabaseClient
          .from('company_subscriptions')
          .update({ is_active: false })
          .eq('company_id', request.company_id)
          .eq('is_active', true)

        // Créer le nouvel abonnement
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
          throw subscriptionError
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Demande traitée avec succès' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
