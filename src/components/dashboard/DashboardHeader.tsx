
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        {title}
      </h1>
      <p className="text-xl text-slate-600">{subtitle}</p>
    </div>
  );
};
