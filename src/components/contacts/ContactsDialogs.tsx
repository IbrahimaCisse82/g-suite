
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ContactForm } from './ContactForm';
import { ContactEditForm } from './ContactEditForm';
import { ContactDeleteDialog } from './ContactDeleteDialog';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

interface ContactsDialogsProps {
  // Create dialog
  isCreateDialogOpen: boolean;
  onCreateDialogChange: (open: boolean) => void;
  onCreateContact: (data: any) => Promise<void>;
  createLoading: boolean;

  // Edit dialog
  isEditDialogOpen: boolean;
  onEditDialogChange: (open: boolean) => void;
  selectedContact: Contact | null;
  onUpdateContact: (data: any) => Promise<void>;
  updateLoading: boolean;
  onCancelEdit: () => void;

  // Delete dialog
  isDeleteDialogOpen: boolean;
  onDeleteDialogChange: (open: boolean) => void;
  onConfirmDelete: () => Promise<void>;
  deleteLoading: boolean;
  onCancelDelete: () => void;
}

export const ContactsDialogs = ({
  isCreateDialogOpen,
  onCreateDialogChange,
  onCreateContact,
  createLoading,
  isEditDialogOpen,
  onEditDialogChange,
  selectedContact,
  onUpdateContact,
  updateLoading,
  onCancelEdit,
  isDeleteDialogOpen,
  onDeleteDialogChange,
  onConfirmDelete,
  deleteLoading,
  onCancelDelete,
}: ContactsDialogsProps) => {
  return (
    <>
      {/* Dialog de création de contact */}
      <Dialog open={isCreateDialogOpen} onOpenChange={onCreateDialogChange}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-readable-primary">
              Nouveau contact
            </DialogTitle>
            <p className="text-sm text-readable-secondary">
              Le numéro de contact sera généré automatiquement selon le type sélectionné
            </p>
          </DialogHeader>
          <ContactForm 
            onSubmit={onCreateContact}
            onCancel={() => onCreateDialogChange(false)}
            loading={createLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition de contact */}
      <Dialog open={isEditDialogOpen} onOpenChange={onEditDialogChange}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-readable-primary">
              Modifier le contact
            </DialogTitle>
            <p className="text-sm text-readable-secondary">
              Modifiez les informations du contact sélectionné
            </p>
          </DialogHeader>
          {selectedContact && (
            <ContactEditForm
              contact={selectedContact}
              onSubmit={onUpdateContact}
              onCancel={onCancelEdit}
              loading={updateLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de suppression de contact */}
      <ContactDeleteDialog
        contact={selectedContact}
        isOpen={isDeleteDialogOpen}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
        loading={deleteLoading}
      />
    </>
  );
};
