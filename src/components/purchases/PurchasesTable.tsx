
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
import { Edit, Eye, Download, Trash2 } from 'lucide-react';
import { useCompanyProfile } from '@/hooks/useCompanyData';

interface PurchasesTableProps {
  purchases: any[];
  onView: (purchase: any) => void;
  onEdit: (purchase: any) => void;
  onDelete: (id: string) => void;
}

export const PurchasesTable = ({ purchases, onView, onEdit, onDelete }: PurchasesTableProps) => {
  const { data: profile } = useCompanyProfile();

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      received: 'default',
      cancelled: 'destructive'
    } as const;
    
    const labels = {
      pending: 'En attente',
      received: 'Reçu',
      cancelled: 'Annulé'
    };
    
    return <Badge variant={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  const generatePurchasePDF = (purchase: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const company = profile?.companies;
    const reportDate = new Date().toLocaleDateString('fr-FR');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Bon d'achat ${purchase.purchase_number} - ${company?.name || 'Entreprise'}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            .header {
              display: flex;
              align-items: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #e5e5e5;
              padding-bottom: 20px;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: #3b82f6;
              border-radius: 8px;
              margin-right: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: bold;
            }
            .company-info {
              flex-grow: 1;
            }
            .company-name {
              font-size: 24px;
              font-weight: bold;
              margin: 0;
              color: #1f2937;
            }
            .document-title {
              font-size: 18px;
              color: #6b7280;
              margin: 5px 0 0 0;
            }
            .document-date {
              color: #9ca3af;
              font-size: 14px;
            }
            .purchase-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-bottom: 30px;
            }
            .info-section h3 {
              margin: 0 0 10px 0;
              color: #374151;
              font-size: 16px;
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 5px;
            }
            .info-item {
              margin: 5px 0;
              font-size: 14px;
            }
            .footer {
              position: fixed;
              bottom: 20px;
              left: 20px;
              right: 20px;
              border-top: 2px solid #e5e5e5;
              padding-top: 15px;
              font-size: 12px;
              color: #6b7280;
              background: white;
            }
            .footer-content {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .footer-section h4 {
              margin: 0 0 10px 0;
              color: #374151;
              font-size: 14px;
            }
            .footer-item {
              margin: 3px 0;
            }
            @page {
              margin-bottom: 100px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">
              ${company?.logo_url ? `<img src="${company.logo_url}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">` : company?.name?.charAt(0) || 'E'}
            </div>
            <div class="company-info">
              <h1 class="company-name">${company?.name || 'Nom de l\'entreprise'}</h1>
              <p class="document-title">Bon d'achat ${purchase.purchase_number}</p>
              <p class="document-date">Généré le ${reportDate}</p>
            </div>
          </div>

          <div class="purchase-info">
            <div class="info-section">
              <h3>Informations d'achat</h3>
              <div class="info-item"><strong>Numéro :</strong> ${purchase.purchase_number}</div>
              <div class="info-item"><strong>Date d'achat :</strong> ${new Date(purchase.purchase_date).toLocaleDateString('fr-FR')}</div>
              <div class="info-item"><strong>Statut :</strong> ${purchase.status}</div>
              <div class="info-item"><strong>Montant total :</strong> ${formatAmount(purchase.total_amount)}</div>
            </div>
            <div class="info-section">
              <h3>Fournisseur</h3>
              <div class="info-item"><strong>Nom :</strong> ${purchase.supplier || '-'}</div>
              <div class="info-item"><strong>Notes :</strong> ${purchase.notes || '-'}</div>
            </div>
          </div>

          <div class="footer">
            <div class="footer-content">
              <div class="footer-section">
                <h4>Informations de l'entreprise</h4>
                <div class="footer-item"><strong>Nom :</strong> ${company?.name || '-'}</div>
                <div class="footer-item"><strong>Adresse :</strong> ${company?.address || '-'}</div>
                <div class="footer-item"><strong>Ville :</strong> ${company?.city || '-'}</div>
                <div class="footer-item"><strong>Pays :</strong> ${company?.country || '-'}</div>
              </div>
              <div class="footer-section">
                <h4>Contact</h4>
                <div class="footer-item"><strong>Téléphone :</strong> ${company?.phone || '-'}</div>
                <div class="footer-item"><strong>Email :</strong> ${company?.email || '-'}</div>
                <div class="footer-item"><strong>Site web :</strong> ${company?.website || '-'}</div>
                <div class="footer-item"><strong>NINEA :</strong> ${company?.ninea || '-'}</div>
                <div class="footer-item"><strong>RCCM :</strong> ${company?.rccm || '-'}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">{purchase.purchase_number}</TableCell>
              <TableCell>{purchase.supplier}</TableCell>
              <TableCell>{new Date(purchase.purchase_date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{formatAmount(purchase.total_amount)}</TableCell>
              <TableCell>{getStatusBadge(purchase.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onView(purchase)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEdit(purchase)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generatePurchasePDF(purchase)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(purchase.id)}>
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
