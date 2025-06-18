
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CompanyLogoUploadProps {
  logoPreview: string;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyLogoUpload = ({ logoPreview, onLogoChange }: CompanyLogoUploadProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="logo" className="text-slate-800 font-bold text-base">Logo de l'entreprise</Label>
      <div className="flex items-center gap-4">
        {logoPreview && (
          <div className="w-20 h-20 rounded-lg border-2 border-slate-400 flex items-center justify-center overflow-hidden bg-white shadow-sm p-1">
            <img 
              src={logoPreview} 
              alt="Logo preview" 
              className="max-w-full max-h-full object-contain"
              style={{ 
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        )}
        <div className="flex-1">
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={onLogoChange}
            className="cursor-pointer border-2 border-slate-400 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 shadow-sm"
          />
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
          </p>
        </div>
      </div>
    </div>
  );
};
