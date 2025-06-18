
import React from 'react';
import { BackofficeDashboard } from './backoffice/BackofficeDashboard';
import { BackofficeStats } from './backoffice/BackofficeStats';
import { CompanyLicenseManagement } from './backoffice/CompanyLicenseManagement';

export const BackofficeUserManagement = () => {
  return (
    <div className="p-8">
      <BackofficeDashboard />
    </div>
  );
};
