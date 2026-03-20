"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CloudRain, 
  Thermometer, 
  TrendUp, 
  CheckCircle, 
  Warning, 
  Wallet, 
  Clock,
  ArrowRight,
  DotsThreeVertical,
  CaretRight,
  Info,
  Globe
} from '@phosphor-icons/react';
import Link from 'next/link';

const POLICY = {
  id: 'AG-INS-842',
  plan: 'CROP_PROTECT_PREMIUM',
  premium: 'Rp 45.000 / bln',
  coverage: 'Up to Rp 5.000.000',
  status: 'ACTIVE',
  farm: 'Kediri Plot #4'
};

const HISTORY = [
  { id: 'PAY-741', date: '12 Jan 2024', reason: 'Extreme Rainfall (>150mm)', amount: 'Rp 1.250.000', status: 'PAID' },
  { id: 'PAY-522', date: '04 Nov 2023', reason: 'Drought Threshold (35°C)', amount: 'Rp 850.000', status: 'PAID' },
];

export default function InsurancePage() {
  return (
    <div className="space-y-12 py-8 animate-in fade-in duration-700">
      {/* Refined Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-stripe-emerald text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-stripe-emerald/20">Parametric Oracle — ACTIVE</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none italic">Agri-Micro Insurance</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70 italic font-serif leading-none">Automated payouts triggered by audited weather data (BMKG) with zero-claim filing.</p>
        </div>
        <div className="flex space-x-4">
           <div className="bg-white/80 backdrop-blur-2xl border border-white px-8 py-4 rounded-[22px] shadow-sm text-center flex flex-col justify-center">
              <p className="text-[9px] font-black text-stripe-indigo uppercase tracking-widest mb-1 opacity-40 italic">Total Payouts</p>
              <p className="text-xl font-black text-stripe-emerald tracking-tighter">Rp 2.100.000</p>
           </div>
           <button className="bg-stripe-indigo text-white px-8 py-6 rounded-[22px] shadow-2xl shadow-stripe-indigo/20 font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all">Download Policy PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 h-[650px] min-h-0">
         {/* Live Oracle Monitoring */}
         <div className="lg:col-span-2 space-y-8 h-full overflow-y-auto no-scrollbar">
            <div className="glass-card-premium p-12 rounded-[56px] border border-stripe-indigo/10 shadow-2xl relative overflow-hidden h-[400px] flex flex-col justify-between group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-emerald/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:scale-150 duration-1000"></div>
               <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center space-x-4">
                     <div className="w-14 h-14 bg-stripe-emerald rounded-2xl flex items-center justify-center text-white shadow-xl shadow-stripe-emerald/20">
                        <CloudRain size={32} weight="fill" />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-stripe-indigo tracking-tight leading-none mb-1">Live Plot Conditions</h3>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Status: Kediri Plot #4 • Audited by BMKG</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 text-stripe-emerald">
                     <CheckCircle size={18} weight="fill" />
                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">Under Threshold</span>
                  </div>
               </div>

               <div className="flex items-center justify-between relative z-10">
                  <WeatherMetric icon={Thermometer} label="Temperature" value="31.4°C" threshold="35°C" color="text-rose-500" />
                  <WeatherMetric icon={CloudRain} label="Rainfall (12h)" value="12.5mm" threshold="150mm" color="text-stripe-indigo" />
                  <WeatherMetric icon={TrendUp} label="Humidity" value="68%" threshold="90%" color="text-stripe-emerald" />
               </div>

               <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 italic text-[11px] font-bold text-stripe-slate relative z-10">
                  "Payout akan otomatis terpicu jika curah hujan melampaui 150mm dalam 24 jam atau kekeringan berkepanjangan {' > '} 35°C."
               </div>
            </div>

            <div className="glass-card p-10 rounded-[48px] border border-stripe-indigo/5">
                <h4 className="text-sm font-black text-stripe-indigo uppercase tracking-widest mb-8">Payout History</h4>
                <div className="space-y-4">
                   {HISTORY.map(item => (
                     <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white transition-all group cursor-pointer">
                        <div className="flex items-center space-x-5">
                           <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-stripe-emerald">
                              <Wallet size={20} weight="fill" />
                           </div>
                           <div>
                              <h5 className="text-[14px] font-black text-stripe-indigo mb-0.5">{item.amount}</h5>
                              <p className="text-[10px] font-bold text-slate-400 capitalize">{item.reason} • {item.date}</p>
                           </div>
                        </div>
                        <CaretRight size={16} weight="bold" className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                   ))}
                </div>
            </div>
         </div>

         {/* Policy Breakdown */}
         <aside className="space-y-8 h-full overflow-y-auto no-scrollbar">
            <div className="bg-stripe-indigo rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700"></div>
               <ShieldCheck size={40} weight="fill" className="text-stripe-emerald mb-8" />
               <h4 className="text-2xl font-black mb-2 tracking-tight">Active Coverage</h4>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-10">AgriFlow Premium Protect</p>
               
               <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                     <span className="text-[11px] font-bold opacity-60 italic leading-none">Limit Proteksi</span>
                     <span className="text-lg font-black">{POLICY.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                     <span className="text-[11px] font-bold opacity-60 italic leading-none">Premi Bulanan</span>
                     <span className="text-lg font-black">{POLICY.premium}</span>
                  </div>
               </div>

               <button className="w-full bg-white text-stripe-indigo py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">Upgrade Policy</button>
            </div>

            <Link href="/dashboard/ews">
               <div className="glass-card p-10 rounded-[48px] border-2 border-slate-100 bg-stripe-indigo hover:bg-black transition-all group cursor-pointer">
                  <div className="flex items-center space-x-3 mb-6">
                     <Globe size={20} className="text-white" />
                     <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Cek Risiko Nasional (EWS)</h4>
                  </div>
                  <p className="text-xs font-bold text-white leading-relaxed opacity-60">
                     Lihat peta peringatan dini nasional untuk mitigasi risiko lebih lanjut.
                  </p>
               </div>
            </Link>
         </aside>
      </div>
    </div>
  );
}

function WeatherMetric({ icon: Icon, label, value, threshold, color }: any) {
  return (
    <div className="text-center group-hover:scale-110 transition-transform duration-700">
       <Icon size={40} weight="fill" className={`${color} mx-auto mb-4 opacity-70 group-hover:opacity-100`} />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-3xl font-black text-stripe-indigo tracking-tighter mb-1">{value}</p>
       <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest opacity-60">Limit: {threshold}</p>
    </div>
  );
}
