
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Building } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

interface ContactsStatsProps {
  contacts: Contact[];
}

export const ContactsStats = ({ contacts }: ContactsStatsProps) => {
  const totalContacts = contacts.length;
  const clientsCount = contacts.filter(c => c.type === 'client').length;
  const fournisseursCount = contacts.filter(c => c.type === 'fournisseur').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-readable-primary">
            Total contacts
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-readable-primary">
            {totalContacts}
          </div>
          <p className="text-xs text-muted-foreground">
            contacts enregistrés
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-readable-primary">
            Clients
          </CardTitle>
          <UserCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {clientsCount}
          </div>
          <p className="text-xs text-muted-foreground">
            clients actifs
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-readable-primary">
            Fournisseurs
          </CardTitle>
          <Building className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {fournisseursCount}
          </div>
          <p className="text-xs text-muted-foreground">
            fournisseurs partenaires
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
