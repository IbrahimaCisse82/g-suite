
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Building2 } from 'lucide-react';

export const NavigationFooter = () => {
  const handleLogout = () => {
    // Logic de déconnexion
    window.location.href = '/admin-login';
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SA</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Super Admin</p>
            <p className="text-xs text-gray-600">admin@growhub.com</p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleLogout}
        variant="ghost" 
        className="w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Déconnexion
      </Button>
      
      <div className="text-xs text-gray-500 mt-3 text-center">
        <div>© 2024 GrowHub Backoffice</div>
        <div className="flex items-center justify-center mt-1">
          <Building2 className="w-3 h-3 mr-1" />
          Version Admin v2.0
        </div>
      </div>
    </div>
  );
};
