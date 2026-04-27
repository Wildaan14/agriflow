"use client";

import React from 'react';
import { Star, Trophy, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Medal, Users, Sparkle } from '@phosphor-icons/react';

export default function ScorePage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">AgriScore</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Reputation-based credit proxy and premium access.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-primary text-xs px-6 py-2.5">
              Audit Score
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Area */}
        <div className="lg:col-span-2 space-y-6">
           <div className="card-clean p-10 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                 <h2 className="text-lg font-bold text-slate-900 flex items-center">
                    <Star size={20} className="text-[#14b850] mr-3" />
                    Digital Reputation
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Tier: Expert</span>
              </div>
              
              <div className="relative mb-8">
                 <div className="w-40 h-40 rounded-full border-[6px] border-slate-50 flex items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                       <circle cx="80" cy="80" r="74" fill="transparent" stroke="#14b850" strokeWidth="6" strokeDasharray="465" strokeDashoffset="100" strokeLinecap="round" />
                    </svg>
                    <p className="text-5xl font-bold text-slate-900 tracking-tighter">782</p>
                 </div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-10">Last updated: 14 May 2026</p>
              
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-50">
                 <ScoreStat label="Quality" value="92%" icon={ShieldCheck} />
                 <ScoreStat label="Punctuality" value="98.5%" icon={ChartLineUp} />
                 <ScoreStat label="Loyalty" value="Master" icon={Medal} />
              </div>
           </div>

           <div className="card-clean p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#14b850] shrink-0">
                 <Trophy size={24} weight="fill" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1">Premium Access Unlocked</h4>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Your score exceeds 600. You now have access to export-grade buyers and reduced micro-loan interest rates.</p>
              </div>
           </div>
        </div>

        {/* Milestone Sidebar */}
        <div className="space-y-6">
           <div className="card-clean p-6 border-l-4 border-l-[#14b850]">
              <div className="flex items-center space-x-2 mb-4">
                 <Sparkle size={18} className="text-[#14b850]" weight="bold" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Milestone</span>
              </div>
              <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
                 "AgriScore increased to <strong className="text-slate-900">782</strong>. Status upgraded to <strong className="text-[#14b850]">Expert</strong>. 12 new premium buyers available."
              </p>
           </div>

           <div className="card-clean p-6 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-4">
                 <Users size={24} weight="bold" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Social Proof</h4>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Verified reputation increases matchmaking visibility by 40%.</p>
              <button className="w-full btn-minimal btn-secondary py-2 text-[10px]">Download Certificate</button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ScoreStat({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center text-center">
       <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-3">
          <Icon size={20} weight="fill" />
       </div>
       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
       <p className="text-[13px] font-bold text-slate-900">{value}</p>
    </div>
  );
}
