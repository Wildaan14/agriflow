"use client";

import React from 'react';
import { Leaf, Camera, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, MagicWand, Warning, Sparkle, Microscope } from '@phosphor-icons/react';

export default function DiseasePage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* Refined Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 lg:p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#14b850]/20 text-[#14b850] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(20,184,80,0.2)] border border-[#14b850]/30">Pre-Harvest AI — ACTIVE</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-white">Crop Disease & <span className="text-[#14b850]">Smart Planting</span></h1>
           <p className="text-white/50 font-light text-sm lg:text-base leading-relaxed">Diagnosis penyakit otomatis dan intelijen masa tanam berbasis data.</p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#14b850] text-[#0A0D14] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all">
              Scan Penyakit Baru
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Status - The Detection Result */}
        <div className="lg:col-span-2 space-y-8">
           {/* Disease Prediction Card */}
           <div className="bg-white/[0.02] p-10 rounded-[32px] shadow-2xl border-t border-white/[0.05] border-x border-x-white/[0.05] border-b border-b-[#14b850]/50 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#14b850]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/[0.05] pb-6 relative z-10">
                 <h2 className="text-xl font-semibold text-white tracking-tight">Hasil Analisis On-Device AI</h2>
                 <div className="flex items-center space-x-2 bg-[#0A0D14] border border-white/[0.1] px-4 py-2 rounded-lg mt-4 md:mt-0">
                    <span className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest animate-pulse">Inference complete (1.2s)</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div className="p-8 bg-[#0A0D14] rounded-3xl border border-white/[0.05] flex items-center justify-center relative overflow-hidden group hover:border-[#14b850]/20 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#14b850]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Leaf size={100} className="text-[#14b850]/20 group-hover:text-[#14b850]/40 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center shadow-lg text-[#14b850] group-hover:bg-[#14b850] group-hover:text-[#0A0D14] transition-colors">
                       <Camera size={20} weight="bold" />
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Identifikasi Penyakit</p>
                       <p className="text-3xl font-semibold text-white tracking-tight">Antraknosa</p>
                       <div className="flex items-center space-x-3 mt-3">
                          <span className="text-[11px] font-bold text-[#14b850] bg-[#14b850]/10 px-2 py-1 rounded">Keyakinan: 94%</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                          <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest">On-Device AI</span>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Rekomendasi Penanganan</p>
                       <TreatmentItem label="Organik: Larutan Bawang Putih" priority="Rekomendasi Utama" icon={Sparkle} color="text-[#14b850]" bg="bg-[#14b850]/10" border="border-[#14b850]/20" />
                       <TreatmentItem label="Kimiawi: Fungisida X (Dosis 2ml/L)" priority="Opsi Lanjut" icon={Microscope} color="text-[#0ea5e9]" bg="bg-[#0ea5e9]/10" border="border-[#0ea5e9]/20" />
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 bg-[#8b5cf6]/5 p-8 rounded-2xl border border-[#8b5cf6]/20 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-start md:items-center relative z-10 group hover:border-[#8b5cf6]/40 transition-colors">
                 <div className="w-16 h-16 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 transition-transform">
                    <MagicWand size={32} weight="fill" />
                 </div>
                 <div>
                    <p className="font-semibold text-white text-lg mb-2 tracking-tight">Rekomendasi Tanam Cerdas</p>
                    <p className="text-sm font-light text-white/70 max-w-lg leading-relaxed">
                       "Berdasarkan prakiraan BMKG 90 hari ke depan & proyeksi harga, kami rekomendasikan menanam BAWANG MERAH musim depan."
                    </p>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#14b850]/5 rounded-[32px] p-10 shadow-sm border border-[#14b850]/20 relative overflow-hidden">
               <h3 className="text-lg font-semibold text-white mb-6 tracking-tight relative z-10">Logika Proteksi Tanaman</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mb-2">Disease Detection</p>
                     <p className="text-sm font-light text-white/70 leading-relaxed">
                        Sistem deteksi penyakit berjalan langsung di perangkat. Sangat krusial untuk petani di daerah yang minim koneksi internet.
                     </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mb-2">Smart Tanam</p>
                    <p className="text-sm font-light text-white/70 leading-relaxed">
                       Multi-objective optimization menyeimbangkan proyeksi harga, kesesuaian cuaca BMKG, dan permintaan pasar aktif.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Social Insight Preview & Simulation */}
        <div className="space-y-8">
           <div className="bg-[#14b850]/5 border border-[#14b850]/20 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none">
                 <Microscope size={180} weight="fill" className="text-[#14b850]" />
              </div>
              <h3 className="text-sm font-semibold mb-8 relative z-10 flex items-center space-x-3 uppercase tracking-wide text-white/80">
                 <Camera size={20} className="text-[#14b850]" weight="bold" />
                 <span>Scanning History</span>
              </h3>
              <div className="bg-[#0A0D14] border border-white/[0.05] rounded-2xl p-6 relative z-10">
                 <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#14b850]/10 text-[#14b850] px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Dataset Epidemologi</span>
                 </div>
                 <p className="text-[13px] font-light text-white/80 leading-relaxed">
                    Data scanning Anda berkontribusi pada pemetaan penyebaran penyakit tanaman nasional oleh Kementan & BRIN.
                 </p>
              </div>
           </div>

           <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center text-[#f59e0b] mb-6">
                 <Warning size={32} weight="bold" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 tracking-tight">Kesehatan Lahan</h4>
              <p className="text-xs font-light text-white/50 leading-relaxed mb-8 max-w-xs">
                 Pantau pola penyakit di wilayah Anda secara kolektif untuk mitigasi penyebaran dini.
              </p>
              <button className="w-full bg-white/[0.05] border border-white/[0.1] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all flex items-center justify-center space-x-2">
                 <span>Dapatkan Konsultasi Ahli</span>
                 <ArrowRight size={14} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentItem({ label, priority, icon: Icon, color, bg, border }: any) {
  return (
    <div className={`p-4 bg-[#0A0D14] rounded-2xl border border-white/[0.05] flex items-center space-x-4 hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group cursor-pointer`}>
       <div className={`w-10 h-10 ${bg} ${border} border rounded-xl flex items-center justify-center ${color} transition-all`}>
          <Icon size={20} weight="fill" />
       </div>
       <div>
          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 group-hover:text-white/60 transition-colors">{priority}</p>
          <p className={`text-sm font-semibold text-white group-hover:${color} transition-colors`}>{label}</p>
       </div>
    </div>
  );
}
