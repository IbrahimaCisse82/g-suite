
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface ContactsAuthGuardProps {
  authStatus: 'checking' | 'authenticated' | 'unauthenticated';
  onLogin: () => void;
}

export const ContactsAuthGuard = ({ authStatus, onLogin }: ContactsAuthGuardProps) => {
  if (authStatus === 'checking') {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-readable-primary mb-4">
                Authentification requise
              </h1>
              <p className="text-readable-secondary mb-6">
                Vous devez être connecté pour accéder à la gestion des contacts.
              </p>
              <Button 
                onClick={onLogin}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};
