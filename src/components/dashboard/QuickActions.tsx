
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, FileText, Users, Package } from 'lucide-react';

export const QuickActions = () => {
  return (
    <Card className="border-0 shadow-lg bg-white card-hover">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          Actions rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-slate-900">Créer une facture</span>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium text-slate-900">Ajouter un client</span>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-slate-900">Gérer le stock</span>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
