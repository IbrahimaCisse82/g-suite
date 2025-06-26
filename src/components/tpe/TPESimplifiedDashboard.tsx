
import React from 'react';
import { TPETableauBordSimple } from './TPETableauBordSimple';
import { TPEAssistantVirtuel } from './TPEAssistantVirtuel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, MessageSquare, BookOpen } from 'lucide-react';

export const TPESimplifiedDashboard = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <LayoutDashboard className="w-4 h-4" />
            <span>Tableau de bord</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Guides</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <TPETableauBordSimple />
        </TabsContent>
        
        <TabsContent value="assistant" className="mt-6">
          <TPEAssistantVirtuel />
        </TabsContent>
        
        <TabsContent value="guides" className="mt-6">
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Guides d'utilisation</h3>
            <p className="text-gray-600 mb-4">
              Accédez aux guides détaillés depuis le menu principal
            </p>
            <p className="text-sm text-gray-500">
              Menu → Aide → Guides pas à pas
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
