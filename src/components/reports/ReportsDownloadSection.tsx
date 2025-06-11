
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface ReportsDownloadSectionProps {
  onDownloadReport: (reportType: string) => void;
}

export const ReportsDownloadSection = ({ onDownloadReport }: ReportsDownloadSectionProps) => {
  const downloadableReports = [
    {
      id: 'bilan',
      title: 'Bilan comptable',
      description: 'Situation financière',
      iconColor: 'text-blue-600'
    },
    {
      id: 'resultat',
      title: 'Compte de résultat',
      description: 'Recettes et charges',
      iconColor: 'text-green-600'
    },
    {
      id: 'tva',
      title: 'TVA',
      description: 'Déclaration TVA',
      iconColor: 'text-purple-600'
    },
    {
      id: 'grand-livre',
      title: 'Grand livre',
      description: 'Détail des comptes',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rapports disponibles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {downloadableReports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className={`w-5 h-5 ${report.iconColor}`} />
              <div>
                <p className="text-sm font-medium">{report.title}</p>
                <p className="text-xs text-gray-500">{report.description}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => onDownloadReport(report.id)}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
