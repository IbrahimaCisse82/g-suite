
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';

interface ReportsKPICardsProps {
  selectedReport: string;
  onReportSelect: (reportId: string) => void;
}

export const ReportsKPICards = ({ selectedReport, onReportSelect }: ReportsKPICardsProps) => {
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

  return (
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
            onClick={() => onReportSelect(report.id)}
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
  );
};
