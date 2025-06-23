
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTPEModule } from '@/hooks/useTPEModule';
import { Settings, CreditCard, Package } from 'lucide-react';

export function TPEPricingSettings() {
  const { 
    moduleConfig, 
    calculateTotalPrice, 
    enabledModules, 
    getRecommendedBundle 
  } = useTPEModule();

  const totalPrice = calculateTotalPrice();
  const recommendation = getRecommendedBundle();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="inline-flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Configuration TPE actuelle
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <h3 className="font-semibold">Votre abonnement</h3>
            <p className="text-sm text-muted-foreground">
              {enabledModules.length} module{enabledModules.length > 1 ? 's' : ''} activé{enabledModules.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {totalPrice}€<span className="text-sm font-normal">/mois</span>
            </div>
            {totalPrice === 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Gratuit
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Modules actifs :</h4>
          <div className="flex flex-wrap gap-2">
            {enabledModules.map((module) => (
              <Badge key={module} variant="outline">
                {module === 'facturation' ? 'Facturation' :
                 module === 'contacts' ? 'Contacts' :
                 module === 'comptabilite' ? 'Comptabilité' :
                 module === 'stock' ? 'Stock' :
                 module === 'crm' ? 'CRM' : module}
              </Badge>
            ))}
          </div>
        </div>

        {recommendation && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">
              💡 {recommendation}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Modifier les modules
          </Button>
          <Button variant="outline">
            <Package className="w-4 h-4 mr-2" />
            Voir les forfaits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
