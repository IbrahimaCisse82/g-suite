
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const RecentActivity = () => {
  return (
    <Card className="border-0 shadow-lg bg-white card-hover">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
            <FileText className="w-4 h-4 text-white" />
          </div>
          Activité récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div className="text-center py-8 text-gray-500">
            Aucune activité récente
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
