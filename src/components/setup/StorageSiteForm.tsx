
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Warehouse, Store, Building, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StorageSite {
  name: string;
  site_type: 'warehouse' | 'store' | 'depot' | 'showroom';
  address?: string;
  city?: string;
  postal_code?: string;
  country: string;
  phone?: string;
  manager_name?: string;
  capacity_m2?: number;
}

interface StorageSiteFormProps {
  onSuccess: () => void;
}

export const StorageSiteForm = ({ onSuccess }: StorageSiteFormProps) => {
  const [sites, setSites] = useState<StorageSite[]>([{
    name: '',
    site_type: 'warehouse',
    address: '',
    city: '',
    postal_code: '',
    country: 'Sénégal',
    phone: '',
    manager_name: '',
    capacity_m2: 0
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const siteTypes = [
    { value: 'warehouse', label: 'Entrepôt', icon: Warehouse },
    { value: 'store', label: 'Magasin', icon: Store },
    { value: 'depot', label: 'Dépôt', icon: Building },
    { value: 'showroom', label: 'Showroom', icon: Package }
  ];

  const addSite = () => {
    setSites([...sites, {
      name: '',
      site_type: 'warehouse',
      address: '',
      city: '',
      postal_code: '',
      country: 'Sénégal',
      phone: '',
      manager_name: '',
      capacity_m2: 0
    }]);
  };

  const removeSite = (index: number) => {
    if (sites.length > 1) {
      setSites(sites.filter((_, i) => i !== index));
    }
  };

  const updateSite = (index: number, field: keyof StorageSite, value: any) => {
    const updatedSites = [...sites];
    updatedSites[index] = { ...updatedSites[index], [field]: value };
    setSites(updatedSites);
  };

  const handleSubmit = async () => {
    // Validation
    const validSites = sites.filter(site => site.name.trim() !== '');
    if (validSites.length === 0) {
      toast.error('Veuillez ajouter au moins un site avec un nom');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Entreprise non trouvée');

      const sitesToInsert = validSites.map(site => ({
        company_id: profile.company_id,
        name: site.name,
        address: site.address,
        city: site.city,
        country: site.country
      }));

      const { error } = await supabase
        .from('storage_sites')
        .insert(sitesToInsert);

      if (error) throw error;

      toast.success(`${validSites.length} site(s) de stockage créé(s) avec succès`);
      onSuccess();
    } catch (error) {
      console.error('Erreur lors de la création des sites:', error);
      toast.error('Erreur lors de la création des sites');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {sites.map((site, index) => {
        const TypeIcon = siteTypes.find(type => type.value === site.site_type)?.icon || Warehouse;
        
        return (
          <Card key={index} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <TypeIcon className="w-4 h-4" />
                  <span>Site {index + 1}</span>
                </CardTitle>
                {sites.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSite(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom du site *</label>
                  <Input
                    placeholder="Ex: Entrepôt principal Dakar"
                    value={site.name}
                    onChange={(e) => updateSite(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type de site</label>
                  <Select 
                    value={site.site_type} 
                    onValueChange={(value) => updateSite(index, 'site_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {siteTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Adresse</label>
                <Input
                  placeholder="Adresse complète"
                  value={site.address || ''}
                  onChange={(e) => updateSite(index, 'address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ville</label>
                  <Input
                    placeholder="Ex: Dakar"
                    value={site.city || ''}
                    onChange={(e) => updateSite(index, 'city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Code postal</label>
                  <Input
                    placeholder="Ex: 10000"
                    value={site.postal_code || ''}
                    onChange={(e) => updateSite(index, 'postal_code', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pays</label>
                  <Select 
                    value={site.country} 
                    onValueChange={(value) => updateSite(index, 'country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sénégal">Sénégal</SelectItem>
                      <SelectItem value="Mali">Mali</SelectItem>
                      <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                      <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                      <SelectItem value="Niger">Niger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <Input
                    placeholder="Ex: +221 77 123 45 67"
                    value={site.phone || ''}
                    onChange={(e) => updateSite(index, 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Responsable</label>
                  <Input
                    placeholder="Nom du responsable"
                    value={site.manager_name || ''}
                    onChange={(e) => updateSite(index, 'manager_name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capacité (m²)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={site.capacity_m2 || ''}
                    onChange={(e) => updateSite(index, 'capacity_m2', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addSite}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un autre site
        </Button>

        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Création...' : 'Enregistrer les sites'}
        </Button>
      </div>
    </div>
  );
};
