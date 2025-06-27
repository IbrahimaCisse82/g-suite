
import React from 'react';
import { NavigationHeader } from './backoffice/navigation/NavigationHeader';
import { NavigationMenu } from './backoffice/navigation/NavigationMenu';
import { SolutionsSection } from './backoffice/navigation/SolutionsSection';
import { NavigationFooter } from './backoffice/navigation/NavigationFooter';

export const AdminBackofficeNavigation = () => {
  return (
    <div className="w-72 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-sm">
      <NavigationHeader />
      <NavigationMenu />
      <SolutionsSection />
      <NavigationFooter />
    </div>
  );
};
