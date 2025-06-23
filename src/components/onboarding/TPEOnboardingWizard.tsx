
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Building, Users, Calculator, ShoppingBag } from 'lucide-react';

interface ModuleSelection {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  price: string;
  features: string[];
  recommended?: boolean;
}

const modules: ModuleSelection[] = [
  {
    id: 'essential',
    name: 'TPE Essentiel',
    description: 'Pour débuter rapidement',
    icon: Building,
    price: '29€/mois',
    features: ['Facturation simple', 'Clients de base', 'Trésorerie', 'Support'],
    recommended: true
  },
  {
    id: 'comptabilite',
    name: 'Comptabilité',
    description: 'Gestion comptable complète',
    icon: Calculator,
    price: '39€/mois',
    features: ['Comptabilité générale', 'Bilans', 'TVA', 'Rapports'],
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'CRM et ventes',
    icon: ShoppingBag,
    price: '35€/mois',
    features: ['CRM avancé', 'Devis', 'Stock', 'Analyses'],
  },
  {
    id: 'complet',
    name: 'Solution Complète',
    description: 'Tous les modules inclus',
    icon: Users,
    price: '79€/mois',
    features: ['Tous les modules', 'Multi-utilisateurs', 'API', 'Formation'],
  }
];

interface TPEOnboardingWizardProps {
  onComplete: (selectedModule: string) => void;
}

export const TPEOnboardingWizard = ({ onComplete }: TPEOnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModule, setSelectedModule] = useState<string>('essential');
  const [companySize, setCompanySize] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');

  const steps = [
    { id: 1, title: 'Votre entreprise', description: 'Parlons de votre activité' },
    { id: 2, title: 'Besoins', description: 'Identifions vos priorités' },
    { id: 3, title: 'Solution', description: 'Votre module recommandé' }
  ];

  const businessTypes = [
    { id: 'commerce', label: 'Commerce / Vente', modules: ['commercial', 'complet'] },
    { id: 'service', label: 'Prestation de services', modules: ['essential', 'comptabilite'] },
    { id: 'artisan', label: 'Artisanat', modules: ['essential', 'commercial'] },
    { id: 'consultant', label: 'Conseil / Freelance', modules: ['essential', 'comptabilite'] },
    { id: 'restaurant', label: 'Restauration', modules: ['commercial', 'complet'] },
    { id: 'autre', label: 'Autre activité', modules: ['essential'] }
  ];

  const companySizes = [
    { id: 'solo', label: 'Entrepreneur seul', recommendation: 'essential' },
    { id: 'micro', label: '2-5 employés', recommendation: 'commercial' },
    { id: 'petite', label: '6-10 employés', recommendation: 'complet' }
  ];

  const getRecommendedModule = () => {
    const sizeRec = companySizes.find(s => s.id === companySize)?.recommendation;
    const typeRec = businessTypes.find(t => t.id === businessType)?.modules;
    
    if (sizeRec === 'complet' || (typeRec && typeRec.includes('complet'))) {
      return 'complet';
    }
    if (sizeRec === 'commercial' || (typeRec && typeRec.includes('commercial'))) {
      return 'commercial';
    }
    if (typeRec && typeRec.includes('comptabilite')) {
      return 'comptabilite';
    }
    return 'essential';
  };

  const handleNext = () => {
    if (currentStep === 2) {
      const recommended = getRecommendedModule();
      setSelectedModule(recommended);
    }
    setCurrentStep(prev => prev + 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Quelle est la taille de votre entreprise ?</h3>
        <div className="grid gap-3">
          {companySizes.map((size) => (
            <Button
              key={size.id}
              variant={companySize === size.id ? "default" : "outline"}
              className="justify-start h-auto p-4"
              onClick={() => setCompanySize(size.id)}
            >
              <div className="text-left">
                <div className="font-medium">{size.label}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Quel est votre secteur d'activité ?</h3>
        <div className="grid gap-3">
          {businessTypes.map((type) => (
            <Button
              key={type.id}
              variant={businessType === type.id ? "default" : "outline"}
              className="justify-start h-auto p-4"
              onClick={() => setBusinessType(type.id)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Quelles sont vos priorités ?</h3>
        <p className="text-muted-foreground">Sélectionnez ce qui est le plus important pour vous :</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:bg-accent" onClick={() => {}}>
          <CardContent className="p-4 text-center">
            <Calculator className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium">Comptabilité</div>
            <div className="text-sm text-muted-foreground">Bilans, TVA, conformité</div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent" onClick={() => {}}>
          <CardContent className="p-4 text-center">
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="font-medium">Ventes</div>
            <div className="text-sm text-muted-foreground">CRM, devis, facturation</div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent" onClick={() => {}}>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium">Équipe</div>
            <div className="text-sm text-muted-foreground">Multi-utilisateurs, rôles</div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-accent" onClick={() => {}}>
          <CardContent className="p-4 text-center">
            <Building className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="font-medium">Simplicité</div>
            <div className="text-sm text-muted-foreground">Interface simple, rapide</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const recommendedModule = modules.find(m => m.id === selectedModule);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Votre solution recommandée</h3>
          <p className="text-muted-foreground">Basée sur vos réponses, voici ce que nous vous conseillons :</p>
        </div>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {recommendedModule && (
                  <>
                    <recommendedModule.icon className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-lg">{recommendedModule.name}</h4>
                      <p className="text-muted-foreground">{recommendedModule.description}</p>
                    </div>
                  </>
                )}
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Recommandé
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              {recommendedModule?.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="text-2xl font-bold text-green-600">
              {recommendedModule?.price}
            </div>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-medium mb-3">Autres options disponibles :</h4>
          <div className="grid gap-3">
            {modules.filter(m => m.id !== selectedModule).map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.id} 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                        <div>
                          <h5 className="font-medium">{module.name}</h5>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{module.price}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Configurons G-Suite pour votre TPE
        </h2>
        <p className="text-center text-muted-foreground">
          Quelques questions pour vous proposer la solution parfaite
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <div className="mt-2 text-sm text-center">
                <div className="font-medium">{step.title}</div>
                <div className="text-muted-foreground">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        
        {currentStep < 3 ? (
          <Button 
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!companySize || !businessType)) ||
              (currentStep === 2)
            }
          >
            Suivant <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={() => onComplete(selectedModule)} className="bg-green-600 hover:bg-green-700">
            Démarrer avec {modules.find(m => m.id === selectedModule)?.name}
          </Button>
        )}
      </div>
    </div>
  );
};
