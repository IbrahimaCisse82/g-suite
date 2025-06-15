
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LicenseRequestEmail {
  companyName: string
  companyEmail: string
  contactName: string
  selectedModule: string
  address: string
  city: string
  country: string
  phone?: string
  businessSector: string
  currency: string
  website?: string
  ninea?: string
  rccm?: string
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const data: LicenseRequestEmail = await req.json()

    // Email to support team
    const supportEmailResponse = await resend.emails.send({
      from: "GrowHub Sénégal <contact@growhubsenegal.com>",
      to: ["support@g-suite.com"],
      subject: `Nouvelle demande de clé licence G-Suite - ${data.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e293b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: white;">Nouvelle demande de clé licence</h1>
            <p style="margin: 10px 0 0 0; color: #e2e8f0;">G-Suite - Solution de gestion d'entreprise</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Informations de l'entreprise</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #1e293b; margin-top: 0;">Détails de la demande :</h3>
              <ul style="color: #475569; line-height: 1.6;">
                <li><strong>Nom de l'entreprise :</strong> ${data.companyName}</li>
                <li><strong>Module demandé :</strong> ${data.selectedModule}</li>
                <li><strong>Contact :</strong> ${data.contactName}</li>
                <li><strong>Email :</strong> ${data.companyEmail}</li>
                <li><strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}</li>
                <li><strong>Adresse :</strong> ${data.address}, ${data.city}, ${data.country}</li>
                <li><strong>Secteur d'activité :</strong> ${data.businessSector}</li>
                <li><strong>Devise :</strong> ${data.currency}</li>
                ${data.website ? `<li><strong>Site web :</strong> ${data.website}</li>` : ''}
                ${data.ninea ? `<li><strong>NINEA :</strong> ${data.ninea}</li>` : ''}
                ${data.rccm ? `<li><strong>RCCM :</strong> ${data.rccm}</li>` : ''}
              </ul>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0;">
                <strong>Action requise :</strong><br>
                Veuillez traiter cette demande de clé licence et générer la clé appropriée pour le module ${data.selectedModule}.
              </p>
            </div>
            
            <p style="color: #475569;">
              Cette demande a été générée automatiquement depuis le formulaire d'inscription G-Suite.
            </p>
          </div>
        </div>
      `,
    })

    // Confirmation email to company
    const confirmationEmailResponse = await resend.emails.send({
      from: "GrowHub Sénégal <contact@growhubsenegal.com>",
      to: [data.companyEmail],
      subject: "Demande de clé licence G-Suite reçue",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e293b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: white;">GrowHub Sénégal</h1>
            <p style="margin: 10px 0 0 0; color: #e2e8f0;">Votre solution de gestion d'entreprise G-Suite</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Demande reçue avec succès</h2>
            
            <p style="color: #475569;">Bonjour ${data.contactName},</p>
            
            <p style="color: #475569;">
              Nous avons bien reçu votre demande de clé licence G-Suite pour <strong>${data.companyName}</strong>.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #1e293b; margin-top: 0;">Récapitulatif de votre demande :</h3>
              <ul style="color: #475569;">
                <li><strong>Module demandé :</strong> ${data.selectedModule}</li>
                <li><strong>Entreprise :</strong> ${data.companyName}</li>
              </ul>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0;">
                <strong>⏰ Prochaines étapes :</strong><br>
                Votre demande sera traitée dans les <strong>24 heures</strong> suivant sa réception. 
                Vous recevrez un email avec votre clé licence une fois celle-ci générée.
              </p>
            </div>
            
            <p style="color: #475569;">
              Notre équipe vous contactera prochainement pour finaliser l'activation de votre licence.
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
                📧 <strong>Email :</strong> support@g-suite.com
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

    console.log("Emails envoyés:", { supportEmailResponse, confirmationEmailResponse })

    return new Response(JSON.stringify({ 
      success: true, 
      supportEmail: supportEmailResponse,
      confirmationEmail: confirmationEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des emails:", error)
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
