
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useInitialSetup = () => {
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id, is_company_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id || !profile.is_company_admin) {
        setIsLoading(false);
        return;
      }

      const { data: company } = await supabase
        .from('companies')
        .select('initial_setup_completed')
        .eq('id', profile.company_id)
        .single();

      setNeedsSetup(!company?.initial_setup_completed);
    } catch (error) {
      console.error('Erreur lors de la vérification du setup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeSetup = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) return;

      await supabase
        .from('companies')
        .update({ initial_setup_completed: true })
        .eq('id', profile.company_id);

      setNeedsSetup(false);
    } catch (error) {
      console.error('Erreur lors de la finalisation du setup:', error);
    }
  };

  return { needsSetup, isLoading, completeSetup };
};
