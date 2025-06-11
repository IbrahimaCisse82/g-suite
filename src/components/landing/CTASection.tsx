
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const handleExpertContact = () => {
    const subject = encodeURIComponent('Demande de consultation - G-Suite');
    const body = encodeURIComponent('Bonjour,\n\nJe souhaiterais obtenir plus d\'informations sur G-Suite et discuter de mes besoins en gestion d\'entreprise.\n\nCordialement,');
    const mailto = `mailto:ict@growhubsenegal.com?cc=h.ndiaye@growhubsenegal.com&subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Prêt à transformer votre
              <br />
              <span className="text-green-200">gestion d'entreprise ?</span>
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
              Rejoignez des centaines d'entreprises africaines qui font confiance à G-Suite 
              pour digitaliser et optimiser leur gestion quotidienne.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <span>Accéder à l'application</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4 rounded-lg transition-all"
              onClick={handleExpertContact}
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              Parler à un expert
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-green-200">Entreprises satisfaites</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-green-200">Disponibilité garantie</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-green-200">Support technique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
