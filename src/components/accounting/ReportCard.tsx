
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter, LucideIcon } from 'lucide-react';
import { LoadingButton } from '@/components/common/LoadingButton';

interface ReportCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  isGenerating: boolean;
  onQuickGenerate: (title: string) => void;
  onGenerateWithOptions: (title: string) => void;
}

export const ReportCard = ({
  title,
  description,
  icon: Icon,
  color,
  isGenerating,
  onQuickGenerate,
  onGenerateWithOptions
}: ReportCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          <LoadingButton 
            onClick={() => onQuickGenerate(title)}
            loading={isGenerating}
            className="w-full bg-green-600 hover:bg-green-700"
            loadingText="Génération..."
          >
            <Download className="w-4 h-4 mr-2" />
            Génération rapide
          </LoadingButton>
          <Button 
            onClick={() => onGenerateWithOptions(title)}
            variant="outline"
            className="w-full"
            disabled={isGenerating}
          >
            <Filter className="w-4 h-4 mr-2" />
            Avec options
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
