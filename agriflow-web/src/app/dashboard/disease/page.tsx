"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Leaf, 
  Camera, 
  Globe, 
  MagicWand, 
  Warning, 
  Sparkle, 
  Microscope 
} from '@phosphor-icons/react';

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic(() => import('@/components/maps/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center rounded-3xl border border-white/5">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Initialising Health Map…</p>
      </div>
    </div>
  ),
});

const DISEASE_HOTSPOTS = [
  { id: 1, position: [-7.3966, 109.3641] as [number, number], title: "Anthracnose Outbreak", status: "Kritis" },
  { id: 2, position: [-6.8726, 109.0317] as [number, number], title: "Bacterial Leaf Spot", status: "Tinggi" },
  { id: 3, position: [-7.5090, 109.2300] as [number, number], title: "Healthy Zone", status: "Normal" },
];

export default function DiseasePage() {
  const markers = useMemo(() => {
    return DISEASE_HOTSPOTS.map(h => ({
      ...h,
      content: (
        <div className="mt-1 text-[10px] text-slate-500 italic">
          Infection Level: {h.status === 'Kritis' ? '92%' : '45%'}
        </div>
      )
    }));
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 italic">Crop Health & Disease</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">On-device AI diagnosis and regional health surveillance.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal bg-slate-900 text-white text-xs px-6 py-2.5 shadow-lg">
              <Camera size={18} />
              <span>New AI Scan</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Diagnosis Result */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-10 shadow-xl">
              <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-8">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center">
                    <Microscope size={24} className="text-[#14b850] mr-4" />
                    On-Device AI Analysis
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-green-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-100">Inference: 1.2s</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="p-12 bg-slate-50 rounded-[40px] border border-transparent flex items-center justify-center relative group overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[#14b850]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Leaf size={120} className="text-slate-200 group-hover:text-[#14b850]/20 transition-all duration-700" />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[#14b850] transition-colors">
                       <Camera size={24} weight="bold" />
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Diagnosis</p>
                       <p className="text-3xl font-bold text-slate-900 tracking-tight font-outfit">Anthracnose</p>
                       <div className="flex items-center space-x-2 mt-2">
                          <div className="w-2 h-2 rounded-full bg-[#14b850] animate-pulse"></div>
                          <p className="text-[11px] font-bold text-[#14b850] uppercase tracking-widest">94% Confidence</p>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Treatment</p>
                       <TreatmentItem label="Garlic Solution (Organic)" priority="Primary" icon={Sparkle} color="text-[#14b850]" />
                       <TreatmentItem label="Fungicide X (2ml/L)" priority="Alternative" icon={Microscope} color="text-blue-500" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-clean p-8 flex items-start space-x-6 bg-slate-900 border-none shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#14b850]/10 rounded-full blur-3xl" />
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0 border border-white/10 group-hover:rotate-12 transition-transform">
                 <MagicWand size={28} weight="fill" />
              </div>
              <div>
                 <h4 className="text-lg font-bold text-white mb-2">Smart Planting Recommendation</h4>
                 <p className="text-[12px] text-white/50 font-medium leading-relaxed italic">"Based on 90-day BMKG forecasts and price projections, we recommend planting <strong className="text-[#14b850]">SHALLOTS</strong> next season for optimal yield."</p>
              </div>
           </div>
        </div>

        {/* Sidebar History & Map */}
        <div className="lg:col-span-1 space-y-8">
           <div className="card-clean p-8 shadow-xl">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Scanning History</h4>
              <div className="space-y-4">
                 <HistoryItem date="14 May" diagnosis="Anthracnose" />
                 <HistoryItem date="02 May" diagnosis="Bacterial Leaf" />
                 <HistoryItem date="28 Apr" diagnosis="Healthy" />
              </div>
           </div>

           <div className="card-clean p-2 shadow-2xl relative group overflow-hidden h-[400px]">
              <LeafletMap center={[-7.4250, 109.3]} zoom={8} markers={markers} />
              <div className="absolute bottom-6 left-6 right-6 z-[400] bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-white shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                 <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Globe size={16} className="text-[#14b850]" /> Regional Health
                 </h4>
                 <p className="text-[10px] text-slate-500 font-medium">Collective patterns help early mitigation in your area.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentItem({ label, priority, icon: Icon, color }: any) {
  return (
    <div className="p-5 rounded-2xl border border-slate-100 flex items-center space-x-5 hover:bg-slate-50 transition-all cursor-pointer group">
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-white shadow-sm border border-slate-50 group-hover:scale-110 transition-transform`}>
          <Icon size={20} weight="fill" />
       </div>
       <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{priority}</p>
          <p className="text-xs font-bold text-slate-900">{label}</p>
       </div>
    </div>
  );
}

function HistoryItem({ date, diagnosis }: { date: string, diagnosis: string }) {
   return (
      <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-none group cursor-pointer">
         <span className="text-[11px] font-bold text-slate-900 group-hover:text-[#14b850] transition-colors">{diagnosis}</span>
         <span className="text-[11px] text-slate-400">{date}</span>
      </div>
   );
}

