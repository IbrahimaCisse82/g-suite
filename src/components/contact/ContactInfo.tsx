
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Building, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactInfo = () => {
  return (
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
  );
};
