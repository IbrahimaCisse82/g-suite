
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Lightbulb, Calculator, FileText, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const QUICK_ACTIONS = [
  { icon: FileText, label: 'Créer une facture', action: 'create-invoice' },
  { icon: Users, label: 'Ajouter un client', action: 'add-client' },
  { icon: Calculator, label: 'Calculer TVA', action: 'calculate-vat' },
  { icon: TrendingUp, label: 'Voir les ventes', action: 'view-sales' },
];

const COMMON_QUESTIONS = [
  "Comment créer ma première facture ?",
  "Comment ajouter un nouveau client ?",
  "Comment calculer la TVA ?",
  "Où voir mes ventes du mois ?",
  "Comment faire un devis ?",
  "Comment gérer mon stock ?"
];

export const TPEAssistantVirtuel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Bonjour ! Je suis votre assistant virtuel G-Suite. Je suis là pour vous aider à gérer votre TPE facilement. Que puis-je faire pour vous aujourd'hui ?",
      timestamp: new Date(),
      suggestions: COMMON_QUESTIONS.slice(0, 3)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simuler une réponse de l'assistant
    setTimeout(() => {
      const assistantResponse = generateAssistantResponse(newMessage);
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  const generateAssistantResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes('facture')) {
      response = "Pour créer une facture, suivez ces étapes simples :\n\n1. Allez dans 'Facturation'\n2. Cliquez sur 'Nouvelle facture'\n3. Sélectionnez votre client\n4. Ajoutez vos produits/services\n5. Vérifiez le montant et envoyez\n\nVoulez-vous que je vous guide pas à pas ?";
      suggestions = ["Oui, guide-moi", "Comment ajouter un produit ?", "Comment envoyer la facture ?"];
    } else if (lowerMessage.includes('client')) {
      response = "Pour ajouter un nouveau client :\n\n1. Allez dans 'Contacts'\n2. Cliquez sur 'Nouveau contact'\n3. Remplissez les informations de base (nom, email, téléphone)\n4. Sauvegardez\n\nC'est aussi simple que ça ! Le client sera disponible pour vos factures et devis.";
      suggestions = ["Comment modifier un client ?", "Comment supprimer un client ?", "Créer ma première facture"];
    } else if (lowerMessage.includes('tva')) {
      response = "La TVA est calculée automatiquement dans G-Suite :\n\n• Taux standard : 18% (Sénégal)\n• Vous pouvez modifier le taux par produit\n• Le calcul se fait automatiquement sur les factures\n• Vous verrez le détail : HT, TVA, TTC\n\nBesoin d'aide sur la configuration ?";
      suggestions = ["Comment changer le taux de TVA ?", "Voir mes déclarations TVA", "Créer une facture"];
    } else {
      response = "Je comprends votre question. Pouvez-vous être plus précis ? Je peux vous aider avec :\n\n• La facturation et devis\n• La gestion des clients\n• Le suivi des ventes\n• La comptabilité de base\n• La gestion du stock\n\nQue souhaitez-vous faire en priorité ?";
      suggestions = COMMON_QUESTIONS.slice(0, 3);
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-invoice':
        toast.info('Redirection vers la création de facture...');
        // Navigation vers la page de facturation
        break;
      case 'add-client':
        toast.info('Redirection vers l\'ajout de client...');
        // Navigation vers la page contacts
        break;
      case 'calculate-vat':
        setNewMessage('Comment calculer la TVA ?');
        break;
      case 'view-sales':
        toast.info('Redirection vers les ventes...');
        // Navigation vers les rapports
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Assistant TPE</span>
            <Badge variant="secondary">Beta</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => handleQuickAction(action.action)}
            >
              <Icon className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-center">{action.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Conversation */}
      <Card className="h-96 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Suggestions */}
          {messages.length > 0 && messages[messages.length - 1].type === 'assistant' && messages[messages.length - 1].suggestions && (
            <div className="flex flex-wrap gap-2 justify-start">
              {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        
        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre question..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
