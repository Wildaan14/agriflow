"use client";

import React from 'react';
import { Leaf, Camera, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, MagicWand, Warning, Sparkle, Microscope } from '@phosphor-icons/react';

export default function DiseasePage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Crop Health & Disease</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">On-device AI diagnosis and smart planting intelligence.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-primary text-xs px-6 py-2.5">
              New Scan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Diagnosis Result */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                 <h2 className="text-lg font-bold text-slate-900 flex items-center">
                    <Microscope size={20} className="text-[#14b850] mr-3" />
                    On-Device AI Analysis
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Inference: 1.2s</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-slate-50 rounded-3xl border border-transparent flex items-center justify-center relative group overflow-hidden">
                    <Leaf size={100} className="text-slate-200 group-hover:text-[#14b850]/20 transition-all duration-500" />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm text-slate-400">
                       <Camera size={20} weight="bold" />
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Diagnosis</p>
                       <p className="text-2xl font-bold text-slate-900 tracking-tight">Anthracnose</p>
                       <p className="text-[10px] font-bold text-[#14b850] uppercase mt-1">94% Confidence</p>
                    </div>
                    
                    <div className="space-y-3">
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Recommended Treatment</p>
                       <TreatmentItem label="Garlic Solution (Organic)" priority="Primary" icon={Sparkle} color="text-[#14b850]" />
                       <TreatmentItem label="Fungicide X (2ml/L)" priority="Alternative" icon={Microscope} color="text-blue-500" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-clean p-6 flex items-start space-x-4 bg-slate-50 border-none shadow-none">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm shrink-0">
                 <MagicWand size={24} weight="fill" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1">Smart Planting Recommendation</h4>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">"Based on 90-day BMKG forecasts and price projections, we recommend planting SHALLOTS next season."</p>
              </div>
           </div>
        </div>

        {/* Sidebar History */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card-clean p-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Scanning History</h4>
              <div className="space-y-3">
                 <HistoryItem date="14 May" diagnosis="Anthracnose" />
                 <HistoryItem date="02 May" diagnosis="Bacterial Leaf" />
                 <HistoryItem date="28 Apr" diagnosis="Healthy" />
              </div>
           </div>

           <div className="card-clean p-6 text-center">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mx-auto mb-4">
                 <Warning size={24} weight="bold" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Regional Health</h4>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Collective disease patterns help early mitigation in your area.</p>
              <button className="w-full btn-minimal btn-secondary py-2 text-[10px]">Expert Consult</button>
           </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentItem({ label, priority, icon: Icon, color }: any) {
  return (
    <div className="p-4 rounded-xl border border-slate-100 flex items-center space-x-4 hover:bg-slate-50 transition-all cursor-pointer">
       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color} bg-white shadow-sm`}>
          <Icon size={16} weight="fill" />
       </div>
       <div>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{priority}</p>
          <p className="text-xs font-bold text-slate-900">{label}</p>
       </div>
    </div>
  );
}

function HistoryItem({ date, diagnosis }: { date: string, diagnosis: string }) {
   return (
      <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-none">
         <span className="text-[10px] font-bold text-slate-900">{diagnosis}</span>
         <span className="text-[10px] text-slate-400">{date}</span>
      </div>
   );
}
