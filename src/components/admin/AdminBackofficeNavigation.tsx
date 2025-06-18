
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  Building2,
  Shield,
  Database,
  UserCheck,
  ChevronDown,
  ChevronRight,
  FileBarChart,
  ShoppingBag,
  Globe2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

// Mock data pour les entreprises par solution
const companiesBySolution = {
  comptabilite: [
    { id: '1', name: 'Cabinet Comptable Expert', admin: 'Amadou Diallo' },
    { id: '2', name: 'Expertise Compta Plus', admin: 'Fatou Sall' },
    { id: '3', name: 'Compta Services', admin: 'Omar Ba' }
  ],
  commerciale: [
    { id: '4', name: 'SA Commerce Général', admin: 'Marie Martin' },
    { id: '5', name: 'Distribution Plus', admin: 'Jean Ndiaye' },
    { id: '6', name: 'Négoce International', admin: 'Aissatou Fall' }
  ],
  entreprise: [
    { id: '7', name: 'SARL Tech Solutions', admin: 'Jean Dupont' },
    { id: '8', name: 'Groupe Industriel Sénégal', admin: 'Moussa Diop' },
    { id: '9', name: 'Holdings & Partners', admin: 'Khadidja Touré' }
  ]
};

const backofficeMenuItems = [
  { icon: Users, label: 'Gestion Utilisateurs', path: '/admin-backoffice', active: true },
  { icon: Building2, label: 'Gestion Entreprises', path: '/admin-backoffice/companies', active: false },
  { icon: Shield, label: 'Rôles & Permissions', path: '/admin-backoffice/roles', active: false },
  { icon: Database, label: 'Base de données', path: '/admin-backoffice/database', active: false },
  { icon: BarChart3, label: 'Statistiques', path: '/admin-backoffice/stats', active: false },
  { icon: Settings, label: 'Configuration', path: '/admin-backoffice/settings', active: false },
];

const solutions = [
  {
    id: 'comptabilite',
    name: 'Comptabilité',
    icon: FileBarChart,
    color: 'text-blue-600',
    companies: companiesBySolution.comptabilite
  },
  {
    id: 'commerciale',
    name: 'Commerciale',
    icon: ShoppingBag,
    color: 'text-green-600',
    companies: companiesBySolution.commerciale
  },
  {
    id: 'entreprise',
    name: 'Entreprise',
    icon: Globe2,
    color: 'text-purple-600',
    companies: companiesBySolution.entreprise
  }
];

export const AdminBackofficeNavigation = () => {
  const location = useLocation();
  const [expandedSolutions, setExpandedSolutions] = useState<string[]>([]);

  const toggleSolution = (solutionId: string) => {
    setExpandedSolutions(prev => 
      prev.includes(solutionId) 
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  const handleLogout = () => {
    // Logic de déconnexion
    window.location.href = '/admin-login';
  };

  return (
    <div className="w-72 bg-slate-900 text-white flex flex-col border-r border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <GSuiteLogo size={40} />
          <div>
            <h1 className="text-xl font-bold text-white">Backoffice Admin</h1>
            <p className="text-sm text-slate-300">Gestion des comptes entreprises</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge className="bg-green-600 text-white">
            <UserCheck className="w-3 h-3 mr-1" />
            Super Admin
          </Badge>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Gestion
          </h3>
        </div>
        
        {backofficeMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : item.active 
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {!item.active && (
                <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-400">
                  Bientôt
                </Badge>
              )}
            </Link>
          );
        })}

        {/* Solutions et Entreprises Section */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Solutions & Entreprises
          </h3>
          
          <div className="space-y-2">
            {solutions.map((solution) => {
              const SolutionIcon = solution.icon;
              const isExpanded = expandedSolutions.includes(solution.id);
              
              return (
                <div key={solution.id} className="space-y-1">
                  <button
                    onClick={() => toggleSolution(solution.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <SolutionIcon className={`w-5 h-5 ${solution.color}`} />
                      <span className="font-medium">{solution.name}</span>
                      <Badge variant="outline" className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                        {solution.companies.length}
                      </Badge>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-6 space-y-1">
                      {solution.companies.map((company) => (
                        <Link
                          key={company.id}
                          to={`/admin-backoffice/company/${company.id}`}
                          className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{company.name}</span>
                            <span className="text-xs text-slate-500">Admin: {company.admin}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="mb-4 p-3 bg-slate-800 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">SA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Super Admin</p>
              <p className="text-xs text-slate-400">admin@growhub.com</p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full text-white hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
        
        <div className="text-xs text-slate-400 mt-3 text-center">
          <div>© 2024 GrowHub Backoffice</div>
          <div className="flex items-center justify-center mt-1">
            <Building2 className="w-3 h-3 mr-1" />
            Version Admin v2.0
          </div>
        </div>
      </div>
    </div>
  );
};
