"use client";

import React from 'react';
import { QrCode, Wallet, ArrowRight, ShieldCheck, Bank, ChartBar, WhatsappLogo } from '@phosphor-icons/react';

export default function PaymentsPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">QRIS & Auto-Save</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Micro-savings integration for financial resilience.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-primary text-xs px-6 py-2.5">
              Generate QRIS
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
           <div className="card-clean p-8">
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                 <h2 className="text-lg font-bold text-slate-900 flex items-center">
                    <Wallet size={20} className="text-[#14b850] mr-3" />
                    Wallet Overview
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Auto-Save Active (3%)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">Rp 24,500,000</p>
                 </div>
                 <div className="p-6 bg-[#14b850]/5 rounded-2xl border border-[#14b850]/10">
                    <p className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest mb-1">Total Savings</p>
                    <p className="text-2xl font-bold text-[#14b850] tracking-tight">Rp 2,450,800</p>
                 </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                    <Bank size={24} className="text-slate-400" />
                    <div>
                       <p className="text-[11px] font-bold text-slate-900">Escrow Account (AgriFlow)</p>
                       <p className="text-[10px] text-slate-400 font-medium">Secured by Midtrans</p>
                    </div>
                 </div>
                 <button className="btn-minimal btn-secondary py-1.5 px-4 text-[10px]">Withdraw</button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-clean p-6">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Transaction Flow</h4>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">QRIS dynamic codes ensure secure payments. Funds are held in escrow for layer-2 protection before release.</p>
              </div>
              <div className="card-clean p-6">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Financial Impact</h4>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">Building credit history for formal capital access based on verified harvest transaction volumes.</p>
              </div>
           </div>
        </div>

        {/* Alerts & Insights */}
        <div className="space-y-6">
           <div className="card-clean p-6 border-l-4 border-l-[#14b850]">
              <div className="flex items-center space-x-2 mb-6">
                 <WhatsappLogo size={20} className="text-[#25D366]" weight="fill" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Alert</span>
              </div>
              <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                 "✅ Payment completed. Net amount <strong className="text-slate-900">Rp 1.5M</strong> credited. Auto-save <strong className="text-[#14b850]">Rp 45k</strong> added to vault."
              </p>
           </div>

           <div className="card-clean p-6 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-4">
                 <ChartBar size={24} weight="bold" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Savings Projection</h4>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Based on current harvest volume, your savings will reach <strong className="text-slate-900">Rp 12.5M</strong> in 6 months.</p>
              <button className="w-full btn-minimal btn-secondary py-2 text-[10px]">Download Report</button>
           </div>
        </div>
      </div>
    </div>
  );
}
