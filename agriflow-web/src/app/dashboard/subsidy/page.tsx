"use client";

import React from 'react';
import { Vault, ChartPieSlice, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Target, Bank } from '@phosphor-icons/react';

export default function SubsidyPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Precision Subsidy</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">National allocation tracking based on productivity and risk profiling.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-primary text-xs px-6 py-2.5">
              Audit Allocation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Allocation View */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                 <h2 className="text-lg font-bold text-slate-900 flex items-center">
                    <Vault size={20} className="text-[#14b850] mr-3" />
                    National Disbursement Status
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Real-time Tracking</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-6 bg-slate-50 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Disbursement Target</p>
                       <ChartPieSlice size={20} className="text-slate-400" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-2">Rp 12.8T</p>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-6">
                       <div className="h-full bg-[#14b850] w-[68%]"></div>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-4">68% Success Rate</p>
                 </div>
                 <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                    <div className="flex justify-between items-center mb-6">
                       <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest">Budget Efficiency</p>
                       <ChartLineUp size={20} className="text-[#14b850]" />
                    </div>
                    <p className="text-3xl font-bold text-[#14b850] mb-2">Rp 842M</p>
                    <p className="text-[9px] font-bold text-[#14b850] uppercase mt-4 italic">Targeted Precision Savings</p>
                 </div>
              </div>
           </div>

           <div className="card-clean p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 shrink-0">
                 <Target size={24} weight="fill" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1">AgriScore Based Targeting</h4>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Subsidies are prioritized for farmers with AgriScore {'>'}450 to ensure maximum output productivity for national food security.</p>
              </div>
           </div>
        </div>

        {/* Admin Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card-clean p-6">
              <div className="flex items-center space-x-2 mb-6">
                 <ShieldCheck size={18} className="text-slate-400" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Control Plane</span>
              </div>
              <ul className="space-y-3">
                 <AdminTask label="NIK Cross-Verification" />
                 <AdminTask label="Village Quota Update" />
                 <AdminTask label="Retailer Audit" />
              </ul>
           </div>

           <div className="card-clean p-6 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-4">
                 <FileText size={24} weight="bold" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Accountability</h4>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Download real-time audit reports for compliance reporting.</p>
              <button className="w-full btn-minimal btn-secondary py-2 text-[10px]">Download XLSX</button>
           </div>
        </div>
      </div>
    </div>
  );
}

function AdminTask({ label }: { label: string }) {
   return (
      <li className="flex items-center space-x-2 text-[11px] font-bold text-slate-700">
         <div className="w-1 h-1 bg-[#14b850] rounded-full"></div>
         <span>{label}</span>
      </li>
   );
}
