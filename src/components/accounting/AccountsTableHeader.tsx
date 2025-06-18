
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download, Eye, EyeOff } from 'lucide-react';

interface AccountsTableHeaderProps {
  onAddAccount: () => void;
  onImport: () => void;
  onExport: () => void;
  showHidden: boolean;
  onToggleHidden: () => void;
}

export const AccountsTableHeader = ({
  onAddAccount,
  onImport,
  onExport,
  showHidden,
  onToggleHidden
}: AccountsTableHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Button onClick={onAddAccount} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau compte
        </Button>
        <Button variant="outline" onClick={onImport}>
          <Upload className="w-4 h-4 mr-2" />
          Importer
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>
      <Button 
        variant="outline" 
        onClick={onToggleHidden}
        className={showHidden ? 'bg-blue-50 text-blue-700' : ''}
      >
        {showHidden ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
        {showHidden ? 'Masquer les comptes cachés' : 'Afficher les comptes cachés'}
      </Button>
    </div>
  );
};
