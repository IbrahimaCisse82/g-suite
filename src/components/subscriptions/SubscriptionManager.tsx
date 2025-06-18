
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSubscriptionPlans, usePaidAccountRequests, useCreatePaidAccountRequest, useCurrentSubscription } from '@/hooks/useSubscriptions';
import { useUserLimits } from '@/hooks/useUserLimits';
import { useCompanyProfile } from '@/hooks/useCompanyData';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';
import { UserLimitIndicator } from './UserLimitIndicator';
import { Crown, Check, Clock, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const SubscriptionManager = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [requestMessage, setRequestMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: plans, isLoading: plansLoading } = useSubscriptionPlans();
  const { data: requests, isLoading: requestsLoading } = usePaidAccountRequests();
  const { data: currentSubscription } = useCurrentSubscription();
  const { data: profile } = useCompanyProfile();
  const { data: userLimits } = useUserLimits(profile?.company_id);
  const createRequestMutation = useCreatePaidAccountRequest();

  const handleCreateRequest = async () => {
    if (!selectedPlan) {
      toast.error('Veuillez sélectionner un plan');
      return;
    }

    try {
      await createRequestMutation.mutateAsync({
        planId: selectedPlan,
        message: requestMessage,
      });
      toast.success('Demande envoyée avec succès');
      setIsDialogOpen(false);
      setRequestMessage('');
      setSelectedPlan('');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la demande');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-300"><Check className="w-3 h-3 mr-1" />Approuvée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300"><X className="w-3 h-3 mr-1" />Rejetée</Badge>;
      case 'expired':
        return <Badge variant="outline" className="text-gray-600 border-gray-300"><AlertCircle className="w-3 h-3 mr-1" />Expirée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (plansLoading || requestsLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Abonnement actuel */}
      {currentSubscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span>Abonnement actuel</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{currentSubscription.subscription_plans?.name}</h3>
                <p className="text-muted-foreground">
                  Expire le {new Date(currentSubscription.end_date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Actif
              </Badge>
            </div>
            
            {/* Indicateur de limite d'utilisateurs */}
            {userLimits && (
              <UserLimitIndicator 
                currentUsers={userLimits.currentUsers}
                maxUsers={userLimits.maxUsers}
                planName={userLimits.planName}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Plans disponibles */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Plans d'abonnement</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Demander un upgrade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Demande de compte payant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sélectionner un plan</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Choisir un plan...</option>
                    {plans?.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.price.toLocaleString()} XOF ({plan.max_users} utilisateurs max)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message (optionnel)</label>
                  <Textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    placeholder="Décrivez vos besoins spécifiques..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleCreateRequest}
                    disabled={createRequestMutation.isPending}
                  >
                    {createRequestMutation.isPending ? 'Envoi...' : 'Envoyer la demande'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <SubscriptionPlanCard 
              key={plan.id}
              plan={plan}
              onSelect={setSelectedPlan}
              isSelected={selectedPlan === plan.id}
              currentPlan={currentSubscription?.subscription_plan_id === plan.id}
            />
          ))}
        </div>
      </div>

      {/* Historique des demandes */}
      {requests && requests.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Historique des demandes</h2>
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{request.subscription_plans?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Demandé le {new Date(request.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      {request.request_message && (
                        <p className="text-sm mt-2 italic">"{request.request_message}"</p>
                      )}
                      {request.admin_notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <strong>Note admin:</strong> {request.admin_notes}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {getStatusBadge(request.status || 'pending')}
                      {request.processed_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Traité le {new Date(request.processed_at).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
