
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  type: string;
  title: string;
  message: string;
  companyName?: string;
  requestType?: string;
  timestamp: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      type, 
      title, 
      message, 
      companyName, 
      requestType, 
      timestamp 
    }: AdminNotificationRequest = await req.json();

    const formatMessage = () => {
      switch (type) {
        case 'new_request':
          return `
            <h2>🆕 Nouvelle demande de licence</h2>
            <p><strong>Entreprise:</strong> ${companyName || 'Non spécifiée'}</p>
            <p><strong>Type de demande:</strong> ${requestType || 'Non spécifié'}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Date:</strong> ${new Date(timestamp).toLocaleString('fr-FR')}</p>
            <hr>
            <p>Veuillez vous connecter au backoffice pour traiter cette demande.</p>
          `;
        case 'renewal_request':
          return `
            <h2>🔄 Demande de renouvellement</h2>
            <p><strong>Entreprise:</strong> ${companyName || 'Non spécifiée'}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Date:</strong> ${new Date(timestamp).toLocaleString('fr-FR')}</p>
          `;
        default:
          return `
            <h2>🔔 Notification Admin</h2>
            <p><strong>Titre:</strong> ${title}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Date:</strong> ${new Date(timestamp).toLocaleString('fr-FR')}</p>
          `;
      }
    };

    const emailResponse = await resend.emails.send({
      from: "G-Suite Admin <noreply@g-suiteapp.com>",
      to: ["support@g-suiteapp.com"],
      subject: `[G-Suite Admin] ${title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22c55e, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            hr { border: 0; height: 1px; background: #e5e7eb; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>G-Suite Administration</h1>
              <p>Notification automatique du système</p>
            </div>
            <div class="content">
              ${formatMessage()}
            </div>
            <div class="footer">
              <p>Ceci est un message automatique du système G-Suite Admin.</p>
              <p>© 2024 G-Suite Application</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending admin notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
