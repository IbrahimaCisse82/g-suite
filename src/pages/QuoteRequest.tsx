
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, ArrowLeft, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const QuoteRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    // Informations de l'entreprise
    name: '',
    business_sector: '',
    address: '',
    city: '',
    country: 'Sénégal',
    phone: '',
    email: '',
    website: '',
    rccm: '',
    ninea: '',
    currency: 'XOF',
    
    // Informations du représentant
    representative_first_name: '',
    representative_last_name: '',
    
    // Message de demande
    message: '',
    
    // Besoins spécifiques
    employees_count: '',
    monthly_transactions: '',
    specific_needs: ''
  });

  const businessSectors = [
    'Commerce',
    'Services',
    'Transport',
    'Agriculture',
    'Industrie',
    'Technologie',
    'Santé',
    'Éducation',
    'Finance',
    'Immobilier',
    'Tourisme',
    'Artisanat',
    'Autre'
  ];

  const currencies = [
    { value: 'XOF', label: 'Franc CFA (XOF)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'USD', label: 'Dollar US (USD)' },
    { value: 'GBP', label: 'Livre Sterling (GBP)' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ici on pourra ajouter l'appel API pour envoyer l'email
      // Pour le moment, on simule l'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Demande envoyée",
        description: "Votre demande de devis a été envoyée avec succès. Nous vous recontacterons sous 24h.",
      });
      
      navigate('/');
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

  return (
    <div className="min-h-screen bg-gray-50">
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
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Demande de devis personnalisé
            </h1>
            <p className="text-gray-600">
              Remplissez ce formulaire avec les informations de votre entreprise pour recevoir un devis adapté à vos besoins.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations de votre entreprise</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <Label htmlFor="logo">Logo de l'entreprise</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="cursor-pointer"
                      />
                    </div>
                    {logoFile && (
                      <span className="text-sm text-green-600">
                        {logoFile.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Informations de base */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom de l'entreprise *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="business_sector">Secteur d'activité *</Label>
                    <Select value={formData.business_sector} onValueChange={(value) => handleInputChange('business_sector', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessSectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Pays *</Label>
                    <Input
                      id="country"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Devise *</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rccm">RCCM</Label>
                    <Input
                      id="rccm"
                      value={formData.rccm}
                      onChange={(e) => handleInputChange('rccm', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ninea">NINEA</Label>
                  <Input
                    id="ninea"
                    value={formData.ninea}
                    onChange={(e) => handleInputChange('ninea', e.target.value)}
                  />
                </div>

                {/* Informations sur les besoins */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Informations sur vos besoins</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employees_count">Nombre d'employés</Label>
                      <Select value={formData.employees_count} onValueChange={(value) => handleInputChange('employees_count', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 employés</SelectItem>
                          <SelectItem value="6-20">6-20 employés</SelectItem>
                          <SelectItem value="21-50">21-50 employés</SelectItem>
                          <SelectItem value="51-100">51-100 employés</SelectItem>
                          <SelectItem value="100+">Plus de 100 employés</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="monthly_transactions">Transactions mensuelles estimées</Label>
                      <Select value={formData.monthly_transactions} onValueChange={(value) => handleInputChange('monthly_transactions', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-100">0-100 transactions</SelectItem>
                          <SelectItem value="101-500">101-500 transactions</SelectItem>
                          <SelectItem value="501-1000">501-1000 transactions</SelectItem>
                          <SelectItem value="1000+">Plus de 1000 transactions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specific_needs">Besoins spécifiques</Label>
                  <Textarea
                    id="specific_needs"
                    rows={3}
                    placeholder="Décrivez vos besoins spécifiques, intégrations souhaitées, etc."
                    value={formData.specific_needs}
                    onChange={(e) => handleInputChange('specific_needs', e.target.value)}
                  />
                </div>

                {/* Informations du représentant */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Informations du représentant</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="representative_first_name">Prénom *</Label>
                      <Input
                        id="representative_first_name"
                        required
                        value={formData.representative_first_name}
                        onChange={(e) => handleInputChange('representative_first_name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="representative_last_name">Nom *</Label>
                      <Input
                        id="representative_last_name"
                        required
                        value={formData.representative_last_name}
                        onChange={(e) => handleInputChange('representative_last_name', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message complémentaire</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Ajoutez toute information complémentaire qui pourrait nous aider à vous proposer la meilleure solution..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande de devis'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
