
import React, { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ContactsStats } from '@/components/contacts/ContactsStats';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { PageLoader } from '@/components/common/PageLoader';

interface ContactsContentProps {
  contacts: any[];
  onViewContact: (contact: any) => void;
  onEditContact: (contact: any) => void;
  onDeleteContact: (contact: any) => void;
  onCreateContact: () => void;
}

export const ContactsContent = React.memo(({
  contacts,
  onViewContact,
  onEditContact,
  onDeleteContact,
  onCreateContact
}: ContactsContentProps) => {
  return (
    <div className="space-y-6">
      <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
        <ContactsStats contacts={contacts} />
      </Suspense>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucun contact enregistré pour le moment</p>
              <button
                onClick={onCreateContact}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Créer votre premier contact
              </button>
            </div>
          ) : (
            <Suspense fallback={<PageLoader type="skeleton" rows={5} />}>
              <ContactsTable
                contacts={contacts}
                onEdit={onEditContact}
                onDelete={onDeleteContact}
              />
            </Suspense>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

ContactsContent.displayName = 'ContactsContent';
