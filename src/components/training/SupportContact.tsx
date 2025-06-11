
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Clock,
  MapPin,
  Users
} from 'lucide-react';

export const SupportContact = () => {
  const handleEmailContact = () => {
    window.location.href = 'mailto:support@growhubsenegal.com?subject=Support Formation G-Suite';
  };

  const handlePhoneContact = () => {
    window.location.href = 'tel:+221770000000';
  };

  const handleScheduleCall = () => {
    // Integration with calendar booking system
    alert('Redirection vers le système de réservation...');
  };

  return (
    <section id="support" className="bg-gray-50 -mx-4 px-4 py-12 rounded-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Support et Assistance</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Notre équipe d'experts est à votre disposition pour vous accompagner 
          dans votre apprentissage et résoudre vos questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Support par email */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg">Support Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Envoyez-nous vos questions détaillées par email.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                Réponse sous 24h
              </div>
            </div>
            <Button onClick={handleEmailContact} className="w-full">
              Envoyer un email
            </Button>
          </CardContent>
        </Card>

        {/* Support téléphonique */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg">Support Téléphone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Assistance téléphonique directe avec nos experts.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                Lun-Ven 9h-18h
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1" />
                GMT+0 (Dakar)
              </div>
            </div>
            <Button onClick={handlePhoneContact} variant="outline" className="w-full">
              Appeler maintenant
            </Button>
          </CardContent>
        </Card>

        {/* Chat en direct */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg">Chat en Direct</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Assistance instantanée via notre chat en ligne.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                Disponible maintenant
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Démarrer un chat
            </Button>
          </CardContent>
        </Card>

        {/* Consultation personnalisée */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg">Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Séance personnalisée avec un expert G-Suite.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-1" />
                Sur rendez-vous
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                1h gratuite
              </div>
            </div>
            <Button onClick={handleScheduleCall} className="w-full">
              Réserver un créneau
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Section informations supplémentaires */}
      <div className="mt-12">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Formation Personnalisée</h3>
                <p className="text-muted-foreground">
                  Vous avez une équipe à former ? Nous proposons des sessions de formation 
                  sur mesure adaptées à vos besoins spécifiques.
                </p>
              </div>
              <Button size="lg" className="ml-8">
                En savoir plus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
