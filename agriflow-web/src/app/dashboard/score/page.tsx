"use client";

import React from 'react';
import { Star, Trophy, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Medal, Users, Sparkle } from '@phosphor-icons/react';

export default function ScorePage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F]">
                <Medal size={20} weight="fill" />
             </div>
             <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-[0.2em]">AgriScore Reputation Hub — AKTIF</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-[#1B4D1B]">AgriScore: <span className="text-[#4A9E3F]">Reputasi Petani</span></h1>
          <p className="text-[#1A2E1A]/50 text-sm font-medium max-w-2xl leading-relaxed">
             Sistem gamifikasi reputasi digital yang mengukur kredibilitas petani dan membuka akses ke ekosistem keuangan formal serta pembeli premium.
          </p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#1B4D1B] text-white px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all">
              Audit Score Saya
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Status - The Score Card */}
        <div className="lg:col-span-2 space-y-8">
           {/* Reputation Visualization */}
           <div className="bg-white/60 p-10 rounded-[32px] shadow-xl border border-[#C7E0B0] relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A9E3F]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-[#C7E0B0]/30 pb-6 relative z-10">
                 <h2 className="text-xl font-semibold text-[#1B4D1B] tracking-tight flex items-center mb-4 md:mb-0">
                    <Star size={24} className="text-[#4A9E3F] mr-3" />
                    Status Reputasi Digital
                 </h2>
                 <div className="flex items-center space-x-2 bg-[#1B4D1B]/5 border border-[#C7E0B0]/30 px-4 py-2 rounded-lg">
                    <Star size={14} weight="fill" className="text-[#4A9E3F]" />
                    <span className="text-[9px] font-bold text-[#1B4D1B]/50 uppercase tracking-widest">Digital Reputation Scoring</span>
                 </div>
              </div>
              
              <div className="flex flex-col items-center py-8 relative z-10">
                 <div className="relative mb-8">
                    <div className="w-48 h-48 rounded-full border-[8px] border-[#1B4D1B]/5 flex items-center justify-center relative shadow-inner">
                       <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="96" cy="96" r="88" fill="transparent" stroke="#4A9E3F" strokeWidth="8" strokeDasharray="550" strokeDashoffset="120" strokeLinecap="round" />
                       </svg>
                       <p className="text-6xl font-bold text-[#1B4D1B] tracking-tighter">782</p>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#4A9E3F] text-white px-6 py-2 rounded-full shadow-lg font-bold text-[11px] uppercase tracking-widest">
                       Tier: Ahli
                    </div>
                 </div>
                 <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-10">Score Updated from last 14 trades</p>
                 
                 <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#C7E0B0]/30 pt-10">
                    <ScoreStat label="Kualitas Produk" value="Grade A 92%" icon={ShieldCheck} />
                    <ScoreStat label="Ketepatan Waktu" value="98.5% On-Time" icon={ChartLineUp} />
                    <ScoreStat label="Loyalitas" value="Master Active" icon={Medal} />
                 </div>
              </div>
              
              <div className="mt-8 bg-[#1B4D1B]/5 p-8 rounded-2xl border border-[#C7E0B0]/50 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-start md:items-center relative z-10 group hover:border-[#4A9E3F]/30 transition-colors">
                 <div className="w-16 h-16 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F] group-hover:scale-110 transition-transform">
                    <Medal size={32} weight="fill" />
                 </div>
                 <div>
                    <p className="font-semibold text-[#1B4D1B] text-lg mb-2 tracking-tight">Akses Premium Terbuka!</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/60 max-w-lg leading-relaxed">
                       Selamat! AgriScore Anda di atas 600 membuka akses ke buyer premium (Supermarket Chain, Export Buyer) dan bunga kredit mikro lebih rendah.
                    </p>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#4A9E3F]/10 rounded-[32px] p-10 shadow-sm border border-[#4A9E3F]/20 relative overflow-hidden">
              <h3 className="text-lg font-semibold text-[#1B4D1B] mb-6 tracking-tight relative z-10">Detail Penilaian</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Proses Penilaian</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       AgriScore dihitung berdasarkan weighted scoring keberhasilan transaksi (25%), konsistensi kualitas (30%), dan rating pembeli (25%).
                    </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Financial Inclusion</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       Berfungsi sebagai proxy credit score alternatif (Collateral Digital) untuk akses pinjaman di Modul Finansial.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Milestone Preview & Simulation */}
        <div className="space-y-8">
           <div className="bg-[#1B4D1B] border border-[#1B4D1B] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none">
                 <Trophy size={180} weight="fill" className="text-white" />
              </div>
              <h3 className="text-sm font-bold mb-8 relative z-10 flex items-center space-x-3 uppercase tracking-wide text-white">
                 <Sparkle size={20} className="text-[#4A9E3F]" weight="bold" />
                 <span>Milestone Notification</span>
              </h3>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 relative z-10">
                 <div className="flex items-center justify-between mb-6">
                    <span className="bg-[#4A9E3F] text-white px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">+48 Score Points</span>
                 </div>
                 <p className="text-[13px] font-medium text-white/90 leading-relaxed">
                    "Selamat! AgriScore Anda naik ke <strong className="text-white font-bold">782</strong> — Anda kini berstatus <strong className="text-[#4A9E3F] font-bold">AHLI</strong>. Akses ke 12 pembeli premium baru telah terbuka secara otomatis."
                 </p>
              </div>
           </div>

           <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] flex flex-col items-center text-center shadow-lg relative overflow-hidden">
              <div className="w-16 h-16 bg-[#0D7A6B]/10 rounded-xl flex items-center justify-center text-[#0D7A6B] mb-6">
                 <Users size={32} weight="bold" />
              </div>
              <h4 className="text-xl font-semibold text-[#1B4D1B] mb-3 tracking-tight">Social Proof</h4>
              <p className="text-xs font-medium text-[#1A2E1A]/50 leading-relaxed mb-8 max-w-xs">
                 Pembeli lebih memprioritaskan petani dengan AgriScore tinggi dalam matchmaking engine kami.
              </p>
              <button className="w-full bg-[#1B4D1B]/5 border border-[#C7E0B0] text-[#1B4D1B] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B] hover:text-white transition-all flex items-center justify-center space-x-2">
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
    <div className="flex flex-col items-center text-center p-6 bg-[#1B4D1B]/5 rounded-2xl border border-[#C7E0B0]/30 hover:border-[#4A9E3F]/30 transition-colors">
       <div className="w-12 h-12 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F] mb-4">
          <Icon size={24} weight="fill" />
       </div>
       <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-base font-bold text-[#1B4D1B]">{value}</p>
    </div>
  );
}
