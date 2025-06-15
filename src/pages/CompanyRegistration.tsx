
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-6">
        <Button 
          variant="outline" 
          onClick={handleBackToHome}
          className="flex items-center gap-2 bg-white border-2 border-gray-300 text-slate-800 hover:bg-slate-50 hover:border-emerald-500 font-semibold"
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
