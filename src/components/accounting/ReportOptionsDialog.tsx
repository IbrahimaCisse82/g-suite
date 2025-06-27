
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText } from 'lucide-react';
import { ReportOptions } from '@/hooks/useAccountingReports';

interface ReportOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (options: ReportOptions) => void;
  reportTitle: string;
}

export const ReportOptionsDialog = ({ 
  isOpen, 
  onClose, 
  onGenerate, 
  reportTitle 
}: ReportOptionsDialogProps) => {
  const [options, setOptions] = useState<ReportOptions>({
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    format: 'PDF'
  });

  const handleGenerate = () => {
    onGenerate(options);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Options de génération - {reportTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={options.startDate}
                onChange={(e) => setOptions({ ...options, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={options.endDate}
                onChange={(e) => setOptions({ ...options, endDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="format">Format d'export</Label>
            <Select value={options.format} onValueChange={(value: 'PDF' | 'Excel') => setOptions({ ...options, format: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleGenerate} className="bg-green-600 hover:bg-green-700">
              <FileText className="w-4 h-4 mr-2" />
              Générer le rapport
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
