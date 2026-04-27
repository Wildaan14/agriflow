"use client";

import { TrendUp, TrendDown, Calendar, ArrowUpRight, ChartLineUp } from '@phosphor-icons/react';
import InflationChart from '@/components/charts/InflationChart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Market Intelligence</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Predictive analytics powered by LSTM models.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-secondary text-xs px-4">
              <Calendar size={16} />
              <span>March 2026</span>
           </button>
           <button className="btn-minimal btn-primary text-xs px-4">
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

      <div className="card-clean p-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-slate-50">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                  <ChartLineUp size={20} weight="bold" />
               </div>
               <h2 className="text-lg font-bold text-slate-900 tracking-tight">30-Day Price Velocity</h2>
            </div>
            <div className="flex space-x-6">
               <span className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-slate-100 border border-slate-200"></div>
                  <span>Market Spot</span>
               </span>
               <span className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#14b850]">
                  <div className="w-2 h-2 rounded-full bg-[#14b850]"></div>
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
       <div className="card-clean p-6 hover:border-slate-200 group">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</p>
          <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{value}</h3>
          <div className="flex items-center">
             {type !== 'none' && (
                <div className={`mr-1.5 ${isUp ? 'text-[#14b850]' : 'text-rose-500'}`}>
                   {isUp ? <TrendDown size={14} weight="bold" className="rotate-180" /> : <TrendUp size={14} weight="bold" className="rotate-180" />}
                </div>
              )}
             <p className={`text-[10px] font-bold ${isUp ? 'text-[#14b850]' : isDown ? 'text-rose-500' : 'text-slate-500'}`}>
                {sub}
             </p>
          </div>
       </div>
    );
}
