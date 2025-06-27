
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PageLoader } from '@/components/common/PageLoader';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return fallback || <PageLoader text="Vérification de l'authentification..." />;
  }

  if (!user) {
    return fallback || <div>Accès non autorisé</div>;
  }

  return <>{children}</>;
};
