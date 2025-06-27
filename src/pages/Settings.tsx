
import React, { useMemo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, CreditCard, Bell, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { OptimizedCard } from '@/components/common/OptimizedCard';
import { PageLoader } from '@/components/common/PageLoader';
import { usePagePerformance } from '@/hooks/usePagePerformance';

const settingsOptions = [
  {
    title: 'Profil de l\'entreprise',
    description: 'Gérez les informations de votre entreprise',
    icon: User,
    path: '/settings/profile',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Gestion des utilisateurs',
    description: 'Ajoutez et gérez les utilisateurs de votre équipe',
    icon: User,
    path: '/settings/users',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Clés de licence',
    description: 'Gérez vos licences et abonnements',
    icon: CreditCard,
    path: '/settings/licenses',
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Notifications',
    description: 'Configurez vos préférences de notification',
    icon: Bell,
    path: '/settings/notifications',
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'Langue et région',
    description: 'Définissez votre langue et région',
    icon: Globe,
    path: '/settings/locale',
    color: 'from-green-500 to-green-600'
  },
];

export const Settings = React.memo(() => {
  const { measureOperation } = usePagePerformance('Settings');
  const memoizedOptions = useMemo(() => settingsOptions, []);

  const handleLinkClick = (path: string) => {
    const endMeasure = measureOperation(`Navigate to ${path}`);
    endMeasure();
  };

  return (
    <PageTransition>
      <div className="p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 transform transition-transform hover:scale-110">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            Paramètres
          </h1>
          <p className="text-xl text-readable-secondary">Configurez votre application selon vos besoins</p>
        </div>

        <Suspense fallback={<PageLoader type="skeleton" rows={3} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memoizedOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Link 
                  key={option.path} 
                  to={option.path}
                  onClick={() => handleLinkClick(option.path)}
                  className="group transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <OptimizedCard className="h-full animate-fade-in group-hover:shadow-2xl">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center transform transition-transform group-hover:rotate-6`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-lg text-readable-primary group-hover:text-green-600 transition-colors">
                          {option.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-readable-secondary group-hover:text-readable-primary transition-colors">
                        {option.description}
                      </p>
                    </CardContent>
                  </OptimizedCard>
                </Link>
              );
            })}
          </div>
        </Suspense>
      </div>
    </PageTransition>
  );
});

Settings.displayName = 'Settings';
