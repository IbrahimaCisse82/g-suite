
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TrialRequest {
  companyId: string
  email: string
  companyName: string
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { companyId, email, companyName }: TrialRequest = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Générer un token unique pour l'essai
    const trialToken = crypto.randomUUID()

    // Créer l'entrée d'essai
    const { error: trialError } = await supabaseClient
      .from('trial_accounts')
      .insert({
        company_id: companyId,
        email: email,
        trial_token: trialToken,
        is_active: true
      })

    if (trialError) {
      console.error('Erreur création essai:', trialError)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la création de l\'essai' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Envoyer l'email d'accès à l'essai
    const trialUrl = `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}/activate-trial/${trialToken}`
    
    const emailResponse = await resend.emails.send({
      from: 'GrowHub Sénégal <contact@growhubsenegal.com>',
      to: [email],
      subject: 'Votre accès d\'essai G-Suite de 5 jours est prêt !',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Bienvenue chez G-Suite !</h1>
          </div>
          
          <div style="padding: 40px 20px; background: white;">
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Bonjour,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Merci pour votre intérêt pour G-Suite ! Votre période d'essai gratuite de <strong>5 jours</strong> 
              pour <strong>${companyName}</strong> est maintenant activée.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trialUrl}" 
                 style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; 
                        border-radius: 8px; font-weight: bold; display: inline-block;">
                Créer votre mot de passe et accéder à l'application
              </a>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Pendant ces 5 jours, vous pourrez :</h3>
              <ul style="color: #4b5563; line-height: 1.6;">
                <li>Créer et gérer vos factures</li>
                <li>Suivre votre trésorerie</li>
                <li>Gérer vos clients et contacts</li>
                <li>Contrôler vos stocks</li>
                <li>Générer des rapports financiers</li>
                <li>Et bien plus encore !</li>
              </ul>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
              <strong>Important :</strong> Ce lien d'accès expire dans 5 jours. 
              Après cette période, nous vous contacterons pour vous proposer nos forfaits payants 
              et vous aider à continuer votre transformation digitale.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Besoin d'aide ? Notre équipe est là pour vous accompagner :
              <br>📧 contact@growhubsenegal.com
              <br>📞 +221 78 475 28 58
            </p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
          </div>
        </div>
      `,
    })

    console.log('Email d\'essai envoyé:', emailResponse)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email d\'accès envoyé avec succès',
        trialToken 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Erreur dans send-trial-access:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

serve(handler)
