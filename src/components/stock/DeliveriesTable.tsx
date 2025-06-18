
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
import { Check, Eye } from 'lucide-react';
import { useCompleteDelivery } from '@/hooks/useDeliveries';

interface DeliveriesTableProps {
  deliveries: any[];
}

export const DeliveriesTable = ({ deliveries }: DeliveriesTableProps) => {
  const completeDelivery = useCompleteDelivery();

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      in_progress: 'default',
      delivered: 'default',
      cancelled: 'destructive'
    } as const;
    
    const labels = {
      pending: 'En attente',
      in_progress: 'En cours',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    
    return <Badge variant={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>;
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    if (confirm('Confirmer la validation de cette livraison ? Le stock sera automatiquement débité.')) {
      completeDelivery.mutate(deliveryId);
    }
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="table-text">Date création</TableHead>
            <TableHead className="table-text">Facture</TableHead>
            <TableHead className="table-text">Client</TableHead>
            <TableHead className="table-text">Statut</TableHead>
            <TableHead className="table-text">Date livraison</TableHead>
            <TableHead className="table-text">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="table-text-secondary">
                {new Date(delivery.created_at).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell className="table-text font-medium">{delivery.invoices?.invoice_number}</TableCell>
              <TableCell className="table-text-secondary">{delivery.invoices?.contacts?.name}</TableCell>
              <TableCell>{getStatusBadge(delivery.status)}</TableCell>
              <TableCell className="table-text-secondary">
                {delivery.delivery_date 
                  ? new Date(delivery.delivery_date).toLocaleDateString('fr-FR')
                  : '-'
                }
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {delivery.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCompleteDelivery(delivery.id)}
                      disabled={completeDelivery.isPending}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
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
