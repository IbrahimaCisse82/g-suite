import React, { useState, Suspense, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { PageLoader } from '@/components/common/PageLoader';
import { usePerformance } from '@/hooks/usePerformance';

// Lazy load des composants lourds
const FinancialChart = React.lazy(() => 
  import('@/components/FinancialChart').then(module => ({ default: module.FinancialChart }))
);
const StockReport = React.lazy(() => 
  import('@/components/reports/StockReport').then(module => ({ default: module.StockReport }))
);
const ReportsHeader = React.lazy(() => 
  import('@/components/reports/ReportsHeader').then(module => ({ default: module.ReportsHeader }))
);
const ReportsPeriodSelector = React.lazy(() => 
  import('@/components/reports/ReportsPeriodSelector').then(module => ({ default: module.ReportsPeriodSelector }))
);
const ReportsKPICards = React.lazy(() => 
  import('@/components/reports/ReportsKPICards').then(module => ({ default: module.ReportsKPICards }))
);
const ReportsDownloadSection = React.lazy(() => 
  import('@/components/reports/ReportsDownloadSection').then(module => ({ default: module.ReportsDownloadSection }))
);
const ReportsAlertsSection = React.lazy(() => 
  import('@/components/reports/ReportsAlertsSection').then(module => ({ default: module.ReportsAlertsSection }))
);

export const Reports = React.memo(() => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');
  const { measureOperation } = usePerformance('Reports');

  const handleDownloadReport = useMemo(() => (reportType: string) => {
    const endMeasure = measureOperation('Download Report');
    console.log(`Téléchargement du rapport: ${reportType}`);
    endMeasure();
  }, [measureOperation]);

  const memoizedPeriodChange = useMemo(() => (period: string) => {
    setSelectedPeriod(period);
  }, []);

  const memoizedReportSelect = useMemo(() => (report: string) => {
    setSelectedReport(report);
  }, []);

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <Suspense fallback={<PageLoader type="skeleton" rows={1} />}>
            <ReportsHeader />
          </Suspense>
          
          <Suspense fallback={<PageLoader type="skeleton" rows={1} />}>
            <ReportsPeriodSelector 
              selectedPeriod={selectedPeriod}
              onPeriodChange={memoizedPeriodChange}
            />
          </Suspense>

          <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
            <ReportsKPICards 
              selectedReport={selectedReport}
              onReportSelect={memoizedReportSelect}
            />
          </Suspense>

          <div className="mb-8">
            <Suspense fallback={<PageLoader type="skeleton" rows={3} />}>
              <StockReport />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-readable-primary">Graphique financier</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<PageLoader type="skeleton" rows={4} />}>
                    <FinancialChart />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
                <ReportsDownloadSection onDownloadReport={handleDownloadReport} />
              </Suspense>
              <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
                <ReportsAlertsSection />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

Reports.displayName = 'Reports';
