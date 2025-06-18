
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

// Utiliser un type plus flexible pour les contacts
interface Contact {
  id: string;
  name: string;
  type: string;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  contact_number?: string | null;
}

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactsTable = ({ contacts, onEdit, onDelete }: ContactsTableProps) => {
  const getTypeBadge = (type: string) => {
    const variants = {
      client: 'default',
      fournisseur: 'secondary'
    } as const;
    
    const labels = {
      client: 'Client',
      fournisseur: 'Fournisseur'
    } as const;
    
    return (
      <Badge 
        variant={variants[type as keyof typeof variants]} 
        className="badge-readable font-semibold"
      >
        {labels[type as keyof typeof labels] || type}
      </Badge>
    );
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold text-slate-900">N° Contact</TableHead>
            <TableHead className="font-semibold text-slate-900">Nom</TableHead>
            <TableHead className="font-semibold text-slate-900">Type</TableHead>
            <TableHead className="font-semibold text-slate-900">Contact</TableHead>
            <TableHead className="font-semibold text-slate-900">Ville</TableHead>
            <TableHead className="font-semibold text-slate-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} className="hover:bg-slate-50">
              <TableCell className="font-mono text-sm text-slate-600">
                {contact.contact_number || 'N/A'}
              </TableCell>
              <TableCell className="font-semibold text-slate-900">{contact.name}</TableCell>
              <TableCell>{getTypeBadge(contact.type || 'client')}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  {contact.email && (
                    <div className="flex items-center text-sm text-slate-700 font-medium">
                      <Mail className="w-3 h-3 mr-1 text-slate-600" />
                      {contact.email}
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center text-sm text-slate-700 font-medium">
                      <Phone className="w-3 h-3 mr-1 text-slate-600" />
                      {contact.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium text-slate-800">{contact.city}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(contact)}
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDelete(contact.id)}
                    className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800"
                  >
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
