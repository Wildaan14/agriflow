"use client";

import React from 'react';
import { Vault, ChartPieSlice, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Target, Bank } from '@phosphor-icons/react';

export default function SubsidyPage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F] shadow-sm">
                <Vault size={20} weight="fill" />
             </div>
             <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-[0.2em]">AgriFlow Precision Subsidy Control</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-[#1B4D1B]">Subsidi Dashboard: <span className="text-[#4A9E3F]">Alokasi Presisi</span></h1>
          <p className="text-[#1A2E1A]/50 text-sm font-medium max-w-2xl leading-relaxed">
             Sistem monitoring alokasi subsidi pupuk dan benih nasional berbasis profil risiko dan produktivitas petani (AgriScore) secara transparan.
          </p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#1B4D1B] text-white px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all">
              Audit Alokasi Bulanan
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Status - The Allocation Chart Simulation */}
        <div className="lg:col-span-2 space-y-8">
           {/* Allocation Visualization */}
           <div className="bg-white/60 p-10 rounded-[32px] shadow-xl border border-[#C7E0B0] relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A9E3F]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-[#C7E0B0]/50 pb-6 relative z-10">
                 <h2 className="text-xl font-bold text-[#1B4D1B] tracking-tight">Status Penyaluran Subsidi Nasional</h2>
                 <div className="flex items-center space-x-2 bg-white border border-[#C7E0B0] px-4 py-2 rounded-lg mt-4 md:mt-0 shadow-sm">
                    <span className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest">Real-time Allocation Tracking</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div className="p-8 bg-white rounded-3xl border border-[#C7E0B0] hover:border-[#4A9E3F]/20 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Target Penyaluran</p>
                       <ChartPieSlice size={24} className="text-[#1B4D1B]/20" />
                    </div>
                    <p className="text-4xl font-bold text-[#1B4D1B] mb-2">Rp 12.8T</p>
                    <div className="w-full h-2 bg-[#1B4D1B]/5 rounded-full overflow-hidden mt-6">
                       <div className="h-full bg-[#4A9E3F] shadow-sm w-[68%]"></div>
                    </div>
                    <p className="text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest mt-4">68% Disbursed Successfully</p>
                 </div>
                 <div className="p-8 bg-[#4A9E3F]/5 rounded-3xl border border-[#4A9E3F]/20 hover:border-[#4A9E3F]/40 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest">Saving vs Anggaran</p>
                       <ChartLineUp size={24} className="text-[#4A9E3F]/50" />
                    </div>
                    <p className="text-4xl font-bold text-[#4A9E3F] mb-2">Rp 842M</p>
                    <p className="text-[10px] font-bold text-[#1A2E1A]/60 uppercase tracking-widest mt-4">Efisiensi via Targetting Presisi</p>
                 </div>
              </div>
              
              <div className="mt-8 bg-white p-8 rounded-2xl border border-[#C7E0B0] flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-start md:items-center relative z-10 group hover:border-[#4A9E3F]/30 transition-colors shadow-sm">
                 <div className="w-16 h-16 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F] group-hover:scale-110 transition-transform">
                    <Target size={32} weight="fill" />
                 </div>
                 <div>
                    <p className="font-bold text-[#1B4D1B] text-lg mb-2 tracking-tight">Targeting Berbasis AgriScore</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/60 max-w-lg leading-relaxed">
                       Subsidi diprioritaskan untuk petani dengan AgriScore di atas 450 untuk memastikan output produktivitas yang maksimal bagi ketahanan pangan nasional.
                    </p>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#4A9E3F]/5 rounded-[32px] p-10 shadow-sm border border-[#4A9E3F]/20 relative overflow-hidden">
              <h3 className="text-lg font-bold text-[#1B4D1B] mb-6 tracking-tight relative z-10">Visi Alokasi Subsidi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Transparansi Penyaluran</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       Setiap gram pupuk yang terkirim dari gudang Pupuk Indonesia hingga ke pengecer/petani dimonitor secara real-time.
                    </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Dampak Anggaran Negara</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       Mengurangi potensi 'subsidi nyasar' melalui integrasi NIK petani dan validasi status lahan via satelit.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Gov Action Preview & Simulation */}
        <div className="space-y-8">
           <div className="bg-[#4A9E3F]/5 border border-[#4A9E3F]/20 rounded-[32px] p-8 text-[#1B4D1B] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none">
                 <Bank size={180} weight="fill" className="text-[#4A9E3F]" />
              </div>
              <h3 className="text-sm font-bold mb-8 relative z-10 flex items-center space-x-3 uppercase tracking-wide text-[#1B4D1B]/80">
                 <ShieldCheck size={20} className="text-[#4A9E3F]" weight="bold" />
                 <span>Admin Control Plane</span>
              </h3>
              <div className="bg-white border border-[#C7E0B0] rounded-2xl p-6 relative z-10 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Authorized Access</span>
                 </div>
                 <ul className="space-y-3 text-[13px] font-bold list-disc pl-4 text-[#1A2E1A]/80 marker:text-[#4A9E3F]">
                    <li>Verifikasi NIK Petani Lintas Kementan</li>
                    <li>Update Alokasi Kuota Pupuk Per Desa</li>
                    <li>Audit Transaksi Subsidi Pengecer</li>
                    <li>Freeze Alokasi Status Anomali</li>
                 </ul>
              </div>
           </div>

           <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] flex flex-col items-center text-center shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="w-16 h-16 bg-[#8b5cf6]/10 rounded-xl flex items-center justify-center text-[#8b5cf6] mb-6">
                 <FileText size={32} weight="bold" />
              </div>
              <h4 className="text-xl font-bold text-[#1B4D1B] mb-3 tracking-tight">Laporan Akuntabilitas</h4>
              <p className="text-xs font-medium text-[#1A2E1A]/50 leading-relaxed mb-8 max-w-xs">
                 Download laporan realisasi subsidi standar BPK untuk keperluan pelaporan tahunan instansi Anda.
              </p>
              <button className="w-full bg-white border border-[#C7E0B0] text-[#1B4D1B] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B] hover:text-white transition-all flex items-center justify-center space-x-2 shadow-sm">
                 <span>Unduh Laporan XLSX</span>
                 <ArrowRight size={14} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
