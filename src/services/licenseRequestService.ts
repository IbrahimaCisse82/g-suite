
import { supabase } from '@/integrations/supabase/client';

export interface AutoLicenseRequest {
  company_id: string;
  current_plan_id?: string;
  requested_plan_id: string;
  request_type: 'new' | 'renewal' | 'upgrade';
  reason: string;
}

export const createAutoLicenseRequest = async (request: AutoLicenseRequest) => {
  const { data, error } = await supabase
    .from('paid_account_requests')
    .insert({
      company_id: request.company_id,
      plan_id: request.requested_plan_id,
      request_message: `[AUTOMATIQUE] ${request.reason}`,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Détecter les licences qui expirent dans les 30 prochains jours
export const checkExpiringLicenses = async () => {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const { data: expiringSubscriptions, error } = await supabase
    .from('company_subscriptions')
    .select(`
      *,
      companies(name, id),
      subscription_plans(name, id)
    `)
    .eq('is_active', true)
    .lte('end_date', thirtyDaysFromNow.toISOString())
    .is('renewal_request_sent', null);

  if (error) {
    console.error('Erreur lors de la vérification des licences qui expirent:', error);
    return [];
  }

  return expiringSubscriptions || [];
};

// Générer automatiquement les demandes de renouvellement
export const generateRenewalRequests = async () => {
  const expiringLicenses = await checkExpiringLicenses();
  const renewalRequests = [];

  for (const subscription of expiringLicenses) {
    try {
      const request = await createAutoLicenseRequest({
        company_id: subscription.company_id,
        current_plan_id: subscription.subscription_plan_id,
        requested_plan_id: subscription.subscription_plan_id,
        request_type: 'renewal',
        reason: `Renouvellement automatique - Licence ${subscription.subscription_plans?.name} expire le ${new Date(subscription.end_date).toLocaleDateString('fr-FR')}`
      });

      renewalRequests.push(request);

      // Marquer que la demande de renouvellement a été envoyée
      await supabase
        .from('company_subscriptions')
        .update({ renewal_request_sent: new Date().toISOString() })
        .eq('id', subscription.id);

    } catch (error) {
      console.error(`Erreur lors de la création de la demande de renouvellement pour ${subscription.companies?.name}:`, error);
    }
  }

  return renewalRequests;
};
