"use client";

import { TrendUp, TrendDown, Calendar, ArrowUpRight, ChartLineUp } from '@phosphor-icons/react';
import InflationChart from '@/components/charts/InflationChart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">Market <span className="text-[#14b850]">Intelligence</span></h1>
          <p className="text-white/50 text-sm font-light max-w-2xl leading-relaxed">
            Predictive analytics powered by LSTM models and satellite imagery.
          </p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none flex items-center justify-center space-x-3 bg-white/[0.05] border border-white/[0.1] px-6 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest text-white hover:bg-white/[0.1] transition-all">
              <Calendar size={18} className="text-[#14b850]" />
              <span>March 2026</span>
           </button>
           <button className="flex-1 lg:flex-none bg-[#14b850] text-[#0A0D14] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all">
              Run Simulation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         <TrendCard title="Buy Opportunity" value="Red Chili" sub="Price Drop -15% Predicted" type="up" />
         <TrendCard title="Hold Advisory" value="Garlic" sub="Supply Gap +5% Detected" type="down" />
         <TrendCard title="Hot Commodity" value="Premium Rice" sub="1.2k Active Trades" type="none" />
         <TrendCard title="Efficacy Index" value="98.2%" sub="AI Model Precision" type="none" />
      </div>

      <div className="bg-white/[0.02] rounded-[32px] p-10 shadow-2xl border border-white/[0.05] relative overflow-hidden backdrop-blur-xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#14b850]/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/[0.05] pb-6 relative z-10">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
               <div className="w-12 h-12 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] shadow-[0_0_15px_rgba(20,184,80,0.1)]">
                  <ChartLineUp size={24} weight="bold" />
               </div>
               <h2 className="text-xl font-semibold text-white tracking-tight">30-Day Price Velocity</h2>
            </div>
            <div className="flex space-x-6">
               <span className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40"></div>
                  <span>Market Spot</span>
               </span>
               <span className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#14b850]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14b850] shadow-[0_0_10px_rgba(20,184,80,0.4)]"></div>
                  <span>AI Forecast</span>
               </span>
            </div>
         </div>
         <div className="h-[450px] relative z-10 w-full">
            <InflationChart />
         </div>
      </div>
    </div>
  );
}

interface TrendCardProps {
  title: string;
  value: string;
  sub: string;
  type: 'up' | 'down' | 'none';
}

function TrendCard({ title, value, sub, type }: TrendCardProps) {
    const isUp = type === 'up';
    const isDown = type === 'down';

    return (
       <div className="bg-white/[0.02] p-8 rounded-[24px] border border-white/[0.05] shadow-xl relative overflow-hidden group cursor-pointer hover:border-[#14b850]/30 hover:bg-[#14b850]/5 transition-all duration-500 hover:-translate-y-1">
          <div className="relative z-10">
             <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 transition-colors group-hover:text-white/70">{title}</p>
             <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">{value}</h3>
             <div className="flex items-center">
                {type !== 'none' && (
                   <div className={`mr-2 ${isUp ? 'text-[#14b850]' : 'text-[#f43f5e]'}`}>
                      {isUp ? <TrendDown size={16} weight="bold" className="rotate-180" /> : <TrendUp size={16} weight="bold" className="rotate-180" />}
                   </div>
                 )}
                <p className={`text-[11px] font-medium ${isUp ? 'text-[#14b850]' : isDown ? 'text-[#f43f5e]' : 'text-[#0ea5e9]'}`}>
                   {sub}
                </p>
             </div>
          </div>
          <div className="absolute top-6 right-6 text-white/10 group-hover:text-[#14b850] group-hover:rotate-12 transition-all duration-500">
             <ArrowUpRight size={24} weight="bold" />
          </div>
          {type !== 'none' && (
             <div className={`absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none ${isUp ? 'text-[#14b850]' : 'text-[#f43f5e]'}`}>
                {isUp ? <TrendDown size={120} weight="fill" /> : <TrendUp size={120} weight="fill" />}
             </div>
          )}
       </div>
    );
}
