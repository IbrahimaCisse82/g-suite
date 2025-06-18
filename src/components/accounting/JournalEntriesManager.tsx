import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Save, Eye, Edit, Trash2, Download, Calendar } from 'lucide-react';

interface EcritureLigne {
  id: string;
  numeroCompte: string;
  libelleCompte: string;
  libelle: string;
  debit: number;
  credit: number;
}

interface EcritureComptable {
  id: string;
  numero: string;
  date: string;
  libelle: string;
  reference: string;
  lignes: EcritureLigne[];
  totalDebit: number;
  totalCredit: number;
  statut: 'brouillon' | 'validee' | 'cloturee';
  dateCreation: string;
}

const comptesExemples = [
  { numero: '101', libelle: 'Capital' },
  { numero: '512', libelle: 'Banque' },
  { numero: '601', libelle: 'Achats de matières premières' },
  { numero: '701', libelle: 'Ventes de produits finis' },
  { numero: '411', libelle: 'Clients' },
  { numero: '401', libelle: 'Fournisseurs' },
  { numero: '66', libelle: 'Charges de personnel' },
  { numero: '62', libelle: 'Services extérieurs A' },
];

export const JournalEntriesManager = () => {
  const [ecritures, setEcritures] = useState<EcritureComptable[]>([]);
  const [ecritureSelectionnee, setEcritureSelectionnee] = useState<EcritureComptable | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');
  
  // Formulaire d'écriture
  const [formData, setFormData] = useState({
    libelle: '',
    reference: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [lignes, setLignes] = useState<EcritureLigne[]>([
    {
      id: '1',
      numeroCompte: '',
      libelleCompte: '',
      libelle: '',
      debit: 0,
      credit: 0,
    }
  ]);

  const ajouterLigne = () => {
    const nouvelleLigne: EcritureLigne = {
      id: Date.now().toString(),
      numeroCompte: '',
      libelleCompte: '',
      libelle: '',
      debit: 0,
      credit: 0,
    };
    setLignes([...lignes, nouvelleLigne]);
  };

  const supprimerLigne = (id: string) => {
    if (lignes.length > 1) {
      setLignes(lignes.filter(ligne => ligne.id !== id));
    }
  };

  const mettreAJourLigne = (id: string, champ: string, valeur: any) => {
    setLignes(lignes.map(ligne => {
      if (ligne.id === id) {
        const ligneModifiee = { ...ligne, [champ]: valeur };
        
        // Mise à jour automatique du libellé du compte
        if (champ === 'numeroCompte') {
          const compte = comptesExemples.find(c => c.numero === valeur);
          ligneModifiee.libelleCompte = compte ? compte.libelle : '';
        }
        
        return ligneModifiee;
      }
      return ligne;
    }));
  };

  const calculerTotaux = () => {
    const totalDebit = lignes.reduce((sum, ligne) => sum + (ligne.debit || 0), 0);
    const totalCredit = lignes.reduce((sum, ligne) => sum + (ligne.credit || 0), 0);
    return { totalDebit, totalCredit };
  };

  const sauvegarderEcriture = (statut: 'brouillon' | 'validee' = 'brouillon') => {
    const { totalDebit, totalCredit } = calculerTotaux();
    
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      toast.error('L\'écriture n\'est pas équilibrée (Débit ≠ Crédit)');
      return;
    }

    if (!formData.libelle.trim()) {
      toast.error('Le libellé de l\'écriture est obligatoire');
      return;
    }

    const nouvelleEcriture: EcritureComptable = {
      id: ecritureSelectionnee?.id || Date.now().toString(),
      numero: `ECR${String(ecritures.length + 1).padStart(6, '0')}`,
      date: formData.date,
      libelle: formData.libelle,
      reference: formData.reference,
      lignes: [...lignes],
      totalDebit,
      totalCredit,
      statut,
      dateCreation: new Date().toISOString(),
    };

    if (ecritureSelectionnee) {
      setEcritures(ecritures.map(e => e.id === ecritureSelectionnee.id ? nouvelleEcriture : e));
      toast.success('Écriture modifiée avec succès');
    } else {
      setEcritures([nouvelleEcriture, ...ecritures]);
      toast.success(`Écriture ${statut === 'validee' ? 'validée' : 'sauvegardée'} avec succès`);
    }

    reinitialiserFormulaire();
    setIsDialogOpen(false);
  };

  const reinitialiserFormulaire = () => {
    setFormData({
      libelle: '',
      reference: '',
      date: new Date().toISOString().split('T')[0],
    });
    setLignes([{
      id: '1',
      numeroCompte: '',
      libelleCompte: '',
      libelle: '',
      debit: 0,
      credit: 0,
    }]);
    setEcritureSelectionnee(null);
    setIsViewMode(false);
  };

  const ouvrirEcriture = (ecriture: EcritureComptable, viewMode: boolean = false) => {
    setEcritureSelectionnee(ecriture);
    setFormData({
      libelle: ecriture.libelle,
      reference: ecriture.reference,
      date: ecriture.date,
    });
    setLignes([...ecriture.lignes]);
    setIsViewMode(viewMode);
    setIsDialogOpen(true);
  };

  const supprimerEcriture = (id: string) => {
    setEcritures(ecritures.filter(e => e.id !== id));
    toast.success('Écriture supprimée avec succès');
  };

  const ecrituresFiltrees = ecritures.filter(ecriture => {
    if (filtreStatut === 'tous') return true;
    return ecriture.statut === filtreStatut;
  });

  const { totalDebit, totalCredit } = calculerTotaux();
  const estEquilibree = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{ecritures.length}</div>
            <div className="text-sm text-gray-600">Total écritures</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {ecritures.filter(e => e.statut === 'validee').length}
            </div>
            <div className="text-sm text-gray-600">Validées</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {ecritures.filter(e => e.statut === 'brouillon').length}
            </div>
            <div className="text-sm text-gray-600">Brouillons</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {ecritures.reduce((sum, e) => sum + e.totalDebit, 0).toLocaleString('fr-FR')} FCFA
            </div>
            <div className="text-sm text-gray-600">Total mouvements</div>
          </CardContent>
        </Card>
      </div>

      {/* Boutons d'action et dialogue principal */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={reinitialiserFormulaire}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle écriture
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isViewMode ? 'Consulter l\'écriture' : 
                   ecritureSelectionnee ? 'Modifier l\'écriture' : 'Nouvelle écriture'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Informations générales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Référence</label>
                    <Input
                      placeholder="Référence du document"
                      value={formData.reference}
                      onChange={(e) => setFormData({...formData, reference: e.target.value})}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Libellé *</label>
                    <Input
                      placeholder="Libellé de l'écriture"
                      value={formData.libelle}
                      onChange={(e) => setFormData({...formData, libelle: e.target.value})}
                      disabled={isViewMode}
                    />
                  </div>
                </div>

                {/* Lignes d'écriture */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Lignes d'écriture</h3>
                    {!isViewMode && (
                      <Button onClick={ajouterLigne} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une ligne
                      </Button>
                    )}
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>N° Compte</TableHead>
                          <TableHead>Libellé du compte</TableHead>
                          <TableHead>Libellé</TableHead>
                          <TableHead>Débit</TableHead>
                          <TableHead>Crédit</TableHead>
                          {!isViewMode && <TableHead>Actions</TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lignes.map((ligne, index) => (
                          <TableRow key={ligne.id}>
                            <TableCell>
                              <Select
                                value={ligne.numeroCompte}
                                onValueChange={(value) => mettreAJourLigne(ligne.id, 'numeroCompte', value)}
                                disabled={isViewMode}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                                <SelectContent>
                                  {comptesExemples.map((compte) => (
                                    <SelectItem key={compte.numero} value={compte.numero}>
                                      {compte.numero} - {compte.libelle}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                value={ligne.libelleCompte}
                                onChange={(e) => mettreAJourLigne(ligne.id, 'libelleCompte', e.target.value)}
                                disabled={true}
                                className="bg-gray-50"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Libellé de la ligne"
                                value={ligne.libelle}
                                onChange={(e) => mettreAJourLigne(ligne.id, 'libelle', e.target.value)}
                                disabled={isViewMode}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={ligne.debit || ''}
                                onChange={(e) => mettreAJourLigne(ligne.id, 'debit', parseFloat(e.target.value) || 0)}
                                disabled={isViewMode}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={ligne.credit || ''}
                                onChange={(e) => mettreAJourLigne(ligne.id, 'credit', parseFloat(e.target.value) || 0)}
                                disabled={isViewMode}
                              />
                            </TableCell>
                            {!isViewMode && (
                              <TableCell>
                                <Button
                                  onClick={() => supprimerLigne(ligne.id)}
                                  variant="ghost"
                                  size="sm"
                                  disabled={lignes.length === 1}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Totaux */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Débit: </span>
                        <span className="font-bold text-blue-600">
                          {totalDebit.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Total Crédit: </span>
                        <span className="font-bold text-green-600">
                          {totalCredit.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Équilibre: </span>
                        <Badge variant={estEquilibree ? "default" : "destructive"}>
                          {estEquilibree ? 'Équilibrée' : 'Non équilibrée'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                {!isViewMode && (
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => sauvegarderEcriture('brouillon')}
                      variant="outline"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder brouillon
                    </Button>
                    <Button
                      onClick={() => sauvegarderEcriture('validee')}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!estEquilibree}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Valider l'écriture
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>

        <Select value={filtreStatut} onValueChange={setFiltreStatut}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les statuts</SelectItem>
            <SelectItem value="brouillon">Brouillons</SelectItem>
            <SelectItem value="validee">Validées</SelectItem>
            <SelectItem value="cloturee">Clôturées</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tableau des écritures */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des écritures comptables</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Écriture</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Libellé</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Débit</TableHead>
                <TableHead>Crédit</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecrituresFiltrees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Aucune écriture comptable trouvée
                  </TableCell>
                </TableRow>
              ) : (
                ecrituresFiltrees.map((ecriture) => (
                  <TableRow key={ecriture.id}>
                    <TableCell className="font-medium">{ecriture.numero}</TableCell>
                    <TableCell>{new Date(ecriture.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{ecriture.libelle}</TableCell>
                    <TableCell>{ecriture.reference}</TableCell>
                    <TableCell>{ecriture.totalDebit.toLocaleString('fr-FR')} FCFA</TableCell>
                    <TableCell>{ecriture.totalCredit.toLocaleString('fr-FR')} FCFA</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          ecriture.statut === 'validee' ? 'default' :
                          ecriture.statut === 'brouillon' ? 'secondary' : 'outline'
                        }
                      >
                        {ecriture.statut === 'validee' ? 'Validée' :
                         ecriture.statut === 'brouillon' ? 'Brouillon' : 'Clôturée'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => ouvrirEcriture(ecriture, true)}
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {ecriture.statut === 'brouillon' && (
                          <Button
                            onClick={() => ouvrirEcriture(ecriture, false)}
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {ecriture.statut === 'brouillon' && (
                          <Button
                            onClick={() => supprimerEcriture(ecriture.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
