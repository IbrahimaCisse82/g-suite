
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Building className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">G-Compta</h1>
            <p className="text-sm text-gray-600">Gestion d'entreprise</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost">Se connecter</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Essai gratuit
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
