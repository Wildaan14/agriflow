"use client";

import React from 'react';
import { QrCode, Wallet, ArrowRight, ShieldCheck, Bank, ChartBar, WhatsappLogo } from '@phosphor-icons/react';

export default function PaymentsPage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F] shadow-sm">
                <QrCode size={20} weight="fill" />
             </div>
             <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-[0.2em]">Inklusi Keuangan Digital</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-[#1B4D1B]">QRIS & <span className="text-[#4A9E3F]">Auto-Save Hub</span></h1>
          <p className="text-[#1A2E1A]/50 text-sm font-medium max-w-2xl leading-relaxed">
             Sistem pembayaran berbasis QRIS yang terintegrasi penuh dengan mekanisme tabungan mikro otomatis untuk kemandirian finansial ekosistem agrikultur.
          </p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#1B4D1B] text-white px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all">
              Generate QRIS Transaksi
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Stats/Status */}
        <div className="lg:col-span-2 space-y-8">
           {/* Wallet Overview */}
           <div className="bg-white/60 p-10 rounded-[32px] shadow-xl border border-[#C7E0B0] relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A9E3F]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-[#C7E0B0]/50 pb-6 relative z-10">
                 <h2 className="text-xl font-bold text-[#1B4D1B] tracking-tight flex items-center mb-4 md:mb-0">
                    <Wallet size={24} className="text-[#4A9E3F] mr-3" />
                    Status Tabungan Mikro
                 </h2>
                 <div className="flex items-center space-x-2 bg-white border border-[#C7E0B0] px-4 py-2 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-[#4A9E3F] rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest">Auto-Save 3% Active</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-10">
                 <div className="p-8 bg-white rounded-2xl border border-[#C7E0B0] group hover:border-[#4A9E3F]/30 transition-all shadow-sm">
                    <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-2">Dana Bersih Tersedia</p>
                    <p className="text-3xl font-bold text-[#1B4D1B] tracking-tighter group-hover:text-[#4A9E3F] transition-colors">Rp 24,500,000</p>
                 </div>
                 <div className="p-8 bg-[#4A9E3F]/5 rounded-2xl border border-[#4A9E3F]/20 shadow-sm">
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Total Tabungan Terkumpul</p>
                    <p className="text-3xl font-bold text-[#4A9E3F] tracking-tighter">Rp 2,450,800</p>
                 </div>
              </div>

              <div className="p-6 bg-[#1B4D1B]/5 rounded-2xl border border-[#C7E0B0] flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-6 shadow-sm">
                 <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 bg-[#1B4D1B]/10 border border-[#1B4D1B]/20 rounded-xl flex items-center justify-center text-[#1B4D1B]">
                       <Bank size={28} weight="fill" />
                    </div>
                    <div>
                       <p className="font-bold text-[#1B4D1B] mb-1">Escrow Account (AgriFlow Wallet)</p>
                       <div className="flex items-center space-x-2">
                          <ShieldCheck size={14} className="text-[#4A9E3F]" />
                          <p className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest">Protected by Midtrans Escrow</p>
                       </div>
                    </div>
                 </div>
                 <button className="w-full md:w-auto bg-white border border-[#C7E0B0] text-[#1B4D1B] px-6 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B] hover:text-white transition-all shadow-sm">
                    Withdraw to Bank
                 </button>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#4A9E3F]/5 rounded-[32px] p-10 shadow-sm border border-[#4A9E3F]/20 relative overflow-hidden">
              <h3 className="text-lg font-bold text-[#1B4D1B] mb-6 tracking-tight relative z-10">Informasi Transaksi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Alur Pembayaran</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       Setiap transaksi otomatis men-generate QRIS dinamis via Midtrans API. Dana masuk ke Escrow terlebih dahulu untuk keamanan berlapis sebelum dilepas ke petani.
                    </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Financial Impact</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       Mendorong digitalisasi transaksi sesuai blueprint Bank Indonesia (BSPI 2025) dan membangun credit history formal untuk akses modal lanjutan.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Notifications & Simulation */}
        <div className="space-y-8">
           <div className="bg-white/60 rounded-[32px] p-8 text-[#1B4D1B] shadow-xl border border-[#C7E0B0] relative overflow-hidden group backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A9E3F]/10 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="flex items-center space-x-3 mb-8 relative z-10">
                 <WhatsappLogo size={24} className="text-[#25D366]" weight="fill" />
                 <h3 className="text-sm font-bold tracking-wide uppercase text-[#1B4D1B]/80">WhatsApp Alert Demo</h3>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-[#C7E0B0] relative z-10 border-l-4 border-l-[#25D366] shadow-sm">
                 <p className="text-[13px] font-medium text-[#1A2E1A]/90 leading-relaxed">
                    "✅ Transaksi selesai. Dana bersih <strong className="text-[#1B4D1B] font-bold">Rp 1.500.000</strong> masuk ke dompet Anda. Tabungan otomatis <strong className="text-[#4A9E3F] font-bold">Rp 45.000</strong> telah ditambahkan ke brankas."
                 </p>
                 <div className="mt-6 flex justify-between items-center border-t border-[#C7E0B0] pt-4">
                    <span className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Baru Saja</span>
                    <span className="flex items-center space-x-1 bg-[#4A9E3F]/10 px-2 py-1 rounded">
                       <ShieldCheck size={12} className="text-[#4A9E3F]" weight="fill" />
                       <span className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest">Verified by AgriFlow</span>
                    </span>
                 </div>
              </div>
           </div>

           <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] flex flex-col items-center text-center shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="w-16 h-16 bg-[#0D7A6B]/10 rounded-xl flex items-center justify-center text-[#0D7A6B] mb-6">
                 <ChartBar size={32} weight="fill" />
              </div>
              <h4 className="text-xl font-bold text-[#1B4D1B] mb-3 tracking-tight">Proyeksi Tabungan</h4>
              <p className="text-xs font-medium text-[#1A2E1A]/50 leading-relaxed mb-8 max-w-xs">
                 Berdasarkan skor AgriScore & volume transaksi panen Anda, tabungan diproyeksikan mencapai <strong className="text-[#1B4D1B] font-bold">Rp 12.5M</strong> dalam 6 bulan ke depan.
              </p>
              <button className="w-full bg-white border border-[#C7E0B0] text-[#1B4D1B] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B] hover:text-white transition-all flex items-center justify-center space-x-2 shadow-sm">
                 <span>Download Report</span>
                 <ArrowRight size={14} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
