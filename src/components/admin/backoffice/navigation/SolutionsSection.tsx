
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { solutions } from './constants';

export const SolutionsSection = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Solutions & Entreprises
      </h3>
      
      <div className="space-y-2">
        {solutions.map((solution) => {
          const SolutionIcon = solution.icon;
          
          return (
            <div key={solution.id} className="space-y-1">
              <Link
                to={`/admin-backoffice/solution/${solution.id}`}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <SolutionIcon className={`w-5 h-5 ${solution.color}`} />
                  <span className="font-medium text-gray-900">{solution.name}</span>
                  <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-300">
                    {solution.companies.length}
                  </Badge>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
