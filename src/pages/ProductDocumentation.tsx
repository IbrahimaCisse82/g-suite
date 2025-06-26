
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { FileText, Code, Download, Search } from 'lucide-react';

const ProductDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FileText className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Documentation Produit
            </h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Toute la documentation technique et fonctionnelle de G-Suite.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <FileText className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Guide Utilisateur</h3>
              <p className="text-slate-600">
                Manuel complet pour maîtriser toutes les fonctionnalités.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Code className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Documentation API</h3>
              <p className="text-slate-600">
                Référence complète pour les développeurs.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Download className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ressources</h3>
              <p className="text-slate-600">
                Téléchargez nos modèles et exemples.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default ProductDocumentation;
