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
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Agri-Insurance</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Parametric smart contracts with automatic payouts.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:border-[#1B4D1B]/30 px-6 py-2.5 font-bold shadow-sm transition-all">
              Download Policy PDF
           </button>
           <button className="btn-minimal bg-[#1B4D1B] text-white hover:bg-[#133813] px-6 py-2.5 font-bold shadow-lg shadow-[#1B4D1B]/20 transition-all flex items-center gap-2">
              <ShieldCheck size={18} weight="bold" />
              <span>Upgrade Plan</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Live Monitoring */}
         <div className="lg:col-span-3 space-y-6">
            <div className="card-clean p-8 shadow-sm">
               <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#1B4D1B]">
                        <CloudRain size={24} weight="duotone" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900">Live Plot Conditions</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Kediri Plot #4 • BMKG Audited</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 text-[#1B4D1B] bg-[#14b850]/10 border border-[#14b850]/20 px-3 py-1.5 rounded-full shadow-sm">
                     <CheckCircle size={16} weight="fill" className="text-[#14b850]" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Safe Threshold</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <WeatherMetric icon={Thermometer} label="Temperature" value="31.4°C" threshold="35°C" color="text-rose-500" bg="bg-rose-50" border="border-rose-100" />
                  <WeatherMetric icon={CloudRain} label="Rainfall (12h)" value="12.5mm" threshold="150mm" color="text-blue-500" bg="bg-blue-50" border="border-blue-100" />
                  <WeatherMetric icon={TrendUp} label="Humidity" value="68%" threshold="90%" color="text-[#14b850]" bg="bg-[#14b850]/10" border="border-[#14b850]/20" />
               </div>

               <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start space-x-4 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1B4D1B] shrink-0 shadow-sm border border-slate-200">
                    <Info size={16} weight="bold" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic mt-1">
                     Payouts are triggered automatically if rainfall exceeds <span className="font-bold text-slate-700">150mm</span> in 24h or drought conditions (<span className="font-bold text-slate-700">{'>'}35°C</span>) are detected by local sensors.
                  </p>
               </div>
            </div>

            <div className="card-clean p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payout History (Smart Contract)</h4>
                   <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-widest border border-slate-200">Immutable Ledger</span>
                </div>
                <div className="space-y-4">
                   {HISTORY.map(item => (
                     <div key={item.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#14b850]/30 hover:bg-white hover:shadow-md transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#1B4D1B] group-hover:bg-[#14b850]/10 group-hover:border-[#14b850]/20 transition-all shadow-sm">
                              <Wallet size={20} weight="duotone" />
                           </div>
                           <div>
                              <h5 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-[#1B4D1B] transition-colors">{item.amount}</h5>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.reason} • {item.date}</p>
                           </div>
                        </div>
                        <CaretRight size={16} weight="bold" className="text-slate-300 group-hover:text-[#14b850] transition-colors" />
                     </div>
                   ))}
                </div>
            </div>
         </div>

         {/* Plan Sidebar */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-8 bg-[#1B4D1B] text-white border-none shadow-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=600')] bg-cover opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-[10000ms]"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#133813] via-transparent to-transparent"></div>
               
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6 border border-white/20">
                     <ShieldCheck size={28} weight="duotone" className="text-[#14b850]" />
                  </div>
                  <h4 className="text-xl font-bold mb-1 tracking-tight">Active Coverage</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#14b850] mb-8 bg-[#14b850]/20 inline-block px-2 py-0.5 rounded-full border border-[#14b850]/30">Premium Protect</p>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Limit</span>
                        <span className="text-sm font-bold">{POLICY.coverage}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Premium</span>
                        <span className="text-sm font-bold text-[#14b850]">{POLICY.premium}</span>
                     </div>
                  </div>

                  <button className="w-full bg-[#14b850] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-[#14b850]/20 hover:bg-[#0f913f] transition-all">
                     Renew Policy
                  </button>
               </div>
            </div>

            <Link href="/dashboard/ews" className="block card-clean p-6 bg-slate-50 border border-slate-200 hover:border-[#14b850]/30 hover:shadow-md transition-all group">
               <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#1B4D1B] group-hover:border-[#14b850]/30 transition-all shadow-sm">
                     <Globe size={16} weight="bold" />
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest group-hover:text-[#14b850] transition-colors">Early Warning</h4>
               </div>
               <p className="text-[11px] text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors">Check national weather risk maps for climate mitigation and early intervention.</p>
            </Link>
         </div>
      </div>
    </div>
  );
}

function WeatherMetric({ icon: Icon, label, value, threshold, color, bg, border }: any) {
  return (
    <div className={`p-6 rounded-[24px] bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group`}>
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${border} border mb-4 group-hover:scale-110 transition-transform`}>
          <Icon size={24} weight="duotone" className={`${color}`} />
       </div>
       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{value}</p>
       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Limit: <span className="font-mono text-slate-700">{threshold}</span></p>
    </div>
  );
}
