"use client";

import React from 'react';
import { Leaf, Camera, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, MagicWand, Warning, Sparkle, Microscope } from '@phosphor-icons/react';

export default function DiseasePage() {
  return (
    <div className="space-y-16 py-8 animate-in">
      {/* Refined Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-stripe-emerald text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-stripe-emerald/20">Pre-Harvest AI — ACTIVE</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none italic">Crop Disease & Smart Planting</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70 italic font-serif leading-none">Diagnosis penyakit otomatis dan intelijen masa tanam berbasis data.</p>
        </div>
        <div className="flex space-x-6">
           <button className="bg-stripe-indigo text-white px-10 py-5 rounded-[22px] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all">
              Scan Penyakit Baru
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Status - The Detection Result */}
        <div className="lg:col-span-2 space-y-10">
           {/* Disease Prediction Card */}
           <div className="glass-card rounded-[56px] p-12 shadow-xl border-t-8 border-t-stripe-emerald relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-emerald/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">Hasil Analisis On-Device AI</h2>
                 <div className="flex items-center space-x-3 bg-stripe-emerald/10 px-4 py-2 rounded-full">
                    <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest animate-pulse">Inference complete (1.2s)</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                 <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-stripe-violet/10 via-transparent to-stripe-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Leaf size={120} className="text-stripe-emerald opacity-10 group-hover:scale-125 transition-transform" />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 text-stripe-emerald">
                       <Camera size={24} weight="bold" />
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                       <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Identifikasi Penyakit</p>
                       <p className="text-3xl font-black text-stripe-indigo tracking-tight">Antraknosa</p>
                       <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs font-black text-stripe-emerald">Tingkat Keyakinan: 94%</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                          <span className="text-xs font-black text-stripe-slate uppercase tracking-widest opacity-40">On-Device AI</span>
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-4 opacity-40">Rekomendasi Penanganan</p>
                       <TreatmentItem label="Organik: Larutan Bawang Putih" priority="Rekomendasi Utama" icon={Sparkle} />
                       <TreatmentItem label="Kimiawi: Fungisida X (Dosis 2ml/L)" priority="Opsi Lanjut" icon={Microscope} />
                    </div>
                 </div>
              </div>
              
              <div className="mt-12 bg-stripe-violet/5 p-8 rounded-[32px] border border-dashed border-stripe-violet/20 flex flex-col space-y-6">
                 <div className="flex items-center space-x-6">
                    <MagicWand size={54} className="text-stripe-violet" weight="fill" />
                    <div>
                       <p className="font-black text-stripe-indigo text-xl">Rekomendasi Tanam Cerdas</p>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-md">
                          "Berdasarkan prakiraan BMKG 90 hari ke depan & proyeksi harga, kami rekomendasikan menanam BAWANG MERAH musim depan."
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Explanation Card */}
           <div className="glass-card rounded-[48px] p-10 shadow-sm border border-white bg-white/40 backdrop-blur-3xl">
               <h3 className="text-xl font-black text-stripe-indigo mb-6 tracking-tight">Logika Proteksi Tanaman</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Disease Detection</p>
                     <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                        Sistem deteksi penyakit berjalan langsung di perangkat. Sangat krusial untuk petani di daerah yang minim koneksi internet.
                     </p>
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-stripe-slate uppercase tracking-widest mb-2 opacity-40">Smart Tanam</p>
                    <p className="text-sm font-bold text-stripe-slate leading-relaxed">
                       Multi-objective optimization menyeimbangkan proyeksi harga, kesesuaian cuaca BMKG, dan permintaan pasar aktif.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Social Insight Preview & Simulation */}
        <div className="space-y-10">
           <div className="bg-stripe-emerald rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-1000">
                 <Microscope size={180} weight="fill" />
              </div>
              <h3 className="text-xl font-black mb-10 relative z-10 flex items-center space-x-3">
                 <Camera size={28} weight="bold" />
                 <span>Scanning History</span>
              </h3>
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest">Dataset Epidemologi</span>
                 </div>
                 <p className="text-sm font-bold leading-relaxed">
                    Data scanning Anda berkontribusi pada pemetaan penyebaran penyakit tanaman nasional oleh Kementan & BRIN.
                 </p>
              </div>
           </div>

           <div className="glass-card rounded-[48px] p-10 shadow-xl flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-500 mb-8">
                 <Warning size={36} weight="bold" />
              </div>
              <h4 className="text-xl font-black text-stripe-indigo mb-4 tracking-tight">Kesehatan Lahan</h4>
              <p className="text-sm font-bold text-stripe-slate opacity-60 max-w-xs leading-relaxed mb-8">
                 Pantau pola penyakit di wilayah Anda secara kolektif untuk mitigasi penyebaran dini.
              </p>
              <button className="w-full bg-stripe-indigo text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3">
                 <span>Dapatkan Konsultasi Ahli</span>
                 <ArrowRight size={16} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentItem({ label, priority, icon: Icon }: any) {
  return (
    <div className="p-4 bg-white/40 rounded-2xl border border-white flex items-center space-x-4 hover:bg-white hover:shadow-md transition-all group">
       <div className="w-8 h-8 bg-stripe-indigo/5 rounded-lg flex items-center justify-center text-stripe-indigo group-hover:bg-stripe-indigo group-hover:text-white transition-all">
          <Icon size={16} weight="bold" />
       </div>
       <div>
          <p className="text-[10px] font-black text-stripe-slate uppercase tracking-widest opacity-40 group-hover:text-stripe-indigo transition-colors">{priority}</p>
          <p className="text-sm font-bold text-stripe-indigo">{label}</p>
       </div>
    </div>
  );
}
