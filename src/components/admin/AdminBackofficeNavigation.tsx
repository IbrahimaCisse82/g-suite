
import React from 'react';
import { NavigationHeader } from './backoffice/navigation/NavigationHeader';
import { NavigationMenu } from './backoffice/navigation/NavigationMenu';
import { SolutionsSection } from './backoffice/navigation/SolutionsSection';
import { NavigationFooter } from './backoffice/navigation/NavigationFooter';

export const AdminBackofficeNavigation = () => {
  return (
    <div className="w-72 bg-white text-gray-900 flex flex-col border-r border-gray-200 shadow-sm">
      <NavigationHeader />
      <NavigationMenu />
      <SolutionsSection />
      <NavigationFooter />
    </div>
  );
};
