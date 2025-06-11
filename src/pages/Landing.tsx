import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Building, 
  Calculator, 
  Users, 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  PieChart, 
  TrendingUp,
  Check,
  Star,
  Shield,
  Cloud,
  Smartphone,
  HeadphonesIcon,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const { toast } = useToast();

  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ici on peut ajouter l'appel API pour envoyer l'email
      toast({
        title: "Demande envoyée",
        description: "Votre demande de devis a été envoyée avec succès. Nous vous recontacterons sous 24h.",
      });
      setQuoteForm({ name: '', company: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Calculator,
      title: "Comptabilité générale",
      description: "Gestion complète de votre comptabilité avec saisie automatisée et rapprochement bancaire"
    },
    {
      icon: Users,
      title: "Clients & Fournisseurs",
      description: "Gestion centralisée de vos contacts avec historique des transactions"
    },
    {
      icon: FileText,
      title: "Facturation",
      description: "Création et envoi automatique de factures personnalisées"
    },
    {
      icon: ShoppingCart,
      title: "Gestion des achats",
      description: "Suivi des commandes et gestion des stocks en temps réel"
    },
    {
      icon: CreditCard,
      title: "Trésorerie",
      description: "Pilotage de votre trésorerie avec prévisions et alertes"
    },
    {
      icon: PieChart,
      title: "Rapports avancés",
      description: "Tableaux de bord et analyses financières détaillées"
    }
  ];

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">G-Compta</h1>
              <p className="text-sm text-gray-600">Gestion d'entreprise</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Essai gratuit
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            La solution comptable 
            <span className="text-blue-600"> pour les PME africaines</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Simplifiez votre gestion d'entreprise avec G-Compta : comptabilité, facturation, 
            trésorerie et analyses, le tout dans une interface moderne et intuitive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <span>Essai gratuit 5 jours</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/quote">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Demander un devis
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✓ Aucune carte bancaire requise ✓ Configuration en 5 minutes
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Toutes les fonctionnalités dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600">
              Une suite complète d'outils pour gérer votre entreprise efficacement
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
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

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre formule
            </h2>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à la taille de votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Essai gratuit */}
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardHeader className="text-center bg-blue-50">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  Recommandé
                </div>
                <CardTitle className="text-2xl text-blue-600">Essai gratuit</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  0 FCFA
                  <span className="text-lg font-normal text-gray-600">/5 jours</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Accès complet à toutes les fonctionnalités</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Support par email et chat</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Formation en ligne incluse</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Jusqu'à 50 transactions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Aucun engagement</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                    Commencer l'essai gratuit
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Solution sur mesure */}
            <Card className="border-2 border-gray-200 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Solution sur mesure</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  Sur devis
                  <span className="text-lg font-normal text-gray-600">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Toutes les fonctionnalités</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Support prioritaire 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Formation personnalisée</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Transactions illimitées</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Intégrations sur mesure</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Accompagnement dédié</span>
                  </li>
                </ul>
                <Link to="/quote">
                  <Button variant="outline" className="w-full text-lg py-3 border-2">
                    Demander un devis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Demander un devis personnalisé
              </h2>
              <p className="text-gray-600">
                Remplissez ce formulaire et nous vous recontacterons sous 24h avec une proposition adaptée à vos besoins.
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom et prénom *</Label>
                      <Input
                        id="name"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Entreprise *</Label>
                      <Input
                        id="company"
                        required
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Décrivez vos besoins *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Décrivez votre entreprise, vos besoins spécifiques, le nombre d'utilisateurs..."
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à transformer votre gestion d'entreprise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines d'entreprises qui font confiance à G-Compta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Commencer l'essai gratuit
              </Button>
            </Link>
            <Link to="/quote">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                Parler à un expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Building className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">G-Compta</h3>
                  <p className="text-sm text-gray-400">Gestion d'entreprise</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                La solution comptable moderne pour les entreprises africaines.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">facturation@growhubsenegal.com</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Fonctionnalités</li>
                <li>Tarifs</li>
                <li>Sécurité</li>
                <li>Intégrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Formation</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li>À propos</li>
                <li>Blog</li>
                <li>Carrières</li>
                <li>Partenaires</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 G-Compta by GrowHub Sénégal. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
