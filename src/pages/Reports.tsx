
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { FinancialChart } from '@/components/FinancialChart';
import { StockReport } from '@/components/reports/StockReport';

export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const reports = [
    {
      id: 'revenue',
      title: 'Chiffre d\'affaires',
      icon: TrendingUp,
      description: 'Évolution du chiffre d\'affaires',
      value: '485 720 XOF',
      change: '+12.5%'
    },
    {
      id: 'expenses',
      title: 'Charges',
      icon: PieChart,
      description: 'Répartition des charges',
      value: '287 450 XOF',
      change: '+8.2%'
    },
    {
      id: 'profit',
      title: 'Bénéfice',
      icon: BarChart3,
      description: 'Évolution du bénéfice',
      value: '198 270 XOF',
      change: '+15.3%'
    }
  ];

  const handleDownloadReport = (reportType: string) => {
    console.log(`Téléchargement du rapport: ${reportType}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
        <p className="text-gray-600 mt-2">Analysez vos performances financières</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="custom">Période personnalisée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exporter en PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card 
              key={report.id} 
              className={`cursor-pointer transition-all duration-200 ${
                selectedReport === report.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.value}</div>
                <p className="text-xs text-muted-foreground">{report.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">{report.change}</span>
                  <span className="text-xs text-gray-500 ml-1">vs mois précédent</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rapport de Stock - Nouveau */}
      <div className="mb-8">
        <StockReport />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Graphique financier</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialChart />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapports disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Bilan comptable</p>
                    <p className="text-xs text-gray-500">Situation financière</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('bilan')}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Compte de résultat</p>
                    <p className="text-xs text-gray-500">Recettes et charges</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('resultat')}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">TVA</p>
                    <p className="text-xs text-gray-500">Déclaration TVA</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('tva')}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Grand livre</p>
                    <p className="text-xs text-gray-500">Détail des comptes</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('grand-livre')}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alertes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Factures en retard</p>
                <p className="text-xs text-yellow-600">5 factures en attente de paiement</p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Déclaration TVA</p>
                <p className="text-xs text-blue-600">À déposer avant le 20/06</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
