
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

interface ContactsHeaderProps {
  onCreateContact: () => void;
  totalContacts: number;
}

export const ContactsHeader = React.memo(({ onCreateContact, totalContacts }: ContactsHeaderProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform transition-transform hover:scale-110">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-readable-primary mb-2">Contacts</h1>
            <p className="text-xl text-readable-secondary">
              {totalContacts} contact{totalContacts !== 1 ? 's' : ''} enregistré{totalContacts !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button
          onClick={onCreateContact}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau contact
        </Button>
      </div>
    </div>
  );
});

ContactsHeader.displayName = 'ContactsHeader';
