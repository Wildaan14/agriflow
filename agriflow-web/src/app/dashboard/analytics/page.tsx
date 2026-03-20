"use client";

import { TrendUp, TrendDown, Calendar, ArrowUpRight, ChartLineUp } from '@phosphor-icons/react';
import InflationChart from '@/components/charts/InflationChart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-16 py-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4">Market Intelligence</h1>
          <p className="text-stripe-slate font-bold text-lg max-w-2xl leading-relaxed">
            Predictive analytics powered by LSTM models and satellite imagery.
          </p>
        </div>
        <div className="flex space-x-6">
           <button className="flex items-center space-x-4 bg-white/40 backdrop-blur-3xl border border-white/60 px-8 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] text-stripe-indigo hover:bg-white transition-all shadow-sm">
              <Calendar size={22} className="text-stripe-violet" />
              <span>March 2026</span>
           </button>
           <button className="bg-stripe-violet text-white px-10 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(99,91,255,0.4)] hover:bg-stripe-indigo hover:-translate-y-1 transition-all">
              Run Simulation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
         <TrendCard title="Buy Opportunity" value="Red Chili" sub="Price Drop -15% Predicted" type="up" />
         <TrendCard title="Hold Advisory" value="Garlic" sub="Supply Gap +5% Detected" type="down" />
         <TrendCard title="Hot Commodity" value="Premium Rice" sub="1.2k Active Trades" type="none" />
         <TrendCard title="Efficacy Index" value="98.2%" sub="AI Model Precision" type="none" />
      </div>

      <div className="glass-card rounded-[48px] p-12 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-stripe-violet/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
         <div className="flex justify-between items-center mb-12 relative z-10">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-stripe-violet/10 rounded-2xl flex items-center justify-center text-stripe-violet">
                  <ChartLineUp size={28} weight="bold" />
               </div>
               <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">30-Day Price Velocity</h2>
            </div>
            <div className="flex space-x-8">
               <span className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-stripe-slate">
                  <div className="w-3.5 h-3.5 rounded-full bg-stripe-violet shadow-[0_0_10px_rgba(99,91,255,0.4)]"></div>
                  <span>Market Spot</span>
               </span>
               <span className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-stripe-slate">
                  <div className="w-3.5 h-3.5 rounded-full bg-stripe-emerald shadow-[0_0_10px_rgba(0,217,36,0.4)]"></div>
                  <span>AI Forecast</span>
               </span>
            </div>
         </div>
         <div className="h-[450px] relative z-10">
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
       <div className="glass-card p-10 rounded-[40px] shadow-xl relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
          <div className="relative z-10">
             <p className="text-[11px] font-black text-stripe-slate uppercase tracking-[0.2em] mb-3 transition-transform group-hover:translate-x-1">{title}</p>
             <h3 className="text-2xl font-black text-stripe-indigo mb-2 tracking-tight transition-transform group-hover:translate-x-1 duration-500">{value}</h3>
             <div className="flex items-center transition-transform group-hover:translate-x-1 duration-700">
                {type !== 'none' && (
                   <div className={`mr-2 ${isUp ? 'text-stripe-emerald' : 'text-rose-500'}`}>
                      {isUp ? <TrendDown size={18} weight="bold" className="rotate-180" /> : <TrendUp size={18} weight="bold" className="rotate-180" />}
                   </div>
                 )}
                <p className={`text-[13px] font-bold ${isUp ? 'text-stripe-emerald' : isDown ? 'text-rose-500' : 'text-stripe-violet'}`}>
                   {sub}
                </p>
             </div>
          </div>
          <div className="absolute top-8 right-8 text-stripe-violet opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
             <ArrowUpRight size={28} weight="bold" />
          </div>
          {type !== 'none' && (
             <div className={`absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-1000 ${isUp ? 'text-stripe-emerald' : 'text-rose-500'}`}>
                {isUp ? <TrendDown size={160} weight="fill" /> : <TrendUp size={160} weight="fill" />}
             </div>
          )}
       </div>
    );
}
