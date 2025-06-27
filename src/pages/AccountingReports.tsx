
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart, Download, Calendar, Filter } from 'lucide-react';

const AccountingReports = () => {
  const reports = [
    {
      title: 'Journal Comptable',
      description: 'Export du journal des écritures comptables',
      icon: FileBarChart,
      color: 'bg-blue-500'
    },
    {
      title: 'Grand Livre',
      description: 'Détail des mouvements par compte',
      icon: FileBarChart,
      color: 'bg-green-500'
    },
    {
      title: 'Balance Générale',
      description: 'Balance des comptes avec soldes',
      icon: FileBarChart,
      color: 'bg-purple-500'
    },
    {
      title: 'Bilan Comptable',
      description: 'Bilan actif/passif SYSCOHADA',
      icon: FileBarChart,
      color: 'bg-orange-500'
    },
    {
      title: 'Compte de Résultat',
      description: 'Charges et produits de l\'exercice',
      icon: FileBarChart,
      color: 'bg-red-500'
    },
    {
      title: 'Tableau de Flux',
      description: 'Flux de trésorerie SYSCOHADA',
      icon: FileBarChart,
      color: 'bg-indigo-500'
    }
  ];

  const handleGenerateReport = (reportTitle: string) => {
    console.log(`Génération du rapport: ${reportTitle}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Rapports Comptables</h1>
            <p className="text-gray-600 mt-2">
              Génération et export des rapports comptables conformes SYSCOHADA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${report.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    <Button 
                      onClick={() => handleGenerateReport(report.title)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Générer
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Options de Génération</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Période</label>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Sélectionner période
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Button variant="outline" className="w-full justify-start">
                    <FileBarChart className="w-4 h-4 mr-2" />
                    PDF / Excel
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtres</label>
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="w-4 h-4 mr-2" />
                    Options avancées
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AccountingReports;
