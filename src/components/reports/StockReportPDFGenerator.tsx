
import { useCompanyProfile } from '@/hooks/useCompanyData';

interface StockItem {
  id: string;
  quantity_in_stock: number;
  minimum_stock_level: number;
  last_stock_update: string;
  products: {
    name: string;
    sku: string;
    price: number;
    product_categories?: {
      name: string;
    };
  };
}

export const useStockReportPDFGenerator = () => {
  const { data: profile } = useCompanyProfile();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const calculateTotalStockValue = (stock: StockItem[]) => {
    return stock.reduce((total, item) => {
      return total + (item.quantity_in_stock * (item.products?.price || 0));
    }, 0);
  };

  const generatePrintableReport = (stock: StockItem[]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get the first company from the companies array
    const company = Array.isArray(profile?.companies) ? profile.companies[0] : profile?.companies;
    const reportDate = new Date().toLocaleDateString('fr-FR');
    const totalValue = calculateTotalStockValue(stock);
    const lowStockItems = stock.filter(item => item.quantity_in_stock <= item.minimum_stock_level);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Rapport de Stock - ${company?.name || 'Entreprise'}</title>
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
            .low-stock {
              background-color: #fef2f2;
              color: #dc2626;
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
              <p class="report-title">Rapport de Stock</p>
              <p class="report-date">Généré le ${reportDate}</p>
            </div>
          </div>

          <div class="summary">
            <div class="summary-card">
              <div class="summary-value">${stock.length}</div>
              <div class="summary-label">Total Produits</div>
            </div>
            <div class="summary-card">
              <div class="summary-value">${formatPrice(totalValue)}</div>
              <div class="summary-label">Valeur Totale</div>
            </div>
            <div class="summary-card">
              <div class="summary-value">${lowStockItems.length}</div>
              <div class="summary-label">Alertes Stock</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>SKU</th>
                <th>Catégorie</th>
                <th>Stock Actuel</th>
                <th>Stock Minimum</th>
                <th>Prix Unitaire</th>
                <th>Valeur Stock</th>
              </tr>
            </thead>
            <tbody>
              ${stock.map(item => `
                <tr ${item.quantity_in_stock <= item.minimum_stock_level ? 'class="low-stock"' : ''}>
                  <td>${item.products?.name || '-'}</td>
                  <td>${item.products?.sku || '-'}</td>
                  <td>${item.products?.product_categories?.name || '-'}</td>
                  <td>${item.quantity_in_stock}</td>
                  <td>${item.minimum_stock_level}</td>
                  <td>${formatPrice(item.products?.price || 0)}</td>
                  <td>${formatPrice(item.quantity_in_stock * (item.products?.price || 0))}</td>
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

  return {
    generatePrintableReport,
    formatPrice,
    calculateTotalStockValue
  };
};
