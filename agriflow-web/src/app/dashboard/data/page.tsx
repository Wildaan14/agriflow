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
    <div className="space-y-8 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 lg:p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#14b850]/20 text-[#14b850] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(20,184,80,0.2)] border border-[#14b850]/30">Market Intelligence Gateway</span>
              <span className="text-white/40 font-bold text-[10px] uppercase tracking-widest hidden md:inline-block">Status: Secure Data Active</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-white">Agri Data <span className="text-[#14b850]">Market</span></h1>
           <p className="text-white/50 font-light text-sm lg:text-base leading-relaxed max-w-2xl">High-granularity analytics and GraphQL APIs for corporate food security intelligence.</p>
        </div>
        <div className="flex bg-[#0A0D14] p-1.5 rounded-2xl border border-white/[0.05] overflow-x-auto w-full lg:w-auto shrink-0">
           {(['EXPLORER', 'INSIGHTS', 'API'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t)}
               className={`flex-1 lg:flex-none px-6 lg:px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === t ? 'bg-[#14b850] text-[#0A0D14] shadow-[0_0_15px_rgba(20,184,80,0.3)]' : 'text-white/40 hover:text-white'}`}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
         {/* Sidebar: Global Stats */}
         <aside className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-6 flex items-center">
               <div className="w-2 h-2 rounded-full bg-[#14b850] mr-3"></div>
               Intelligence Overview
            </h3>
            <div className="space-y-4">
               <InsightStat label="API Uptime" value="99.98%" color="text-[#14b850]" />
               <InsightStat label="Data Points" value="4.2B+" color="text-white" />
               <InsightStat label="Active Subscribers" value="124" color="text-white" />
            </div>
            
            <div className="bg-[#14b850]/10 border border-[#14b850]/20 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group mt-8">
               <Cpu size={32} weight="fill" className="mb-6 opacity-40 group-hover:scale-110 transition-transform text-[#14b850]" />
               <h5 className="text-lg font-semibold mb-2">Buy Intelligence</h5>
               <p className="text-[11px] font-light text-white/60 leading-relaxed mb-6">Custom report generator for market expansion strategies.</p>
               <button className="w-full bg-[#14b850] text-[#0A0D14] py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#14b850] hover:shadow-[0_0_20px_rgba(20,184,80,0.4)] transition-all">Contact Sales</button>
            </div>
         </aside>

         {/* Main Interactor */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'EXPLORER' && (
              <div className="bg-white/[0.02] rounded-[32px] border border-white/[0.05] h-full overflow-y-auto no-scrollbar p-8 lg:p-10 shadow-2xl min-h-[500px]">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h3 className="text-2xl font-semibold text-white tracking-tight">Market Intelligence Sets</h3>
                    <div className="flex space-x-4 w-full md:w-auto">
                       <button className="w-full md:w-auto px-6 py-2.5 bg-[#0A0D14] border border-white/[0.1] rounded-xl font-bold text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:border-white/[0.2] transition-colors">All Categories</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DATA_SETS.map(set => (
                      <div key={set.id} className="p-8 rounded-[24px] bg-[#0A0D14] border border-white/[0.05] hover:border-[#14b850]/30 hover:bg-white/[0.02] transition-all group flex flex-col justify-between h-[280px] cursor-pointer shadow-lg">
                         <div>
                            <div className="flex justify-between items-start mb-6">
                               <div className="w-12 h-12 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center shadow-sm text-white/60 group-hover:text-[#14b850] transition-colors">
                                  <Database size={24} weight="fill" />
                               </div>
                               <span className="text-[9px] font-bold text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-2.5 py-1 rounded-md uppercase tracking-widest flex items-center space-x-1">
                                  <Lightning size={12} weight="fill" />
                                  <span>{set.reliability} Reliable</span>
                               </span>
                            </div>
                            <h5 className="text-lg font-semibold text-white tracking-tight leading-tight mb-2 group-hover:text-[#14b850] transition-colors">{set.title}</h5>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{set.category}</p>
                         </div>
                         <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
                            <span className="text-xl font-semibold text-white tracking-tight">{set.price}</span>
                            <button className="px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white/80 rounded-xl font-bold text-[9px] uppercase tracking-widest group-hover:bg-[#14b850] group-hover:text-[#0A0D14] group-hover:border-[#14b850] transition-all">Subscribe</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'INSIGHTS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                 <div className="bg-white/[0.02] p-8 lg:p-10 rounded-[32px] border border-white/[0.05] flex flex-col justify-between shadow-2xl hover:border-[#14b850]/20 transition-all min-h-[450px]">
                    <div>
                       <div className="w-14 h-14 bg-[#f43f5e]/10 border border-[#f43f5e]/20 rounded-xl flex items-center justify-center text-[#f43f5e] mb-8">
                          <CreditCard size={28} weight="fill" />
                       </div>
                       <h4 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4 leading-tight">Farmer Credit <br />Risk Scoring</h4>
                       <p className="text-sm font-light text-white/50 leading-relaxed mb-8">Differential-privacy protected credit analysis based on yield history, AgriScore, and transaction velocity.</p>
                       <div className="space-y-4">
                          <RiskRow label="Low Risk Clusters" count="4,240 Farmers" percentage="72%" />
                          <RiskRow label="Moderate Risk" count="1,120 Farmers" percentage="18%" />
                          <RiskRow label="High Risk / Underbanked" count="640 Farmers" percentage="10%" active />
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/[0.02] p-8 lg:p-10 rounded-[32px] border border-white/[0.05] flex flex-col justify-between shadow-2xl hover:border-[#14b850]/20 transition-all min-h-[450px]">
                    <div>
                       <div className="w-14 h-14 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] mb-8">
                          <Target size={28} weight="fill" />
                       </div>
                       <h4 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4 leading-tight">National Supply <br />Volumetric Projection</h4>
                       <p className="text-sm font-light text-white/50 leading-relaxed mb-8">Predicting volumetric surplus and deficit for the upcoming agricultural cycle across 5 regions.</p>
                       <div className="p-5 bg-[#0A0D14] rounded-2xl border border-white/[0.05] text-[11px] font-light text-white/70 leading-relaxed relative mb-8">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#14b850] rounded-l-2xl"></div>
                          "Model AI memproyeksikan surplus beras <span className="text-[#14b850] font-semibold">+14%</span> di Jawa Timur dan defisit cabai <span className="text-[#f43f5e] font-semibold">-8%</span> di Bali dalam 60 hari mendatang."
                       </div>
                       <div className="flex items-center justify-between p-5 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl">
                           <span className="text-[10px] font-bold text-[#8b5cf6] uppercase tracking-widest">LSTM Confidence</span>
                           <span className="text-lg font-semibold text-[#8b5cf6]">92.4%</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
            
            {activeTab === 'API' && (
               <div className="bg-white/[0.02] rounded-[32px] border border-white/[0.05] h-full flex flex-col items-center justify-center p-10 text-center shadow-2xl min-h-[500px]">
                  <Terminal size={64} className="text-[#14b850] opacity-50 mb-6" weight="thin" />
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">GraphQL API Access</h3>
                  <p className="text-sm font-light text-white/50 max-w-md mx-auto mb-8">Integrate real-time commodity pricing, supply forecasts, and AgriScore data directly into your corporate ERP.</p>
                  <button className="bg-[#14b850] text-[#0A0D14] px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#14b850] hover:shadow-[0_0_20px_rgba(20,184,80,0.4)] transition-all flex items-center space-x-2">
                     <Code size={16} weight="bold" />
                     <span>View API Documentation</span>
                  </button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function InsightStat({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-[#0A0D14] p-6 rounded-2xl border border-white/[0.05] shadow-lg transition-all hover:border-[#14b850]/20 group">
       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-3">{label}</p>
       <span className={`text-2xl font-semibold ${color} tracking-tight group-hover:scale-105 inline-block transition-transform origin-left`}>{value}</span>
    </div>
  );
}

function RiskRow({ label, count, percentage, active }: { label: string, count: string, percentage: string, active?: boolean }) {
  return (
    <div className={`p-5 rounded-xl border flex items-center justify-between transition-colors ${active ? 'bg-[#f43f5e]/10 border-[#f43f5e]/20' : 'bg-[#0A0D14] border-white/[0.05] hover:border-white/[0.1]'}`}>
       <div>
          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-sm font-semibold text-white">{count}</p>
       </div>
       <span className={`text-lg font-semibold ${active ? 'text-[#f43f5e]' : 'text-white/20'}`}>{percentage}</span>
    </div>
  );
}
