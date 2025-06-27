
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, Eye, Edit, Trash2 } from 'lucide-react';

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
      draft: { label: 'Brouillon', variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800' },
      sent: { label: 'Envoyé', variant: 'default' as const, className: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'Accepté', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Refusé', variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      expired: { label: 'Expiré', variant: 'outline' as const, className: 'bg-orange-100 text-orange-800' },
      converted: { label: 'Converti', variant: 'default' as const, className: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (quotes.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-readable-primary mb-2">Aucun devis</h3>
        <p className="text-readable-secondary mb-4">Commencez par créer votre premier devis</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-6 font-semibold text-readable-primary">Numéro</th>
            <th className="text-left py-4 px-6 font-semibold text-readable-primary">Client</th>
            <th className="text-left py-4 px-6 font-semibold text-readable-primary">Date</th>
            <th className="text-left py-4 px-6 font-semibold text-readable-primary">Validité</th>
            <th className="text-right py-4 px-6 font-semibold text-readable-primary">Montant</th>
            <th className="text-left py-4 px-6 font-semibold text-readable-primary">Statut</th>
            <th className="text-right py-4 px-6 font-semibold text-readable-primary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
              <td className="py-4 px-6 font-medium text-readable-primary">{quote.quote_number}</td>
              <td className="py-4 px-6 text-readable-secondary">{(quote as any).contacts?.name || 'N/A'}</td>
              <td className="py-4 px-6 text-readable-secondary">
                {format(new Date(quote.quote_date), 'dd/MM/yyyy', { locale: fr })}
              </td>
              <td className="py-4 px-6 text-readable-secondary">
                {format(new Date(quote.validity_date), 'dd/MM/yyyy', { locale: fr })}
              </td>
              <td className="text-right py-4 px-6 font-semibold text-readable-primary">
                {quote.total_amount.toLocaleString('fr-FR')} XOF
              </td>
              <td className="py-4 px-6">{getStatusBadge(quote.status)}</td>
              <td className="text-right py-4 px-6">
                <div className="flex justify-end space-x-2">
                  {quote.status === 'accepted' && (
                    <Button
                      size="sm"
                      onClick={() => onConvertToInvoice(quote.id)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Convertir
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(quote)}
                    className="border-gray-300 text-readable-primary hover:bg-gray-50 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Eye className="h-3 w-3" />
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(quote)}
                    className="border-gray-300 text-readable-primary hover:bg-gray-50 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Edit className="h-3 w-3" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(quote)}
                    className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Trash2 className="h-3 w-3" />
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
