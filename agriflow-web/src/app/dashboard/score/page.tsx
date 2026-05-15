"use client";

import React, { useEffect, useState } from 'react';
import { Star, Trophy, ArrowRight, ShieldCheck, WhatsappLogo, ChartLineUp, FileText, Globe, Medal, Users, Sparkle, CircleNotch } from '@phosphor-icons/react';

export default function ScorePage() {
  const [score, setScore] = useState(0);
  const targetScore = 782;

  useEffect(() => {
    // Simple animation for the score counter
    const timer = setTimeout(() => {
       setScore(targetScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetScore]);

  // Calculate SVG stroke offset based on score (max 1000)
  const circumference = 2 * Math.PI * 74;
  const strokeDashoffset = circumference - (score / 1000) * circumference;

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">AgriScore</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Reputation-based credit proxy and premium access.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:border-[#1B4D1B]/30 px-6 py-2.5 font-bold shadow-sm transition-all flex items-center gap-2">
              <ShieldCheck size={18} weight="bold" />
              <span>Audit Score</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Area */}
        <div className="lg:col-span-2 space-y-6">
           <div className="card-clean p-10 flex flex-col items-center shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#14b850]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              
              <div className="w-full flex justify-between items-center mb-10 border-b border-slate-100 pb-6 relative z-10">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center tracking-tight">
                    <Star size={24} className="text-[#14b850] mr-3" weight="duotone" />
                    Digital Reputation
                 </h2>
                 <span className="text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Tier: Expert</span>
              </div>
              
              <div className="relative mb-8 z-10 group-hover:scale-105 transition-transform duration-700">
                 <div className="w-48 h-48 rounded-full border-[8px] border-slate-50 flex items-center justify-center relative shadow-inner bg-white">
                    <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md">
                       <circle cx="96" cy="96" r="88" fill="transparent" stroke="#14b850" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1500 ease-out" />
                    </svg>
                    <div className="text-center">
                       <p className="text-6xl font-bold text-slate-900 tracking-tighter leading-none">{score}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">out of 1000</p>
                    </div>
                 </div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-10 z-10">Last updated: 14 May 2026</p>
              
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100 z-10">
                 <ScoreStat label="Quality" value="92%" icon={ShieldCheck} />
                 <ScoreStat label="Punctuality" value="98.5%" icon={ChartLineUp} />
                 <ScoreStat label="Loyalty" value="Master" icon={Medal} />
              </div>
           </div>

           <div className="card-clean p-8 flex items-start space-x-5 shadow-sm hover:shadow-md transition-shadow hover:border-[#14b850]/30 cursor-pointer group">
              <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-110 transition-transform">
                 <Trophy size={28} weight="duotone" />
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#1B4D1B] transition-colors">Premium Access Unlocked</h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">Your score exceeds <strong className="text-slate-700">600</strong>. You now have access to export-grade buyers and reduced micro-loan interest rates.</p>
              </div>
           </div>
        </div>

        {/* Milestone Sidebar */}
        <div className="space-y-6">
           <div className="card-clean p-8 border-l-4 border-l-[#14b850] shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-[#14b850]/5">
              <div className="flex items-center space-x-2 mb-4">
                 <div className="w-6 h-6 rounded-full bg-[#14b850]/10 flex items-center justify-center">
                    <Sparkle size={14} className="text-[#14b850]" weight="bold" />
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Milestone</span>
              </div>
              <p className="text-[13px] text-slate-700 font-medium leading-relaxed italic">
                 "AgriScore increased to <strong className="text-[#1B4D1B] font-bold text-sm">782</strong>. Status upgraded to <strong className="text-[#14b850] font-bold text-sm">Expert</strong>. 12 new premium buyers available."
              </p>
           </div>

           <div className="card-clean p-8 text-center shadow-sm hover:border-[#14b850]/30 transition-all group">
              <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
                 <Users size={32} weight="duotone" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Social Proof</h4>
              <p className="text-[11px] text-slate-500 mb-8 font-medium leading-relaxed">Verified reputation increases matchmaking visibility by 40%.</p>
              <button className="w-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:bg-white hover:border-[#1B4D1B]/30 font-bold uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                 <FileText size={16} weight="bold" />
                 Download Certificate
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ScoreStat({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center text-center group">
       <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4 group-hover:text-[#14b850] group-hover:bg-[#14b850]/10 group-hover:border-[#14b850]/20 transition-all">
          <Icon size={24} weight="duotone" />
       </div>
       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#1B4D1B] transition-colors">{value}</p>
    </div>
  );
}
