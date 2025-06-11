
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProfileValidationEmail {
  email: string
  firstName: string
  lastName: string
  companyName: string
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, firstName, lastName, companyName }: ProfileValidationEmail = await req.json()

    const emailResponse = await resend.emails.send({
      from: "GrowHub SARL <noreply@growhub.com>",
      to: [email],
      subject: "Validez votre profil administrateur GrowHub",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e293b; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; color: white;">GrowHub SARL</h1>
            <p style="margin: 10px 0 0 0; color: #e2e8f0;">Votre solution de gestion d'entreprise</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Bonjour ${firstName} ${lastName},</h2>
            
            <p style="color: #475569;">
              Votre profil administrateur pour <strong>${companyName}</strong> a été créé avec succès !
            </p>
            
            <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #0277bd; margin: 0;">
                <strong>🎉 Félicitations !</strong><br>
                Vous êtes maintenant l'administrateur principal de votre entreprise sur GrowHub.
              </p>
            </div>
            
            <p style="color: #475569;">
              En tant qu'administrateur, vous pourrez :
            </p>
            
            <ul style="color: #475569; line-height: 1.8;">
              <li>Gérer tous les aspects de votre comptabilité</li>
              <li>Créer et suivre vos factures</li>
              <li>Gérer vos stocks et achats</li>
              <li>Analyser vos performances financières</li>
              <li>Inviter d'autres utilisateurs dans votre entreprise</li>
            </ul>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Besoin d'aide pour commencer ?</h3>
              <p style="color: #475569; margin-bottom: 10px;">
                Notre équipe est là pour vous accompagner :
              </p>
              <p style="color: #475569; margin: 5px 0;">
                📞 <strong>Support :</strong> +221 78 475 28 58
              </p>
              <p style="color: #475569; margin: 5px 0;">
                📧 <strong>Email :</strong> support@growhub.com
              </p>
              <p style="color: #475569; margin: 5px 0;">
                🕐 <strong>Horaires :</strong> Lundi - Vendredi, 8h - 18h
              </p>
            </div>
            
            <p style="color: #475569;">
              Bienvenue dans la famille GrowHub ! Nous sommes impatients de vous accompagner dans la croissance de votre entreprise.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center;">
              GrowHub SARL - Accélérer la croissance de votre entreprise<br>
              Cet email a été envoyé automatiquement suite à la création de votre profil administrateur.<br>
              Pour toute question, contactez-nous sur support@growhub.com
            </p>
          </div>
        </div>
      `,
    })

    console.log("Email de validation de profil envoyé:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email de validation de profil:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
}

serve(handler)
