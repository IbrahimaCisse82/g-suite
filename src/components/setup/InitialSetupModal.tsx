
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Wallet, Warehouse, CheckCircle, ArrowRight } from 'lucide-react';
import { FinancialAccountForm } from './FinancialAccountForm';
import { StorageSiteForm } from './StorageSiteForm';

interface InitialSetupModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const InitialSetupModal = ({ isOpen, onComplete }: InitialSetupModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 'financial',
      title: 'Comptes financiers',
      description: 'Configurez vos comptes bancaires, caisses et monnaie électronique',
      icon: Wallet,
      color: 'bg-blue-500'
    },
    {
      id: 'storage',
      title: 'Sites de stockage',
      description: 'Ajoutez vos entrepôts, magasins et dépôts',
      icon: Warehouse,
      color: 'bg-green-500'
    }
  ];

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleFinishSetup = () => {
    onComplete();
  };

  const allStepsCompleted = completedSteps.length === steps.length;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <Building className="w-6 h-6 text-green-600" />
            <span>Configuration initiale de votre entreprise</span>
          </DialogTitle>
          <p className="text-muted-foreground">
            Bienvenue ! Configurons ensemble les éléments essentiels de votre entreprise.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 
                    ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      isCurrent ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 mx-4 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Content */}
          <Tabs value={steps[currentStep]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {steps.map((step, index) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  disabled={index > currentStep && !completedSteps.includes(index)}
                  onClick={() => setCurrentStep(index)}
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration des comptes financiers</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez au moins un compte pour commencer à gérer vos finances
                  </p>
                </CardHeader>
                <CardContent>
                  <FinancialAccountForm onSuccess={() => handleStepComplete(0)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="storage">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration des sites de stockage</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez vos entrepôts, magasins et autres sites de stockage
                  </p>
                </CardHeader>
                <CardContent>
                  <StorageSiteForm onSuccess={() => handleStepComplete(1)} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              {completedSteps.length} sur {steps.length} étapes terminées
            </div>
            
            <div className="space-x-3">
              {allStepsCompleted && (
                <Button onClick={handleFinishSetup} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terminer la configuration
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
