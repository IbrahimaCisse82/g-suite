
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download } from 'lucide-react';

interface ReportsPeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const ReportsPeriodSelector = ({ selectedPeriod, onPeriodChange }: ReportsPeriodSelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-500" />
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
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
  );
};
