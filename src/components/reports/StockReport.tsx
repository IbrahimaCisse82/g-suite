
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Package } from 'lucide-react';
import { useCompanyProfile } from '@/hooks/useCompanyData';
import { useStock } from '@/hooks/useStock';
import { StockSummaryCards } from './StockSummaryCards';
import { useStockReportPDFGenerator } from './StockReportPDFGenerator';

export const StockReport = () => {
  const { data: profile } = useCompanyProfile();
  const { data: stockData = [] } = useStock();
  const { generatePrintableReport, formatPrice, calculateTotalStockValue } = useStockReportPDFGenerator();

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Rapport de Stock</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Chargement des données...</p>
        </CardContent>
      </Card>
    );
  }

  // Transform the stock data to match expected format
  const stock = stockData || [];
  const totalValue = calculateTotalStockValue(stock);
  const lowStockCount = stock.filter(item => 
    item.quantity_in_stock <= item.minimum_stock_level
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Rapport de Stock</span>
          </div>
          <Button onClick={() => generatePrintableReport(stock)} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Télécharger le rapport</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <StockSummaryCards 
          totalProducts={stock.length}
          totalValue={formatPrice(totalValue)}
          lowStockAlerts={lowStockCount}
        />
        
        <p className="text-gray-600">
          Cliquez sur "Télécharger le rapport" pour générer un rapport PDF complet avec le logo de l'entreprise et toutes les informations légales.
        </p>
      </CardContent>
    </Card>
  );
};
