
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Briefcase, Receipt, Handshake } from 'lucide-react';
import { FeatureIcon } from './FeatureIcon';

interface ComparisonTableProps {
  features: Array<{
    category: string;
    items: Array<{
      name: string;
      entreprise: boolean;
      comptable: boolean;
      commerciale: boolean;
    }>;
  }>;
}

export const ComparisonTable = ({ features }: ComparisonTableProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Comparaison détaillée des fonctionnalités
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="font-semibold text-slate-900 w-1/3">
                  Fonctionnalités
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-900">
                  <div className="flex flex-col items-center space-y-1">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    <span>Entreprise</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-900">
                  <div className="flex flex-col items-center space-y-1">
                    <Receipt className="w-5 h-5 text-blue-600" />
                    <span>Comptabilité</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-900">
                  <div className="flex flex-col items-center space-y-1">
                    <Handshake className="w-5 h-5 text-green-600" />
                    <span>Commerciale</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <TableRow className="bg-slate-50">
                    <TableCell colSpan={4} className="font-semibold text-slate-800 py-3">
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.items.map((feature, featureIndex) => (
                    <TableRow key={featureIndex} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-700 py-4">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <FeatureIcon included={feature.entreprise} />
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <FeatureIcon included={feature.comptable} />
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <FeatureIcon included={feature.commerciale} />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
