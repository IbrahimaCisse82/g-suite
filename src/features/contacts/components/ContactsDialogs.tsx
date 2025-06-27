
import React, { Suspense } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContactForm } from '@/components/contacts/ContactForm';
import { ContactEditForm } from '@/components/contacts/ContactEditForm';
import { PageLoader } from '@/components/common/PageLoader';

interface ContactsDialogsProps {
  // Create form
  showCreateForm: boolean;
  onCloseCreateForm: () => void;
  onContactCreated: (data: any) => Promise<void>;
  
  // Edit form
  showEditForm: boolean;
  editingContact: any;
  onCloseEditForm: () => void;
  onContactEdited: (data: any) => Promise<void>;
}

export const ContactsDialogs = React.memo(({
  showCreateForm,
  onCloseCreateForm,
  onContactCreated,
  showEditForm,
  editingContact,
  onCloseEditForm,
  onContactEdited
}: ContactsDialogsProps) => {
  return (
    <>
      {/* Create Dialog */}
      <Dialog open={showCreateForm} onOpenChange={onCloseCreateForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <Suspense fallback={<PageLoader type="spinner" />}>
            <ContactForm
              onSubmit={onContactCreated}
              onCancel={onCloseCreateForm}
            />
          </Suspense>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditForm} onOpenChange={onCloseEditForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <Suspense fallback={<PageLoader type="spinner" />}>
            <ContactEditForm
              contact={editingContact}
              onSubmit={onContactEdited}
              onCancel={onCloseEditForm}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
});

ContactsDialogs.displayName = 'ContactsDialogs';
