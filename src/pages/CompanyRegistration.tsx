
import React from 'react';
import { CompanyRegistrationForm } from '@/components/CompanyRegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CompanyRegistration = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-6">
        <Button 
          variant="outline" 
          onClick={handleBackToHome}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Button>
      </div>
      <CompanyRegistrationForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CompanyRegistration;
