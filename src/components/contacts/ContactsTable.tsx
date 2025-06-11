
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Phone, Mail } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactsTable = ({ contacts, onEdit, onDelete }: ContactsTableProps) => {
  const getTypeBadge = (type: string) => {
    const variants = {
      client: 'default',
      fournisseur: 'secondary',
      both: 'outline'
    } as const;
    
    return <Badge variant={variants[type as keyof typeof variants]}>{type}</Badge>;
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Ville</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{getTypeBadge(contact.type)}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  {contact.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-3 h-3 mr-1" />
                      {contact.email}
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-3 h-3 mr-1" />
                      {contact.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(contact)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(contact.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
