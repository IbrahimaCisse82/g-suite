
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCreateContact, useUpdateContact, useDeleteContact } from './useContacts';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useContactsHandlers = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  const { toast } = useToast();

  const handleCreateContact = async (contactData: any) => {
    try {
      console.log('Creating new contact:', contactData);
      await createContact.mutateAsync(contactData);
      toast({
        title: 'Contact ajouté',
        description: 'Le contact a été ajouté avec succès avec un numéro généré automatiquement',
      });
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      console.error('Error creating contact:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'ajouter le contact. Veuillez réessayer.',
        variant: 'destructive',
      });
    }
  };

  const handleEditContact = (contact: Contact) => {
    console.log('Opening edit dialog for contact:', contact.id);
    setSelectedContact(contact);
    setIsEditDialogOpen(true);
  };

  const handleUpdateContact = async (contactData: any) => {
    if (!selectedContact) return;
    
    try {
      console.log('Updating contact:', selectedContact.id, contactData);
      await updateContact.mutateAsync({ 
        id: selectedContact.id, 
        ...contactData 
      });
      toast({
        title: 'Contact modifié',
        description: 'Les informations du contact ont été mises à jour avec succès',
      });
      setIsEditDialogOpen(false);
      setSelectedContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le contact. Veuillez réessayer.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    console.log('Opening delete dialog for contact:', contact.id);
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedContact) return;
    
    try {
      console.log('Deleting contact:', selectedContact.id);
      await deleteContact.mutateAsync(selectedContact.id);
      toast({
        title: 'Contact supprimé',
        description: 'Le contact a été supprimé avec succès',
      });
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le contact. Veuillez réessayer.',
        variant: 'destructive',
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setSelectedContact(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedContact(null);
  };

  return {
    // Dialog states
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedContact,
    
    // Handlers
    handleCreateContact,
    handleEditContact,
    handleUpdateContact,
    handleDeleteContact,
    handleConfirmDelete,
    handleCancelEdit,
    handleCancelDelete,
    
    // Loading states
    createLoading: createContact.isPending,
    updateLoading: updateContact.isPending,
    deleteLoading: deleteContact.isPending,
  };
};
