
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, PlayCircle, BookOpen, Users, FileText, Package } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: string;
  icon: React.ComponentType<any>;
}

interface Workflow {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'facile' | 'moyen' | 'avancé';
  steps: WorkflowStep[];
}

const WORKFLOWS: Workflow[] = [
  {
    id: 'first-invoice',
    title: 'Créer votre première facture',
    description: 'Apprenez à créer et envoyer une facture professionnelle',
    estimatedTime: '5 min',
    difficulty: 'facile',
    steps: [
      {
        id: '1',
        title: 'Ajouter un client',
        description: 'Créez votre premier contact client',
        completed: false,
        action: 'add-client',
        icon: Users
      },
      {
        id: '2',
        title: 'Créer la facture',
        description: 'Sélectionnez le client et ajoutez les produits',
        completed: false,
        action: 'create-invoice',
        icon: FileText
      },
      {
        id: '3',
        title: 'Vérifier et envoyer',
        description: 'Relisez et envoyez la facture par email',
        completed: false,
        action: 'send-invoice',
        icon: CheckCircle
      }
    ]
  },
  {
    id: 'setup-products',
    title: 'Configurer vos produits',
    description: 'Ajoutez vos produits/services avec prix et stock',
    estimatedTime: '10 min',
    difficulty: 'facile',
    steps: [
      {
        id: '1',
        title: 'Créer des catégories',
        description: 'Organisez vos produits par catégories',
        completed: false,
        action: 'create-categories',
        icon: Package
      },
      {
        id: '2',
        title: 'Ajouter des produits',
        description: 'Saisissez vos produits avec prix et descriptions',
        completed: false,
        action: 'add-products',
        icon: Package
      },
      {
        id: '3',
        title: 'Configurer le stock',
        description: 'Définissez les quantités et seuils d\'alerte',
        completed: false,
        action: 'setup-stock',
        icon: Package
      }
    ]
  },
  {
    id: 'basic-accounting',
    title: 'Comptabilité de base',
    description: 'Configurez votre comptabilité selon SYSCOHADA',
    estimatedTime: '15 min',
    difficulty: 'moyen',
    steps: [
      {
        id: '1',
        title: 'Comptes bancaires',
        description: 'Ajoutez vos comptes bancaires professionnels',
        completed: false,
        action: 'add-bank-accounts',
        icon: BookOpen
      },
      {
        id: '2',
        title: 'Plan comptable',
        description: 'Vérifiez et personnalisez votre plan comptable',
        completed: false,
        action: 'setup-accounts',
        icon: BookOpen
      },
      {
        id: '3',
        title: 'Première écriture',
        description: 'Saisissez votre première écriture comptable',
        completed: false,
        action: 'first-entry',
        icon: BookOpen
      }
    ]
  }
];

export const TPEWorkflowGuide = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartWorkflow = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    const workflow = WORKFLOWS.find(w => w.id === selectedWorkflow);
    if (workflow && currentStep < workflow.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteStep = () => {
    const workflow = WORKFLOWS.find(w => w.id === selectedWorkflow);
    if (workflow) {
      workflow.steps[currentStep].completed = true;
      handleNextStep();
    }
  };

  const handleBackToWorkflows = () => {
    setSelectedWorkflow(null);
    setCurrentStep(0);
  };

  if (selectedWorkflow) {
    const workflow = WORKFLOWS.find(w => w.id === selectedWorkflow);
    if (!workflow) return null;

    const currentStepData = workflow.steps[currentStep];
    const Icon = currentStepData.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToWorkflows}>
            ← Retour aux guides
          </Button>
          <div className="text-right">
            <p className="text-sm text-gray-600">Étape {currentStep + 1} sur {workflow.steps.length}</p>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentStep + 1) / workflow.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentStepData.title}</h2>
                <p className="text-gray-600 font-normal">{currentStepData.description}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Instructions détaillées :</h3>
              <div className="text-blue-800 space-y-2">
                {currentStepData.id === '1' && selectedWorkflow === 'first-invoice' && (
                  <div>
                    <p>1. Cliquez sur "Contacts" dans le menu de gauche</p>
                    <p>2. Cliquez sur le bouton "Nouveau contact"</p>
                    <p>3. Remplissez au minimum le nom et l'email</p>
                    <p>4. Cliquez sur "Enregistrer"</p>
                  </div>
                )}
                {currentStepData.id === '2' && selectedWorkflow === 'first-invoice' && (
                  <div>
                    <p>1. Allez dans "Facturation"</p>
                    <p>2. Cliquez sur "Nouvelle facture"</p>
                    <p>3. Sélectionnez le client créé précédemment</p>
                    <p>4. Ajoutez une ligne de produit avec description et prix</p>
                  </div>
                )}
                {/* Ajouter d'autres instructions selon l'étape */}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleCompleteStep} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Marquer comme terminé
              </Button>
              {currentStep > 0 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Étape précédente
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Aperçu des étapes */}
        <Card>
          <CardHeader>
            <CardTitle>Progression du guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflow.steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div 
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index === currentStep ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : index === currentStep ? (
                        <PlayCircle className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${index === currentStep ? 'text-blue-900' : 'text-gray-900'}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Guides pas à pas</h1>
        <p className="text-gray-600">Apprenez à utiliser G-Suite avec des guides simples et pratiques</p>
      </div>

      <div className="grid gap-6">
        {WORKFLOWS.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{workflow.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{workflow.description}</p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      ⏱️ {workflow.estimatedTime}
                    </Badge>
                    <Badge className={getDifficultyColor(workflow.difficulty)}>
                      {workflow.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {workflow.steps.length} étapes
                    </span>
                  </div>
                </div>
                <Button onClick={() => handleStartWorkflow(workflow.id)}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
