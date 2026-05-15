"use client";

import { TrendUp, TrendDown, Calendar, ArrowUpRight, ChartLineUp } from '@phosphor-icons/react';
import InflationChart from '@/components/charts/InflationChart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Market Intelligence</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Predictive analytics powered by LSTM models.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:bg-slate-50 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2">
              <Calendar size={18} weight="bold" />
              <span>March 2026</span>
           </button>
           <button className="btn-minimal bg-[#1B4D1B] text-white hover:bg-[#133813] px-6 py-2.5 rounded-xl font-bold shadow-md shadow-[#1B4D1B]/20 transition-all">
              Run Simulation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         <TrendCard title="Buy Opportunity" value="Red Chili" sub="Drop -15% Prediction" type="up" />
         <TrendCard title="Hold Advisory" value="Garlic" sub="Supply Gap +5%" type="down" />
         <TrendCard title="Hot Commodity" value="Premium Rice" sub="1.2k Active Trades" type="none" />
         <TrendCard title="Efficacy Index" value="98.2%" sub="Model Precision" type="none" />
      </div>

      <div className="card-clean p-8 shadow-sm">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#14b850]">
                  <ChartLineUp size={24} weight="duotone" />
               </div>
               <h2 className="text-xl font-bold text-slate-900 tracking-tight">30-Day Price Velocity</h2>
            </div>
            <div className="flex space-x-6 mt-6 md:mt-0 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
               <span className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400"></div>
                  <span>Market Spot</span>
               </span>
               <span className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#14b850]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14b850] shadow-[0_0_8px_rgba(20,184,80,0.5)]"></div>
                  <span>AI Forecast</span>
               </span>
            </div>
         </div>
         <div className="h-[400px] w-full">
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
       <div className="card-clean p-8 hover:border-[#14b850]/40 hover:shadow-md transition-all group relative overflow-hidden">
          {isUp && <div className="absolute -right-6 -top-6 opacity-5 group-hover:scale-125 transition-transform duration-700 text-[#14b850]"><TrendDown size={100} weight="fill" className="rotate-180" /></div>}
          {isDown && <div className="absolute -right-6 -top-6 opacity-5 group-hover:scale-125 transition-transform duration-700 text-rose-500"><TrendUp size={100} weight="fill" className="rotate-180" /></div>}
          
          <div className="relative z-10">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-slate-600 transition-colors">{title}</p>
             <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#1B4D1B] transition-colors">{value}</h3>
             <div className="flex items-center">
                {type !== 'none' && (
                   <div className={`mr-1.5 ${isUp ? 'text-[#14b850]' : 'text-rose-500'} bg-${isUp ? '[#14b850]/10' : 'rose-50'} p-1 rounded-full`}>
                      {isUp ? <TrendDown size={14} weight="bold" className="rotate-180" /> : <TrendUp size={14} weight="bold" className="rotate-180" />}
                   </div>
                 )}
                <p className={`text-[11px] font-bold tracking-wide ${isUp ? 'text-[#14b850]' : isDown ? 'text-rose-600' : 'text-slate-500'}`}>
                   {sub}
                </p>
             </div>
          </div>
       </div>
    );
}
