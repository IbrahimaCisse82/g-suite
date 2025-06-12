import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestConfirmationEmail {
  email: string
  companyName: string
  planName: string
  planPrice: number
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, companyName, planName, planPrice }: RequestConfirmationEmail = await req.json()

    const emailResponse = await resend.emails.send({
      from: "GrowHub Sénégal <contact@growhubsenegal.com>",
      to: [email],
      subject: "Confirmation de votre demande de compte payant - G-Suite",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e293b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: white;">GrowHub Sénégal</h1>
            <p style="margin: 10px 0 0 0; color: #e2e8f0;">Votre solution de gestion d'entreprise G-Suite</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Demande de compte payant reçue</h2>
            
            <p style="color: #475569;">Bonjour,</p>
            
            <p style="color: #475569;">
              Nous avons bien reçu votre demande de compte payant pour <strong>${companyName}</strong>.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #1e293b; margin-top: 0;">Détails de votre demande :</h3>
              <ul style="color: #475569;">
                <li><strong>Plan sélectionné :</strong> ${planName}</li>
                <li><strong>Prix :</strong> ${planPrice.toLocaleString()} XOF</li>
                <li><strong>Entreprise :</strong> ${companyName}</li>
              </ul>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0;">
                <strong>⏰ Prochaines étapes :</strong><br>
                Votre demande sera traitée dans les <strong>24 heures</strong> suivant la réception de votre paiement. 
                Vous recevrez un email de notification pour le traitement de votre demande et une autre notification après validation de votre licence.
              </p>
            </div>
            
            <p style="color: #475569;">
              Notre équipe vous contactera prochainement pour finaliser l'activation de votre compte.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Besoin d'aide ?</h3>
              <p style="color: #475569; margin-bottom: 10px;">
                Notre équipe est disponible pour vous accompagner :
              </p>
              <p style="color: #475569; margin: 5px 0;">
                📞 <strong>Téléphone :</strong> +221 78 475 28 58
              </p>
              <p style="color: #475569; margin: 5px 0;">
                📧 <strong>Email :</strong> contact@growhubsenegal.com
              </p>
            </div>
            
            <p style="color: #475569;">
              Merci de votre confiance et à bientôt sur G-Suite !
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center;">
              GrowHub Sénégal - Votre partenaire pour la croissance de votre entreprise<br>
              Cet email a été envoyé automatiquement, merci de ne pas y répondre.
            </p>
          </div>
        </div>
      `,
    })

    console.log("Email de confirmation envoyé:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email de confirmation:", error)
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
