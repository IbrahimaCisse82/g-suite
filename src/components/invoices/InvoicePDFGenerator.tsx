
import { useCompanyProfile } from '@/hooks/useCompanyData';

export const useInvoicePDFGenerator = () => {
  const { data: profile } = useCompanyProfile();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  const generateInvoicePDF = (invoice: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const company = profile?.companies;
    const reportDate = new Date().toLocaleDateString('fr-FR');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Facture ${invoice.invoice_number} - ${company?.name || 'Entreprise'}</title>
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
            .invoice-details {
              margin-bottom: 30px;
            }
            .invoice-info {
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
            .amount-total {
              text-align: right;
              font-weight: bold;
              background-color: #f3f4f6;
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
              <p class="document-title">Facture ${invoice.invoice_number}</p>
              <p class="document-date">Émise le ${reportDate}</p>
            </div>
          </div>

          <div class="invoice-info">
            <div class="info-section">
              <h3>Informations de facturation</h3>
              <div class="info-item"><strong>Numéro :</strong> ${invoice.invoice_number}</div>
              <div class="info-item"><strong>Date de facture :</strong> ${new Date(invoice.invoice_date).toLocaleDateString('fr-FR')}</div>
              <div class="info-item"><strong>Date d'échéance :</strong> ${new Date(invoice.due_date).toLocaleDateString('fr-FR')}</div>
              <div class="info-item"><strong>Statut :</strong> ${invoice.status}</div>
            </div>
            <div class="info-section">
              <h3>Client</h3>
              <div class="info-item"><strong>Nom :</strong> ${invoice.contacts?.name || '-'}</div>
              <div class="info-item"><strong>Email :</strong> ${invoice.contacts?.email || '-'}</div>
              <div class="info-item"><strong>Adresse :</strong> ${invoice.contacts?.address || '-'}</div>
              <div class="info-item"><strong>Ville :</strong> ${invoice.contacts?.city || '-'}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Services/Produits</td>
                <td>1</td>
                <td>${formatAmount(invoice.subtotal)}</td>
                <td>${formatAmount(invoice.subtotal)}</td>
              </tr>
              <tr>
                <td colspan="3" class="amount-total">Sous-total</td>
                <td class="amount-total">${formatAmount(invoice.subtotal)}</td>
              </tr>
              <tr>
                <td colspan="3" class="amount-total">TVA</td>
                <td class="amount-total">${formatAmount(invoice.tax_amount)}</td>
              </tr>
              <tr>
                <td colspan="3" class="amount-total">Total</td>
                <td class="amount-total">${formatAmount(invoice.total_amount)}</td>
              </tr>
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

  return { generateInvoicePDF };
};
