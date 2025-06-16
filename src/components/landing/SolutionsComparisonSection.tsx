
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Check, X, Briefcase, Receipt, Handshake } from 'lucide-react';

const SolutionsComparisonSection = () => {
  const features = [
    {
      category: 'Fonctionnalités de base',
      items: [
        { name: 'Interface intuitive', entreprise: true, comptable: true, commerciale: true },
        { name: 'Sauvegarde cloud sécurisée', entreprise: true, comptable: true, commerciale: true },
        { name: 'Support technique', entreprise: true, comptable: true, commerciale: true },
        { name: 'Formation incluse', entreprise: true, comptable: true, commerciale: true }
      ]
    },
    {
      category: 'Gestion comptable',
      items: [
        { name: 'Comptabilité générale', entreprise: true, comptable: true, commerciale: false },
        { name: 'Bilans et rapports', entreprise: true, comptable: true, commerciale: false },
        { name: 'Gestion fiscale', entreprise: true, comptable: true, commerciale: false },
        { name: 'Audit et conformité', entreprise: true, comptable: true, commerciale: false }
      ]
    },
    {
      category: 'Gestion commerciale',
      items: [
        { name: 'CRM avancé', entreprise: true, comptable: false, commerciale: true },
        { name: 'Gestion des stocks', entreprise: true, comptable: false, commerciale: true },
        { name: 'Facturation automatisée', entreprise: true, comptable: false, commerciale: true },
        { name: 'Analyses commerciales', entreprise: true, comptable: false, commerciale: true }
      ]
    },
    {
      category: 'Fonctionnalités avancées',
      items: [
        { name: 'Tableau de bord unifié', entreprise: true, comptable: false, commerciale: false },
        { name: 'Gestion multi-utilisateurs', entreprise: true, comptable: false, commerciale: false },
        { name: 'API et intégrations', entreprise: true, comptable: false, commerciale: false },
        { name: 'Personnalisation avancée', entreprise: true, comptable: false, commerciale: false }
      ]
    }
  ];

  const solutions = [
    {
      key: 'entreprise',
      name: 'G-Suite Entreprise',
      icon: Briefcase,
      color: 'from-purple-600 to-indigo-600',
      description: 'Solution complète tout-en-un'
    },
    {
      key: 'comptable',
      name: 'G-Suite Comptabilité',
      icon: Receipt,
      color: 'from-blue-600 to-purple-600',
      description: 'Spécialisée comptabilité'
    },
    {
      key: 'commerciale',
      name: 'G-Suite Commerciale',
      icon: Handshake,
      color: 'from-green-600 to-emerald-600',
      description: 'Optimisée pour les ventes'
    }
  ];

  const FeatureIcon = ({ included }: { included: boolean }) => {
    return included ? (
      <Check className="w-5 h-5 text-green-600" />
    ) : (
      <X className="w-5 h-5 text-red-400" />
    );
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Tableau comparatif des solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez quelle solution G-Suite correspond le mieux aux besoins de votre entreprise
          </p>
        </div>

        {/* Solutions Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.key} className="text-center border-2 hover:shadow-lg transition-shadow">
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
          })}
        </div>

        {/* Comparison Table */}
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

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Besoin d'aide pour choisir la solution adaptée à votre entreprise ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contactez nos experts
              </Button>
            </Link>
            <Link to="/company-registration">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Commencer mon essai gratuit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsComparisonSection;
