
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

export const Contacts = () => {
  const { data: contacts = [], isLoading, error } = useContacts();
  const contactsHandlers = useContactsHandlers();

  // Gestion des erreurs de chargement des contacts
  if (error) {
    console.error('Error loading contacts:', error);
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-800">Erreur contacts: {error.message}</p>
            </div>
            <ContactsErrorView />
          </div>
        </div>
      </Layout>
    );
  }

  // Affichage du loading pendant le chargement des contacts
  if (isLoading) {
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
          {/* Info de debug pour le développement */}
          <div className="mb-4 p-4 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">Mode test: Accès autorisé sans authentification</p>
            <p className="text-sm text-green-800">Contacts chargés: {contacts.length}</p>
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
