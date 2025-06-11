
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface PurchaseReceiptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  purchase: any;
  onConfirm: (receiptData: any) => void;
}

export const PurchaseReceiptDialog = ({ isOpen, onOpenChange, purchase, onConfirm }: PurchaseReceiptDialogProps) => {
  const [lines, setLines] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (purchase?.lines) {
      setLines(purchase.lines.map((line: any) => ({
        ...line,
        selected: false,
        quantity_to_receive: 0,
        remaining_quantity: line.quantity - (line.quantity_received || 0)
      })));
    }
  }, [purchase]);

  const handleLineSelect = (lineId: string, selected: boolean) => {
    setLines(prev => prev.map(line => 
      line.id === lineId 
        ? { ...line, selected, quantity_to_receive: selected ? line.remaining_quantity : 0 }
        : line
    ));
  };

  const handleQuantityChange = (lineId: string, quantity: number) => {
    setLines(prev => prev.map(line => 
      line.id === lineId 
        ? { ...line, quantity_to_receive: Math.min(quantity, line.remaining_quantity) }
        : line
    ));
  };

  const handleConfirm = () => {
    const selectedLines = lines.filter(line => line.selected && line.quantity_to_receive > 0);
    
    if (selectedLines.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un article à recevoir.",
        variant: "destructive",
      });
      return;
    }

    onConfirm({
      purchase_id: purchase.id,
      lines: selectedLines.map(line => ({
        id: line.id,
        quantity_received: line.quantity_to_receive
      }))
    });
    
    onOpenChange(false);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Réception partielle - {purchase?.purchase_number}</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Articles à recevoir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lines.map((line) => (
                <div key={line.id} className="grid grid-cols-6 gap-4 p-4 border rounded-lg items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={line.selected}
                      onCheckedChange={(checked) => handleLineSelect(line.id, checked as boolean)}
                      disabled={line.remaining_quantity <= 0}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">{line.description}</Label>
                    <p className="text-sm text-gray-500">
                      Prix unitaire: {formatAmount(line.unit_price)}
                    </p>
                  </div>

                  <div className="text-center">
                    <Label className="text-sm">Commandé</Label>
                    <p className="font-semibold">{line.quantity}</p>
                  </div>

                  <div className="text-center">
                    <Label className="text-sm">Déjà reçu</Label>
                    <p className="font-semibold">{line.quantity_received || 0}</p>
                  </div>

                  <div>
                    <Label htmlFor={`qty-${line.id}`} className="text-sm">À recevoir</Label>
                    <Input
                      id={`qty-${line.id}`}
                      type="number"
                      min="0"
                      max={line.remaining_quantity}
                      value={line.quantity_to_receive}
                      onChange={(e) => handleQuantityChange(line.id, parseFloat(e.target.value) || 0)}
                      disabled={!line.selected || line.remaining_quantity <= 0}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Restant: {line.remaining_quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Confirmer la réception
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
