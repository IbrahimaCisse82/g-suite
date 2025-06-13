import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useProducts, useProductCategories } from '@/hooks/useProducts';
import { ProductsTable } from '@/components/products/ProductsTable';
import { ProductForm } from '@/components/products/ProductForm';
import { CategoriesTable } from '@/components/products/CategoriesTable';
import { CategoryForm } from '@/components/products/CategoryForm';
import { Layout } from '@/components/Layout';

export const Products = () => {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useProductCategories();

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleCloseProductDialog = () => {
    setIsProductDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseCategoryDialog = () => {
    setIsCategoryDialogOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des produits</h1>
          <p className="text-gray-600">Gérez vos produits et catégories</p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Liste des produits</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedProduct(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau produit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedProduct ? 'Modifier le produit' : 'Créer un nouveau produit'}
                    </DialogTitle>
                  </DialogHeader>
                  <ProductForm 
                    product={selectedProduct} 
                    onClose={handleCloseProductDialog}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {productsLoading ? (
              <div className="text-center py-4">Chargement des produits...</div>
            ) : (
              <ProductsTable 
                products={products || []} 
                onEdit={handleEditProduct}
              />
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Catégories de produits</h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedCategory(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle catégorie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {selectedCategory ? 'Modifier la catégorie' : 'Créer une nouvelle catégorie'}
                    </DialogTitle>
                  </DialogHeader>
                  <CategoryForm 
                    category={selectedCategory} 
                    onClose={handleCloseCategoryDialog}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {categoriesLoading ? (
              <div className="text-center py-4">Chargement des catégories...</div>
            ) : (
              <CategoriesTable 
                categories={categories || []} 
                onEdit={handleEditCategory}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
