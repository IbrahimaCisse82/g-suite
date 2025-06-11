
import React from 'react';
import { CompanyRegistrationForm } from '@/components/CompanyRegistrationForm';
import { useNavigate } from 'react-router-dom';

const CompanyRegistration = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <CompanyRegistrationForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CompanyRegistration;
