
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AuditStatsProps {
  stats: {
    total: number;
    fixed: number;
    inProgress: number;
    pending: number;
    critical: number;
  };
}

export const AuditStats = ({ stats }: AuditStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Points</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{stats.fixed}</div>
        <div className="text-sm text-gray-600">Corrigés</div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
        <div className="text-sm text-gray-600">En cours</div>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        <div className="text-sm text-gray-600">En attente</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
        <div className="text-sm text-gray-600">Critiques</div>
      </div>
    </div>
  );
};
