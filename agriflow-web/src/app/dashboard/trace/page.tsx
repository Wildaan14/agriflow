"use client";

import React from 'react';
import traceData from '@/data/modul8_blockchain_traceability.json';
import { Cube, ShieldCheck, ArrowRight, ShareNetwork, WhatsappLogo, ChartLineUp, FileText, Globe, MagnifyingGlass, List, QrCode, Truck } from '@phosphor-icons/react';
import Link from 'next/link';

export default function TracePage() {
  const displayLedger = traceData.ledger.slice(0, 6);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Supply Chain Traceability</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Immutable blockchain ledger for end-to-end transparency.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-primary text-xs px-6 py-2.5">
              Audit Public Ledger
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Ledger Simulation */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clean p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                 <h2 className="text-lg font-bold text-slate-900 flex items-center">
                    <List size={20} className="text-[#14b850] mr-3" />
                    Live Transaction Ledger
                 </h2>
                 <div className="flex items-center space-x-2 text-[#14b850] bg-green-50 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14b850] animate-pulse"></div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">Real-time Sync</span>
                 </div>
              </div>
              
              <div className="space-y-4">
                {displayLedger.map((tx, i) => (
                   <div key={tx.tx_id} className="p-4 rounded-xl border border-transparent bg-slate-50 hover:bg-slate-100/50 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                         <div className="flex items-center space-x-4">
                            <div className="font-mono text-[9px] text-slate-400">0x{tx.tx_id.substring(0,6)}...</div>
                            <div>
                               <p className="text-sm font-bold text-slate-900">{tx.action.replace('_', ' ')}</p>
                               <p className="text-[10px] text-slate-500 font-medium">{tx.actor_location} • {new Date(tx.timestamp).toLocaleTimeString()}</p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-2 text-[#14b850]">
                            <ShieldCheck size={14} weight="fill" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Verified</span>
                         </div>
                      </div>
                   </div>
                ))}
              </div>
           </div>

           <div className="card-clean p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 shrink-0">
                 <QrCode size={24} weight="bold" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1">Consumer Verification Portal</h4>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Unique harvest batch QR codes allow end consumers to verify origin, logistics history, and ESG credentials.</p>
              </div>
           </div>
        </div>

        {/* Audit Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card-clean p-6 flex flex-col items-center text-center">
              <div className="mb-6 w-32 h-32 bg-slate-50 rounded-xl flex items-center justify-center p-3">
                 <QrCode size={100} className="text-slate-900" />
              </div>
              <p className="text-[11px] text-slate-500 mb-6 font-medium leading-relaxed">
                 "✓ Verified 100% Organic from Kediri. Harvested by: Sugeng (AgriScore 820)."
              </p>
              <button className="w-full btn-minimal btn-secondary py-2 text-[10px]">Open Consumer Page</button>
           </div>

           <div className="card-clean p-6 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-4">
                 <FileText size={24} weight="fill" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Audit & Compliance</h4>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Immutable digital logs fulfill international food export standards.</p>
              
              <div className="space-y-2 mb-6">
                 <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-widest">ISO 22000</div>
                 <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-widest">HACCP CERTIFIED</div>
              </div>

              <Link href="/dashboard/logistics" className="w-full">
                 <button className="w-full btn-minimal btn-secondary py-2 text-[10px]">Monitor Logistics</button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
