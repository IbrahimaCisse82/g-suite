
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  Phone, 
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

interface TPEHelperProps {
  context: 'facture' | 'contact' | 'produit' | 'comptabilite' | 'general';
  onClose?: () => void;
}

export const TPEHelper = ({ context, onClose }: TPEHelperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const getContextualHelp = () => {
    switch (context) {
      case 'facture':
        return {
          title: 'Aide - Création de Facture',
          steps: [
            {
              title: 'Sélectionner le Client',
              description: 'Choisissez le client dans la liste ou créez-en un nouveau',
              tips: ['Vérifiez les informations du client', 'Assurez-vous que l\'adresse est complète']
            },
            {
              title: 'Ajouter les Produits/Services',
              description: 'Ajoutez les articles à facturer avec quantités et prix',
              tips: ['Vérifiez les prix unitaires', 'La TVA sera calculée automatiquement']
            },
            {
              title: 'Vérifier et Envoyer',
              description: 'Relisez la facture avant de l\'envoyer au client',
              tips: ['Vérifiez les totaux', 'Ajoutez des conditions de paiement si nécessaire']
            }
          ]
        };
      case 'contact':
        return {
          title: 'Aide - Gestion des Contacts',
          steps: [
            {
              title: 'Informations Essentielles',
              description: 'Nom, email et téléphone sont les informations minimales',
              tips: ['Le nom est obligatoire', 'L\'email permet l\'envoi automatique de factures']
            },
            {
              title: 'Type de Contact',
              description: 'Choisissez Client, Fournisseur ou les deux',
              tips: ['Un contact peut être à la fois client et fournisseur']
            }
          ]
        };
      case 'comptabilite':
        return {
          title: 'Aide - Comptabilité SYSCOHADA',
          steps: [
            {
              title: 'Écritures Automatiques',
              description: 'Les factures génèrent automatiquement les écritures comptables',
              tips: ['Vérifiez que les écritures sont équilibrées', 'Consultez le journal régulièrement']
            },
            {
              title: 'Plan Comptable',
              description: 'Utilisez les comptes SYSCOHADA appropriés',
              tips: ['Classe 4 pour les clients/fournisseurs', 'Classe 7 pour les ventes']
            }
          ]
        };
      default:
        return {
          title: 'Aide Générale',
          steps: [
            {
              title: 'Navigation',
              description: 'Utilisez le menu principal pour accéder aux différentes fonctions',
              tips: ['Tableau de bord pour la vue d\'ensemble', 'Actions rapides pour les tâches courantes']
            }
          ]
        };
    }
  };

  const helpContent = getContextualHelp();

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-w-[90vw] z-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>{helpContent.title}</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {helpContent.steps.map((step, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant={index === currentStep ? "default" : "outline"}>
                {index + 1}
              </Badge>
              <span className="font-medium text-sm">{step.title}</span>
              {index < currentStep && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
            
            {index === currentStep && (
              <div className="ml-8 space-y-2">
                <p className="text-sm text-gray-600">{step.description}</p>
                <div className="space-y-1">
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-2 text-xs">
                      <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="flex justify-between pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          <Button
            size="sm"
            onClick={() => setCurrentStep(Math.min(helpContent.steps.length - 1, currentStep + 1))}
            disabled={currentStep === helpContent.steps.length - 1}
          >
            Suivant
          </Button>
        </div>
        
        <div className="flex space-x-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1">
            <BookOpen className="w-4 h-4 mr-1" />
            Guide
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Video className="w-4 h-4 mr-1" />
            Vidéo
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="w-4 h-4 mr-1" />
            Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
