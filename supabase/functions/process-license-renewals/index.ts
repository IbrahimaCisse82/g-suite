
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Vérification des licences qui expirent...');

    // Calculer la date dans 30 jours
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    // Trouver les abonnements qui expirent dans les 30 prochains jours
    const { data: expiringSubscriptions, error: fetchError } = await supabase
      .from('company_subscriptions')
      .select(`
        *,
        companies(name, id, email),
        subscription_plans(name, id, price)
      `)
      .eq('is_active', true)
      .lte('end_date', thirtyDaysFromNow.toISOString())
      .is('renewal_request_sent', null);

    if (fetchError) {
      console.error('Erreur lors de la récupération des abonnements:', fetchError);
      throw fetchError;
    }

    console.log(`Trouvé ${expiringSubscriptions?.length || 0} abonnements qui expirent bientôt`);

    const renewalRequests = [];

    if (expiringSubscriptions && expiringSubscriptions.length > 0) {
      for (const subscription of expiringSubscriptions) {
        try {
          // Vérifier qu'il n'y a pas déjà une demande de renouvellement en attente
          const { data: existingRequest } = await supabase
            .from('paid_account_requests')
            .select('id')
            .eq('company_id', subscription.company_id)
            .eq('plan_id', subscription.subscription_plan_id)
            .eq('status', 'pending')
            .like('request_message', '%Renouvellement automatique%')
            .maybeSingle();

          if (existingRequest) {
            console.log(`Demande de renouvellement déjà existante pour ${subscription.companies?.name}`);
            continue;
          }

          // Créer la demande de renouvellement automatique
          const { data: request, error: insertError } = await supabase
            .from('paid_account_requests')
            .insert({
              company_id: subscription.company_id,
              requested_by: null, // Demande automatique du système
              plan_id: subscription.subscription_plan_id,
              request_message: `[AUTOMATIQUE] Renouvellement automatique - Licence ${subscription.subscription_plans?.name} expire le ${new Date(subscription.end_date).toLocaleDateString('fr-FR')}`,
              status: 'pending'
            })
            .select()
            .single();

          if (insertError) {
            console.error(`Erreur lors de la création de la demande pour ${subscription.companies?.name}:`, insertError);
            continue;
          }

          renewalRequests.push(request);

          // Marquer que la demande de renouvellement a été envoyée
          await supabase
            .from('company_subscriptions')
            .update({ 
              renewal_request_sent: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', subscription.id);

          console.log(`Demande de renouvellement créée pour ${subscription.companies?.name}`);

        } catch (error) {
          console.error(`Erreur lors du traitement de ${subscription.companies?.name}:`, error);
        }
      }
    }

    console.log(`${renewalRequests.length} demandes de renouvellement créées avec succès`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        renewalRequestsCreated: renewalRequests.length,
        expiringSubscriptions: expiringSubscriptions?.length || 0
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erreur dans la fonction process-license-renewals:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
