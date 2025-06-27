
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface ImportAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportAccountDialog = ({ isOpen, onClose }: ImportAccountDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        toast.error('Veuillez sélectionner un fichier CSV');
        e.target.value = '';
      }
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    setIsUploading(true);
    
    // Simulation de l'import
    setTimeout(() => {
      toast.success('Plan comptable importé avec succès');
      setIsUploading(false);
      setFile(null);
      onClose();
    }, 2000);
  };

  const downloadTemplate = () => {
    // Création d'un template CSV
    const csvContent = "numero_compte,intitule,type,report_nouveau\n401,Fournisseurs,Fournisseur,true\n411,Clients,Client,true";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_plan_comptable.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Importer un plan comptable</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Importez votre plan comptable au format CSV. Le fichier doit contenir les colonnes suivantes :
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>numero_compte</li>
              <li>intitule</li>
              <li>type</li>
              <li>report_nouveau (true/false)</li>
            </ul>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-500">Cliquez pour sélectionner un fichier</span>
              <span className="text-gray-500"> ou glissez-déposez</span>
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            {file && (
              <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-green-600">
                <FileText className="w-4 h-4" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger le modèle CSV
          </Button>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!file || isUploading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isUploading ? 'Import...' : 'Importer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
