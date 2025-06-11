
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { month: 'Jan', revenus: 15000, charges: 8000, benefice: 7000 },
  { month: 'Fév', revenus: 18000, charges: 9500, benefice: 8500 },
  { month: 'Mar', revenus: 22000, charges: 11000, benefice: 11000 },
  { month: 'Avr', revenus: 25000, charges: 12500, benefice: 12500 },
  { month: 'Mai', revenus: 28000, charges: 13800, benefice: 14200 },
  { month: 'Jui', revenus: 32000, charges: 15000, benefice: 17000 },
];

export const FinancialChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Évolution financière</h2>
        <p className="text-gray-600">Revenus, charges et bénéfices sur 6 mois</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k€`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString('fr-FR')}€`, '']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenus" 
              stackId="1"
              stroke="#3B82F6" 
              fill="#3B82F6"
              fillOpacity={0.8}
              name="Revenus"
            />
            <Area 
              type="monotone" 
              dataKey="charges" 
              stackId="2"
              stroke="#EF4444" 
              fill="#EF4444"
              fillOpacity={0.8}
              name="Charges"
            />
            <Line 
              type="monotone" 
              dataKey="benefice" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Bénéfice"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
