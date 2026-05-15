"use client";

import React, { useState } from 'react';
import traceData from '@/data/modul8_blockchain_traceability.json';
import { Cube, ShieldCheck, ArrowRight, ShareNetwork, WhatsappLogo, ChartLineUp, FileText, Globe, MagnifyingGlass, List, QrCode, Truck, HandsClapping, Plant, CheckCircle } from '@phosphor-icons/react';
import Link from 'next/link';

export default function TracePage() {
  const displayLedger = traceData.ledger.slice(0, 6);
  const [hoveredTx, setHoveredTx] = useState<string | null>(null);

  // Helper to map action type to aesthetic icon and color
  const getStepVisuals = (action: string) => {
    if (action.includes('HARVEST') || action.includes('PLANT')) return { icon: Plant, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (action.includes('TRANSPORT') || action.includes('LOGISTICS')) return { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (action.includes('TRADE') || action.includes('SALE')) return { icon: HandsClapping, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' };
    if (action.includes('QUALITY') || action.includes('CHECK')) return { icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { icon: Cube, color: 'text-[#1B4D1B]', bg: 'bg-[#14b850]/10', border: 'border-[#14b850]/20' };
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Supply Chain Traceability</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Immutable blockchain ledger for end-to-end transparency.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-primary py-2.5 px-6 font-bold shadow-lg shadow-[#14b850]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <ShieldCheck size={18} weight="fill" />
              <span>Audit Public Ledger</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Ledger Simulation - Vertical Stepper */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-10">
              <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center">
                       <Cube size={24} className="text-[#14b850] mr-3" weight="duotone" />
                       Live Transaction Ledger
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 ml-9">Batch Tracking ID: <span className="font-mono text-slate-900 font-bold tracking-wider">#TRX-8892-AGF</span></p>
                 </div>
                 <div className="flex items-center space-x-2 text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-3 py-1.5 rounded-full shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14b850] animate-pulse"></div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Real-time Sync</span>
                 </div>
              </div>
              
              <div className="relative pl-6 sm:pl-10 pb-4">
                {/* Vertical Line */}
                <div className="absolute top-6 bottom-6 left-[39px] sm:left-[55px] w-0.5 bg-gradient-to-b from-[#14b850] via-slate-200 to-transparent"></div>

                {displayLedger.map((tx, i) => {
                   const visual = getStepVisuals(tx.action);
                   const isHovered = hoveredTx === tx.tx_id;
                   const isLast = i === displayLedger.length - 1;

                   return (
                     <div 
                       key={tx.tx_id} 
                       className={`relative flex items-start gap-6 sm:gap-8 mb-10 ${isLast ? 'mb-0' : ''}`}
                       onMouseEnter={() => setHoveredTx(tx.tx_id)}
                       onMouseLeave={() => setHoveredTx(null)}
                     >
                        {/* Step Indicator Node */}
                        <div className="relative z-10 flex flex-col items-center">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300 shadow-sm ${isHovered ? `border-[#14b850] scale-110 shadow-md` : visual.border}`}>
                              <visual.icon size={18} className={isHovered ? 'text-[#14b850]' : visual.color} weight={isHovered ? "fill" : "duotone"} />
                           </div>
                           {isHovered && (
                             <div className="absolute -z-10 w-14 h-14 bg-[#14b850]/10 rounded-full animate-ping"></div>
                           )}
                        </div>

                        {/* Step Content Card */}
                        <div className={`flex-1 rounded-2xl border transition-all duration-300 ${isHovered ? 'bg-white border-[#14b850]/30 shadow-lg -translate-y-1' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}>
                           <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                 <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-sm font-bold text-slate-900">{tx.action.replace(/_/g, ' ')}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${visual.bg} ${visual.color} border ${visual.border}`}>
                                       Block Validated
                                    </span>
                                 </div>
                                 <p className="text-xs text-slate-500 font-medium">{tx.actor_location}</p>
                                 
                                 {isHovered && (
                                   <div className="mt-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                      <p className="text-[10px] text-slate-600 font-medium">Smart Contract Auto-Execution Verified.</p>
                                   </div>
                                 )}
                              </div>

                              <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 text-right shrink-0">
                                 <p className="text-[10px] text-slate-500 font-medium w-full md:w-auto">
                                   {new Date(tx.timestamp).toLocaleDateString()} <span className="font-bold">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                                 </p>
                                 <div className="flex items-center gap-1.5 text-slate-400 w-full md:w-auto justify-end">
                                    <Globe size={12} />
                                    <span className="font-mono text-[9px] truncate max-w-[100px]" title={tx.tx_id}>0x{tx.tx_id.substring(0,8)}...</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                   );
                })}
              </div>
           </div>

           <div className="card-clean p-8 flex items-start space-x-5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#1B4D1B]/5 rounded-2xl flex items-center justify-center text-[#1B4D1B] shrink-0 border border-[#1B4D1B]/10">
                 <QrCode size={28} weight="duotone" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-2">Consumer Verification Portal</h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">Unique harvest batch QR codes allow end consumers to verify origin, logistics history, and ESG credentials instantly from their mobile devices.</p>
              </div>
           </div>
        </div>

        {/* Audit Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card-clean p-8 flex flex-col items-center text-center">
              <div className="mb-6 w-40 h-40 bg-white border border-slate-200 rounded-2xl flex items-center justify-center p-4 shadow-sm hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[#14b850]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <QrCode size={120} className="text-slate-800" weight="regular" />
                 
                 {/* Scanning laser animation overlay */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#14b850] opacity-50 shadow-[0_0_10px_#14b850] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
              <div className="flex items-center gap-1.5 justify-center mb-3 text-[#14b850]">
                 <CheckCircle size={16} weight="fill" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Verified Organic</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-6 font-medium leading-relaxed">
                 Sourced from Kediri. Harvested by: <span className="text-slate-900 font-bold">Sugeng</span> (AgriScore: 820).
              </p>
              <button className="w-full btn-minimal btn-secondary py-3 text-xs shadow-sm hover:border-[#1B4D1B]/30 hover:text-[#1B4D1B] transition-colors">
                Open Consumer Page
              </button>
           </div>

           <div className="card-clean p-8 text-center bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1B4D1B] mx-auto mb-5 border border-slate-200">
                 <FileText size={24} weight="duotone" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Audit & Compliance</h4>
              <p className="text-[10px] text-slate-500 mb-6 font-medium leading-relaxed">Immutable digital logs fulfill international food export standards.</p>
              
              <div className="space-y-3 mb-8">
                 <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-[#14b850]" weight="fill" /> ISO 22000
                 </div>
                 <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-[#14b850]" weight="fill" /> HACCP CERTIFIED
                 </div>
              </div>

              <Link href="/dashboard/logistics" className="block w-full">
                 <button className="w-full btn-minimal bg-white border border-slate-200 hover:bg-[#1B4D1B] hover:border-[#1B4D1B] hover:text-white py-3 text-xs transition-colors shadow-sm">
                   Monitor Live Logistics
                 </button>
              </Link>
           </div>
        </div>
      </div>
      
      <style jsx global>{`
         @keyframes scan {
            0% { transform: translateY(0); }
            50% { transform: translateY(128px); }
            100% { transform: translateY(0); }
         }
      `}</style>
    </div>
  );
}
