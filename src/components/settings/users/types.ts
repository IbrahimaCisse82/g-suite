
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
}
