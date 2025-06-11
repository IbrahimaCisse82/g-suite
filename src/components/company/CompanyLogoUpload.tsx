
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CompanyLogoUploadProps {
  logoPreview: string;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyLogoUpload = ({ logoPreview, onLogoChange }: CompanyLogoUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="logo">Logo de l'entreprise</Label>
      <div className="flex items-center gap-4">
        {logoPreview && (
          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={onLogoChange}
            className="cursor-pointer"
          />
          <p className="text-sm text-gray-500 mt-1">
            Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
          </p>
        </div>
      </div>
    </div>
  );
};
