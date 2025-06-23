
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { NavigationHeader } from './backoffice/navigation/NavigationHeader';
import { NavigationMenu } from './backoffice/navigation/NavigationMenu';
import { SolutionsSection } from './backoffice/navigation/SolutionsSection';
import { NavigationFooter } from './backoffice/navigation/NavigationFooter';

export const AdminBackofficeNavigation = () => {
  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    window.location.href = '/';
  };

  return (
    <div className="w-72 bg-white text-gray-900 flex flex-col border-r border-gray-200 shadow-sm">
      <NavigationHeader />
      <NavigationMenu />
      <SolutionsSection />
      
      {/* Bouton de déconnexion */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
      
      <NavigationFooter />
    </div>
  );
};
