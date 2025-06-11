
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Fév', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Avr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'Mai', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Juin', revenue: 67000, expenses: 42000, profit: 25000 }
];

const categoryData = [
  { name: 'Ventes produits', value: 65, color: '#3B82F6' },
  { name: 'Services', value: 25, color: '#10B981' },
  { name: 'Consulting', value: 10, color: '#F59E0B' }
];

const expenseData = [
  { name: 'Salaires', value: 40, color: '#EF4444' },
  { name: 'Loyer', value: 20, color: '#8B5CF6' },
  { name: 'Fournitures', value: 15, color: '#06B6D4' },
  { name: 'Marketing', value: 12, color: '#F97316' },
  { name: 'Autres', value: 13, color: '#6B7280' }
];

export const Analytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const metrics = [
    {
      id: 'revenue',
      title: 'Chiffre d\'affaires',
      value: '348 000 XOF',
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      id: 'growth',
      title: 'Croissance',
      value: '+23.5%',
      change: '+4.1%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 'customers',
      title: 'Nouveaux clients',
      value: '12',
      change: '+8 clients',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 'margin',
      title: 'Marge bénéficiaire',
      value: '28.5%',
      change: '+2.1%',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analyse</h1>
          <p className="text-gray-600 mt-2">Tableaux de bord et analyses approfondies</p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 derniers mois</SelectItem>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="lastyear">Année précédente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-600 font-medium mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Graphique des revenus et dépenses */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution revenus vs dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [
                      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(value),
                      ''
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" name="Revenus" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Dépenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Répartition des revenus */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Évolution du profit */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution du bénéfice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [
                      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(value),
                      'Bénéfice'
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Répartition des dépenses */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
