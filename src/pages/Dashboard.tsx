
import React from 'react';
import { KPICard } from '../components/KPICard';
import { RecentTransactions } from '../components/RecentTransactions';
import { FinancialChart } from '../components/FinancialChart';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users,
  FileText,
  AlertCircle 
} from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre activité financière</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Chiffre d'affaires"
          value="127 450€"
          change="+12.5%"
          changeType="positive"
          icon={TrendingUp}
          color="blue"
        />
        <KPICard
          title="Bénéfice net"
          value="38 240€"
          change="+8.2%"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="Charges totales"
          value="89 210€"
          change="+4.1%"
          changeType="negative"
          icon={TrendingDown}
          color="red"
        />
        <KPICard
          title="Clients actifs"
          value="156"
          change="+5"
          changeType="positive"
          icon={Users}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Chart - 2/3 width */}
        <div className="lg:col-span-2">
          <FinancialChart />
        </div>

        {/* Quick Actions - 1/3 width */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Nouvelle facture</span>
              </button>
              <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Ajouter client</span>
              </button>
              <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Saisir écriture</span>
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">5 factures en retard</p>
                  <p className="text-xs text-yellow-600">Total: 12 450€</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Déclaration TVA</p>
                  <p className="text-xs text-blue-600">À faire avant le 20/06</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <RecentTransactions />
      </div>
    </div>
  );
};
