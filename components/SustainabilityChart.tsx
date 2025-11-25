import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ProductData } from '../types';

interface SustainabilityChartProps {
  data: ProductData['sustainability'];
}

export const SustainabilityChart: React.FC<SustainabilityChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Carbon (kg)', value: data.carbonFootprint, color: '#F26334' },
    { name: 'Water (L)', value: data.waterUsage, color: '#00B5E2' },
  ];

  return (
    <div className="h-64 w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Environmental Impact</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>Lower is better</span>
        <span>Recyclability: {data.recyclability}%</span>
      </div>
    </div>
  );
};