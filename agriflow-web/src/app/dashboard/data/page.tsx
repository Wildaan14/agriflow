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
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Agri Data Market</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">High-granularity analytics for corporate intelligence.</p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl shadow-sm border border-slate-200">
           {(['EXPLORER', 'INSIGHTS', 'API'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t)}
               className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-[#1B4D1B] shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 border border-transparent'}`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar: Stats */}
         <aside className="lg:col-span-1 space-y-6">
            <div className="card-clean p-8 shadow-sm">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Market Health</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center group">
                     <span className="text-[10px] font-bold text-slate-500 uppercase group-hover:text-[#1B4D1B] transition-colors">API Uptime</span>
                     <span className="text-sm font-bold text-[#14b850]">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center group">
                     <span className="text-[10px] font-bold text-slate-500 uppercase group-hover:text-[#1B4D1B] transition-colors">Data Points</span>
                     <span className="text-sm font-bold text-slate-900">4.2B+</span>
                  </div>
               </div>
            </div>
            
            <div className="card-clean p-8 bg-gradient-to-br from-[#1B4D1B] to-[#133813] text-white border-none shadow-xl relative overflow-hidden group">
               <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Cpu size={160} weight="fill" />
               </div>
               <div className="relative z-10">
                  <Cpu size={32} weight="duotone" className="text-[#14b850] mb-6" />
                  <h5 className="text-xl font-bold mb-2 tracking-tight">Custom Reports</h5>
                  <p className="text-xs text-white/70 leading-relaxed mb-8">Bespoke market expansion analysis strategies.</p>
                  <button className="w-full bg-[#14b850] hover:bg-[#20d863] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-[#14b850]/20 transition-all">Contact Sales</button>
               </div>
            </div>
         </aside>

         {/* Main Content */}
         <div className="lg:col-span-3">
            {activeTab === 'EXPLORER' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {DATA_SETS.map(set => (
                   <div key={set.id} className="card-clean p-8 flex flex-col justify-between h-[320px] hover:border-[#14b850]/40 hover:shadow-md transition-all group relative overflow-hidden">
                      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                         <Database size={120} weight="fill" className="text-slate-900" />
                      </div>
                      <div className="relative z-10">
                         <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#1B4D1B] transition-colors">
                               <Database size={28} weight="duotone" />
                            </div>
                            <span className="text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-3 py-1.5 rounded-lg uppercase tracking-widest">{set.reliability} Reliability</span>
                         </div>
                         <h5 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-[#1B4D1B] transition-colors">{set.title}</h5>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{set.category}</p>
                      </div>
                      <div className="pt-8 border-t border-slate-100 flex items-center justify-between relative z-10">
                         <span className="text-2xl font-bold text-slate-900 tracking-tight">{set.price}</span>
                         <button className="bg-slate-50 hover:bg-[#1B4D1B] hover:text-white text-slate-700 border border-slate-200 px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-sm">Subscribe</button>
                      </div>
                   </div>
                 ))}
              </div>
            ) : activeTab === 'INSIGHTS' ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="card-clean p-8 shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-8 shadow-sm">
                        <CreditCard size={28} weight="duotone" />
                     </div>
                     <h4 className="text-xl font-bold text-[#1B4D1B] mb-3">Farmer Risk Scoring</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium mb-10">Differential-privacy protected credit analysis based on yield history and transaction velocity.</p>
                     <div className="space-y-4">
                        <RiskStat label="Low Risk" count="4,240" percent="72%" color="bg-[#14b850]" />
                        <RiskStat label="Moderate" count="1,120" percent="18%" color="bg-amber-400" />
                     </div>
                  </div>
                  <div className="card-clean p-8 shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-8 shadow-sm">
                        <Target size={28} weight="duotone" />
                     </div>
                     <h4 className="text-xl font-bold text-[#1B4D1B] mb-3">Supply Projection</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium mb-10">Predicting volumetric surplus and deficit across 5 national agricultural clusters.</p>
                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LSTM Confidence</p>
                           <p className="text-lg font-bold text-slate-900">92.4%</p>
                        </div>
                        <TrendUp size={24} className="text-[#14b850]" weight="bold" />
                     </div>
                  </div>
               </div>
            ) : (
               <div className="card-clean p-24 flex flex-col items-center text-center shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                     <Terminal size={40} className="text-slate-400" weight="duotone" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B4D1B] mb-4">GraphQL API</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-10 font-medium leading-relaxed">Integrate real-time commodity pricing and supply forecasts directly into your ERP.</p>
                  <button className="bg-[#1B4D1B] text-white hover:bg-[#133813] px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-[#1B4D1B]/20 transition-all">View API Docs</button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function RiskStat({ label, count, percent, color }: { label: string, count: string, percent: string, color: string }) {
   return (
      <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors group">
         <div className="flex items-center gap-4">
            <div className={`w-1.5 h-8 rounded-full ${color}`}></div>
            <div>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">{label}</p>
               <p className="text-sm font-bold text-slate-900">{count} Farmers</p>
            </div>
         </div>
         <span className="text-lg font-bold text-slate-900">{percent}</span>
      </div>
   );
}
