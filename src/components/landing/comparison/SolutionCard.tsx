
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SolutionCardProps {
  solution: {
    key: string;
    name: string;
    icon: LucideIcon;
    color: string;
    description: string;
  };
}

export const SolutionCard = ({ solution }: SolutionCardProps) => {
  const Icon = solution.icon;
  
  return (
    <Card className="text-center border-2 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${solution.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-lg">{solution.name}</CardTitle>
        <p className="text-sm text-slate-600">{solution.description}</p>
      </CardHeader>
      <CardContent>
        <Link to={`/company-registration?solution=${solution.key}`}>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Choisir cette solution
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
