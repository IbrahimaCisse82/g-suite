import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Calculator, Users, Building, Briefcase, Receipt, Handshake } from 'lucide-react';

export const SolutionsDropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-gray-900 transition-colors bg-transparent">
            Solutions
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-96 p-6 bg-white shadow-lg">
              <div className="grid gap-4">
                <Link
                  to="/solutions/comptabilite"
                  className="group block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Receipt className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Comptabilité</h3>
                      <p className="text-sm text-gray-600">
                        Solution complète pour gérer votre comptabilité en toute simplicité
                      </p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/solutions/commerciale"
                  className="group block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Handshake className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Commerciale</h3>
                      <p className="text-sm text-gray-600">
                        Optimisez votre activité commerciale et boostez vos ventes
                      </p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/solutions/entreprise"
                  className="group block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Gestion d'Entreprise</h3>
                      <p className="text-sm text-gray-600">
                        Solution tout-en-un avec tous les modules pour votre entreprise
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
