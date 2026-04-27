"use client";

import React from 'react';
import { Leaf, Camera, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, MagicWand, Warning, Sparkle, Microscope } from '@phosphor-icons/react';

export default function DiseasePage() {
  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Refined Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-8 lg:p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-[#4A9E3F]/20">Pre-Harvest AI — ACTIVE</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-[#1B4D1B]">Crop Disease & <span className="text-[#4A9E3F]">Smart Planting</span></h1>
           <p className="text-[#1A2E1A]/50 font-medium text-sm lg:text-base leading-relaxed">Diagnosis penyakit otomatis dan intelijen masa tanam berbasis data.</p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-[#1B4D1B] text-white px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all">
              Scan Penyakit Baru
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Status - The Detection Result */}
        <div className="lg:col-span-2 space-y-8">
           {/* Disease Prediction Card */}
           <div className="bg-white/60 p-10 rounded-[32px] shadow-xl border border-[#C7E0B0] relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A9E3F]/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-[#C7E0B0]/50 pb-6 relative z-10">
                 <h2 className="text-xl font-bold text-[#1B4D1B] tracking-tight">Hasil Analisis On-Device AI</h2>
                 <div className="flex items-center space-x-2 bg-white border border-[#C7E0B0] px-4 py-2 rounded-lg mt-4 md:mt-0 shadow-sm">
                    <span className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest animate-pulse">Inference complete (1.2s)</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div className="p-8 bg-white rounded-3xl border border-[#C7E0B0] flex items-center justify-center relative overflow-hidden group hover:border-[#4A9E3F]/20 transition-colors shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#4A9E3F]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Leaf size={100} className="text-[#1B4D1B]/10 group-hover:text-[#4A9E3F]/20 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white border border-[#C7E0B0] rounded-xl flex items-center justify-center shadow-lg text-[#4A9E3F] group-hover:bg-[#4A9E3F] group-hover:text-white transition-colors">
                       <Camera size={20} weight="bold" />
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                       <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-2">Identifikasi Penyakit</p>
                       <p className="text-3xl font-bold text-[#1B4D1B] tracking-tight">Antraknosa</p>
                       <div className="flex items-center space-x-3 mt-3">
                          <span className="text-[11px] font-bold text-[#4A9E3F] bg-[#4A9E3F]/10 px-2 py-1 rounded">Keyakinan: 94%</span>
                          <span className="w-1 h-1 bg-[#1B4D1B]/20 rounded-full"></span>
                          <span className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">On-Device AI</span>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-2">Rekomendasi Penanganan</p>
                       <TreatmentItem label="Organik: Larutan Bawang Putih" priority="Rekomendasi Utama" icon={Sparkle} color="text-[#4A9E3F]" bg="bg-[#4A9E3F]/10" border="border-[#4A9E3F]/20" />
                       <TreatmentItem label="Kimiawi: Fungisida X (Dosis 2ml/L)" priority="Opsi Lanjut" icon={Microscope} color="text-[#0D7A6B]" bg="bg-[#0D7A6B]/10" border="border-[#0D7A6B]/20" />
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 bg-[#8b5cf6]/5 p-8 rounded-2xl border border-[#8b5cf6]/20 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-start md:items-center relative z-10 group hover:border-[#8b5cf6]/40 transition-colors shadow-sm">
                 <div className="w-16 h-16 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 transition-transform">
                    <MagicWand size={32} weight="fill" />
                 </div>
                 <div>
                    <p className="font-bold text-[#1B4D1B] text-lg mb-2 tracking-tight">Rekomendasi Tanam Cerdas</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 max-w-lg leading-relaxed">
                       "Berdasarkan prakiraan BMKG 90 hari ke depan & proyeksi harga, kami rekomendasikan menanam BAWANG MERAH musim depan."
                    </p>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="bg-[#4A9E3F]/5 rounded-[32px] p-10 shadow-sm border border-[#4A9E3F]/20 relative overflow-hidden">
               <h3 className="text-lg font-bold text-[#1B4D1B] mb-6 tracking-tight relative z-10">Logika Proteksi Tanaman</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Disease Detection</p>
                     <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                        Sistem deteksi penyakit berjalan langsung di perangkat. Sangat krusial untuk petani di daerah yang minim koneksi internet.
                     </p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Smart Tanam</p>
                    <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                       Multi-objective optimization menyeimbangkan proyeksi harga, kesesuaian cuaca BMKG, dan permintaan pasar aktif.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Social Insight Preview & Simulation */}
        <div className="space-y-8">
           <div className="bg-[#4A9E3F]/5 border border-[#4A9E3F]/20 rounded-[32px] p-8 text-[#1B4D1B] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none">
                 <Microscope size={180} weight="fill" className="text-[#4A9E3F]" />
              </div>
              <h3 className="text-sm font-bold mb-8 relative z-10 flex items-center space-x-3 uppercase tracking-wide text-[#1B4D1B]/80">
                 <Camera size={20} className="text-[#4A9E3F]" weight="bold" />
                 <span>Scanning History</span>
              </h3>
              <div className="bg-white border border-[#C7E0B0] rounded-2xl p-6 relative z-10 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Dataset Epidemologi</span>
                 </div>
                 <p className="text-[13px] font-medium text-[#1A2E1A]/80 leading-relaxed">
                    Data scanning Anda berkontribusi pada pemetaan penyebaran penyakit tanaman nasional oleh Kementan & BRIN.
                 </p>
              </div>
           </div>

           <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] flex flex-col items-center text-center shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                 <Warning size={32} weight="bold" />
              </div>
              <h4 className="text-xl font-bold text-[#1B4D1B] mb-3 tracking-tight">Kesehatan Lahan</h4>
              <p className="text-xs font-medium text-[#1A2E1A]/50 leading-relaxed mb-8 max-w-xs">
                 Pantau pola penyakit di wilayah Anda secara kolektif untuk mitigasi penyebaran dini.
              </p>
              <button className="w-full bg-white border border-[#C7E0B0] text-[#1B4D1B] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#4A9E3F] hover:text-white hover:border-[#4A9E3F] transition-all flex items-center justify-center space-x-2 shadow-sm">
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
    <div className={`p-4 bg-white rounded-2xl border border-[#C7E0B0] flex items-center space-x-4 hover:border-[#4A9E3F]/30 hover:bg-[#F4FAF0] transition-all group cursor-pointer shadow-sm`}>
       <div className={`w-10 h-10 ${bg} ${border} border rounded-xl flex items-center justify-center ${color} transition-all`}>
          <Icon size={20} weight="fill" />
       </div>
       <div>
          <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1 group-hover:text-[#1A2E1A]/60 transition-colors">{priority}</p>
          <p className={`text-sm font-bold text-[#1B4D1B] group-hover:${color} transition-colors`}>{label}</p>
       </div>
    </div>
  );
}
