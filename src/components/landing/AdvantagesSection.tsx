
import React from 'react';
import { Cloud, Shield, Smartphone, HeadphonesIcon } from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Cloud,
      title: "100% Cloud",
      description: "Accédez à vos données partout, à tout moment"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Vos données sont protégées et sauvegardées"
    },
    {
      icon: Smartphone,
      title: "Multi-plateforme",
      description: "Compatible ordinateur, tablette et smartphone"
    },
    {
      icon: HeadphonesIcon,
      title: "Support expert",
      description: "Assistance technique et comptable dédiée"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir G-Compta ?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <advantage.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
