
import React from 'react';

const PartnersSection = () => {
  const partners = [
    {
      name: 'ADEPME',
      logo: '/logos/adepme-logo.png',
      description: 'Agence de Développement et d\'Encadrement des Petites et Moyennes Entreprises',
      fallbackColor: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'GIZ',
      logo: '/logos/giz-logo.png', 
      description: 'Deutsche Gesellschaft für Internationale Zusammenarbeit',
      fallbackColor: 'bg-green-100 text-green-700'
    },
    {
      name: 'INVEST FOR JOBS',
      logo: '/logos/invest-for-jobs-logo.png',
      description: 'Initiative allemande pour l\'emploi et l\'investissement en Afrique',
      fallbackColor: 'bg-purple-100 text-purple-700'
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, partner: any) => {
    const imgElement = e.currentTarget;
    const fallbackElement = imgElement.nextElementSibling as HTMLElement;
    imgElement.style.display = 'none';
    if (fallbackElement && fallbackElement.classList.contains('partner-fallback')) {
      fallbackElement.style.display = 'flex';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Nos partenaires
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            G-Suite est soutenu par des organisations de renom qui partagent notre vision du développement entrepreneurial en Afrique
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-center h-20 mb-4">
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className="max-h-16 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => handleImageError(e, partner)}
                />
                <div 
                  className={`partner-fallback w-full h-16 ${partner.fallbackColor} rounded-lg items-center justify-center hidden`}
                >
                  <span className="font-bold text-lg">
                    {partner.name}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {partner.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Vous souhaitez devenir partenaire ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
