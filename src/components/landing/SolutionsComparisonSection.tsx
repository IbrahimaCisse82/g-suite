
import React from 'react';
import { SolutionCard } from './comparison/SolutionCard';
import { ComparisonTable } from './comparison/ComparisonTable';
import { ComparisonCTA } from './comparison/ComparisonCTA';
import { solutions, features } from './comparison/solutionsData';

const SolutionsComparisonSection = () => {
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
          {solutions.map((solution) => (
            <SolutionCard key={solution.key} solution={solution} />
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable features={features} />

        {/* CTA Section */}
        <ComparisonCTA />
      </div>
    </section>
  );
};

export default SolutionsComparisonSection;
