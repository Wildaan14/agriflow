"use client";

import React from 'react';
import traceData from '@/data/modul8_blockchain_traceability.json';
import { Cube, ShieldCheck, ArrowRight, ShareNetwork, WhatsappLogo, ChartLineUp, FileText, Globe, MagnifyingGlass, List, QrCode, Truck } from '@phosphor-icons/react';
import Link from 'next/link';

export default function TracePage() {
  const displayLedger = traceData.ledger.slice(0, 8);

  return (
    <div className="space-y-16 py-8 animate-in px-4">
      {/* Refined Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-stripe-violet text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-stripe-violet/20">Blockchain Ledger — ACTIVE</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none italic">Supply Chain Traceability</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70 italic font-serif leading-none">Transparansi aman dari lahan hingga meja makan dengan teknologi buku kas digital.</p>
        </div>
        <div className="flex space-x-6">
           <button className="bg-stripe-indigo text-white px-10 py-5 rounded-[22px] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all">
              Audit Public Ledger
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Status - The Ledger Simulation */}
        <div className="lg:col-span-2 space-y-10">
           {/* Ledger Card */}
           <div className="glass-card rounded-[56px] p-12 shadow-xl border-t-8 border-t-stripe-violet relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-violet/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">Status Rantai Pasok (Live Ledger)</h2>
                 <div className="flex items-center space-x-3 bg-stripe-violet/10 px-4 py-2 rounded-full">
                    <span className="text-[10px] font-black text-stripe-violet uppercase tracking-widest">Buku Kas Digital Terverifikasi</span>
                 </div>
              </div>
              
              <div className="space-y-6 relative z-10">
                {displayLedger.map((tx, i) => (
                   <LedgerBlock 
                      key={tx.tx_id}
                      hash={`0x${tx.tx_id.substring(0,6)}...${tx.tx_id.substring(tx.tx_id.length-4)}`} 
                      label={tx.action.replace('_', ' ')} 
                      region={tx.actor_location} 
                      date={new Date(tx.timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} 
                      status="Verified"
                      active={i === displayLedger.length - 1} 
                   />
                ))}
              </div>
              
              <div className="mt-12 bg-stripe-indigo/5 p-8 rounded-[32px] border border-dashed border-stripe-indigo/20 flex flex-col space-y-6">
                 <div className="flex items-center space-x-6">
                    <QrCode size={48} className="text-stripe-indigo" weight="fill" />
                    <div>
                       <p className="font-black text-stripe-indigo text-xl">Consumer-Facing Transparency</p>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-md">
                          Setiap produk memiliki QR Code unik yang terhubung ke ledger ini. Konsumen dapat melakukan scan untuk melihat riwayat lengkap produk.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="glass-card rounded-[48px] p-10 shadow-sm border border-white bg-white/40 backdrop-blur-3xl">
              <h3 className="text-xl font-black text-stripe-indigo mb-6 tracking-tight">Logika Transparansi</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Konsensus Blockchain</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Setiap input data divalidasi oleh 3 node (Petani, Pembeli, dan Pemerintah) sebelum ditulis ke dalam ledger permanen.
                    </p>
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Mencegah Fraud</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Menghilangkan kemungkinan klaim palsu mengenai asal-usul produk atau penggunaan input kimiawi yang dilarang.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Social Insight Preview & Simulation */}
        <div className="space-y-10">
           <div className="bg-stripe-violet rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-1000">
                 <QrCode size={180} weight="fill" />
              </div>
              <h3 className="text-xl font-black mb-10 relative z-10 flex items-center space-x-3">
                 <MagnifyingGlass size={28} weight="bold" />
                 <span>Consumer Website Preview</span>
              </h3>
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 relative z-10 text-center">
                 <div className="mb-8 w-24 h-24 bg-white mx-auto rounded-2xl flex items-center justify-center p-2 shadow-xl">
                    <QrCode size={80} className="text-stripe-indigo" />
                 </div>
                 <p className="text-sm font-bold leading-relaxed mb-8">
                    "Produk ini terverifikasi 100% Organik dari Lahan Kediri. Pemanen: Bpk. Sugeng (AgriScore 820)."
                 </p>
                 <button className="w-full bg-white text-stripe-indigo py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Buka Link Konsumen</button>
              </div>
           </div>

           <div className="glass-card rounded-[48px] p-10 shadow-xl flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-stripe-indigo/5 rounded-full flex items-center justify-center text-stripe-indigo mb-8">
                 <FileText size={36} weight="bold" />
              </div>
              <h4 className="text-xl font-black text-stripe-indigo mb-4 tracking-tight">Audit Report</h4>
              <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-xs leading-relaxed mb-8">
                 Ingin verifikasi lebih lanjut? Unduh laporan audit ledger secara periodik untuk kepatuhan standar internasional.
              </p>
              
              {/* Compliance Badges in Side */}
              <div className="flex space-x-3 mb-8">
                 <div className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[8px] font-black text-stripe-indigo uppercase tracking-widest">ISO 22000</div>
                 <div className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[8px] font-black text-stripe-emerald uppercase tracking-widest">HACCP Certified</div>
              </div>

              <Link href="/dashboard/logistics" className="w-full">
                  <button className="w-full bg-stripe-indigo text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3">
                     <Truck size={20} weight="fill" />
                     <span>Lacak Smart Logistics</span>
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
    <div className={`p-8 rounded-[32px] border transition-all ${active ? 'bg-stripe-indigo text-white border-stripe-indigo shadow-xl' : 'bg-white/40 border-white hover:bg-white hover:shadow-lg'}`}>
       <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
             <div className="font-mono text-[9px] opacity-40 rotate-90 w-4 tracking-tighter shrink-0">{hash}</div>
             <div>
                <p className={`font-black text-xl mb-1 ${active ? 'text-white' : 'text-stripe-indigo'}`}>{label}</p>
                <div className="flex items-center space-x-4">
                   <p className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-white/60' : 'text-stripe-slate opacity-40'}`}>{region || score}</p>
                   <span className="w-1 h-1 bg-current opacity-20 rounded-full"></span>
                   <p className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-white/60' : 'text-stripe-slate opacity-40'}`}>{date}</p>
                </div>
             </div>
          </div>
          <div className="text-right flex flex-col items-end">
             <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-1">
                <ShieldCheck size={14} weight="fill" className={active ? 'text-white' : 'text-stripe-emerald'} />
                <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-stripe-indigo'}`}>{status}</p>
             </div>
          </div>
       </div>
    </div>
  );
}
