
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { ContactsStats } from '@/components/contacts/ContactsStats';
import { ContactsHeader } from '@/components/contacts/ContactsHeader';
import { ContactsErrorView } from '@/components/contacts/ContactsErrorView';
import { ContactsDialogs } from '@/components/contacts/ContactsDialogs';
import { useContacts } from '@/hooks/useContacts';
import { useContactsHandlers } from '@/hooks/useContactsHandlers';
import { OptimizedLayout } from '@/components/OptimizedLayout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { FastLink } from '@/components/common/FastLink';
import { usePerformance } from '@/hooks/usePerformance';
import { PageLoader } from '@/components/common/PageLoader';

export const Contacts = () => {
  const { user, loading: authLoading } = useAuth();
  const { measureOperation } = usePerformance('ContactsPage');
  
  // Mode développement - permettre l'accès sans authentification
  const isDevelopmentMode = import.meta.env.DEV || window.location.hostname === 'localhost';
  const mockUser = isDevelopmentMode && !user ? { email: 'dev@example.com', id: 'dev-user' } : user;
  
  const { data: contacts = [], isLoading, error } = useContacts();
  const contactsHandlers = useContactsHandlers();

  // Redirection vers la page de connexion si pas authentifié (sauf en mode dev)
  if (!authLoading && !mockUser && !isDevelopmentMode) {
    return (
      <OptimizedLayout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <LogIn className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-readable-primary mb-4">
                Authentification requise
              </h1>
              <p className="text-readable-secondary mb-6">
                Vous devez être connecté pour accéder à la gestion des contacts.
              </p>
              <FastLink to="/user-login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </FastLink>
            </div>
          </div>
        </div>
      </OptimizedLayout>
    );
  }

  // Gestion des erreurs de chargement des contacts
  if (error) {
    console.error('Error loading contacts:', error);
    return (
      <OptimizedLayout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-4 p-4 bg-red-100 rounded-lg">
              <p className="text-sm text-red-800">Erreur contacts: {error.message}</p>
            </div>
            <ContactsErrorView />
          </div>
        </div>
      </OptimizedLayout>
    );
  }

  // Affichage du loading optimisé
  if (authLoading || isLoading) {
    return (
      <OptimizedLayout>
        <PageLoader type="skeleton" rows={4} text="Chargement ultra-rapide..." />
      </OptimizedLayout>
    );
  }

  const handleCreateContact = () => {
    const endMeasure = measureOperation('Open Create Dialog');
    contactsHandlers.setIsCreateDialogOpen(true);
    endMeasure();
  };

  return (
    <OptimizedLayout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          {/* Info utilisateur connecté */}
          <div className="mb-4 p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              {isDevelopmentMode && !user ? (
                <>🚀 Navigation ultra-rapide activée | Contacts: {contacts.length}</>
              ) : (
                <>Connecté: {mockUser?.email} | Navigation optimisée | Contacts: {contacts.length}</>
              )}
            </p>
          </div>

          <ContactsHeader onCreateContact={handleCreateContact} />
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
                onEdit={contactsHandlers.handleEditContact} 
                onDelete={contactsHandlers.handleDeleteContact}
                loading={contactsHandlers.createLoading || contactsHandlers.updateLoading || contactsHandlers.deleteLoading}
              />
            </CardContent>
          </Card>

          <ContactsDialogs
            isCreateDialogOpen={contactsHandlers.isCreateDialogOpen}
            onCreateDialogChange={contactsHandlers.setIsCreateDialogOpen}
            onCreateContact={contactsHandlers.handleCreateContact}
            createLoading={contactsHandlers.createLoading}
            isEditDialogOpen={contactsHandlers.isEditDialogOpen}
            onEditDialogChange={contactsHandlers.setIsEditDialogOpen}
            selectedContact={contactsHandlers.selectedContact}
            onUpdateContact={contactsHandlers.handleUpdateContact}
            updateLoading={contactsHandlers.updateLoading}
            onCancelEdit={contactsHandlers.handleCancelEdit}
            isDeleteDialogOpen={contactsHandlers.isDeleteDialogOpen}
            onDeleteDialogChange={contactsHandlers.setIsDeleteDialogOpen}
            onConfirmDelete={contactsHandlers.handleConfirmDelete}
            deleteLoading={contactsHandlers.deleteLoading}
            onCancelDelete={contactsHandlers.handleCancelDelete}
          />
        </div>
      </div>
    </OptimizedLayout>
  );
};
