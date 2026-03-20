"use client";

import React from 'react';
import { Star, Trophy, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Medal, Users, Sparkle } from '@phosphor-icons/react';

export default function ScorePage() {
  return (
    <div className="space-y-16 py-8 animate-in">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-stripe-indigo/10 rounded-xl flex items-center justify-center text-stripe-indigo">
                <Medal size={24} weight="fill" />
             </div>
             <span className="text-[12px] font-black text-stripe-indigo uppercase tracking-[0.3em]">AgriScore Reputation Hub — ACTIVE</span>
          </div>
          <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4">AgriScore: Reputasi Petani</h1>
          <p className="text-stripe-slate font-bold text-lg max-w-2xl leading-relaxed">
             Sistem gamifikasi reputasi digital yang mengukur kredibilitas petani dan membuka akses ke ekosistem keuangan formal.
          </p>
        </div>
        <div className="flex space-x-6">
           <button className="bg-stripe-indigo text-white px-10 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">
              Audit Score Saya
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Status - The Score Card */}
        <div className="lg:col-span-2 space-y-10">
           {/* Reputation Visualization */}
           <div className="glass-card rounded-[56px] p-12 shadow-xl border-t-8 border-t-stripe-indigo relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-indigo/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">Status Reputasi Digital</h2>
                 <div className="flex items-center space-x-3 bg-stripe-indigo/10 px-4 py-2 rounded-full">
                    <Star size={18} weight="fill" className="text-stripe-indigo" />
                    <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest">Digital Reputation Scoring</span>
                 </div>
              </div>
              
              <div className="flex flex-col items-center py-12 relative z-10">
                 <div className="relative mb-8">
                    <div className="w-48 h-48 rounded-full border-[10px] border-slate-100 flex items-center justify-center relative">
                       <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="96" cy="96" r="86" fill="transparent" stroke="currentColor" strokeWidth="10" strokeDasharray="540" strokeDashoffset="120" className="text-stripe-violet" />
                       </svg>
                       <p className="text-6xl font-black text-stripe-indigo tracking-tight">782</p>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-stripe-violet text-white px-6 py-2 rounded-full shadow-lg font-black text-[11px] uppercase tracking-widest">
                       Tier: Ahli
                    </div>
                 </div>
                 <p className="text-sm font-bold text-stripe-slate opacity-60 uppercase tracking-widest mb-10">Score Updated from last 14 trades</p>
                 
                 <div className="w-full grid grid-cols-3 gap-8 border-t border-stripe-indigo/5 pt-10">
                    <ScoreStat label="Kualitas Produk" value="Grade A 92%" icon={ShieldCheck} />
                    <ScoreStat label="Ketepatan Waktu" value="98.5% On-Time" icon={ChartLineUp} />
                    <ScoreStat label="Loyalitas" value="Master Active" icon={Medal} />
                 </div>
              </div>
              
              <div className="mt-12 bg-stripe-indigo/5 p-8 rounded-[32px] border border-dashed border-stripe-indigo/20 flex flex-col space-y-6">
                 <div className="flex items-center space-x-6">
                    <Medal size={48} className="text-stripe-violet" weight="fill" />
                    <div>
                       <p className="font-black text-stripe-indigo text-xl">Akses Premium Terbuka!</p>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-md">
                          Selamat! AgriScore Anda di atas 600 membuka akses ke buyer premium (Supermarket Chain, Export Buyer) dan bunga kredit mikro lebih rendah.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="glass-card rounded-[48px] p-10 shadow-sm border border-white bg-white/40 backdrop-blur-3xl">
              <h3 className="text-xl font-black text-stripe-indigo mb-6 tracking-tight">Detail Penilaian</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Proses Penilaian</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       AgriScore dihitung berdasarkan weighted scoring keberhasilan transaksi (25%), konsistensi kualitas (30%), dan rating pembeli (25%).
                    </p>
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Financial Inclusion</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Berfungsi sebagai proxy credit score alternatif (Collateral Digital) untuk akses pinjaman di Modul Finansial.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Milestone Preview & Simulation */}
        <div className="space-y-10">
           <div className="bg-stripe-indigo rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-1000">
                 <Trophy size={180} weight="fill" />
              </div>
              <h3 className="text-xl font-black mb-10 relative z-10 flex items-center space-x-3">
                 <Sparkle size={28} weight="bold" />
                 <span>Milestone Notification</span>
              </h3>
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest">+48 Score Points</span>
                 </div>
                 <p className="text-sm font-bold leading-relaxed">
                    "Selamat! AgriScore Anda naik ke 782 — Anda kini berstatus AHLI. Akses ke 12 pembeli premium baru telah terbuka secara otomatis."
                 </p>
              </div>
           </div>

           <div className="glass-card rounded-[48px] p-10 shadow-xl flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-stripe-violet/10 rounded-full flex items-center justify-center text-stripe-violet mb-8">
                 <Users size={36} weight="bold" />
              </div>
              <h4 className="text-xl font-black text-stripe-indigo mb-4 tracking-tight">Social Proof</h4>
              <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-xs leading-relaxed mb-8">
                 Pembeli lebih memprioritaskan petani dengan AgriScore tinggi dalam matchmaking engine kami.
              </p>
              <button className="w-full bg-stripe-indigo text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3">
                 <span>Unduh Sertifikat AgriScore</span>
                 <ArrowRight size={16} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ScoreStat({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center text-center">
       <div className="w-10 h-10 bg-stripe-indigo/5 rounded-xl flex items-center justify-center text-stripe-indigo mb-4">
          <Icon size={20} weight="bold" />
       </div>
       <p className="text-[10px] font-black text-stripe-slate uppercase tracking-widest mb-1 opacity-40">{label}</p>
       <p className="text-lg font-black text-stripe-indigo">{value}</p>
    </div>
  );
}
