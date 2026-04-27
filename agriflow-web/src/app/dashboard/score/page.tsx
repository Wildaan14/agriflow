"use client";

import React from 'react';
import { Star, Trophy, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Medal, Users, Sparkle } from '@phosphor-icons/react';

export default function ScorePage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] shadow-[0_0_15px_rgba(20,184,80,0.1)]">
                <Medal size={20} weight="fill" />
             </div>
             <span className="text-[10px] font-bold text-[#14b850] uppercase tracking-[0.2em]">AgriScore Reputation Hub — AKTIF</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">AgriScore: <span className="text-[#14b850]">Reputasi Petani</span></h1>
          <p className="text-white/50 text-sm font-light max-w-2xl leading-relaxed">
             Sistem gamifikasi reputasi digital yang mengukur kredibilitas petani dan membuka akses ke ekosistem keuangan formal serta pembeli premium.
          </p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#14b850] text-[#0A0D14] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all">
              Audit Score Saya
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Status - The Score Card */}
        <div className="lg:col-span-2 space-y-8">
           {/* Reputation Visualization */}
           <div className="bg-white/[0.02] p-10 rounded-[32px] shadow-2xl border-t border-white/[0.05] border-x border-x-white/[0.05] border-b border-b-[#14b850]/50 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#14b850]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/[0.05] pb-6 relative z-10">
                 <h2 className="text-xl font-semibold text-white tracking-tight flex items-center mb-4 md:mb-0">
                    <Star size={24} className="text-[#14b850] mr-3" />
                    Status Reputasi Digital
                 </h2>
                 <div className="flex items-center space-x-2 bg-[#0A0D14] border border-white/[0.1] px-4 py-2 rounded-lg">
                    <Star size={14} weight="fill" className="text-[#14b850]" />
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Digital Reputation Scoring</span>
                 </div>
              </div>
              
              <div className="flex flex-col items-center py-8 relative z-10">
                 <div className="relative mb-8">
                    <div className="w-48 h-48 rounded-full border-[8px] border-white/[0.05] flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                       <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="96" cy="96" r="88" fill="transparent" stroke="#14b850" strokeWidth="8" strokeDasharray="550" strokeDashoffset="120" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(20,184,80,0.5)]" />
                       </svg>
                       <p className="text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">782</p>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#14b850] text-[#0A0D14] px-6 py-2 rounded-full shadow-[0_0_15px_rgba(20,184,80,0.4)] font-bold text-[11px] uppercase tracking-widest">
                       Tier: Ahli
                    </div>
                 </div>
                 <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mb-10">Score Updated from last 14 trades</p>
                 
                 <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/[0.05] pt-10">
                    <ScoreStat label="Kualitas Produk" value="Grade A 92%" icon={ShieldCheck} />
                    <ScoreStat label="Ketepatan Waktu" value="98.5% On-Time" icon={ChartLineUp} />
                    <ScoreStat label="Loyalitas" value="Master Active" icon={Medal} />
                 </div>
              </div>
              
              <div className="mt-8 bg-[#0A0D14] p-8 rounded-2xl border border-white/[0.05] flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-start md:items-center relative z-10 group hover:border-[#14b850]/30 transition-colors">
                 <div className="w-16 h-16 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] group-hover:scale-110 transition-transform">
                    <Medal size={32} weight="fill" />
                 </div>
                 <div>
                    <p className="font-semibold text-white text-lg mb-2 tracking-tight">Akses Premium Terbuka!</p>
                    <p className="text-sm font-light text-white/60 max-w-lg leading-relaxed">
                       Selamat! AgriScore Anda di atas 600 membuka akses ke buyer premium (Supermarket Chain, Export Buyer) dan bunga kredit mikro lebih rendah.
                    </p>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#14b850]/5 rounded-[32px] p-10 shadow-sm border border-[#14b850]/20 relative overflow-hidden">
              <h3 className="text-lg font-semibold text-white mb-6 tracking-tight relative z-10">Detail Penilaian</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mb-2">Proses Penilaian</p>
                    <p className="text-sm font-light text-white/70 leading-relaxed">
                       AgriScore dihitung berdasarkan weighted scoring keberhasilan transaksi (25%), konsistensi kualitas (30%), dan rating pembeli (25%).
                    </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mb-2">Financial Inclusion</p>
                    <p className="text-sm font-light text-white/70 leading-relaxed">
                       Berfungsi sebagai proxy credit score alternatif (Collateral Digital) untuk akses pinjaman di Modul Finansial.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Milestone Preview & Simulation */}
        <div className="space-y-8">
           <div className="bg-[#14b850]/5 border border-[#14b850]/20 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none">
                 <Trophy size={180} weight="fill" className="text-[#14b850]" />
              </div>
              <h3 className="text-sm font-semibold mb-8 relative z-10 flex items-center space-x-3 uppercase tracking-wide text-white/80">
                 <Sparkle size={20} className="text-[#14b850]" weight="bold" />
                 <span>Milestone Notification</span>
              </h3>
              <div className="bg-[#0A0D14] border border-white/[0.05] rounded-2xl p-6 relative z-10">
                 <div className="flex items-center justify-between mb-6">
                    <span className="bg-[#14b850]/10 text-[#14b850] px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">+48 Score Points</span>
                 </div>
                 <p className="text-[13px] font-light text-white/90 leading-relaxed">
                    "Selamat! AgriScore Anda naik ke <strong className="text-white font-semibold">782</strong> — Anda kini berstatus <strong className="text-[#14b850] font-semibold">AHLI</strong>. Akses ke 12 pembeli premium baru telah terbuka secara otomatis."
                 </p>
              </div>
           </div>

           <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-xl flex items-center justify-center text-[#0ea5e9] mb-6">
                 <Users size={32} weight="bold" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 tracking-tight">Social Proof</h4>
              <p className="text-xs font-light text-white/50 leading-relaxed mb-8 max-w-xs">
                 Pembeli lebih memprioritaskan petani dengan AgriScore tinggi dalam matchmaking engine kami.
              </p>
              <button className="w-full bg-white/[0.05] border border-white/[0.1] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all flex items-center justify-center space-x-2">
                 <span>Unduh Sertifikat AgriScore</span>
                 <ArrowRight size={14} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ScoreStat({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-[#0A0D14] rounded-2xl border border-white/[0.05] hover:border-white/[0.1] transition-colors">
       <div className="w-12 h-12 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] mb-4">
          <Icon size={24} weight="fill" />
       </div>
       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-base font-semibold text-white">{value}</p>
    </div>
  );
}
