"use client";

import React from 'react';
import { QrCode, Wallet, ArrowRight, ShieldCheck, Bank, ChartBar, WhatsappLogo } from '@phosphor-icons/react';

export default function PaymentsPage() {
  return (
    <div className="space-y-16 py-8 animate-in">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-stripe-violet/10 rounded-xl flex items-center justify-center text-stripe-violet">
                <QrCode size={24} weight="fill" />
             </div>
             <span className="text-[12px] font-black text-stripe-violet uppercase tracking-[0.3em]">Inklusi Keuangan Digital</span>
          </div>
          <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4">QRIS & Auto-Save Hub</h1>
          <p className="text-stripe-slate font-bold text-lg max-w-2xl leading-relaxed">
             Sistem pembayaran berbasis QRIS yang terintegrasi penuh dengan mekanisme tabungan mikro otomatis untuk kemandirian finansial petani.
          </p>
        </div>
        <div className="flex space-x-6">
           <button className="bg-stripe-indigo text-white px-10 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">
              Generate QRIS Transaksi
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Stats/Status */}
        <div className="lg:col-span-2 space-y-10">
           {/* Wallet Overview */}
           <div className="glass-card rounded-[56px] p-12 shadow-xl border-t-8 border-t-stripe-violet relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-violet/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">Status Tabungan Mikro</h2>
                 <div className="flex items-center space-x-2 bg-stripe-emerald/10 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-stripe-emerald rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest">Auto-Save 3% Active</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-12 relative z-10">
                 <div className="p-8 bg-stripe-indigo/5 rounded-[32px] border border-stripe-indigo/5">
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-50">Dana Bersih Tersedia</p>
                    <p className="text-4xl font-black text-stripe-indigo tracking-tighter">Rp 24,500,000</p>
                 </div>
                 <div className="p-8 bg-stripe-violet/5 rounded-[32px] border border-stripe-violet/5">
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-50">Total Tabungan Terkumpul</p>
                    <p className="text-4xl font-black text-stripe-violet tracking-tighter">Rp 2,450,800</p>
                 </div>
              </div>

              <div className="mt-12 p-8 bg-white/40 rounded-[32px] border border-white flex items-center justify-between">
                 <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-stripe-violet rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <Bank size={24} weight="fill" />
                    </div>
                    <div>
                       <p className="font-black text-stripe-indigo">Escrow Account (AgriFlow Wallet)</p>
                       <p className="text-xs font-bold text-stripe-slate opacity-40 uppercase tracking-widest mt-1">Status: Protected by Midtrans Escrow</p>
                    </div>
                 </div>
                 <button className="bg-stripe-indigo text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all">
                    Withdraw to Bank
                 </button>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="glass-card rounded-[48px] p-10 shadow-sm border border-white bg-white/40 backdrop-blur-3xl">
              <h3 className="text-xl font-black text-stripe-indigo mb-6 tracking-tight">Informasi Transaksi</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Proses</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Setiap transaksi otomatis men-generate QRIS unik via Midtrans API. Dana masuk ke Escrow terlebih dahulu untuk keamanan ganda.
                    </p>
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Impact</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Meningkatkan volume transaksi digital sesuai agenda Bank Indonesia dan membangun cadangan keuangan formal sesuai agenda OJK.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Notifications & Simulation */}
        <div className="space-y-10">
           <div className="bg-stripe-violet rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 -rotate-12 transition-transform group-hover:rotate-0 duration-1000">
                 <WhatsappLogo size={180} weight="fill" />
              </div>
              <h3 className="text-xl font-black mb-10 relative z-10 flex items-center space-x-3">
                 <WhatsappLogo size={28} weight="bold" />
                 <span>WhatsApp Alert Demo</span>
              </h3>
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 relative z-10">
                 <p className="text-sm font-bold leading-relaxed">
                    "Transaksi selesai. Dana bersih <strong>Rp 1.500.000</strong> masuk ke dompet Anda. Tabungan otomatis <strong>Rp 45.000</strong> telah ditambahkan."
                 </p>
                 <div className="mt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                    <span>Just Now</span>
                    <span className="flex items-center space-x-1">
                       <ShieldCheck size={14} weight="fill" />
                       <span>Verified by AgriFlow</span>
                    </span>
                 </div>
              </div>
           </div>

           <div className="glass-card rounded-[48px] p-10 shadow-xl flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-stripe-indigo/5 rounded-full flex items-center justify-center text-stripe-indigo mb-8">
                 <ChartBar size={36} weight="bold" />
              </div>
              <h4 className="text-xl font-black text-stripe-indigo mb-4 tracking-tight">Proyeksi Tabungan</h4>
              <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-xs leading-relaxed mb-8">
                 Berdasarkan AgriScore & volume transaksi Anda, tabungan diprediksi mencapai Rp 12.5M dalam 6 bulan.
              </p>
              <button className="w-full bg-stripe-indigo text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:translate-y-[-2px] transition-all">
                 Download Report
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
