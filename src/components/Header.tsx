
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuthentication } from '@/hooks/useAdminAuthentication';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { isAuthenticated: isAdmin, adminEmail, logout: adminLogout } = useAdminAuthentication();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (isAdmin) {
      await adminLogout();
    } else {
      await signOut();
    }
    // Rediriger vers la landing page après déconnexion
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">G-Suite Application</h1>
          <p className="text-sm text-gray-600">Gestion d'entreprise complète</p>
        </div>
        
        {(user || isAdmin) && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isAdmin ? (
                <>
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Admin: {adminEmail}
                  </span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.email}
                  </span>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
