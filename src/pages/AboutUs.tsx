
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Users, 
  Globe, 
  Lightbulb, 
  Award, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Building2,
  Zap
} from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque solution que nous développons, en nous appuyant sur les meilleures pratiques technologiques."
    },
    {
      icon: Users,
      title: "Partenariat",
      description: "Nous construisons des relations durables avec nos clients, basées sur la confiance et la collaboration."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous restons à la pointe de la technologie pour offrir des solutions innovantes et adaptées au marché africain."
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Notre mission est de contribuer au développement économique de l'Afrique par la transformation digitale."
    }
  ];

  const stats = [
    { number: "500+", label: "Entreprises accompagnées" },
    { number: "15+", label: "Pays en Afrique" },
    { number: "98%", label: "Taux de satisfaction" },
    { number: "5", label: "Années d'expérience" }
  ];

  const team = [
    {
      name: "Hamidou NDIAYE",
      role: "Directeur Général & Fondateur",
      description: "Expert en transformation digitale avec plus de 10 ans d'expérience dans l'accompagnement des entreprises africaines."
    },
    {
      name: "Équipe Technique",
      role: "Développeurs & Ingénieurs",
      description: "Une équipe passionnée de développeurs sénégalais spécialisés dans les technologies web et mobiles modernes."
    },
    {
      name: "Équipe Support",
      role: "Accompagnement Client",
      description: "Des experts métier dédiés à l'accompagnement et à la formation de nos clients pour maximiser leur ROI."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-700/50 text-slate-200 text-sm font-medium mb-8">
              <Building2 className="w-4 h-4 mr-2" />
              À propos de GrowHub Sénégal
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Accélérer la transformation
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                digitale en Afrique
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Depuis 2019, GrowHub Sénégal accompagne les entreprises africaines dans leur mutation digitale 
              en développant des solutions technologiques innovantes et adaptées aux réalités locales.
            </p>
            <Link to="/company-registration">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg shadow-lg">
                Découvrir nos solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Notre Vision
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Démocratiser l'accès aux technologies modernes
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Nous croyons fermement que chaque entreprise africaine, quelle que soit sa taille, 
                mérite d'avoir accès aux mêmes outils technologiques que les grandes entreprises internationales.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Solutions sur mesure</h4>
                    <p className="text-slate-600">Adaptées aux spécificités du marché africain</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Accompagnement personnalisé</h4>
                    <p className="text-slate-600">Formation et support continu en français</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Innovation continue</h4>
                    <p className="text-slate-600">Développement constant de nouvelles fonctionnalités</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Équipe de développement moderne"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">300%</div>
                    <div className="text-sm text-slate-600">Croissance moyenne</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre impact en chiffres</h2>
            <p className="text-slate-300">Des résultats concrets pour nos partenaires</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Nos Valeurs
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Les piliers de notre approche
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Nos valeurs guident chaque décision et façonnent notre manière d'accompagner 
              les entreprises dans leur transformation digitale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Notre Équipe
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              L'expertise au service de votre succès
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une équipe passionnée et expérimentée, dédiée à votre réussite digitale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-slate-100 rounded-xl p-8 mb-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <div className="text-emerald-600 font-medium mb-4">{member.role}</div>
                  <p className="text-slate-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment G-Suite peut transformer votre entreprise et vous accompagner 
            vers le succès digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/company-registration">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 rounded-lg">
                Commencer maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-lg"
              onClick={() => window.location.href = 'mailto:contact@growhubsenegal.com'}
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default AboutUs;
