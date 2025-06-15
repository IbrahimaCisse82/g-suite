
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, Building, Users, Target } from 'lucide-react';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <GSuiteLogo size={40} />
              <div>
                <h1 className="text-xl font-bold text-slate-900">G-Suite</h1>
                <p className="text-sm text-slate-600">Gestion d'entreprise digitale</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Accueil
              </Link>
              <Link to="/about-us" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                À Propos
              </Link>
              <span className="text-emerald-600 font-semibold">Contact</span>
            </nav>
            
            <Link to="/user-login">
              <Button variant="outline" size="sm" className="text-slate-600 hover:text-slate-900 border-slate-300">
                Connexion Entreprise
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous accompagner 
            dans votre transformation digitale. Parlons de votre projet !
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                    <Send className="w-6 h-6 mr-3 text-emerald-600" />
                    Envoyez-nous un message
                  </CardTitle>
                  <p className="text-slate-600">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mobile-input"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mobile-input"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="mobile-input"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mobile-input"
                          placeholder="+221 XX XXX XX XX"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mobile-input"
                        placeholder="Objet de votre message"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="mobile-input resize-none"
                        placeholder="Décrivez votre projet ou votre demande..."
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              {/* Coordonnées */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Nos coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Adresse</p>
                      <p className="text-slate-600 text-sm">
                        Dakar, Sénégal<br />
                        Plateau - Centre ville
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Téléphone</p>
                      <p className="text-slate-600 text-sm">+221 77 XXX XX XX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <p className="text-slate-600 text-sm">contact@growhubsenegal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Horaires</p>
                      <p className="text-slate-600 text-sm">
                        Lun - Ven: 8h00 - 18h00<br />
                        Sam: 9h00 - 13h00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Comment nous vous aidons
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Building className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Conseil en transformation digitale</p>
                      <p className="text-slate-600 text-sm">
                        Accompagnement stratégique personnalisé
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Formation et support</p>
                      <p className="text-slate-600 text-sm">
                        Formation de vos équipes sur G-Suite
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">Solutions sur mesure</p>
                      <p className="text-slate-600 text-sm">
                        Adaptées à votre secteur d'activité
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Besoin d'un devis ?</h3>
                  <p className="text-emerald-100 text-sm mb-4">
                    Obtenez une estimation personnalisée pour votre projet.
                  </p>
                  <Link to="/quote-request">
                    <Button variant="secondary" size="sm" className="w-full">
                      Demander un devis
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <GSuiteLogo size={32} />
              <div>
                <h3 className="text-lg font-bold">G-Suite</h3>
                <p className="text-xs text-slate-400">by GrowHub Sénégal</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Votre partenaire de confiance pour la transformation digitale
            </p>
            <div className="flex justify-center space-x-8 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Accueil</Link>
              <Link to="/about-us" className="hover:text-emerald-400 transition-colors">À Propos</Link>
              <span className="text-emerald-400">Contact</span>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 text-xs text-slate-400">
              © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
