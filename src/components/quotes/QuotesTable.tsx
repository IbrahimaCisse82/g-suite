
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';

interface QuotesTableProps {
  quotes: any[];
  onView: (quote: any) => void;
  onEdit: (quote: any) => void;
  onDelete: (quote: any) => void;
  onConvertToInvoice: (quoteId: string) => void;
}

export const QuotesTable = ({ 
  quotes, 
  onView, 
  onEdit, 
  onDelete, 
  onConvertToInvoice 
}: QuotesTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Brouillon', variant: 'secondary' as const },
      sent: { label: 'Envoyé', variant: 'default' as const },
      accepted: { label: 'Accepté', variant: 'default' as const },
      rejected: { label: 'Refusé', variant: 'destructive' as const },
      expired: { label: 'Expiré', variant: 'outline' as const },
      converted: { label: 'Converti', variant: 'default' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Aucun devis créé pour le moment</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Numéro</th>
            <th className="text-left py-3">Client</th>
            <th className="text-left py-3">Date</th>
            <th className="text-left py-3">Validité</th>
            <th className="text-right py-3">Montant</th>
            <th className="text-left py-3">Statut</th>
            <th className="text-right py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium">{quote.quote_number}</td>
              <td className="py-3">{(quote as any).contacts?.name || 'N/A'}</td>
              <td className="py-3">
                {format(new Date(quote.quote_date), 'dd/MM/yyyy', { locale: fr })}
              </td>
              <td className="py-3">
                {format(new Date(quote.validity_date), 'dd/MM/yyyy', { locale: fr })}
              </td>
              <td className="text-right py-3">
                {quote.total_amount.toLocaleString('fr-FR')} XOF
              </td>
              <td className="py-3">{getStatusBadge(quote.status)}</td>
              <td className="text-right py-3">
                <div className="flex justify-end space-x-2">
                  {quote.status === 'accepted' && (
                    <Button
                      size="sm"
                      onClick={() => onConvertToInvoice(quote.id)}
                      className="flex items-center gap-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Convertir
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(quote)}
                  >
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(quote)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(quote)}
                  >
                    Supprimer
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
