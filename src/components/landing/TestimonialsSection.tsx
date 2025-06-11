
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Diallo",
      company: "Boutique Mode Dakar",
      content: "G-Compta a révolutionné la gestion de ma boutique. Je peux maintenant suivre mes ventes et ma trésorerie en temps réel.",
      rating: 5
    },
    {
      name: "Mamadou Sow",
      company: "Transport Express",
      content: "La facturation automatique m'a fait gagner énormément de temps. Je recommande vivement cette solution.",
      rating: 5
    },
    {
      name: "Fatou Ndiaye",
      company: "Consulting Services",
      content: "Interface intuitive et support client exceptionnel. Parfait pour les PME sénégalaises.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
