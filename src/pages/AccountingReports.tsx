
import React, { useState, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { useAccountingReports } from '@/hooks/useAccountingReports';
import { ReportOptionsDialog } from '@/components/accounting/ReportOptionsDialog';
import { AccountingReportsHeader } from '@/components/accounting/AccountingReportsHeader';
import { ReportCard } from '@/components/accounting/ReportCard';
import { ReportOptionsSection } from '@/components/accounting/ReportOptionsSection';
import { reportsData } from '@/components/accounting/reportsData';

const AccountingReports = () => {
  const { generateReport, isGenerating, reportOptions, setReportOptions } = useAccountingReports();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);

  const handleGenerateReport = useCallback((reportTitle: string) => {
    setSelectedReport(reportTitle);
    setIsOptionsDialogOpen(true);
  }, []);

  const handleQuickGenerate = useCallback((reportTitle: string) => {
    generateReport(reportTitle);
  }, [generateReport]);

  const handleGenerateWithOptions = useCallback((options: any) => {
    if (selectedReport) {
      generateReport(selectedReport, options);
    }
  }, [selectedReport, generateReport]);

  const handlePeriodSelection = useCallback(() => {
    const startDate = prompt('Date de début (YYYY-MM-DD):', '2024-01-01');
    const endDate = prompt('Date de fin (YYYY-MM-DD):', '2024-12-31');
    
    if (startDate && endDate) {
      setReportOptions({
        ...reportOptions,
        startDate,
        endDate
      });
    }
  }, [reportOptions, setReportOptions]);

  const handleFormatSelection = useCallback(() => {
    const format = prompt('Format (PDF ou Excel):', 'PDF');
    if (format && ['PDF', 'Excel'].includes(format)) {
      setReportOptions({
        ...reportOptions,
        format: format as 'PDF' | 'Excel'
      });
    }
  }, [reportOptions, setReportOptions]);

  const handleGenerateCustomReport = useCallback(() => {
    generateReport('Rapport personnalisé');
  }, [generateReport]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <AccountingReportsHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reportsData.map((report) => (
              <ReportCard
                key={report.title}
                title={report.title}
                description={report.description}
                icon={report.icon}
                color={report.color}
                isGenerating={isGenerating}
                onQuickGenerate={handleQuickGenerate}
                onGenerateWithOptions={handleGenerateReport}
              />
            ))}
          </div>

          <ReportOptionsSection
            reportOptions={reportOptions}
            isGenerating={isGenerating}
            onPeriodSelection={handlePeriodSelection}
            onFormatSelection={handleFormatSelection}
            onGenerateCustomReport={handleGenerateCustomReport}
          />
        </div>
      </div>

      <ReportOptionsDialog
        isOpen={isOptionsDialogOpen}
        onClose={() => setIsOptionsDialogOpen(false)}
        onGenerate={handleGenerateWithOptions}
        reportTitle={selectedReport || ''}
      />
    </Layout>
  );
};

export default AccountingReports;
