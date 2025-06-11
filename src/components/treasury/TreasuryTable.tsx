
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
import { Edit, Download, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useCompanyProfile } from '@/hooks/useCompanyData';

interface TreasuryTableProps {
  transactions: any[];
  onEdit: (transaction: any) => void;
  onDelete: (id: string) => void;
}

export const TreasuryTable = ({ transactions, onEdit, onDelete }: TreasuryTableProps) => {
  const { data: profile } = useCompanyProfile();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  const generateTreasuryReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const company = profile?.companies;
    const reportDate = new Date().toLocaleDateString('fr-FR');
    const totalIncome = transactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Rapport de Trésorerie - ${company?.name || 'Entreprise'}</title>
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
            .report-title {
              font-size: 18px;
              color: #6b7280;
              margin: 5px 0 0 0;
            }
            .report-date {
              color: #9ca3af;
              font-size: 14px;
            }
            .summary {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .summary-card {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
            }
            .summary-value {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
            }
            .summary-value.positive { color: #059669; }
            .summary-value.negative { color: #dc2626; }
            .summary-label {
              color: #6b7280;
              font-size: 14px;
              margin-top: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 40px;
            }
            th, td {
              border: 1px solid #e5e5e5;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f9fafb;
              font-weight: bold;
              color: #374151;
            }
            .income { color: #059669; }
            .expense { color: #dc2626; }
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
              <p class="report-title">Rapport de Trésorerie</p>
              <p class="report-date">Généré le ${reportDate}</p>
            </div>
          </div>

          <div class="summary">
            <div class="summary-card">
              <div class="summary-value positive">${formatAmount(totalIncome)}</div>
              <div class="summary-label">Total Recettes</div>
            </div>
            <div class="summary-card">
              <div class="summary-value negative">${formatAmount(totalExpense)}</div>
              <div class="summary-label">Total Dépenses</div>
            </div>
            <div class="summary-card">
              <div class="summary-value ${balance >= 0 ? 'positive' : 'negative'}">${formatAmount(balance)}</div>
              <div class="summary-label">Solde</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(transaction => `
                <tr>
                  <td>${new Date(transaction.transaction_date).toLocaleDateString('fr-FR')}</td>
                  <td class="${transaction.transaction_type}">${transaction.transaction_type === 'income' ? 'Recette' : 'Dépense'}</td>
                  <td>${transaction.description}</td>
                  <td>${transaction.category || '-'}</td>
                  <td class="${transaction.transaction_type}">${formatAmount(transaction.amount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

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
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={generateTreasuryReport} className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Rapport complet</span>
        </Button>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.transaction_date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {transaction.transaction_type === 'income' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <Badge variant={transaction.transaction_type === 'income' ? 'default' : 'destructive'}>
                      {transaction.transaction_type === 'income' ? 'Recette' : 'Dépense'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className={transaction.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  {formatAmount(transaction.amount)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(transaction)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDelete(transaction.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
