"use client";

import React from 'react';
import { ShieldCheck, MapPin, Phone, Envelope, Gear, PencilSimple, Wallet, Bank } from '@phosphor-icons/react';

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="glass-card rounded-[64px] border border-white/40 overflow-hidden shadow-[0_80px_160px_-30px_rgba(10,37,64,0.25)] group">
        <div className="h-72 bg-[#0a2540] relative overflow-hidden">
           {/* Profile Mesh Gradient */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/30 via-transparent to-[#00D924]/20 opacity-60"></div>
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
           </div>
           
           <div className="absolute -bottom-20 left-16 group-hover:scale-105 transition-transform duration-700">
              <div className="w-48 h-48 bg-white/40 backdrop-blur-3xl rounded-[48px] p-3 shadow-2xl border border-white/60">
                 <div className="w-full h-full bg-[#0a2540] rounded-[36px] flex items-center justify-center text-white text-6xl font-black shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                    B
                 </div>
              </div>
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full border border-white/60 shadow-2xl flex items-center justify-center text-[#0a2540] hover:bg-[#635BFF] hover:text-white transition-all transform hover:scale-110 active:scale-95">
                 <PencilSimple size={24} weight="bold" />
              </button>
           </div>
        </div>

        <div className="pt-28 px-16 pb-16 bg-white/40 backdrop-blur-3xl">
           <div className="flex justify-between items-start mb-16">
              <div>
                 <h1 className="text-5xl font-black text-[#0a2540] mb-4 tracking-tight">Bulog Jawa Timur</h1>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-[#00D924]/10 px-5 py-2 rounded-full border border-[#00D924]/20">
                       <ShieldCheck size={20} className="text-[#00D924]" weight="fill" />
                        <span className="text-[#00D924] font-black text-[11px] uppercase tracking-[0.2em]">Mitra Strategis Terverifikasi</span>
                    </div>
                    <span className="text-[#425466] text-sm font-bold opacity-40 uppercase tracking-widest">ID: B-JATIM-001</span>
                 </div>
              </div>
              <div className="flex space-x-6">
                 <button className="p-5 bg-white/60 backdrop-blur-2xl rounded-[24px] text-[#425466] hover:bg-white hover:text-[#0a2540] transition-all border border-white/60 shadow-md">
                   <Gear size={28} />
                 </button>
                 <button className="bg-[#635BFF] text-white px-12 py-5 rounded-[24px] font-black text-[13px] uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(99,91,255,0.4)] hover:bg-[#0a2540] hover:-translate-y-1 active:translate-y-0 transition-all">
                   Update Settings
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-16">
              <div className="space-y-10">
                 <h3 className="font-black text-[#0a2540] text-xl border-b border-[#0a2540]/5 pb-5 flex items-center tracking-tight">
                    <div className="w-2.5 h-6 bg-[#635BFF] rounded-full mr-4"></div>
                    Organization Details
                 </h3>
                 <div className="space-y-8">
                    <InfoItem icon={Phone} label="Contact Line" value="+62 812-3456-7890" />
                    <InfoItem icon={Envelope} label="Enterprise Email" value="procurement@bulog-jatim.go.id" />
                    <InfoItem icon={MapPin} label="Regional HQ" value="Jl. Jenderal Yani No. 1, Surabaya, Jawa Timur" />
                 </div>
              </div>

              <div className="space-y-10">
                 <h3 className="font-black text-[#0a2540] text-xl border-b border-[#00D924]/10 pb-5 flex items-center tracking-tight">
                    <div className="w-2.5 h-6 bg-[#00D924] rounded-full mr-4"></div>
                     Ringkasan Aktivitas
                 </h3>
                 <div className="space-y-6">
                    <div className="glass-card flex items-center justify-between p-8 rounded-[36px] border border-white/60 hover:bg-white hover:shadow-xl transition-all group/stat cursor-pointer">
                       <div className="flex items-center space-x-5">
                          <div className="w-14 h-14 bg-[#635BFF]/10 rounded-2xl flex items-center justify-center text-[#635BFF]">
                             <Wallet size={28} weight="bold" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-[#425466] uppercase tracking-[0.2em] mb-1 opacity-40 group-hover/stat:text-[#635BFF] transition-colors">YTD Volume</p>
                             <span className="text-3xl font-black text-[#0a2540] tracking-tight">3,450 Tons</span>
                          </div>
                       </div>
                       <div className="text-[#00D924] font-black text-xs bg-[#00D924]/10 px-4 py-1.5 rounded-full shadow-sm">+12.4%</div>
                    </div>
                    <div className="glass-card flex items-center justify-between p-8 rounded-[36px] border border-white/60 hover:bg-white hover:shadow-xl transition-all group/stat cursor-pointer">
                       <div className="flex items-center space-x-5">
                          <div className="w-14 h-14 bg-[#0a2540]/5 rounded-2xl flex items-center justify-center text-[#0a2540]">
                             <Bank size={28} weight="bold" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-[#425466] uppercase tracking-[0.2em] mb-1 opacity-40 group-hover/stat:text-[#00D924] transition-colors">Closed Deals</p>
                             <span className="text-3xl font-black text-[#0a2540] tracking-tight">1,240 Trans.</span>
                          </div>
                       </div>
                       <ShieldCheck size={36} className="text-[#0a2540] opacity-10 group-hover:rotate-12 transition-transform" />
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
    <div className="flex items-start space-x-6 group/info">
       <div className="w-14 h-14 bg-white/60 backdrop-blur-2xl rounded-2xl text-[#425466] group-hover/info:bg-[#635BFF] group-hover/info:text-white transition-all border border-white/60 shadow-sm flex items-center justify-center group-hover/info:rotate-12 group-hover/info:scale-110">
          <Icon size={24} weight="bold" />
       </div>
       <div className="pt-1">
          <p className="text-[11px] font-black text-[#425466] uppercase mb-1.5 tracking-[0.2em] opacity-40 group-hover/info:text-[#635BFF] transition-colors">{label}</p>
          <p className="font-black text-[#0a2540] text-lg group-hover/info:opacity-100 tracking-tight transition-all">{value}</p>
       </div>
    </div>
  );
}
