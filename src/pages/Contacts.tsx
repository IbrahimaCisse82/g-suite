
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
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export const Contacts = () => {
  const { user, loading: authLoading } = useAuth();
  
  // Mode développement - permettre l'accès sans authentification
  const isDevelopmentMode = import.meta.env.DEV || window.location.hostname === 'localhost';
  const mockUser = isDevelopmentMode && !user ? { email: 'dev@example.com', id: 'dev-user' } : user;
  
  const { data: contacts = [], isLoading, error } = useContacts();
  const contactsHandlers = useContactsHandlers();

  // Redirection vers la page de connexion si pas authentifié (sauf en mode dev)
  if (!authLoading && !mockUser && !isDevelopmentMode) {
    return (
      <Layout>
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
              <Button 
                onClick={() => window.location.href = '/user-login'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Gestion des erreurs de chargement des contacts
  if (error) {
    console.error('Error loading contacts:', error);
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-4 p-4 bg-red-100 rounded-lg">
              <p className="text-sm text-red-800">Erreur contacts: {error.message}</p>
            </div>
            <ContactsErrorView />
          </div>
        </div>
      </Layout>
    );
  }

  // Affichage du loading pendant le chargement
  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">Chargement des contacts...</p>
            </div>
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

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          {/* Info utilisateur connecté */}
          <div className="mb-4 p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              {isDevelopmentMode && !user ? (
                <>Mode développement - Accès autorisé | Contacts chargés: {contacts.length}</>
              ) : (
                <>Connecté en tant que: {mockUser?.email} | Contacts chargés: {contacts.length}</>
              )}
            </p>
          </div>

          <ContactsHeader onCreateContact={() => contactsHandlers.setIsCreateDialogOpen(true)} />

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
    </Layout>
  );
};
