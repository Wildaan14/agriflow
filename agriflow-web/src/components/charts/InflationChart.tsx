"use client";

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: '1 Mar', price: 28000, predict: 28000 },
  { name: '5 Mar', price: 29000, predict: 29000 },
  { name: '10 Mar', price: 31000, predict: 31000 },
  { name: '15 Mar', price: 35000, predict: 35000 },
  { name: '20 Mar', price: null, predict: 38000 },
  { name: '25 Mar', price: null, predict: 42000 },
  { name: '30 Mar', price: null, predict: 45000 },
];

export default function InflationChart() {
  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-[32px] border border-customBorder shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Tren & Prediksi Harga</h3>
          <p className="text-sm text-text-secondary">Komoditas: Cabai Merah (Jawa Timur)</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            <span className="text-xs font-bold text-text-secondary">Harga Aktual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary/30 rounded-full mr-2"></div>
            <span className="text-xs font-bold text-text-secondary">Prediksi AI</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B4D1B" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#1B4D1B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#C7E0B0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#5A7A5A', fontSize: 12, fontWeight: 600 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#5A7A5A', fontSize: 12, fontWeight: 600 }}
            tickFormatter={(value) => `Rp${value/1000}k`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: '1px solid #C7E0B0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#1B4D1B" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
          <Line 
            type="monotone" 
            dataKey="predict" 
            stroke="#1B4D1B" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-2xl flex items-center">
        <span className="text-warning font-bold mr-2">⚠️ Peringatan Inflasi:</span>
        <p className="text-sm text-text-primary italic">Harga diprediksi melampaui threshold normal (Rp 40.000) dalam 7 hari ke depan.</p>
      </div>
    </div>
  );
}
