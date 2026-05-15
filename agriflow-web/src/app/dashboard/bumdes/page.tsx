"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Handshake, 
  ChartLineUp, 
  Video, 
  FilePdf, 
  TrendUp, 
  CheckCircle, 
  ArrowRight,
  DotsThreeVertical,
  CaretRight,
  BookOpen,
  UserPlus
} from '@phosphor-icons/react';

const FARMERS = [
  { id: 'F-102', name: 'Slamet Raharjo', score: 782, status: 'AKTIF', commission: 'Rp 42.500' },
  { id: 'F-105', name: 'Siti Aminah', score: 815, status: 'AKTIF', commission: 'Rp 64.000' },
  { id: 'F-108', name: 'Bpk. Ahmad Su', score: 620, status: 'PENDING', commission: 'Rp 0' },
];

const MODULES = [
  { id: 1, title: 'Teknik Budidaya Cabai Keriting', type: 'VIDEO', duration: '12 Min', progress: '85%' },
  { id: 2, title: 'Manajemen Keuangan Tani Dasar', type: 'PDF', size: '2.4 MB', status: 'UNDUH' },
];

export default function BumdesDashboard() {
  const [activeTab, setActiveTab] = useState<'MANAGEMENT' | 'TRAINING' | 'COMMISSION'>('MANAGEMENT');

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">BUMDes & Field Support</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Community empowerment with automated commissions and training.</p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl shadow-sm border border-slate-200">
           {(['MANAGEMENT', 'TRAINING', 'COMMISSION'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#1B4D1B] shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 border border-transparent'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar: Stats */}
         <aside className="lg:col-span-1 space-y-6">
            <div className="card-clean p-8 shadow-sm">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 pb-4 border-b border-slate-100">Quick Insights</h3>
               <div className="space-y-5">
                  <SidebarStat label="Total Farmers" value="1,242" trend="+12" />
                  <SidebarStat label="Avg AgriScore" value="742" trend="+5.2%" />
                  <SidebarStat label="Commissions" value="Rp 4.2M" trend="Dec" />
               </div>
            </div>
            
            <button className="w-full bg-[#1B4D1B] hover:bg-[#133813] text-white font-bold uppercase tracking-widest text-[10px] py-4 rounded-2xl shadow-lg shadow-[#1B4D1B]/20 transition-all flex items-center justify-center gap-2">
               <UserPlus size={18} weight="bold" />
               <span>Register Farmer</span>
            </button>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3">
            {activeTab === 'MANAGEMENT' ? (
              <div className="card-clean p-8 shadow-sm">
                 <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                    <h3 className="text-xl font-bold text-[#1B4D1B] tracking-tight">Farmer Directory</h3>
                    <div className="relative">
                       <input type="text" placeholder="Search farmers..." className="text-xs px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#14b850]/40 focus:ring-2 focus:ring-[#14b850]/10 transition-all w-64 text-slate-700 placeholder-slate-400" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    {FARMERS.map(farmer => (
                      <div key={farmer.id} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[20px] hover:border-[#14b850]/40 hover:shadow-md transition-all cursor-pointer group">
                         <div className="flex items-center space-x-5">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} alt={farmer.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#1B4D1B] transition-colors mb-0.5">{farmer.name}</h5>
                               <p className="text-[11px] text-slate-400 font-medium">{farmer.id} • Score: <strong className="text-slate-600">{farmer.score}</strong></p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-6">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest border ${farmer.status === 'AKTIF' ? 'bg-[#14b850]/10 text-[#14b850] border-[#14b850]/20' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{farmer.status}</span>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#14b850]/10 group-hover:text-[#14b850] transition-colors">
                               <CaretRight size={16} weight="bold" className="text-slate-300 group-hover:text-[#14b850] transition-colors" />
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {MODULES.map(module => (
                   <div key={module.id} className="card-clean p-8 flex flex-col justify-between h-[280px] shadow-sm hover:shadow-md hover:border-[#14b850]/40 transition-all group cursor-pointer relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                         {module.type === 'VIDEO' ? <Video size={140} weight="fill" className="text-slate-900" /> : <FilePdf size={140} weight="fill" className="text-slate-900" />}
                      </div>
                      <div className="relative z-10">
                         <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#1B4D1B] transition-colors">
                               {module.type === 'VIDEO' ? <Video size={28} weight="duotone" /> : <FilePdf size={28} weight="duotone" />}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">{module.type === 'VIDEO' ? module.duration : module.size}</span>
                         </div>
                         <h5 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#1B4D1B] transition-colors">{module.title}</h5>
                      </div>
                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                         {module.progress ? (
                            <div className="flex items-center gap-3 flex-1 mr-4">
                               <span className="text-[10px] font-bold text-[#14b850] uppercase">{module.progress}</span>
                               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#14b850] w-[85%] rounded-full"></div>
                               </div>
                            </div>
                         ) : (
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                               Download
                            </span>
                         )}
                         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#1B4D1B] group-hover:text-white transition-colors border border-slate-100 group-hover:border-[#1B4D1B]">
                            <CaretRight size={16} weight="bold" className="text-slate-400 group-hover:text-white transition-colors" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function SidebarStat({ label, value, trend }: { label: string, value: string, trend: string }) {
   return (
      <div className="flex justify-between items-center group">
         <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors mb-1">{label}</p>
            <p className="text-base font-bold text-slate-900 group-hover:text-[#1B4D1B] transition-colors">{value}</p>
         </div>
         <span className="text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 px-2 py-1 rounded border border-[#14b850]/20">{trend}</span>
      </div>
   );
}
