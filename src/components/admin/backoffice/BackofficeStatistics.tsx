
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, Building2 } from 'lucide-react';

interface BackofficeStatisticsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  companiesCount: number;
}

export const BackofficeStatistics = ({ 
  totalUsers, 
  activeUsers, 
  inactiveUsers, 
  companiesCount 
}: BackofficeStatisticsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total utilisateurs</p>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Utilisateurs actifs</p>
              <p className="text-3xl font-bold">{activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Utilisateurs inactifs</p>
              <p className="text-3xl font-bold">{inactiveUsers}</p>
            </div>
            <UserX className="w-8 h-8 text-red-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Entreprises</p>
              <p className="text-3xl font-bold">{companiesCount}</p>
            </div>
            <Building2 className="w-8 h-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
