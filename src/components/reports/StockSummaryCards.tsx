
import React from 'react';

interface StockSummaryCardsProps {
  totalProducts: number;
  totalValue: string;
  lowStockAlerts: number;
}

export const StockSummaryCards = ({ totalProducts, totalValue, lowStockAlerts }: StockSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
        <div className="text-sm text-gray-600">Produits en stock</div>
      </div>
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{totalValue}</div>
        <div className="text-sm text-gray-600">Valeur totale du stock</div>
      </div>
      <div className="text-center p-4 bg-orange-50 rounded-lg">
        <div className="text-2xl font-bold text-orange-600">{lowStockAlerts}</div>
        <div className="text-sm text-gray-600">Alertes stock</div>
      </div>
    </div>
  );
};
