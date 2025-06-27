
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/common/PageTransition';
import { PageLoader } from '@/components/common/PageLoader';
import { ContactsErrorView } from '@/components/contacts/ContactsErrorView';
import { ContactsContent } from './components/ContactsContent';
import { ContactsDialogs } from './components/ContactsDialogs';
import { useContactsLogic } from './hooks/useContactsLogic';
import { usePerformance } from '@/hooks/usePerformance';

const ContactsPage = () => {
  const { measurePageLoad } = usePerformance();
  const endMeasure = React.useMemo(() => measurePageLoad('Contacts'), [measurePageLoad]);

  React.useEffect(() => {
    return endMeasure;
  }, [endMeasure]);

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
        <PageLoader text="Chargement des contacts..." />
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
    <ErrorBoundary fallback={<ContactsErrorView error={new Error('Erreur dans le composant Contacts')} />}>
      <Layout>
        <PageTransition>
          <div className="gradient-bg min-h-full">
            <div className="p-8">
              <Suspense fallback={<PageLoader type="skeleton" rows={3} />}>
                <ContactsContent
                  contacts={contacts}
                  onViewContact={handleViewContact}
                  onEditContact={handleEditContactClick}
                  onDeleteContact={handleDeleteContact}
                  onCreateContact={openCreateForm}
                />
              </Suspense>

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
    </ErrorBoundary>
  );
};

export default ContactsPage;
