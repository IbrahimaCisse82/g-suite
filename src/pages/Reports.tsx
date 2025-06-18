
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialChart } from '@/components/FinancialChart';
import { StockReport } from '@/components/reports/StockReport';
import { ReportsHeader } from '@/components/reports/ReportsHeader';
import { ReportsPeriodSelector } from '@/components/reports/ReportsPeriodSelector';
import { ReportsKPICards } from '@/components/reports/ReportsKPICards';
import { ReportsDownloadSection } from '@/components/reports/ReportsDownloadSection';
import { ReportsAlertsSection } from '@/components/reports/ReportsAlertsSection';
import { Layout } from '@/components/Layout';

export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const handleDownloadReport = (reportType: string) => {
    console.log(`Téléchargement du rapport: ${reportType}`);
  };

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <ReportsHeader />
          
          <ReportsPeriodSelector 
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />

          <ReportsKPICards 
            selectedReport={selectedReport}
            onReportSelect={setSelectedReport}
          />

          <div className="mb-8">
            <StockReport />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-readable-primary">Graphique financier</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinancialChart />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ReportsDownloadSection onDownloadReport={handleDownloadReport} />
              <ReportsAlertsSection />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
