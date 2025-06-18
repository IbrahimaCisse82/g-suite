
import React from 'react';
import { BackofficeStats } from './backoffice/BackofficeStats';
import { CompanyLicenseManagement } from './backoffice/CompanyLicenseManagement';

export const BackofficeUserManagement = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestion des Entreprises et Licences
        </h1>
        <p className="text-gray-600">
          Gérez les entreprises, leurs licences et traitez les demandes de clés
        </p>
      </div>

      <BackofficeStats />
      <CompanyLicenseManagement />
    </div>
  );
};
