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
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* Refined Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30 px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(20,184,80,0.2)]">Parametric Oracle — AKTIF</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-none">Agri-Micro <span className="text-[#14b850]">Insurance</span></h1>
           <p className="text-white/50 text-sm max-w-xl font-light leading-relaxed">Pencairan otomatis yang dipicu oleh data cuaca audit BMKG (Parametrik) tanpa perlu mengajukan klaim manual.</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full lg:w-auto">
           <div className="bg-[#0A0D14] border border-white/[0.1] px-8 py-4 rounded-xl text-center flex flex-col justify-center">
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1 italic">Total Payouts</p>
              <p className="text-xl font-bold text-[#14b850] tracking-tighter">Rp 2.100.000</p>
           </div>
           <button className="flex-1 lg:flex-none bg-[#14b850] text-[#0A0D14] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all">
              Download Polis PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live Oracle Monitoring */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.02] p-10 rounded-[32px] border border-white/[0.05] shadow-2xl relative overflow-hidden flex flex-col group backdrop-blur-xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#14b850]/5 rounded-full blur-[100px] -mr-20 -mt-20 transition-all group-hover:scale-150 duration-1000 pointer-events-none"></div>
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 mb-10 border-b border-white/[0.05] pb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                     <div className="w-14 h-14 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] shadow-[0_0_15px_rgba(20,184,80,0.1)]">
                        <CloudRain size={28} weight="fill" />
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-white tracking-tight leading-none mb-2">Live Plot Conditions</h3>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Status: Kediri Plot #4 • Diaudit BMKG</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-[#14b850]/10 border border-[#14b850]/30 px-3 py-1.5 rounded-md text-[#14b850]">
                     <CheckCircle size={14} weight="fill" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Di Bawah Ambang Batas</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-10">
                  <WeatherMetric icon={Thermometer} label="Temperature" value="31.4°C" threshold="35°C" color="text-[#f43f5e]" />
                  <WeatherMetric icon={CloudRain} label="Rainfall (12h)" value="12.5mm" threshold="150mm" color="text-[#0ea5e9]" />
                  <WeatherMetric icon={TrendUp} label="Humidity" value="68%" threshold="90%" color="text-[#14b850]" />
               </div>

               <div className="p-6 bg-[#0A0D14] rounded-2xl border border-white/[0.05] flex items-start space-x-4 relative z-10">
                  <Info size={24} className="text-[#14b850] shrink-0" />
                  <p className="text-[11px] font-medium text-white/60 leading-relaxed italic">
                     &quot;Payout akan otomatis terpicu tanpa proses klaim manual jika curah hujan melampaui ambang batas 150mm dalam 24 jam atau kekeringan ekstrem {'>'} 35°C tercatat oleh sensor.&quot;
                  </p>
               </div>
            </div>

            <div className="bg-white/[0.02] p-10 rounded-[32px] border border-white/[0.05]">
                <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">Riwayat Payout (Smart Contract)</h4>
                <div className="space-y-4">
                   {HISTORY.map(item => (
                     <div key={item.id} className="flex items-center justify-between p-5 bg-[#0A0D14] rounded-2xl border border-white/[0.05] hover:border-[#14b850]/30 transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850]">
                              <Wallet size={20} weight="fill" />
                           </div>
                           <div>
                              <h5 className="text-[14px] font-bold text-white mb-1">{item.amount}</h5>
                              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.reason} • {item.date}</p>
                           </div>
                        </div>
                        <CaretRight size={16} weight="bold" className="text-white/20 group-hover:text-[#14b850] transition-colors" />
                     </div>
                   ))}
                </div>
            </div>
         </div>

         {/* Policy Breakdown */}
         <aside className="space-y-8">
            <div className="bg-[#14b850]/5 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl group border border-[#14b850]/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#14b850]/20 blur-[50px] rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
               <ShieldCheck size={40} weight="fill" className="text-[#14b850] mb-6 relative z-10" />
               <h4 className="text-2xl font-semibold mb-2 tracking-tight relative z-10">Active Coverage</h4>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14b850] mb-8 relative z-10">AgriFlow Premium Protect</p>
               
               <div className="space-y-5 mb-10 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/[0.1] pb-4">
                     <span className="text-[11px] font-medium text-white/60">Limit Proteksi</span>
                     <span className="text-lg font-bold">{POLICY.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.1] pb-4">
                     <span className="text-[11px] font-medium text-white/60">Premi Bulanan</span>
                     <span className="text-lg font-bold text-[#14b850]">{POLICY.premium}</span>
                  </div>
               </div>

               <button className="w-full bg-[#14b850] text-[#0A0D14] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(20,184,80,0.2)] hover:shadow-[0_0_25px_rgba(20,184,80,0.4)] transition-all relative z-10">
                  Upgrade Policy
               </button>
            </div>

            <Link href="/dashboard/ews" className="block">
               <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all group cursor-pointer flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                     <Globe size={24} className="text-[#0ea5e9]" />
                     <h4 className="text-[11px] font-bold text-white uppercase tracking-widest leading-none">Cek Risiko Nasional (EWS)</h4>
                  </div>
                  <p className="text-xs font-light text-white/50 leading-relaxed">
                     Lihat peta peringatan dini nasional untuk mitigasi risiko iklim yang dapat memicu polis asuransi Anda.
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
    <div className="text-left bg-[#0A0D14] p-6 rounded-2xl border border-white/[0.05] group-hover:border-white/[0.1] transition-all duration-500">
       <Icon size={28} weight="fill" className={`${color} mb-4 opacity-80`} />
       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-2xl font-bold text-white tracking-tighter mb-2">{value}</p>
       <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Limit: {threshold}</p>
    </div>
  );
}
