
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Users } from 'lucide-react';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { ContactForm } from '@/components/contacts/ContactForm';
import { useContacts, useCreateContact } from '@/hooks/useContacts';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/Layout';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const Contacts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: contacts = [], isLoading } = useContacts();
  const createContact = useCreateContact();
  const { toast } = useToast();

  const handleCreateContact = async (contactData: any) => {
    try {
      await createContact.mutateAsync(contactData);
      toast({
        title: 'Contact ajouté',
        description: 'Le contact a été ajouté avec succès avec un numéro généré automatiquement',
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le contact',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (contact: Contact) => {
    // TODO: Implémenter l'édition
    console.log('Edit contact:', contact);
  };

  const handleDelete = (id: string) => {
    // TODO: Implémenter la suppression
    console.log('Delete contact:', id);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-readable-primary">Clients & Fournisseurs</h1>
              <p className="text-readable-secondary mt-2">Gérez vos contacts commerciaux avec numérotation automatique</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau contact
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Total contacts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">{contacts.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">
                  {contacts.filter(c => c.type === 'client').length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Fournisseurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">
                  {contacts.filter(c => c.type === 'fournisseur').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-readable-primary">Liste des contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length > 0 ? (
                <ContactsTable 
                  contacts={contacts} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-readable-secondary">Aucun contact trouvé</p>
                  <Button 
                    onClick={() => setIsDialogOpen(true)} 
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Ajouter votre premier contact
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle className="text-readable-primary">
                  Nouveau contact
                </DialogTitle>
                <p className="text-sm text-readable-secondary">
                  Le numéro de contact sera généré automatiquement selon le type sélectionné
                </p>
              </DialogHeader>
              <ContactForm 
                onSubmit={handleCreateContact}
                onCancel={() => setIsDialogOpen(false)}
                loading={createContact.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};
