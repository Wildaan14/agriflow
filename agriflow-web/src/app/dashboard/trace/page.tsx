"use client";

import React from 'react';
import traceData from '@/data/modul8_blockchain_traceability.json';
import { Cube, ShieldCheck, ArrowRight, ShareNetwork, WhatsappLogo, ChartLineUp, FileText, Globe, MagnifyingGlass, List, QrCode, Truck } from '@phosphor-icons/react';
import Link from 'next/link';

export default function TracePage() {
  const displayLedger = traceData.ledger.slice(0, 8);

  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* Refined Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30 px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(20,184,80,0.2)]">Blockchain Ledger — AKTIF</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-none">Supply Chain <span className="text-[#14b850]">Traceability</span></h1>
           <p className="text-white/50 text-sm max-w-xl font-light leading-relaxed">Transparansi rantai pasok end-to-end yang dijamin dengan teknologi kriptografi buku besar terdistribusi yang tidak dapat diubah (immutable ledger).</p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#14b850] text-[#0A0D14] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all">
              Audit Public Ledger
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Status - The Ledger Simulation */}
        <div className="lg:col-span-2 space-y-8">
           {/* Ledger Card */}
           <div className="bg-white/[0.02] rounded-[32px] p-10 shadow-2xl border-t border-white/[0.05] border-x border-x-white/[0.05] border-b border-b-[#14b850]/50 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#14b850]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex justify-between items-center mb-10 relative z-10 border-b border-white/[0.05] pb-6">
                 <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center">
                    <List size={28} className="text-[#14b850] mr-3" />
                    Live Traceability Ledger
                 </h2>
                 <div className="flex items-center space-x-3 bg-[#0A0D14] border border-white/[0.1] px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-[#14b850] animate-pulse"></div>
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Sinkronisasi Real-Time</span>
                 </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                {displayLedger.map((tx, i) => (
                   <LedgerBlock 
                      key={tx.tx_id}
                      hash={`0x${tx.tx_id.substring(0,6)}...${tx.tx_id.substring(tx.tx_id.length-4)}`} 
                      label={tx.action.replace('_', ' ')} 
                      region={tx.actor_location} 
                      date={new Date(tx.timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} 
                      status="Terverifikasi"
                      active={i === displayLedger.length - 1} 
                   />
                ))}
              </div>
              
              <div className="mt-10 bg-[#0A0D14] p-8 rounded-2xl border border-white/[0.05] flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 items-start md:items-center relative z-10 group hover:border-[#14b850]/30 transition-colors">
                 <div className="w-16 h-16 bg-white/[0.05] rounded-xl flex items-center justify-center text-[#14b850] group-hover:scale-110 transition-transform">
                    <QrCode size={32} weight="bold" />
                 </div>
                 <div>
                    <p className="font-semibold text-white text-lg mb-2 tracking-tight">Portal Verifikasi Konsumen</p>
                    <p className="text-sm font-light text-white/60 max-w-lg leading-relaxed">
                       Setiap batch panen memiliki QR Code unik yang terikat pada data ledger ini. Konsumen akhir dapat melakukan scan untuk memverifikasi asal-usul, riwayat suhu logistik, dan kredensial ESG.
                    </p>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#14b850]/5 rounded-[32px] p-10 border border-[#14b850]/20 relative overflow-hidden">
              <ShieldCheck size={160} weight="fill" className="absolute -bottom-10 -right-10 text-[#14b850] opacity-5 rotate-12 pointer-events-none" />
              <h3 className="text-xl font-semibold text-white mb-8 tracking-tight flex items-center relative z-10">
                 <ShieldCheck size={24} className="text-[#14b850] mr-3" />
                 Arsitektur Keamanan Jaringan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mb-2">Konsensus Multi-Node</p>
                    <p className="text-sm font-light text-white/70 leading-relaxed">
                       Setiap pencatatan data wajib diverifikasi minimal oleh 3 aktor terpisah (Petani, Kurir, QA Sensor IoT) sebelum blok direkam secara permanen ke ledger.
                    </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mb-2">Anti-Tampering</p>
                    <p className="text-sm font-light text-white/70 leading-relaxed">
                       Setiap blok dilindungi oleh hash kriptografi SHA-256. Tidak ada satu entitas pun (termasuk admin sistem) yang dapat meretas atau mengubah riwayat data yang telah lewat.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Social Insight Preview & Simulation */}
        <div className="space-y-8">
           <div className="bg-[#0A0D14] rounded-[32px] p-8 text-white shadow-2xl border border-white/[0.1] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#14b850]/10 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="flex items-center space-x-3 mb-8 relative z-10">
                 <MagnifyingGlass size={20} className="text-[#14b850]" />
                 <h3 className="text-sm font-semibold tracking-wide uppercase text-white/80">Simulasi Pemindai QR</h3>
              </div>
              
              <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 border border-white/[0.05] relative z-10 flex flex-col items-center text-center group-hover:border-white/[0.1] transition-colors">
                 <div className="mb-6 w-32 h-32 bg-white rounded-xl flex items-center justify-center p-3 shadow-xl">
                    <QrCode size={100} className="text-[#0A0D14]" />
                 </div>
                 <div className="w-full bg-[#14b850]/10 p-4 rounded-lg border border-[#14b850]/20 mb-6 text-left">
                    <p className="text-[11px] font-medium text-white/80 leading-relaxed italic">
                       "✓ Terverifikasi 100% Organik dari Gapoktan Kediri. Disimpan pada suhu ideal 18°C. Dipanen oleh: Bpk. Sugeng (Reputasi AgriScore 820)."
                    </p>
                 </div>
                 <button className="w-full bg-white/[0.05] border border-white/[0.1] text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all">
                    Buka Halaman Konsumen
                 </button>
              </div>
           </div>

           <div className="bg-white/[0.02] rounded-[32px] p-8 border border-white/[0.05] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-xl flex items-center justify-center text-[#0ea5e9] mb-6">
                 <FileText size={32} weight="fill" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 tracking-tight">Sertifikasi & Audit</h4>
              <p className="text-xs font-light text-white/50 leading-relaxed mb-8 max-w-xs">
                 Buku besar digital AgriFlow otomatis menghasilkan log kepatuhan (compliance) yang diakui untuk standar ekspor pangan internasional.
              </p>
              
              {/* Compliance Badges in Side */}
              <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
                 <div className="px-4 py-2 bg-[#0A0D14] border border-white/[0.1] rounded-lg text-[9px] font-bold text-white/70 uppercase tracking-widest w-full md:w-auto">ISO 22000</div>
                 <div className="px-4 py-2 bg-[#0A0D14] border border-white/[0.1] rounded-lg text-[9px] font-bold text-white/70 uppercase tracking-widest w-full md:w-auto">HACCP CERTIFIED</div>
                 <div className="px-4 py-2 bg-[#14b850]/10 border border-[#14b850]/20 rounded-lg text-[9px] font-bold text-[#14b850] uppercase tracking-widest w-full">SMART CONTRACT SECURED</div>
              </div>

              <Link href="/dashboard/logistics" className="w-full">
                  <button className="w-full bg-white/[0.05] border border-white/[0.1] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/[0.1] transition-all flex items-center justify-center space-x-2">
                     <Truck size={18} weight="fill" />
                     <span>Monitor Armada Logistik</span>
                  </button>
               </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

