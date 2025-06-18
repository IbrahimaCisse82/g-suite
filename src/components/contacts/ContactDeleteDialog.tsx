
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

interface ContactDeleteDialogProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const ContactDeleteDialog = ({ 
  contact, 
  isOpen, 
  onClose, 
  onConfirm, 
  loading 
}: ContactDeleteDialogProps) => {
  if (!contact) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-700">
            Supprimer le contact
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer le contact{' '}
            <span className="font-semibold">{contact.name}</span>{' '}
            ({contact.contact_number}) ?
            <br />
            <span className="text-red-600 text-sm mt-2 block">
              Cette action est irréversible.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            disabled={loading}
            className="text-gray-700 border-gray-300"
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
