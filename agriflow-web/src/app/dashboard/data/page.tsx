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
    <div className="space-y-12 py-8 animate-in fade-in duration-700">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-stripe-indigo/10 text-stripe-indigo px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-stripe-indigo/10">Market Intelligence Gateway</span>
              <span className="text-stripe-slate font-bold text-xs opacity-60">Status: Secure Data Active</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tighter mb-4 leading-tight">Agri Data Market</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-60">High-granularity analytics and GraphQL APIs for corporate food security intelligence.</p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-[22px] border border-slate-100">
           {['EXPLORER', 'INSIGHTS', 'API'].map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t as any)}
               className={`px-8 py-3.5 rounded-[18px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-stripe-indigo shadow-lg' : 'text-slate-400 hover:text-stripe-indigo'}`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 h-[750px] min-h-0">
         {/* Sidebar: Global Stats */}
         <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar">
            <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.2em] mb-8">Intelligence Overview</h3>
            <InsightStat label="API Uptime" value="99.98%" color="text-stripe-emerald" />
            <InsightStat label="Data Points" value="4.2B+" color="text-stripe-indigo" />
            <InsightStat label="Active Subscribers" value="124" color="text-stripe-indigo" />
            
            <div className="bg-stripe-emerald rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group mt-10">
               <Cpu size={32} weight="fill" className="mb-6 opacity-40 group-hover:scale-110 transition-transform" />
               <h5 className="text-xl font-black mb-2">Buy Intelligence</h5>
               <p className="text-[11px] font-bold opacity-70 leading-relaxed mb-8 text-emerald-50">Custom report generator for market expansion strategies.</p>
               <button className="w-full bg-white text-stripe-emerald py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">Contact Sales</button>
            </div>
         </aside>

         {/* Main Interactor */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'EXPLORER' && (
              <div className="glass-card-premium rounded-[64px] border border-stripe-indigo/10 h-full overflow-y-auto no-scrollbar p-12 shadow-2xl">
                 <div className="flex justify-between items-center mb-12">
                    <h3 className="text-3xl font-black text-stripe-indigo tracking-tighter">Market Intelligence Sets</h3>
                    <div className="flex space-x-4">
                       <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-stripe-slate">All Categories</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {DATA_SETS.map(set => (
                      <div key={set.id} className="p-10 rounded-[44px] bg-slate-50/50 border border-slate-100 hover:bg-white transition-all group flex flex-col justify-between h-[360px] cursor-pointer hover:shadow-2xl">
                         <div>
                            <div className="flex justify-between items-start mb-8 text-stripe-indigo">
                               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                  <Database size={28} weight="fill" />
                               </div>
                               <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest flex items-center space-x-1">
                                  <Lightning size={14} weight="fill" />
                                  <span>{set.reliability} Reliable</span>
                               </span>
                            </div>
                            <h5 className="text-2xl font-black text-stripe-indigo tracking-tight leading-tight mb-2">{set.title}</h5>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{set.category}</p>
                         </div>
                         <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-2xl font-black text-stripe-indigo">{set.price}</span>
                            <button className="px-8 py-4 bg-stripe-indigo text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Subscribe</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'INSIGHTS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
                 <div className="glass-card p-12 rounded-[56px] border border-stripe-indigo/5 flex flex-col justify-between h-full bg-white shadow-2xl">
                    <div>
                       <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-8">
                          <CreditCard size={32} weight="fill" />
                       </div>
                       <h4 className="text-3xl font-black text-stripe-indigo tracking-tight mb-4 leading-tight">Farmer Credit <br />Risk Scoring</h4>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 leading-relaxed mb-10">Differential-privacy protected credit analysis based on yield history, AgriScore, and transaction velocity.</p>
                       <div className="space-y-6">
                          <RiskRow label="Low Risk Clusters" count="4,240 Farmers" percentage="72%" />
                          <RiskRow label="Moderate Risk" count="1,120 Farmers" percentage="18%" />
                          <RiskRow label="High Risk / Underbanked" count="640 Farmers" percentage="10%" active />
                       </div>
                    </div>
                 </div>

                 <div className="glass-card p-12 rounded-[56px] border border-stripe-indigo/5 flex flex-col justify-between h-full bg-white shadow-2xl">
                    <div>
                       <div className="w-16 h-16 bg-stripe-emerald/5 rounded-2xl flex items-center justify-center text-stripe-emerald mb-8">
                          <Target size={32} weight="fill" />
                       </div>
                       <h4 className="text-3xl font-black text-stripe-indigo tracking-tight mb-4 leading-tight">National Supply <br />Volumetric Projection</h4>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 leading-relaxed mb-10">Predicting volumetric surplus and deficit for the upcoming agricultural cycle across 5 regions.</p>
                       <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-[11px] font-bold text-stripe-slate">
                          "Model AI memproyeksikan surplus beras +14% di Jawa Timur dan defisit cabai -8% di Bali dalam 60 hari mendatang."
                       </div>
                       <div className="mt-10 flex items-center justify-between p-6 bg-stripe-violet/5 border border-stripe-violet/10 rounded-2xl">
                           <span className="text-[10px] font-black text-stripe-violet uppercase tracking-widest">LSTM Confidence</span>
                           <span className="text-lg font-black text-stripe-violet">92.4%</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function InsightStat({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="glass-card p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 opacity-70">{label}</p>
       <span className={`text-2xl font-black ${color} tracking-tighter`}>{value}</span>
    </div>
  );
}

function RiskRow({ label, count, percentage, active }: { label: string, count: string, percentage: string, active?: boolean }) {
  return (
    <div className={`p-6 rounded-3xl border flex items-center justify-between ${active ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-100'}`}>
       <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-sm font-black text-stripe-indigo">{count}</p>
       </div>
       <span className="text-lg font-black text-stripe-indigo opacity-20">{percentage}</span>
    </div>
  );
}
