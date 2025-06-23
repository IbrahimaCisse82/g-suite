
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { backofficeMenuItems } from './constants';

export const NavigationMenu = () => {
  const location = useLocation();

  return (
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
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
                ? 'bg-green-600 text-white shadow-md' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
