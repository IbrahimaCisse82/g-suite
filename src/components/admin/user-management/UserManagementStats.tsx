
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';

interface UserManagementStatsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  managersCount: number;
}

export const UserManagementStats = ({ 
  totalUsers, 
  activeUsers, 
  inactiveUsers, 
  managersCount 
}: UserManagementStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
              <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs inactifs</p>
              <p className="text-3xl font-bold text-red-600">{inactiveUsers}</p>
            </div>
            <UserX className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Managers</p>
              <p className="text-3xl font-bold text-purple-600">{managersCount}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
