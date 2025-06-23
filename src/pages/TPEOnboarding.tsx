
import React from 'react';
import { TPEOnboardingWizard } from '@/components/onboarding/TPEOnboardingWizard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const TPEOnboarding = () => {
  const navigate = useNavigate();

  const handleOnboardingComplete = (selectedModule: string) => {
    // Sauvegarder la configuration choisie
    localStorage.setItem('tpe_selected_module', selectedModule);
    
    toast.success('Configuration sauvegardée ! Bienvenue dans G-Suite TPE');
    
    // Rediriger vers le dashboard adapté
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <TPEOnboardingWizard onComplete={handleOnboardingComplete} />
    </div>
  );
};

export default TPEOnboarding;
