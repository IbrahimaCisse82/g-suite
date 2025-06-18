
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, Tag } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductsTable } from '@/components/products/ProductsTable';
import { CategoriesTable } from '@/components/products/CategoriesTable';
import { ProductForm } from '@/components/products/ProductForm';
import { CategoryForm } from '@/components/products/CategoryForm';
import { Layout } from '@/components/Layout';

export const Products = () => {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const { data: products = [], isLoading } = useProducts();

  const handleEditProduct = (product: any) => {
    console.log('Edit product:', product);
  };

  const handleEditCategory = (category: any) => {
    console.log('Edit category:', category);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              Gestion des produits
            </h1>
            <p className="text-xl text-readable-secondary">Gérez votre catalogue de produits et services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Total produits</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">{products.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Produits actifs</CardTitle>
                <Package className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {products.length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Valeur totale</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'XOF'
                  }).format(products.reduce((sum, p) => sum + (p.unit_price || 0), 0))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="bg-white shadow-lg">
              <TabsTrigger value="products" className="text-readable-primary">Produits</TabsTrigger>
              <TabsTrigger value="categories" className="text-readable-primary">Catégories</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-readable-primary">Liste des produits</h2>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau produit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-readable-primary">Ajouter un produit</DialogTitle>
                    </DialogHeader>
                    <ProductForm onClose={() => setIsProductDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-0">
                  <ProductsTable products={products} onEdit={handleEditProduct} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-readable-primary">Catégories de produits</h2>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle catégorie
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-readable-primary">Ajouter une catégorie</DialogTitle>
                    </DialogHeader>
                    <CategoryForm onClose={() => setIsCategoryDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-0">
                  <CategoriesTable categories={[]} onEdit={handleEditCategory} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};
