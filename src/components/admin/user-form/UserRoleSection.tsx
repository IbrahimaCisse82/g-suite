
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';

interface UserRoleSectionProps {
  formData: {
    role: 'manager' | 'comptable' | 'budget' | 'logistique' | 'caissier';
    isActive: boolean;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

const roleOptions = [
  { value: 'manager', label: 'Manager', description: 'Accès complet à toutes les fonctionnalités' },
  { value: 'comptable', label: 'Comptable', description: 'Accès à la comptabilité et trésorerie' },
  { value: 'budget', label: 'Budget', description: 'Accès aux contacts, facturation et budget' },
  { value: 'logistique', label: 'Logistique', description: 'Accès aux produits et stock' },
  { value: 'caissier', label: 'Caissier', description: 'Accès à la trésorerie uniquement' },
];

export const UserRoleSection = ({ 
  formData, 
  errors, 
  onInputChange 
}: UserRoleSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
        Rôle et permissions
      </h3>

      <div className="space-y-2">
        <Label>Rôle *</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => onInputChange('role', value)}
        >
          <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <div>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-xs text-gray-500">{role.description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-red-600">{errors.role}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Statut du compte</Label>
          <p className="text-sm text-gray-500">
            {formData.isActive ? 'L\'utilisateur peut se connecter' : 'L\'utilisateur ne peut pas se connecter'}
          </p>
        </div>
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) => onInputChange('isActive', checked)}
        />
      </div>
    </div>
  );
};
