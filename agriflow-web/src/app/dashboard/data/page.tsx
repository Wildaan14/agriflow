"use client";

import React, { useState } from 'react';
import { 
  Database, 
  Lightning, 
  ChartLineUp, 
  Lock, 
  Code, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  TrendUp,
  Cpu,
  Globe,
  SquaresFour,
  CaretRight,
  FileText,
  CreditCard,
  Target
} from '@phosphor-icons/react';

const DATA_SETS = [
  { id: 1, title: 'National Rice Supply Projection', category: 'SURPLUS/DEFICIT', reliability: '94%', price: '$2,400/mo' },
  { id: 2, title: 'Farmer Credit Risk Score (Jatim)', category: 'FINANCIAL', reliability: '88%', price: '$1,850/mo' },
  { id: 3, title: 'Vegetable Price Volatility Index', category: 'PRICING', reliability: '92%', price: '$1,200/mo' },
];

export default function DataMarketPage() {
  const [activeTab, setActiveTab] = useState<'EXPLORER' | 'INSIGHTS' | 'API'>('EXPLORER');

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agri Data Market</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">High-granularity analytics for corporate intelligence.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {(['EXPLORER', 'INSIGHTS', 'API'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t)}
               className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar: Stats */}
         <aside className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Market Health</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">API Uptime</span>
                     <span className="text-xs font-bold text-[#14b850]">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Data Points</span>
                     <span className="text-xs font-bold text-slate-900">4.2B+</span>
                  </div>
               </div>
            </div>
            
            <div className="card-clean p-6 bg-slate-900 text-white border-none shadow-xl">
               <Cpu size={24} weight="fill" className="text-[#14b850] mb-4" />
               <h5 className="text-base font-bold mb-1 tracking-tight">Custom Reports</h5>
               <p className="text-[11px] text-slate-400 leading-relaxed mb-6">Bespoke market expansion analysis strategies.</p>
               <button className="w-full btn-minimal bg-[#14b850] text-white py-2.5 text-[10px]">Contact Sales</button>
            </div>
         </aside>

         {/* Main Content */}
         <div className="lg:col-span-3">
            {activeTab === 'EXPLORER' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {DATA_SETS.map(set => (
                   <div key={set.id} className="card-clean p-8 flex flex-col justify-between h-[280px]">
                      <div>
                         <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                               <Database size={20} weight="fill" />
                            </div>
                            <span className="text-[9px] font-bold text-[#14b850] bg-green-50 px-2.5 py-1 rounded-md uppercase tracking-widest">{set.reliability} Reliability</span>
                         </div>
                         <h5 className="text-lg font-bold text-slate-900 tracking-tight leading-tight mb-2">{set.title}</h5>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{set.category}</p>
                      </div>
                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-xl font-bold text-slate-900 tracking-tight">{set.price}</span>
                         <button className="btn-minimal btn-primary py-2 text-[10px]">Subscribe</button>
                      </div>
                   </div>
                 ))}
              </div>
            ) : activeTab === 'INSIGHTS' ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card-clean p-8">
                     <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mb-6">
                        <CreditCard size={24} weight="fill" />
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 mb-4">Farmer Risk Scoring</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8">Differential-privacy protected credit analysis based on yield history and transaction velocity.</p>
                     <div className="space-y-3">
                        <RiskStat label="Low Risk" count="4,240" percent="72%" />
                        <RiskStat label="Moderate" count="1,120" percent="18%" />
                     </div>
                  </div>
                  <div className="card-clean p-8">
                     <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mb-6">
                        <Target size={24} weight="fill" />
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 mb-4">Supply Projection</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8">Predicting volumetric surplus and deficit across 5 national agricultural clusters.</p>
                     <div className="p-4 bg-slate-50 rounded-xl border border-transparent">
                        <p className="text-xs font-bold text-slate-900">LSTM Confidence: 92.4%</p>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="card-clean p-20 flex flex-col items-center text-center">
                  <Terminal size={48} className="text-slate-400 mb-6" weight="thin" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">GraphQL API</h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-8 font-medium">Integrate real-time commodity pricing and supply forecasts directly into your ERP.</p>
                  <button className="btn-minimal btn-primary px-8 py-3 text-[10px]">View API Docs</button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function RiskStat({ label, count, percent }: { label: string, count: string, percent: string }) {
   return (
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
         <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xs font-bold text-slate-900">{count} Farmers</p>
         </div>
         <span className="text-sm font-bold text-slate-400">{percent}</span>
      </div>
   );
}
