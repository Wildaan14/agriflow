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
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[32px] border border-slate-200">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initialising Health Map…</p>
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
        <div className="mt-2 text-[10px] text-slate-500 font-medium">
          Infection Level: <span className={`font-bold ${h.status === 'Kritis' ? 'text-rose-500' : h.status === 'Tinggi' ? 'text-amber-500' : 'text-[#14b850]'}`}>{h.status === 'Kritis' ? '92%' : h.status === 'Tinggi' ? '65%' : '0%'}</span>
        </div>
      )
    }));
  }, []);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Crop Health & Disease</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">On-device AI diagnosis and regional health surveillance.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal bg-[#1B4D1B] text-white hover:bg-[#133813] text-[11px] uppercase tracking-widest font-bold px-6 py-3 rounded-xl shadow-lg shadow-[#1B4D1B]/20 transition-all flex items-center gap-2">
              <Camera size={18} weight="bold" />
              <span>New AI Scan</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Diagnosis Result */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-10 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-8">
                 <h2 className="text-xl font-bold text-[#1B4D1B] flex items-center tracking-tight">
                    <Microscope size={28} className="text-[#14b850] mr-4" weight="duotone" />
                    On-Device AI Analysis
                 </h2>
                 <span className="text-[10px] font-bold text-[#1B4D1B] bg-[#14b850]/10 px-4 py-1.5 rounded-xl uppercase tracking-widest border border-[#14b850]/20 flex items-center gap-2">
                    <Sparkle size={14} className="text-[#14b850]" /> Inference: 1.2s
                 </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="p-12 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-center relative group overflow-hidden shadow-inner cursor-pointer hover:border-[#14b850]/30 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#14b850]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Leaf size={120} weight="duotone" className="text-slate-300 group-hover:text-[#14b850]/40 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[#14b850] transition-colors group-hover:scale-110">
                       <Camera size={24} weight="duotone" />
                    </div>
                 </div>
                 <div className="space-y-8 flex flex-col justify-center">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Diagnosis Result</p>
                       <p className="text-4xl font-bold text-slate-900 tracking-tight">Anthracnose</p>
                       <div className="flex items-center space-x-2 mt-3 bg-[#14b850]/10 inline-flex px-3 py-1.5 rounded-lg border border-[#14b850]/20">
                          <div className="w-2 h-2 rounded-full bg-[#14b850] animate-pulse"></div>
                          <p className="text-[10px] font-bold text-[#1B4D1B] uppercase tracking-widest">94% Confidence Level</p>
                       </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Treatment</p>
                       <TreatmentItem label="Garlic Solution (Organic)" priority="Primary" icon={Sparkle} color="text-[#14b850]" bg="bg-[#14b850]/10" border="border-[#14b850]/20" />
                       <TreatmentItem label="Fungicide X (2ml/L)" priority="Alternative" icon={Microscope} color="text-blue-500" bg="bg-blue-50" border="border-blue-100" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-clean p-8 flex items-center space-x-8 bg-gradient-to-r from-[#1B4D1B] to-[#133813] border-none shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all cursor-pointer">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#14b850]/20 rounded-full blur-3xl group-hover:bg-[#14b850]/30 transition-colors duration-700" />
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#14b850] shadow-inner shrink-0 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                 <MagicWand size={32} weight="duotone" />
              </div>
              <div className="relative z-10 pr-8">
                 <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#14b850] transition-colors">Smart Planting Recommendation</h4>
                 <p className="text-[13px] text-white/70 font-medium leading-relaxed italic">"Based on 90-day BMKG forecasts and current soil health index, we strongly recommend planting <strong className="text-white px-2 py-0.5 bg-[#14b850]/20 rounded border border-[#14b850]/30 mx-1">SHALLOTS</strong> next season for optimal yield and minimal disease risk."</p>
              </div>
           </div>
        </div>

        {/* Sidebar History & Map */}
        <div className="lg:col-span-1 space-y-8">
           <div className="card-clean p-8 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                 <Camera size={16} /> Scanning History
              </h4>
              <div className="space-y-2">
                 <HistoryItem date="14 May" diagnosis="Anthracnose" isDanger />
                 <HistoryItem date="02 May" diagnosis="Bacterial Leaf" isWarning />
                 <HistoryItem date="28 Apr" diagnosis="Healthy" />
              </div>
           </div>

           <div className="card-clean p-2 shadow-sm relative group overflow-hidden h-[420px] border border-slate-200">
              <div className="w-full h-full rounded-[24px] overflow-hidden bg-slate-50">
                 <LeafletMap center={[-7.4250, 109.3]} zoom={8} markers={markers} />
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-[400] bg-white/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-100 shadow-lg translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all">
                 <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Globe size={18} className="text-[#14b850]" weight="bold" /> Regional Health
                 </h4>
                 <p className="text-[10px] text-slate-500 font-medium">Collective patterns help early mitigation in your area.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentItem({ label, priority, icon: Icon, color, bg, border }: any) {
  return (
    <div className={`p-5 rounded-2xl border ${border} flex items-center space-x-5 hover:bg-slate-50 transition-all cursor-pointer group bg-white shadow-sm`}>
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} ${bg} shadow-inner group-hover:scale-110 transition-transform`}>
          <Icon size={24} weight="duotone" />
       </div>
       <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">{priority}</p>
          <p className="text-sm font-bold text-slate-900 tracking-tight">{label}</p>
       </div>
    </div>
  );
}

function HistoryItem({ date, diagnosis, isDanger, isWarning }: { date: string, diagnosis: string, isDanger?: boolean, isWarning?: boolean }) {
   const colorClass = isDanger ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-[#14b850]';
   return (
      <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
         <span className={`text-[11px] font-bold ${colorClass} tracking-wide`}>{diagnosis}</span>
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</span>
      </div>
   );
}

