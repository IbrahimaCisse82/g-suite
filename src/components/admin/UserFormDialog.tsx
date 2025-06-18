
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { UserPersonalInfoSection } from './user-form/UserPersonalInfoSection';
import { UserRoleSection } from './user-form/UserRoleSection';
import { useUserFormValidation } from './user-form/useUserFormValidation';

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
}

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  title: string;
  initialData?: any;
}

export const UserFormDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  initialData 
}: UserFormDialogProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'comptable',
    phone: '',
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateForm } = useUserFormValidation();

  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email || '',
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        role: initialData.role || 'comptable',
        phone: initialData.phone || '',
        isActive: initialData.isActive ?? true
      });
    } else {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: 'comptable',
        phone: '',
        isActive: true
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(formData);
    
    if (isValid) {
      onSubmit(formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <UserPersonalInfoSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <UserRoleSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {initialData ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
