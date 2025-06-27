
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileBarChart, Download } from 'lucide-react';
import { LoadingButton } from '@/components/common/LoadingButton';
import { ReportOptions } from '@/hooks/useAccountingReports';

interface ReportOptionsSectionProps {
  reportOptions: ReportOptions;
  isGenerating: boolean;
  onPeriodSelection: () => void;
  onFormatSelection: () => void;
  onGenerateCustomReport: () => void;
}

export const ReportOptionsSection = ({
  reportOptions,
  isGenerating,
  onPeriodSelection,
  onFormatSelection,
  onGenerateCustomReport
}: ReportOptionsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Options de Génération</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Période</label>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onPeriodSelection}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {reportOptions.startDate && reportOptions.endDate 
                ? `${reportOptions.startDate} - ${reportOptions.endDate}`
                : 'Sélectionner période'
              }
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onFormatSelection}
            >
              <FileBarChart className="w-4 h-4 mr-2" />
              {reportOptions.format}
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Action</label>
            <LoadingButton
              onClick={onGenerateCustomReport}
              loading={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700"
              loadingText="Génération..."
            >
              <Download className="w-4 h-4 mr-2" />
              Générer avec options
            </LoadingButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
