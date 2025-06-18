
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { ContactsStats } from '@/components/contacts/ContactsStats';
import { ContactsAuthGuard } from '@/components/contacts/ContactsAuthGuard';
import { ContactsHeader } from '@/components/contacts/ContactsHeader';
import { ContactsErrorView } from '@/components/contacts/ContactsErrorView';
import { ContactsDialogs } from '@/components/contacts/ContactsDialogs';
import { useContacts } from '@/hooks/useContacts';
import { useContactsHandlers } from '@/hooks/useContactsHandlers';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';

export const Contacts = () => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  const { data: contacts = [], isLoading, error } = useContacts();
  const contactsHandlers = useContactsHandlers();

  // Vérifier l'état d'authentification au chargement
  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAuthStatus(user ? 'authenticated' : 'unauthenticated');
    };
    
    checkAuth();
  }, []);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  // Gestion de l'authentification
  const authGuard = (
    <ContactsAuthGuard 
      authStatus={authStatus} 
      onLogin={handleLogin}
    />
  );

  if (authStatus !== 'authenticated') {
    return authGuard;
  }

  // Gestion des erreurs de chargement
  if (error) {
    console.error('Error loading contacts:', error);
    return <ContactsErrorView />;
  }

  // Chargement
  if (isLoading) {
    return authGuard; // Reuse the loading state from AuthGuard
  }

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
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
