
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Clock, AlertCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<string>('');
  const [isProcessingDialogOpen, setIsProcessingDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Récupérer toutes les demandes en attente
  const { data: pendingRequests, isLoading } = useQuery({
    queryKey: ['admin-pending-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('paid_account_requests')
        .select(`
          *,
          subscription_plans (
            name,
            plan_type,
            price,
            duration_months
          ),
          profiles (
            first_name,
            last_name
          ),
          companies (
            name,
            email
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const processRequestMutation = useMutation({
    mutationFn: async ({ requestId, action, adminEmail, adminNotes }: {
      requestId: string;
      action: 'approved' | 'rejected';
      adminEmail: string;
      adminNotes?: string;
    }) => {
      const response = await fetch('/functions/v1/process-subscription-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          requestId,
          action,
          adminEmail,
          adminNotes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors du traitement');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-requests'] });
      toast.success('Demande traitée avec succès');
      setIsProcessingDialogOpen(false);
      setAdminNotes('');
      setSelectedRequest('');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors du traitement');
    },
  });

  const handleProcessRequest = (action: 'approved' | 'rejected') => {
    if (!adminEmail.trim()) {
      toast.error('Veuillez saisir votre email administrateur');
      return;
    }

    processRequestMutation.mutate({
      requestId: selectedRequest,
      action,
      adminEmail: adminEmail.trim(),
      adminNotes: adminNotes.trim() || undefined,
    });
  };

  if (isLoading) {
    return <div>Chargement des demandes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-blue-500" />
        <h1 className="text-3xl font-bold">Administration - Demandes d'abonnement</h1>
      </div>

      {!pendingRequests || pendingRequests.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Aucune demande en attente</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {request.companies?.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Demandé par: {request.profiles?.first_name} {request.profiles?.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: {request.companies?.email}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                    <Clock className="w-3 h-3 mr-1" />
                    En attente
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Plan demandé:</strong> {request.subscription_plans?.name}
                    </div>
                    <div>
                      <strong>Prix:</strong> {request.subscription_plans?.price.toLocaleString()} XOF
                    </div>
                    <div>
                      <strong>Durée:</strong> {request.subscription_plans?.duration_months} mois
                    </div>
                    <div>
                      <strong>Date de demande:</strong> {new Date(request.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  
                  {request.request_message && (
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>Message du client:</strong>
                      <p className="mt-1 italic">"{request.request_message}"</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Dialog open={isProcessingDialogOpen} onOpenChange={setIsProcessingDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setSelectedRequest(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approuver
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Traitement de la demande</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Email administrateur <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="email"
                              value={adminEmail}
                              onChange={(e) => setAdminEmail(e.target.value)}
                              placeholder="votre.email@growhubsenegal.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Notes administrateur (optionnel)
                            </label>
                            <Textarea
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              placeholder="Commentaires sur la validation..."
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsProcessingDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button 
                              onClick={() => handleProcessRequest('rejected')}
                              variant="destructive"
                              disabled={processRequestMutation.isPending}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Rejeter
                            </Button>
                            <Button 
                              onClick={() => handleProcessRequest('approved')}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={processRequestMutation.isPending}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Approuver
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
