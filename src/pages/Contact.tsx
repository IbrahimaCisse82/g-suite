
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, Building, Users, Target } from 'lucide-react';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';

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
    console.log('Formulaire soumis:', formData);
    alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
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
      {/* Utiliser le header commun */}
      <LandingHeader />

      {/* Hero Section avec meilleur contraste */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Contactez-nous
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous accompagner 
            dans votre transformation digitale. Parlons de votre projet !
          </p>
        </div>
      </section>

      {/* Contact Content avec meilleur contraste */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border border-slate-200 bg-white">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                    <Send className="w-6 h-6 mr-3 text-emerald-600" />
                    Envoyez-nous un message
                  </CardTitle>
                  <p className="text-slate-700 font-medium">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-900 font-semibold">Nom complet *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mobile-input border-2 border-slate-300 focus:border-emerald-500 text-slate-900"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-900 font-semibold">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mobile-input border-2 border-slate-300 focus:border-emerald-500 text-slate-900"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-slate-900 font-semibold">Entreprise</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="mobile-input border-2 border-slate-300 focus:border-emerald-500 text-slate-900"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-900 font-semibold">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mobile-input border-2 border-slate-300 focus:border-emerald-500 text-slate-900"
                          placeholder="+221 XX XXX XX XX"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-900 font-semibold">Sujet *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mobile-input border-2 border-slate-300 focus:border-emerald-500 text-slate-900"
                        placeholder="Objet de votre message"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-900 font-semibold">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="mobile-input resize-none border-2 border-slate-300 focus:border-emerald-500 text-slate-900"
                        placeholder="Décrivez votre projet ou votre demande..."
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-lg border-2 border-emerald-600 hover:border-emerald-700">
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations de contact avec meilleur contraste */}
            <div className="space-y-8">
              {/* Coordonnées */}
              <Card className="shadow-lg border-2 border-slate-200 bg-white">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Nos coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-start space-x-4 p-3 rounded-lg bg-slate-50">
                    <MapPin className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Adresse</p>
                      <p className="text-slate-700 font-medium">
                        Dakar, Sénégal<br />
                        Plateau - Centre ville
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50">
                    <Phone className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Téléphone</p>
                      <p className="text-slate-700 font-medium">+221 77 XXX XX XX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50">
                    <Mail className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Email</p>
                      <p className="text-slate-700 font-medium">contact@growhubsenegal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 rounded-lg bg-slate-50">
                    <Clock className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Horaires</p>
                      <p className="text-slate-700 font-medium">
                        Lun - Ven: 8h00 - 18h00<br />
                        Sam: 9h00 - 13h00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="shadow-lg border-2 border-slate-200 bg-white">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Comment nous vous aidons
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-start space-x-4 p-3 rounded-lg bg-slate-50">
                    <Building className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Conseil en transformation digitale</p>
                      <p className="text-slate-700 font-medium">
                        Accompagnement stratégique personnalisé
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 rounded-lg bg-slate-50">
                    <Users className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Formation et support</p>
                      <p className="text-slate-700 font-medium">
                        Formation de vos équipes sur G-Suite
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 rounded-lg bg-slate-50">
                    <Target className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Solutions sur mesure</p>
                      <p className="text-slate-700 font-medium">
                        Adaptées à votre secteur d'activité
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-2 border-emerald-600">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-white">Besoin d'un devis ?</h3>
                  <p className="text-emerald-100 font-medium mb-4">
                    Obtenez une estimation personnalisée pour votre projet.
                  </p>
                  <Link to="/quote-request">
                    <Button variant="secondary" size="sm" className="w-full font-bold text-slate-900 bg-white hover:bg-slate-100 border-2 border-white">
                      Demander un devis
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simplifié */}
      <footer className="bg-slate-900 text-white py-12 border-t-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <GSuiteLogo size={32} />
              <div>
                <h3 className="text-lg font-bold text-white">G-Suite</h3>
                <p className="text-xs text-slate-300">by GrowHub Sénégal</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 font-medium">
              Votre partenaire de confiance pour la transformation digitale
            </p>
            <div className="flex justify-center space-x-8 text-sm font-semibold">
              <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors">Accueil</Link>
              <Link to="/about-us" className="text-slate-300 hover:text-emerald-400 transition-colors">À Propos</Link>
              <span className="text-emerald-400">Contact</span>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 text-xs text-slate-400 font-medium">
              © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
