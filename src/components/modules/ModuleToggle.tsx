
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  features: string[];
  enabled: boolean;
  essential?: boolean;
}

interface ModuleToggleProps {
  module: ModuleInfo;
  onToggle: (moduleId: string, enabled: boolean) => void;
  disabled?: boolean;
}

export const ModuleToggle = ({ module, onToggle, disabled }: ModuleToggleProps) => {
  const Icon = module.icon;

  return (
    <Card className={`transition-all ${module.enabled ? 'border-green-200 bg-green-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              module.enabled ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Icon className={`w-5 h-5 ${module.enabled ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {module.name}
                {module.essential && (
                  <Badge variant="secondary" className="text-xs">
                    Essentiel
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="font-semibold">{module.price}€/mois</div>
            </div>
            <Switch
              checked={module.enabled}
              onCheckedChange={(checked) => onToggle(module.id, checked)}
              disabled={disabled || module.essential}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {module.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              • {feature}
            </div>
          ))}
          {module.features.length > 3 && (
            <div className="text-sm text-muted-foreground">
              +{module.features.length - 3} autres fonctionnalités
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
