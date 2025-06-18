
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Package, Calendar } from 'lucide-react';
import { Layout } from '@/components/Layout';

const mockSalesData = [
  { month: 'Jan', sales: 4000, profit: 2400 },
  { month: 'Fév', sales: 3000, profit: 1398 },
  { month: 'Mar', sales: 2000, profit: 9800 },
  { month: 'Avr', sales: 2780, profit: 3908 },
  { month: 'Mai', sales: 1890, profit: 4800 },
  { month: 'Jun', sales: 2390, profit: 3800 },
];

const mockProductData = [
  { name: 'Produit A', value: 400, color: '#22c55e' },
  { name: 'Produit B', value: 300, color: '#3b82f6' },
  { name: 'Produit C', value: 200, color: '#f59e0b' },
  { name: 'Produit D', value: 100, color: '#ef4444' },
];

export const Analytics = () => {
  const [period, setPeriod] = useState('6months');

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Analyses & Statistiques
            </h1>
            <p className="text-xl text-readable-secondary">Analysez les performances de votre entreprise</p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-readable-primary">Tableau de bord analytique</h2>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1month">1 mois</SelectItem>
                <SelectItem value="3months">3 mois</SelectItem>
                <SelectItem value="6months">6 mois</SelectItem>
                <SelectItem value="1year">1 an</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">CA Total</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">2,350,000 FCFA</div>
                <p className="text-xs text-green-600">+12% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Nouveaux clients</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">45</div>
                <p className="text-xs text-blue-600">+8% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Produits vendus</CardTitle>
                <Package className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">324</div>
                <p className="text-xs text-orange-600">+5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Commandes</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">89</div>
                <p className="text-xs text-purple-600">+15% par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-readable-primary">Évolution des ventes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-readable-primary">Répartition des ventes par produit</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockProductData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {mockProductData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-readable-primary">Performance mensuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#22c55e" />
                  <Bar dataKey="profit" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
