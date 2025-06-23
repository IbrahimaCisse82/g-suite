
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { UserCheck } from 'lucide-react';

export const NavigationHeader = () => {
  return (
    <div className="p-6 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center space-x-3">
        <GSuiteLogo size={40} />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Backoffice Admin</h1>
          <p className="text-sm text-gray-600">Gestion des comptes entreprises</p>
        </div>
      </div>
      <div className="mt-4">
        <Badge className="bg-green-600 text-white">
          <UserCheck className="w-3 h-3 mr-1" />
          Super Admin
        </Badge>
      </div>
    </div>
  );
};