function LedgerBlock({ hash, label, region, score, date, status, active = false }: any) {
  return (
    <div className={`p-6 rounded-[24px] border transition-all ${active ? 'bg-[#14b850]/10 border-[#14b850]/50 shadow-[0_0_20px_rgba(20,184,80,0.1)]' : 'bg-[#0A0D14] border-white/[0.05] hover:border-white/[0.1]'}`}>
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center space-x-4 md:space-x-6">
             <div className="font-mono text-[9px] text-[#0ea5e9] opacity-70 rotate-0 md:rotate-90 md:w-4 tracking-widest md:tracking-tighter shrink-0">{hash}</div>
             <div>
                <p className={`font-semibold text-lg mb-1 ${active ? 'text-[#14b850]' : 'text-white'}`}>{label}</p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 md:mt-0">
                   <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">{region || score}</p>
                   <span className="w-1 h-1 bg-white/20 rounded-full hidden md:block"></span>
                   <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">{date}</p>
                </div>
             </div>
          </div>
          <div className="text-left md:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-end border-t border-white/[0.05] pt-4 md:pt-0 md:border-t-0">
             <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-md ${active ? 'bg-[#14b850] text-[#0A0D14]' : 'bg-white/[0.05] text-white/50 border border-white/[0.05]'}`}>
                <ShieldCheck size={14} weight="fill" />
                <p className="text-[9px] font-bold uppercase tracking-widest">{status}</p>
             </div>
          </div>
       </div>
    </div>
  );
}
