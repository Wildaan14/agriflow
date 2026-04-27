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
  { id: 3, title: 'Pengenalan Hama Patek & Pencegahan', type: 'VIDEO', duration: '18 Min', progress: '10%' },
];

export default function BumdesDashboard() {
  const [activeTab, setActiveTab] = useState<'MANAGEMENT' | 'TRAINING' | 'COMMISSION'>('MANAGEMENT');

  return (
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#4A9E3F]/20">Community Hub</span>
              <span className="text-[#1A2E1A]/50 font-bold text-xs uppercase tracking-widest">Wilayah Kerja: Kediri Utara</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-[#1B4D1B]">BUMDes & <span className="text-[#4A9E3F]">Field Support</span></h1>
           <p className="text-[#1A2E1A]/50 font-medium text-sm">Empowering clusters with automated commissions and training modules.</p>
        </div>
        <div className="flex bg-[#1B4D1B]/5 p-1.5 rounded-2xl border border-[#C7E0B0]/50 overflow-x-auto w-full lg:w-auto">
           {(['MANAGEMENT', 'TRAINING', 'COMMISSION'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 lg:flex-none px-6 lg:px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#1B4D1B] text-white shadow-lg' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[750px] min-h-0">
         {/* Sidebar: Quick Stats */}
         <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar pb-8">
            <h3 className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-6 pl-2">Quick Insights</h3>
            <StatCard label="Total Farmer" value="1,242" trend="+12" color="text-[#4A9E3F]" />
            <StatCard label="Avg AgriScore" value="742" trend="+5.2%" color="text-[#4A9E3F]" />
            <StatCard label="Total Commission" value="Rp 4.2M" trend="Dec" color="text-amber-600" />
            
            <button className="w-full flex items-center justify-center space-x-3 bg-white text-[#1B4D1B] border border-[#C7E0B0] py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B] hover:text-white transition-all group shadow-sm">
               <UserPlus size={18} weight="bold" />
               <span>Daftarkan Petani</span>
            </button>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'MANAGEMENT' && (
              <div className="bg-white/60 rounded-[32px] border border-[#C7E0B0] h-full overflow-y-auto no-scrollbar p-8 lg:p-12 shadow-xl backdrop-blur-xl">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <h3 className="text-2xl font-semibold text-[#1B4D1B] tracking-tight">Manajemen Petani Binaan</h3>
                    <div className="flex space-x-3 w-full md:w-auto">
                       <input type="text" placeholder="Cari nama petani..." className="flex-1 md:w-64 px-5 py-3 rounded-xl bg-white border border-[#C7E0B0] font-bold text-xs text-[#1B4D1B] focus:outline-none focus:border-[#4A9E3F] placeholder-[#1A2E1A]/30 transition-colors shadow-sm" />
                       <button className="px-5 py-3 bg-white border border-[#C7E0B0] rounded-xl font-bold text-[10px] uppercase tracking-widest text-[#1B4D1B] hover:bg-[#1B4D1B]/5 transition-colors shadow-sm">Filter</button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {FARMERS.map(farmer => (
                      <div key={farmer.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-[#C7E0B0] hover:border-[#4A9E3F]/30 hover:bg-[#F4FAF0] transition-all group cursor-pointer gap-6 md:gap-0 shadow-sm rounded-2xl">
                         <div className="flex items-center space-x-5">
                            <div className="w-12 h-12 bg-white border border-[#C7E0B0] rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-[#4A9E3F]/30 transition-colors">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <h5 className="text-[14px] font-bold text-[#1B4D1B] mb-1 group-hover:text-[#4A9E3F] transition-colors">{farmer.name}</h5>
                               <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">{farmer.id} • AgriScore: <span className="text-[#4A9E3F]">{farmer.score}</span></p>
                            </div>
                         </div>
                         <div className="flex items-center justify-between md:justify-end md:space-x-12 w-full md:w-auto border-t border-[#C7E0B0] pt-4 md:pt-0 md:border-0">
                            <div className="text-left md:text-right">
                               <p className="text-[9px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest mb-1">Status</p>
                               <span className={`text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-widest ${farmer.status === 'AKTIF' ? 'bg-[#4A9E3F]/10 text-[#4A9E3F] border border-[#4A9E3F]/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}>{farmer.status}</span>
                            </div>
                            <div className="text-right min-w-[100px]">
                               <p className="text-[9px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest mb-1">Komisi Aktif</p>
                               <p className="text-sm font-bold text-[#1B4D1B]">{farmer.commission}</p>
                            </div>
                            <CaretRight size={18} className="text-[#1B4D1B]/20 group-hover:text-[#4A9E3F] transition-colors hidden md:block" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'TRAINING' && (
              <div className="bg-white/60 rounded-[32px] border border-[#C7E0B0] h-full overflow-y-auto no-scrollbar p-8 lg:p-12 shadow-xl flex flex-col backdrop-blur-xl">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                        <h3 className="text-2xl font-semibold text-[#1B4D1B] tracking-tight mb-2">Pelatihan Mandiri Petani</h3>
                        <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Kurikulum Berbasis Standar Keunggulan BUMDes</p>
                    </div>
                    <BookOpen size={32} weight="fill" className="text-[#1B4D1B]/10 hidden md:block" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MODULES.map(module => (
                      <div key={module.id} className="p-8 rounded-3xl bg-white border border-[#C7E0B0] hover:border-[#4A9E3F]/30 hover:bg-[#F4FAF0] transition-all group flex flex-col justify-between h-[260px] cursor-pointer shadow-sm">
                         <div>
                            <div className="flex justify-between items-start mb-6">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${module.type === 'VIDEO' ? 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20' : 'bg-[#0D7A6B]/10 text-[#0D7A6B] border-[#0D7A6B]/20'}`}>
                                  {module.type === 'VIDEO' ? <Video size={24} weight="fill" /> : <FilePdf size={24} weight="fill" />}
                               </div>
                               <span className="text-[9px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest">{module.type === 'VIDEO' ? module.duration : module.size}</span>
                            </div>
                            <h5 className="text-lg font-bold text-[#1B4D1B] tracking-tight leading-snug group-hover:text-[#4A9E3F] transition-colors">{module.title}</h5>
                         </div>
                         <div className="pt-6 border-t border-[#C7E0B0] flex items-center justify-between">
                            {module.progress ? (
                               <div className="flex items-center space-x-3 flex-1 mr-6">
                                  <div className="flex-1 h-1.5 bg-[#1B4D1B]/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#4A9E3F]" style={{ width: module.progress }}></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-[#4A9E3F]">{module.progress}</span>
                               </div>
                            ) : (
                               <span className="text-[10px] font-bold text-[#0D7A6B] uppercase tracking-widest">{module.status}</span>
                            )}
                            <button className="w-8 h-8 rounded-lg border border-[#C7E0B0] flex items-center justify-center text-[#1B4D1B]/20 group-hover:bg-[#4A9E3F] group-hover:text-white group-hover:border-[#4A9E3F] transition-all">
                               <CaretRight size={14} weight="bold" />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) {
  return (
    <div className="bg-white/60 p-6 rounded-[24px] border border-[#C7E0B0] hover:border-[#4A9E3F]/20 hover:bg-white transition-all backdrop-blur-sm shadow-sm">
       <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-3">{label}</p>
       <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-[#1B4D1B] tracking-tight">{value}</span>
          <span className={`text-[9px] font-bold uppercase tracking-widest ${color}`}>{trend}</span>
       </div>
    </div>
  );
}
