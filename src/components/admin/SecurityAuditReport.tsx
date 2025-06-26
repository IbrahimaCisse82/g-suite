
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Shield } from 'lucide-react';
import { AuditStats } from './audit/AuditStats';
import { AuditItem } from './audit/AuditItem';
import { auditItems, type AuditItem as AuditItemType } from '@/data/auditData';

export const SecurityAuditReport = () => {
  const [filteredItems, setFilteredItems] = useState<AuditItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const items = selectedCategory === 'all' 
      ? auditItems 
      : auditItems.filter(item => item.category === selectedCategory);
    setFilteredItems(items);
  }, [selectedCategory]);

  const stats = {
    total: auditItems.length,
    fixed: auditItems.filter(item => item.status === 'fixed').length,
    inProgress: auditItems.filter(item => item.status === 'in_progress').length,
    pending: auditItems.filter(item => item.status === 'pending').length,
    critical: auditItems.filter(item => item.status === 'critical').length
  };

  const completionRate = Math.round((stats.fixed / stats.total) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>Audit Complet de Sécurité - Refactorisation Décembre 2024</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuditStats stats={stats} />

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Taux de complétion</span>
              <span className="text-sm text-gray-600">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="ui_ux">UX/UI</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <AuditItem key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Résumé de la Refactorisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ Refactorisation Appliquée (26 Décembre 2024)</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Fusion des hooks d'authentification admin dupliqués en useAdminAuthentication</li>
              <li>• Découpage du SecurityAuditReport en composants modulaires</li>
              <li>• Extraction des données d'audit dans un fichier séparé</li>
              <li>• Architecture plus maintenable et extensible</li>
              <li>• Réduction de la duplication de code</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
