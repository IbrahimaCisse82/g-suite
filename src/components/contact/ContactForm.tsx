
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

export const ContactForm = () => {
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
  );
};
