"use client";

import React from 'react';
import { Vault, ChartPieSlice, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Target, Bank } from '@phosphor-icons/react';

export default function SubsidyPage() {
  return (
    <div className="space-y-16 py-8 animate-in">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <div className="w-10 h-10 bg-stripe-indigo/10 rounded-xl flex items-center justify-center text-stripe-indigo">
                <Vault size={24} weight="fill" />
             </div>
             <span className="text-[12px] font-black text-stripe-indigo uppercase tracking-[0.3em]">AgriFlow Precision Subsidy Control</span>
          </div>
          <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4">Subsidi Dashboard: Alokasi Presisi</h1>
          <p className="text-stripe-slate font-bold text-lg max-w-2xl leading-relaxed">
             Sistem monitoring alokasi subsidi pupuk dan benih nasional berbasis profil risiko dan produktivitas petani (AgriScore) secara transparan.
          </p>
        </div>
        <div className="flex space-x-6">
           <button className="bg-stripe-indigo text-white px-10 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">
              Audit Alokasi Bulanan
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Status - The Allocation Chart Simulation */}
        <div className="lg:col-span-2 space-y-10">
           {/* Allocation Visualization */}
           <div className="glass-card rounded-[56px] p-12 shadow-xl border-t-8 border-t-stripe-emerald relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-emerald/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">Status Penyaluran Subsidi Nasional</h2>
                 <div className="flex items-center space-x-3 bg-stripe-emerald/10 px-4 py-2 rounded-full">
                    <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest">Real-time Allocation Tracking</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                 <div className="p-8 bg-stripe-indigo/5 rounded-[40px] border border-stripe-indigo/5">
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest opacity-40">Target Penyaluran</p>
                       <ChartPieSlice size={20} className="text-stripe-indigo opacity-30" />
                    </div>
                    <p className="text-4xl font-black text-stripe-indigo mb-2">Rp 12.8T</p>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-6">
                       <div className="h-full bg-stripe-indigo w-[68%]"></div>
                    </div>
                    <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest mt-4">68% Disbursed Successfully</p>
                 </div>
                 <div className="p-8 bg-stripe-emerald/5 rounded-[40px] border border-stripe-emerald/5">
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest opacity-40">Saving vs Anggaran</p>
                       <ChartLineUp size={20} className="text-stripe-emerald opacity-30" />
                    </div>
                    <p className="text-4xl font-black text-stripe-emerald mb-2">Rp 842M</p>
                    <p className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest mt-4">Efisiensi via Targetting Presisi</p>
                 </div>
              </div>
              
              <div className="mt-12 bg-stripe-indigo/5 p-8 rounded-[32px] border border-dashed border-stripe-indigo/20 flex flex-col space-y-6">
                 <div className="flex items-center space-x-6">
                    <Target size={48} className="text-stripe-indigo" weight="fill" />
                    <div>
                       <p className="font-black text-stripe-indigo text-xl">Targeting Berbasis AgriScore</p>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-md">
                          Subsidi diprioritaskan untuk petani dengan AgriScore di atas 450 untuk memastikan output produktivitas yang maksimal bagi ketahanan pangan nasional.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="glass-card rounded-[48px] p-10 shadow-sm border border-white bg-white/40 backdrop-blur-3xl">
              <h3 className="text-xl font-black text-stripe-indigo mb-6 tracking-tight">Visi Alokasi Subsidi</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Transparansi Penyaluran</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Sistem memonitor setiap gram pupuk yang terkirim dari gudang Pupuk Indonesia hingga ke pengecer/petani secara real-time.
                    </p>
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Dampak Anggaran Negara</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Mengurangi potensi 'subsidi nyasar' melalui integrasi NIK petani dan validasi status lahan via satelit.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Gov Action Preview & Simulation */}
        <div className="space-y-10">
           <div className="bg-stripe-indigo rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-1000">
                 <Bank size={180} weight="fill" />
              </div>
              <h3 className="text-xl font-black mb-10 relative z-10 flex items-center space-x-3">
                 <ShieldCheck size={28} weight="bold" />
                 <span>Admin Control Plane</span>
              </h3>
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest">Authorized Access</span>
                 </div>
                 <ul className="space-y-4 text-xs font-bold list-disc pl-4 opacity-80">
                    <li>Verifikasi NIK Petani Lintas Kementan</li>
                    <li>Update Alokasi Kuota Pupuk Per Desa</li>
                    <li>Audit Transaksi Subsidi Pengecer</li>
                    <li>Freeze Alokasi Status Anomali</li>
                 </ul>
              </div>
           </div>

           <div className="glass-card rounded-[48px] p-10 shadow-xl flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-stripe-violet/10 rounded-full flex items-center justify-center text-stripe-violet mb-8">
                 <FileText size={36} weight="bold" />
              </div>
              <h4 className="text-xl font-black text-stripe-indigo mb-4 tracking-tight">Laporan Akuntabilitas</h4>
              <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-xs leading-relaxed mb-8">
                 Download laporan realisasi subsidi standar BPK untuk keperluan pelaporan tahunan instansi Anda.
              </p>
              <button className="w-full bg-stripe-indigo text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3">
                 <span>Unduh Laporan XLSX</span>
                 <ArrowRight size={16} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
