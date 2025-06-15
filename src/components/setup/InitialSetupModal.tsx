
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b border-slate-200 pb-6">
          <DialogTitle className="flex items-center space-x-3 text-2xl text-slate-900">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span>Configuration initiale de votre entreprise</span>
          </DialogTitle>
          <p className="text-slate-600 text-lg">
            Bienvenue ! Configurons ensemble les éléments essentiels de votre entreprise.
          </p>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-14 h-14 rounded-xl border-2 transition-all
                    ${isCompleted ? 'bg-green-500 border-green-500 text-white shadow-lg' : 
                      isCurrent ? 'border-blue-500 text-blue-500 bg-blue-50' : 'border-slate-300 text-slate-400 bg-white'}
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-7 h-7" />
                    ) : (
                      <Icon className="w-7 h-7" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 mx-6 text-slate-400" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Content */}
          <Tabs value={steps[currentStep]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
              {steps.map((step, index) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  disabled={index > currentStep && !completedSteps.includes(index)}
                  onClick={() => setCurrentStep(index)}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="financial" className="mt-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                  <CardTitle className="flex items-center text-slate-900">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    Configuration des comptes financiers
                  </CardTitle>
                  <p className="text-slate-600">
                    Ajoutez au moins un compte pour commencer à gérer vos finances
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <FinancialAccountForm onSuccess={() => handleStepComplete(0)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="storage" className="mt-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
                  <CardTitle className="flex items-center text-slate-900">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <Warehouse className="w-5 h-5 text-white" />
                    </div>
                    Configuration des sites de stockage
                  </CardTitle>
                  <p className="text-slate-600">
                    Ajoutez vos entrepôts, magasins et autres sites de stockage
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <StorageSiteForm onSuccess={() => handleStepComplete(1)} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <div className="text-slate-600">
              <span className="font-medium">{completedSteps.length}</span> sur {steps.length} étapes terminées
            </div>
            
            <div className="space-x-3">
              {allStepsCompleted && (
                <Button 
                  onClick={handleFinishSetup} 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
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
