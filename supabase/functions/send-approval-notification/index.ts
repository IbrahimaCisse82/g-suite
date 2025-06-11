
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ApprovalNotificationEmail {
  email: string
  companyName: string
  planName: string
  startDate: string
  endDate: string
  loginUrl: string
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, companyName, planName, startDate, endDate, loginUrl }: ApprovalNotificationEmail = await req.json()

    const emailResponse = await resend.emails.send({
      from: "GrowHub SARL <noreply@growhub.com>",
      to: [email],
      subject: "🎉 Votre compte GrowHub a été activé avec succès !",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; color: white;">🎉 Félicitations !</h1>
            <p style="margin: 10px 0 0 0; color: white; font-size: 18px;">Votre compte GrowHub est maintenant actif</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Bienvenue dans l'écosystème GrowHub !</h2>
            
            <p style="color: #475569;">Bonjour,</p>
            
            <p style="color: #475569;">
              Excellente nouvelle ! Votre demande de compte payant pour <strong>${companyName}</strong> a été approuvée et votre compte est maintenant actif.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #1e293b; margin-top: 0;">Détails de votre abonnement :</h3>
              <ul style="color: #475569;">
                <li><strong>Plan :</strong> ${planName}</li>
                <li><strong>Entreprise :</strong> ${companyName}</li>
                <li><strong>Date d'activation :</strong> ${new Date(startDate).toLocaleDateString('fr-FR')}</li>
                <li><strong>Valide jusqu'au :</strong> ${new Date(endDate).toLocaleDateString('fr-FR')} (1 an)</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${loginUrl}" style="background-color: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                🚀 Accéder à mon compte entreprise
              </a>
            </div>
            
            <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #0277bd; margin: 0;">
                <strong>💡 Prochaines étapes :</strong><br>
                Votre compte est maintenant configuré et prêt à utiliser. Vous pouvez commencer à gérer votre comptabilité, vos factures, vos stocks et bien plus encore !
              </p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Besoin d'accompagnement ?</h3>
              <p style="color: #475569; margin-bottom: 10px;">
                Notre équipe est là pour vous accompagner dans la prise en main de votre nouvelle solution :
              </p>
              <p style="color: #475569; margin: 5px 0;">
                📞 <strong>Support technique :</strong> +221 78 475 28 58
              </p>
              <p style="color: #475569; margin: 5px 0;">
                📧 <strong>Email :</strong> support@growhub.com
              </p>
              <p style="color: #475569; margin: 5px 0;">
                🕐 <strong>Horaires :</strong> Lundi - Vendredi, 8h - 18h
              </p>
            </div>
            
            <p style="color: #475569;">
              Merci de votre confiance et bienvenue dans la famille GrowHub !
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center;">
              GrowHub SARL - Accélérer la croissance de votre entreprise<br>
              Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.<br>
              Pour toute question, contactez-nous sur support@growhub.com
            </p>
          </div>
        </div>
      `,
    })

    console.log("Email d'activation envoyé:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email d'activation:", error)
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
