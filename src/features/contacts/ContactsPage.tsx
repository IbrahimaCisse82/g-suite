
import React from 'react';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/common/PageTransition';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { ContactsErrorView } from '@/components/contacts/ContactsErrorView';
import { PageLoader } from '@/components/common/PageLoader';
import { useContactsLogic } from './hooks/useContactsLogic';
import { ContactsHeader } from './components/ContactsHeader';
import { ContactsContent } from './components/ContactsContent';
import { ContactsDialogs } from './components/ContactsDialogs';

const ContactsPage = React.memo(() => {
  const {
    contacts,
    loading,
    error,
    showCreateForm,
    selectedContact,
    showDetails,
    editingContact,
    showEditForm,
    openCreateForm,
    closeCreateForm,
    handleViewContact,
    handleEditContactClick,
    closeEditForm,
    closeDetails,
    onContactCreated,
    onContactEdited,
    handleDeleteContact,
  } = useContactsLogic();

  if (loading) {
    return (
      <Layout>
        <PageLoader text="Chargement des contacts..." rows={5} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ContactsErrorView error={error} />
      </Layout>
    );
  }

  return (
    <AuthGuard>
      <Layout>
        <PageTransition>
          <div className="gradient-bg min-h-full">
            <div className="p-8">
              <ContactsHeader 
                onCreateContact={openCreateForm}
                totalContacts={contacts.length}
              />

              <ContactsContent
                contacts={contacts}
                onViewContact={handleViewContact}
                onEditContact={handleEditContactClick}
                onDeleteContact={handleDeleteContact}
                onCreateContact={openCreateForm}
              />

              <ContactsDialogs
                showCreateForm={showCreateForm}
                onCloseCreateForm={closeCreateForm}
                onContactCreated={onContactCreated}
                showEditForm={showEditForm}
                editingContact={editingContact}
                onCloseEditForm={closeEditForm}
                onContactEdited={onContactEdited}
              />
            </div>
          </div>
        </PageTransition>
      </Layout>
    </AuthGuard>
  );
});

ContactsPage.displayName = 'ContactsPage';
export default ContactsPage;
