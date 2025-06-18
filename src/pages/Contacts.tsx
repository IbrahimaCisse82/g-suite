
import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setAuthStatus('unauthenticated');
          return;
        }

        if (session?.user) {
          // Vérifier que l'utilisateur a un profil avec une entreprise
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('company_id')
            .eq('id', session.user.id)
            .single();

          if (profileError || !profile?.company_id) {
            console.log('No company profile found for user');
            setAuthStatus('unauthenticated');
            return;
          }

          setAuthStatus('authenticated');
        } else {
          setAuthStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthStatus('unauthenticated');
      }
    };
    
    checkAuth();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('company_id')
              .eq('id', session.user.id)
              .single();

            if (profileError || !profile?.company_id) {
              setAuthStatus('unauthenticated');
              return;
            }

            setAuthStatus('authenticated');
          } catch (error) {
            console.error('Profile check error:', error);
            setAuthStatus('unauthenticated');
          }
        } else {
          setAuthStatus('unauthenticated');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  // Gestion de l'authentification
  if (authStatus !== 'authenticated') {
    return (
      <ContactsAuthGuard 
        authStatus={authStatus} 
        onLogin={handleLogin}
      />
    );
  }

  // Gestion des erreurs de chargement
  if (error) {
    console.error('Error loading contacts:', error);
    return <ContactsErrorView />;
  }

  // Chargement
  if (isLoading) {
    return (
      <ContactsAuthGuard 
        authStatus="checking" 
        onLogin={handleLogin}
      />
    );
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
