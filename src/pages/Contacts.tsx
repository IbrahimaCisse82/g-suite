
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
  const [userProfile, setUserProfile] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const { data: contacts = [], isLoading, error } = useContacts();
  const contactsHandlers = useContactsHandlers();

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('🔍 Checking authentication status...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          setDebugInfo(`Erreur de session: ${sessionError.message}`);
          setAuthStatus('unauthenticated');
          return;
        }

        if (!session?.user) {
          console.log('❌ No active session found');
          setDebugInfo('Aucune session active trouvée');
          setAuthStatus('unauthenticated');
          return;
        }

        console.log('✅ Session found for user:', session.user.email);
        setDebugInfo(`Session trouvée pour: ${session.user.email}`);
        
        // Vérifier le profil utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('❌ Profile error:', profileError);
          setDebugInfo(`Erreur profil: ${profileError.message}`);
          
          // Si le profil n'existe pas, on peut continuer sans company_id
          if (profileError.code === 'PGRST116') {
            console.log('⚠️ No profile found, but allowing access');
            setDebugInfo('Profil non trouvé, mais accès autorisé');
            setAuthStatus('authenticated');
            return;
          }
          
          setAuthStatus('unauthenticated');
          return;
        }

        console.log('✅ Profile found:', profile);
        
        // Permettre l'accès même sans company_id pour le développement
        if (!profile?.company_id) {
          console.log('⚠️ No company associated with user profile, but allowing access');
          setDebugInfo('Aucune entreprise associée au profil, mais accès autorisé');
        } else {
          console.log('✅ User authenticated with company:', profile.company_id);
          setDebugInfo(`Authentifié avec entreprise: ${profile.company_id}`);
        }

        setUserProfile(profile);
        setAuthStatus('authenticated');

      } catch (error) {
        console.error('❌ Auth check error:', error);
        setDebugInfo(`Erreur d'authentification: ${error}`);
        setAuthStatus('unauthenticated');
      }
    };
    
    checkAuthStatus();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_OUT' || !session?.user) {
          setAuthStatus('unauthenticated');
          setUserProfile(null);
          setDebugInfo('Utilisateur déconnecté');
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError && profileError.code !== 'PGRST116') {
              console.log('⚠️ Profile error but allowing access:', profileError);
              setDebugInfo(`Erreur profil mais accès autorisé: ${profileError.message}`);
            }

            setUserProfile(profile);
            setAuthStatus('authenticated');
            setDebugInfo(`Connecté: ${session.user.email}`);
          } catch (error) {
            console.error('❌ Profile check error:', error);
            // Permettre l'accès même en cas d'erreur de profil
            setAuthStatus('authenticated');
            setUserProfile(null);
            setDebugInfo(`Erreur profil mais accès autorisé: ${error}`);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  // Affichage du guard d'authentification si nécessaire
  if (authStatus === 'checking') {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">Debug: {debugInfo}</p>
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

  if (authStatus === 'unauthenticated') {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-4 p-4 bg-red-100 rounded-lg">
              <p className="text-sm text-red-800">Debug: {debugInfo}</p>
            </div>
            <ContactsAuthGuard 
              authStatus="unauthenticated" 
              onLogin={handleLogin}
            />
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
            <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-800">Debug: {debugInfo}</p>
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
              <p className="text-sm text-blue-800">Debug: {debugInfo}</p>
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
            <p className="text-sm text-green-800">Debug: {debugInfo}</p>
            <p className="text-sm text-green-800">Profil: {userProfile ? JSON.stringify(userProfile, null, 2) : 'Aucun'}</p>
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
