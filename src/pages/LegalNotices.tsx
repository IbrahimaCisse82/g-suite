
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const LegalNotices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Mentions Légales</h1>
          
          <div className="space-y-8">
            {/* Éditeur */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Building className="w-6 h-6 text-green-600 mr-3" />
                Éditeur du Site
              </h2>
              <div className="space-y-4">
                <div>
                  <strong>Raison sociale :</strong> GrowHub Sénégal SARL
                </div>
                <div>
                  <strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)
                </div>
                <div>
                  <strong>Capital social :</strong> 1.000.000 FCFA
                </div>
                <div>
                  <strong>Numéro d'identification :</strong> SN-DKR-2023-B-XXXXX
                </div>
                <div>
                  <strong>Numéro NINEA :</strong> 00XXXXXXX
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span><strong>Siège social :</strong> Dakar, Sénégal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span><strong>Téléphone :</strong> +221 78 475 28 58</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span><strong>Email :</strong> support@g-suite.com</span>
                </div>
              </div>
            </section>

            {/* Directeur de publication */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Directeur de Publication</h2>
              <p className="text-slate-700">
                Le directeur de la publication du site G-Suite est le représentant légal de GrowHub Sénégal SARL.
              </p>
            </section>

            {/* Hébergement */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Hébergement</h2>
              <div className="space-y-4">
                <div>
                  <strong>Hébergeur :</strong> Supabase Inc.
                </div>
                <div>
                  <strong>Adresse :</strong> 970 Toa Payoh North #07-04, Singapore 318992
                </div>
                <div>
                  <strong>Site web :</strong> <a href="https://supabase.com" className="text-green-600 hover:text-green-700">https://supabase.com</a>
                </div>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Propriété Intellectuelle</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  L'ensemble du contenu présent sur le site G-Suite (textes, images, vidéos, logos, graphismes, etc.) 
                  est la propriété exclusive de GrowHub Sénégal SARL, sauf mention contraire.
                </p>
                <p>
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication, 
                  même partielle, de ces différents éléments est strictement interdite sans l'accord écrit préalable 
                  de GrowHub Sénégal SARL.
                </p>
                <p>
                  La marque "G-Suite" et le logo associé sont des marques déposées de GrowHub Sénégal SARL.
                </p>
              </div>
            </section>

            {/* Données personnelles */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Protection des Données Personnelles</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Conformément à la loi sénégalaise n°2008-12 du 25 janvier 2008 sur la protection des données 
                  à caractère personnel et au Règlement Général sur la Protection des Données (RGPD), 
                  vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données.
                </p>
                <p>
                  Pour exercer ces droits ou pour toute question sur le traitement de vos données, 
                  vous pouvez nous contacter à l'adresse : <strong>privacy@g-suite.com</strong>
                </p>
                <p>
                  Consultez notre <a href="/privacy-policy" className="text-green-600 hover:text-green-700">Politique de Confidentialité</a> 
                  pour plus d'informations sur la collecte et l'utilisation de vos données.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Cookies</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Le site G-Suite utilise des cookies pour améliorer votre expérience de navigation et 
                  analyser l'utilisation du site.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté 
                  lorsqu'un cookie est déposé. Consultez notre 
                  <a href="/cookies-policy" className="text-green-600 hover:text-green-700"> Politique de Cookies</a> 
                  pour plus d'informations.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Limitation de Responsabilité</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  GrowHub Sénégal SARL s'efforce d'assurer l'exactitude et la mise à jour des informations 
                  diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, la précision ou 
                  l'exhaustivité des informations mises à disposition.
                </p>
                <p>
                  L'utilisation des informations et contenus disponibles sur l'ensemble du site se fait 
                  sous la seule responsabilité de l'utilisateur.
                </p>
                <p>
                  GrowHub Sénégal SARL ne pourra en aucun cas être tenue responsable de tout dommage de 
                  quelque nature qu'il soit résultant de l'interprétation ou de l'utilisation des 
                  informations et/ou contenus disponibles sur son site.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Droit Applicable et Juridiction</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Les présentes mentions légales sont régies par le droit sénégalais.
                </p>
                <p>
                  En cas de litige, et après recherche d'une solution amiable, les tribunaux sénégalais 
                  seront seuls compétents pour connaître de ce litige.
                </p>
              </div>
            </section>

            {/* Dernière mise à jour */}
            <section className="bg-green-50 rounded-xl p-8">
              <p className="text-green-800 text-center">
                <strong>Dernière mise à jour :</strong> 15 juin 2024
              </p>
              <p className="text-green-700 text-center text-sm mt-2">
                Ces mentions légales peuvent être modifiées à tout moment. 
                Nous vous invitons à les consulter régulièrement.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotices;
