
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
          <NavigationMenuTrigger className="text-slate-600 hover:text-slate-900 transition-colors bg-transparent font-medium text-base">
            Solutions
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-96 p-6 bg-white shadow-2xl border-2 border-slate-200 rounded-lg">
              <div className="grid gap-4">
                <Link
                  to="/solutions/comptabilite"
                  className="group block p-4 rounded-lg hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors border border-blue-200">
                      <Receipt className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1 text-base">Comptabilité</h3>
                      <p className="text-sm text-slate-700 font-medium">
                        Solution complète pour gérer votre comptabilité en toute simplicité
                      </p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/solutions/commerciale"
                  className="group block p-4 rounded-lg hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors border border-green-200">
                      <Handshake className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1 text-base">Commerciale</h3>
                      <p className="text-sm text-slate-700 font-medium">
                        Optimisez votre activité commerciale et boostez vos ventes
                      </p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/solutions/entreprise"
                  className="group block p-4 rounded-lg hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors border border-purple-200">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1 text-base">Gestion d'Entreprise</h3>
                      <p className="text-sm text-slate-700 font-medium">
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
