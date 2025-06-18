
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const TrustedCompaniesSection = () => {
  const { data: trustedCompanies } = useQuery({
    queryKey: ['trusted-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('name, logo_url')
        .not('logo_url', 'is', null)
        .limit(12);

      if (error) throw error;
      return data;
    },
  });

  if (!trustedCompanies || trustedCompanies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Ces entreprises nous ont fait confiance
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises africaines qui transforment leur gestion avec G-Suite
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center">
          {trustedCompanies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex items-center justify-center h-16">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={`Logo ${company.name}`}
                    className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    style={{ 
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                ) : (
                  <div className="w-full h-12 bg-slate-200 rounded flex items-center justify-center">
                    <span className="text-slate-600 font-medium text-sm truncate px-2">
                      {company.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            + de {trustedCompanies.length} entreprises et bien d'autres...
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompaniesSection;
