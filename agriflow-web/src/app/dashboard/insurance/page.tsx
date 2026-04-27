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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agri-Insurance</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Parametric smart contracts with automatic payouts.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-secondary text-xs px-4">
              Download Policy PDF
           </button>
           <button className="btn-minimal btn-primary text-xs px-6">
              Upgrade Plan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Live Monitoring */}
         <div className="lg:col-span-3 space-y-6">
            <div className="card-clean p-8">
               <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#14b850]">
                        <CloudRain size={24} weight="fill" />
                     </div>
                     <div>
                        <h3 className="text-base font-bold text-slate-900">Live Plot Conditions</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kediri Plot #4 • BMKG Audited</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 text-[#14b850] bg-green-50 px-3 py-1 rounded-full">
                     <CheckCircle size={14} weight="fill" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Safe Threshold</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <WeatherMetric icon={Thermometer} label="Temperature" value="31.4°C" threshold="35°C" color="text-rose-500" />
                  <WeatherMetric icon={CloudRain} label="Rainfall (12h)" value="12.5mm" threshold="150mm" color="text-blue-500" />
                  <WeatherMetric icon={TrendUp} label="Humidity" value="68%" threshold="90%" color="text-[#14b850]" />
               </div>

               <div className="p-4 bg-slate-50 rounded-xl flex items-start space-x-3">
                  <Info size={18} className="text-[#14b850] mt-0.5" />
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                     Payouts are triggered automatically if rainfall exceeds 150mm in 24h or drought conditions ({'>'}35°C) are detected by local sensors.
                  </p>
               </div>
            </div>

            <div className="card-clean p-8">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Payout History (Smart Contract)</h4>
                <div className="space-y-4">
                   {HISTORY.map(item => (
                     <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-50 hover:bg-slate-50/50 transition-all group">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                              <Wallet size={20} weight="fill" />
                           </div>
                           <div>
                              <h5 className="text-sm font-bold text-slate-900 mb-0.5">{item.amount}</h5>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.reason} • {item.date}</p>
                           </div>
                        </div>
                        <CaretRight size={16} className="text-slate-300" />
                     </div>
                   ))}
                </div>
            </div>
         </div>

         {/* Plan Sidebar */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6 bg-slate-900 text-white border-none shadow-xl">
               <ShieldCheck size={32} weight="fill" className="text-[#14b850] mb-6" />
               <h4 className="text-xl font-bold mb-1 tracking-tight">Active Coverage</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Premium Protect</p>
               
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                     <span className="text-[10px] font-bold text-slate-400">Limit</span>
                     <span className="text-base font-bold">{POLICY.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                     <span className="text-[10px] font-bold text-slate-400">Premium</span>
                     <span className="text-base font-bold text-[#14b850]">{POLICY.premium}</span>
                  </div>
               </div>

               <button className="w-full btn-minimal bg-[#14b850] text-white py-3 text-[10px]">
                  Renew Policy
               </button>
            </div>

            <Link href="/dashboard/ews" className="block card-clean p-6 hover:bg-slate-50 transition-all">
               <div className="flex items-center space-x-3 mb-3">
                  <Globe size={20} className="text-slate-400" />
                  <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Early Warning</h4>
               </div>
               <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Check national weather risk maps for climate mitigation.</p>
            </Link>
         </div>
      </div>
    </div>
  );
}

function WeatherMetric({ icon: Icon, label, value, threshold, color }: any) {
  return (
    <div className="p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
       <Icon size={24} weight="fill" className={`${color} mb-3 opacity-60`} />
       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-xl font-bold text-slate-900 tracking-tight mb-1">{value}</p>
       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Limit: {threshold}</p>
    </div>
  );
}
