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
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#14b850]/10 text-[#14b850] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#14b850]/20">Community Hub</span>
              <span className="text-white/50 font-medium text-xs">Wilayah Kerja: Kediri Utara</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">BUMDes & <span className="text-[#14b850]">Field Support</span></h1>
           <p className="text-white/50 font-light text-sm">Empowering clusters with automated commissions and training modules.</p>
        </div>
        <div className="flex bg-[#0A0D14] p-1.5 rounded-2xl border border-white/[0.05] overflow-x-auto w-full lg:w-auto">
           {['MANAGEMENT', 'TRAINING', 'COMMISSION'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 lg:flex-none px-6 lg:px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#14b850] text-[#0A0D14] shadow-[0_0_15px_rgba(20,184,80,0.3)]' : 'text-white/40 hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[750px] min-h-0">
         {/* Sidebar: Quick Stats */}
         <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar pb-8">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6 pl-2">Quick Insights</h3>
            <StatCard label="Total Farmer" value="1,242" trend="+12" color="text-[#14b850]" />
            <StatCard label="Avg AgriScore" value="742" trend="+5.2%" color="text-[#14b850]" />
            <StatCard label="Total Commission" value="Rp 4.2M" trend="Dec" color="text-[#f59e0b]" />
            
            <button className="w-full flex items-center justify-center space-x-3 bg-white/[0.05] border border-white/[0.1] text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all group">
               <UserPlus size={18} weight="bold" />
               <span>Daftarkan Petani</span>
            </button>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'MANAGEMENT' && (
              <div className="bg-white/[0.02] rounded-[32px] border border-white/[0.05] h-full overflow-y-auto no-scrollbar p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <h3 className="text-2xl font-semibold text-white tracking-tight">Manajemen Petani Binaan</h3>
                    <div className="flex space-x-3 w-full md:w-auto">
                       <input type="text" placeholder="Cari nama petani..." className="flex-1 md:w-64 px-5 py-3 rounded-xl bg-[#0A0D14] border border-white/[0.1] font-medium text-xs text-white focus:outline-none focus:border-[#14b850] placeholder-white/30 transition-colors" />
                       <button className="px-5 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl font-bold text-[10px] uppercase tracking-widest text-white hover:bg-white/[0.1] transition-colors">Filter</button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {FARMERS.map(farmer => (
                      <div key={farmer.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#0A0D14] rounded-2xl border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group cursor-pointer gap-6 md:gap-0">
                         <div className="flex items-center space-x-5">
                            <div className="w-12 h-12 bg-white/[0.05] border border-white/[0.1] rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-[#14b850]/30 transition-colors">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} alt="Avatar" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                               <h5 className="text-[14px] font-semibold text-white mb-1 group-hover:text-[#14b850] transition-colors">{farmer.name}</h5>
                               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{farmer.id} • AgriScore: <span className="text-[#14b850]">{farmer.score}</span></p>
                            </div>
                         </div>
                         <div className="flex items-center justify-between md:justify-end md:space-x-12 w-full md:w-auto border-t border-white/[0.05] pt-4 md:pt-0 md:border-0">
                            <div className="text-left md:text-right">
                               <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Status</p>
                               <span className={`text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-widest ${farmer.status === 'AKTIF' ? 'bg-[#14b850]/10 text-[#14b850] border border-[#14b850]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20'}`}>{farmer.status}</span>
                            </div>
                            <div className="text-right min-w-[100px]">
                               <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Komisi Aktif</p>
                               <p className="text-sm font-semibold text-white">{farmer.commission}</p>
                            </div>
                            <CaretRight size={18} className="text-white/20 group-hover:text-[#14b850] transition-colors hidden md:block" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'TRAINING' && (
              <div className="bg-white/[0.02] rounded-[32px] border border-white/[0.05] h-full overflow-y-auto no-scrollbar p-8 lg:p-12 shadow-2xl flex flex-col backdrop-blur-xl">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                        <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Pelatihan Mandiri Petani</h3>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Kurikulum Berbasis Standar Keunggulan BUMDes</p>
                    </div>
                    <BookOpen size={32} weight="fill" className="text-white/10 hidden md:block" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MODULES.map(module => (
                      <div key={module.id} className="p-8 rounded-3xl bg-[#0A0D14] border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group flex flex-col justify-between h-[260px] cursor-pointer">
                         <div>
                            <div className="flex justify-between items-start mb-6">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${module.type === 'VIDEO' ? 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20' : 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20'}`}>
                                  {module.type === 'VIDEO' ? <Video size={24} weight="fill" /> : <FilePdf size={24} weight="fill" />}
                               </div>
                               <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{module.type === 'VIDEO' ? module.duration : module.size}</span>
                            </div>
                            <h5 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-[#14b850] transition-colors">{module.title}</h5>
                         </div>
                         <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
                            {module.progress ? (
                               <div className="flex items-center space-x-3 flex-1 mr-6">
                                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#14b850] shadow-[0_0_10px_rgba(20,184,80,0.5)]" style={{ width: module.progress }}></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-[#14b850]">{module.progress}</span>
                               </div>
                            ) : (
                               <span className="text-[10px] font-bold text-[#0ea5e9] uppercase tracking-widest">{module.status}</span>
                            )}
                            <button className="w-8 h-8 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/50 group-hover:bg-[#14b850] group-hover:text-[#0A0D14] group-hover:border-[#14b850] transition-all">
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
    <div className="bg-white/[0.02] p-6 rounded-[24px] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] transition-all backdrop-blur-sm">
       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-3">{label}</p>
       <div className="flex items-end justify-between">
          <span className="text-2xl font-semibold text-white tracking-tight">{value}</span>
          <span className={`text-[9px] font-bold uppercase tracking-widest ${color}`}>{trend}</span>
       </div>
    </div>
  );
}
