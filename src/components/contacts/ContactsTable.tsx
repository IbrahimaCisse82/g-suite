
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
import { Edit, Trash2, Phone, Mail, MapPin, Users } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  loading?: boolean;
}

export const ContactsTable = ({ contacts, onEdit, onDelete, loading }: ContactsTableProps) => {
  const getTypeBadge = (type: string | null) => {
    if (type === 'client') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 font-semibold">
          Client
        </Badge>
      );
    } else if (type === 'fournisseur') {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold">
          Fournisseur
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="font-semibold">
        {type || 'Non défini'}
      </Badge>
    );
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun contact trouvé
        </h3>
        <p className="text-gray-500 mb-4">
          Commencez par ajouter votre premier contact client ou fournisseur
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold text-slate-900">N° Contact</TableHead>
            <TableHead className="font-semibold text-slate-900">Nom</TableHead>
            <TableHead className="font-semibold text-slate-900">Type</TableHead>
            <TableHead className="font-semibold text-slate-900">Contact</TableHead>
            <TableHead className="font-semibold text-slate-900">Localisation</TableHead>
            <TableHead className="font-semibold text-slate-900 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} className="hover:bg-slate-50 transition-colors">
              <TableCell className="font-mono text-sm font-bold text-blue-600">
                {contact.contact_number || 'En attente...'}
              </TableCell>
              
              <TableCell>
                <div className="font-semibold text-slate-900">
                  {contact.name}
                </div>
              </TableCell>
              
              <TableCell>
                {getTypeBadge(contact.type)}
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  {contact.email && (
                    <div className="flex items-center text-sm text-slate-700">
                      <Mail className="w-3 h-3 mr-2 text-slate-500" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center text-sm text-slate-700">
                      <Phone className="w-3 h-3 mr-2 text-slate-500" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  {contact.city && (
                    <div className="flex items-center text-sm text-slate-700">
                      <MapPin className="w-3 h-3 mr-2 text-slate-500" />
                      <span>{contact.city}</span>
                    </div>
                  )}
                  {contact.country && contact.country !== contact.city && (
                    <div className="text-xs text-slate-500">
                      {contact.country}
                    </div>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(contact)}
                    disabled={loading}
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDelete(contact)}
                    disabled={loading}
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
