"use client";

import React from 'react';
import { Vault, ChartPieSlice, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Target, Bank } from '@phosphor-icons/react';

export default function SubsidyPage() {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Precision Subsidy</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">National allocation tracking based on productivity and risk profiling.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:border-[#1B4D1B]/30 px-6 py-2.5 font-bold shadow-sm transition-all flex items-center gap-2">
              <ShieldCheck size={18} weight="bold" />
              <span>Audit Allocation</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Allocation View */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center tracking-tight">
                    <Vault size={24} className="text-[#14b850] mr-3" weight="duotone" />
                    National Disbursement Status
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Real-time Tracking</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-white border border-slate-200 rounded-[24px] hover:border-[#14b850]/30 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-center mb-6">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#14b850] transition-colors">Disbursement Target</p>
                       <ChartPieSlice size={20} className="text-slate-300 group-hover:text-[#14b850] transition-colors" weight="duotone" />
                    </div>
                    <p className="text-4xl font-bold text-slate-900 mb-4 tracking-tighter">Rp 12.8<span className="text-2xl text-slate-400">T</span></p>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-8 shadow-inner">
                       <div className="h-full bg-gradient-to-r from-[#14b850] to-[#20d863] w-[68%] rounded-full group-hover:scale-y-110 transition-transform"></div>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-4 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#14b850]"></span>
                        68% Success Rate
                    </p>
                 </div>
                 
                 <div className="p-8 bg-[#14b850]/5 border border-[#14b850]/20 rounded-[24px] hover:border-[#14b850]/40 hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <ChartLineUp size={120} weight="duotone" className="text-[#14b850]" />
                    </div>
                    <div className="relative z-10">
                       <div className="flex justify-between items-center mb-6">
                          <p className="text-[10px] font-bold text-[#1B4D1B] uppercase tracking-widest">Budget Efficiency</p>
                          <ChartLineUp size={20} className="text-[#14b850]" weight="bold" />
                       </div>
                       <p className="text-4xl font-bold text-[#14b850] mb-4 tracking-tighter group-hover:scale-105 transition-transform origin-left">Rp 842<span className="text-2xl text-[#14b850]/60">M</span></p>
                       <p className="text-[10px] font-bold text-[#1B4D1B]/60 mt-8 leading-relaxed italic border-l-2 border-[#14b850] pl-3">"Targeted precision logic saved significant resources preventing misallocations."</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-clean p-8 flex items-start space-x-5 shadow-sm hover:shadow-md transition-shadow hover:border-[#14b850]/30 cursor-pointer group">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shrink-0 group-hover:text-[#14b850] group-hover:bg-[#14b850]/10 transition-all">
                 <Target size={28} weight="duotone" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#1B4D1B] transition-colors">AgriScore Based Targeting</h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">Subsidies are prioritized for farmers with AgriScore <strong className="text-slate-700">{'>'}450</strong> to ensure maximum output productivity for national food security.</p>
              </div>
           </div>
        </div>

        {/* Admin Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card-clean p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
                 <ShieldCheck size={20} className="text-[#14b850]" weight="bold" />
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Control Plane</span>
              </div>
              <ul className="space-y-4">
                 <AdminTask label="NIK Cross-Verification" />
                 <AdminTask label="Village Quota Update" />
                 <AdminTask label="Retailer Audit" />
              </ul>
           </div>

           <div className="card-clean p-8 text-center shadow-sm hover:border-slate-300 transition-colors group">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-6 group-hover:text-[#1B4D1B] group-hover:scale-110 transition-all">
                 <FileText size={32} weight="duotone" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Accountability</h4>
              <p className="text-[11px] text-slate-500 mb-8 font-medium leading-relaxed">Download real-time audit reports for compliance reporting.</p>
              <button className="w-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:bg-white hover:border-[#1B4D1B]/30 font-bold uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all shadow-sm">
                 Download XLSX
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function AdminTask({ label }: { label: string }) {
   return (
      <li className="flex items-center space-x-3 text-xs font-bold text-slate-700 hover:text-[#14b850] transition-colors cursor-pointer group">
         <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#14b850]/10 group-hover:border-[#14b850]/20 transition-all">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-[#14b850] transition-colors"></div>
         </div>
         <span>{label}</span>
      </li>
   );
}
