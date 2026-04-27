"use client";

import React from 'react';
import { ShieldCheck, MapPin, Phone, Envelope, Gear, PencilSimple, Wallet, Bank } from '@phosphor-icons/react';

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4 duration-700 text-white">
      <div className="bg-white/[0.02] rounded-[48px] border border-white/[0.05] overflow-hidden shadow-2xl group backdrop-blur-xl">
        <div className="h-72 bg-[#0A0D14] relative overflow-hidden border-b border-white/[0.05]">
           {/* Profile Mesh Gradient */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#14b850]/20 via-transparent to-[#0ea5e9]/10 opacity-40"></div>
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
           </div>
           
           <div className="absolute -bottom-20 left-12 lg:left-16 group-hover:scale-105 transition-transform duration-700">
              <div className="w-40 h-40 lg:w-48 lg:h-48 bg-[#0A0D14] rounded-[40px] p-2 shadow-2xl border border-white/[0.1]">
                 <div className="w-full h-full bg-[#14b850]/10 border border-[#14b850]/20 rounded-[32px] flex items-center justify-center text-[#14b850] text-5xl lg:text-6xl font-semibold shadow-inner group-hover:bg-[#14b850] group-hover:text-[#0A0D14] transition-all duration-500">
                    B
                 </div>
              </div>
              <button className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 w-10 h-10 lg:w-12 lg:h-12 bg-[#0A0D14] rounded-full border border-white/[0.1] shadow-2xl flex items-center justify-center text-white/50 hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all transform hover:scale-110 active:scale-95">
                 <PencilSimple size={20} weight="bold" />
              </button>
           </div>
        </div>

        <div className="pt-24 lg:pt-28 px-8 lg:px-16 pb-12 lg:pb-16 bg-white/[0.01]">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-16 gap-6">
              <div>
                 <h1 className="text-3xl lg:text-5xl font-semibold text-white mb-3 tracking-tight">Bulog Jawa Timur</h1>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:space-x-4">
                    <div className="flex items-center space-x-2 bg-[#14b850]/10 px-4 py-1.5 rounded-md border border-[#14b850]/20 w-fit">
                       <ShieldCheck size={18} className="text-[#14b850]" weight="fill" />
                        <span className="text-[#14b850] font-bold text-[10px] uppercase tracking-widest">Mitra Strategis Terverifikasi</span>
                    </div>
                    <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">ID: B-JATIM-001</span>
                 </div>
              </div>
              <div className="flex space-x-4 w-full md:w-auto">
                 <button className="p-4 bg-white/[0.05] rounded-xl text-white/60 hover:bg-white/[0.1] hover:text-white transition-all border border-white/[0.1] shadow-md flex-none">
                   <Gear size={24} />
                 </button>
                 <button className="flex-1 md:flex-none bg-[#14b850] text-[#0A0D14] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all">
                   Update Settings
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-8">
                 <h3 className="font-semibold text-white text-xl border-b border-white/[0.05] pb-4 flex items-center tracking-tight">
                    <div className="w-1.5 h-5 bg-[#0ea5e9] rounded-full mr-3 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                    Organization Details
                 </h3>
                 <div className="space-y-6">
                    <InfoItem icon={Phone} label="Contact Line" value="+62 812-3456-7890" />
                    <InfoItem icon={Envelope} label="Enterprise Email" value="procurement@bulog-jatim.go.id" />
                    <InfoItem icon={MapPin} label="Regional HQ" value="Jl. Jenderal Yani No. 1, Surabaya, Jawa Timur" />
                 </div>
              </div>

              <div className="space-y-8">
                 <h3 className="font-semibold text-white text-xl border-b border-white/[0.05] pb-4 flex items-center tracking-tight">
                    <div className="w-1.5 h-5 bg-[#14b850] rounded-full mr-3 shadow-[0_0_10px_rgba(20,184,80,0.5)]"></div>
                     Ringkasan Aktivitas
                 </h3>
                 <div className="space-y-6">
                    <div className="bg-[#0A0D14] flex items-center justify-between p-6 lg:p-8 rounded-[24px] border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group/stat cursor-pointer shadow-lg">
                       <div className="flex items-center space-x-5">
                          <div className="w-12 h-12 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center text-white/60 group-hover/stat:text-[#0ea5e9] group-hover/stat:border-[#0ea5e9]/30 transition-colors">
                             <Wallet size={24} weight="bold" />
                          </div>
                          <div>
                             <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 group-hover/stat:text-white/60 transition-colors">YTD Volume</p>
                             <span className="text-2xl font-semibold text-white tracking-tight">3,450 Tons</span>
                          </div>
                       </div>
                       <div className="text-[#14b850] font-bold text-[10px] bg-[#14b850]/10 px-3 py-1 rounded-md border border-[#14b850]/20">+12.4%</div>
                    </div>
                    <div className="bg-[#0A0D14] flex items-center justify-between p-6 lg:p-8 rounded-[24px] border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group/stat cursor-pointer shadow-lg">
                       <div className="flex items-center space-x-5">
                          <div className="w-12 h-12 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center text-white/60 group-hover/stat:text-[#14b850] group-hover/stat:border-[#14b850]/30 transition-colors">
                             <Bank size={24} weight="bold" />
                          </div>
                          <div>
                             <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 group-hover/stat:text-white/60 transition-colors">Closed Deals</p>
                             <span className="text-2xl font-semibold text-white tracking-tight">1,240 Trans.</span>
                          </div>
                       </div>
                       <ShieldCheck size={32} className="text-[#14b850] opacity-20 group-hover:rotate-12 transition-transform" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: any;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-5 group/info p-4 -ml-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/[0.05] cursor-pointer">
       <div className="w-12 h-12 bg-[#0A0D14] border border-white/[0.1] rounded-xl text-white/50 group-hover/info:bg-[#14b850]/10 group-hover/info:text-[#14b850] group-hover/info:border-[#14b850]/30 transition-all shadow-sm flex items-center justify-center group-hover/info:scale-105">
          <Icon size={20} weight="bold" />
       </div>
       <div className="pt-1">
          <p className="text-[9px] font-bold text-white/40 uppercase mb-1 tracking-widest group-hover/info:text-white/60 transition-colors">{label}</p>
          <p className="font-semibold text-white text-base tracking-tight transition-all">{value}</p>
       </div>
    </div>
  );
}
