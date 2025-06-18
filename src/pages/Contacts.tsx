import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Users, AlertCircle } from 'lucide-react';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { ContactForm } from '@/components/contacts/ContactForm';
import { ContactEditForm } from '@/components/contacts/ContactEditForm';
import { ContactDeleteDialog } from '@/components/contacts/ContactDeleteDialog';
import { ContactsStats } from '@/components/contacts/ContactsStats';
import { useContacts, useCreateContact, useUpdateContact, useDeleteContact } from '@/hooks/useContacts';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const Contacts = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  const { data: contacts = [], isLoading, error } = useContacts();
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  const { toast } = useToast();

  // Vérifier l'état d'authentification au chargement
  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAuthStatus(user ? 'authenticated' : 'unauthenticated');
    };
    
    checkAuth();
  }, []);

  // Gestion de la création de contact
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

  // Gestion de l'édition de contact
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

  // Gestion de la suppression de contact
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

  // Affichage si l'utilisateur n'est pas authentifié
  if (authStatus === 'unauthenticated') {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-readable-primary mb-4">
                Authentification requise
              </h1>
              <p className="text-readable-secondary mb-6">
                Vous devez être connecté pour accéder à la gestion des contacts.
              </p>
              <Button 
                onClick={() => window.location.href = '/login'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Chargement
  if (isLoading || authStatus === 'checking') {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Gestion des erreurs de chargement
  if (error) {
    console.error('Error loading contacts:', error);
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h1>
              <p className="text-gray-600">
                Impossible de charger les contacts. Veuillez rafraîchir la page.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          {/* En-tête */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-readable-primary">
                Clients & Fournisseurs
              </h1>
              <p className="text-readable-secondary mt-2">
                Gérez vos contacts commerciaux avec numérotation automatique
              </p>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)} 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau contact
            </Button>
          </div>

          {/* Statistiques */}
          <ContactsStats contacts={contacts} />

          {/* Liste des contacts */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-readable-primary flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Liste des contacts ({contacts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactsTable 
                contacts={contacts} 
                onEdit={handleEditContact} 
                onDelete={handleDeleteContact}
                loading={createContact.isPending || updateContact.isPending || deleteContact.isPending}
              />
            </CardContent>
          </Card>

          {/* Dialog de création de contact */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                onSubmit={handleCreateContact}
                onCancel={() => setIsCreateDialogOpen(false)}
                loading={createContact.isPending}
              />
            </DialogContent>
          </Dialog>

          {/* Dialog d'édition de contact */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                  onSubmit={handleUpdateContact}
                  onCancel={() => {
                    setIsEditDialogOpen(false);
                    setSelectedContact(null);
                  }}
                  loading={updateContact.isPending}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Dialog de suppression de contact */}
          <ContactDeleteDialog
            contact={selectedContact}
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setSelectedContact(null);
            }}
            onConfirm={handleConfirmDelete}
            loading={deleteContact.isPending}
          />
        </div>
      </div>
    </Layout>
  );
};
