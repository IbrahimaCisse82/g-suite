
import React from 'react';
import { Cloud, Shield, Smartphone, HeadphonesIcon, Zap, Globe } from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Cloud,
      title: "100% Cloud",
      description: "Accédez à vos données partout, à tout moment, depuis n'importe quel appareil"
    },
    {
      icon: Shield,
      title: "Sécurité maximale",
      description: "Vos données sont chiffrées et sauvegardées selon les standards bancaires"
    },
    {
      icon: Smartphone,
      title: "Multi-plateforme",
      description: "Compatible ordinateur, tablette et smartphone avec synchronisation temps réel"
    },
    {
      icon: HeadphonesIcon,
      title: "Support expert",
      description: "Assistance technique et comptable dédiée par des experts locaux"
    },
    {
      icon: Zap,
      title: "Performance optimale",
      description: "Interface rapide et fluide optimisée pour les connexions africaines"
    },
    {
      icon: Globe,
      title: "Multi-devises",
      description: "Gestion native des devises locales et internationales (XOF, EUR, USD...)"
    }
  ];

  return (
    <section id="advantages" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            ⭐ Avantages uniques
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Pourquoi choisir G-Suite ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une solution pensée pour les défis spécifiques des entreprises africaines
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <advantage.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
