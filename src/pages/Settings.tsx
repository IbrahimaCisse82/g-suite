
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Shield, CreditCard, Bell, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';

const settingsOptions = [
  {
    title: 'Profil de l\'entreprise',
    description: 'Gérez les informations de votre entreprise',
    icon: User,
    path: '/settings/profile',
  },
  {
    title: 'Gestion des utilisateurs',
    description: 'Ajoutez et gérez les utilisateurs de votre équipe',
    icon: User,
    path: '/settings/users',
  },
  {
    title: 'Clés de licence',
    description: 'Gérez vos licences et abonnements',
    icon: CreditCard,
    path: '/settings/licenses',
  },
  {
    title: 'Sécurité',
    description: 'Paramètres de sécurité et confidentialité',
    icon: Shield,
    path: '/security',
  },
  {
    title: 'Notifications',
    description: 'Configurez vos préférences de notification',
    icon: Bell,
    path: '/settings/notifications',
  },
  {
    title: 'Langue et région',
    description: 'Définissez votre langue et région',
    icon: Globe,
    path: '/settings/locale',
  },
];

export const Settings = () => {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              Paramètres
            </h1>
            <p className="text-xl text-readable-secondary">Configurez votre application selon vos besoins</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settingsOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link key={option.path} to={option.path}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <CardTitle className="text-lg text-readable-primary">{option.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-readable-secondary">{option.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
