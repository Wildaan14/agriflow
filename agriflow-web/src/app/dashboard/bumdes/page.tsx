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
    <div className="space-y-12 py-8 animate-in fade-in duration-700">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-stripe-indigo/10 text-stripe-indigo px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-stripe-indigo/10">Community Hub</span>
              <span className="text-stripe-slate font-bold text-xs opacity-60">Wilayah Kerja: Kediri Utara</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tighter mb-4 leading-tight">BUMDes & Field Support</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-60">Empowering clusters with automated commissions and training modules.</p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-[22px] border border-slate-100">
           {['MANAGEMENT', 'TRAINING', 'COMMISSION'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-8 py-3.5 rounded-[18px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-stripe-indigo shadow-lg' : 'text-slate-400 hover:text-stripe-indigo'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 h-[750px] min-h-0">
         {/* Sidebar: Quick Stats */}
         <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar">
            <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.2em] mb-8">Quick Insights</h3>
            <StatCard label="Total Farmer" value="1,242" trend="+12" color="text-stripe-indigo" />
            <StatCard label="Avg AgriScore" value="742" trend="+5.2%" color="text-stripe-emerald" />
            <StatCard label="Total Commission" value="Rp 4.2M" trend="Dec" color="text-amber-500" />
            
            <button className="w-full flex items-center justify-center space-x-3 bg-stripe-indigo text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:scale-105 transition-all">
               <UserPlus size={20} weight="fill" />
               <span>Daftarkan Petani</span>
            </button>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'MANAGEMENT' && (
              <div className="glass-card-premium rounded-[64px] border border-stripe-indigo/10 h-full overflow-y-auto no-scrollbar p-12 shadow-2xl">
                 <div className="flex justify-between items-center mb-12">
                    <h3 className="text-3xl font-black text-stripe-indigo tracking-tighter">Manajemen Petani Binaan</h3>
                    <div className="flex space-x-4">
                       <input type="text" placeholder="Cari nama petani..." className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-xs focus:outline-none focus:border-stripe-indigo w-64" />
                       <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-stripe-slate">Filter</button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {FARMERS.map(farmer => (
                      <div key={farmer.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white transition-all group cursor-pointer hover:shadow-xl">
                         <div className="flex items-center space-x-6">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-stripe-indigo relative overflow-hidden">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} alt="Avatar" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-stripe-indigo opacity-0 group-hover:opacity-10 opacity-0 transition-opacity"></div>
                            </div>
                            <div>
                               <h5 className="text-[15px] font-black text-stripe-indigo mb-1">{farmer.name}</h5>
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{farmer.id} • AgriScore: <span className="text-stripe-emerald">{farmer.score}</span></p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-12">
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</p>
                               <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${farmer.status === 'AKTIF' ? 'bg-stripe-emerald/10 text-stripe-emerald' : 'bg-amber-500/10 text-amber-600'}`}>{farmer.status}</span>
                            </div>
                            <div className="text-right min-w-[120px]">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 opacity-60">Komisi Aktif</p>
                               <p className="text-sm font-black text-stripe-indigo">{farmer.commission}</p>
                            </div>
                            <CaretRight size={20} className="text-slate-300 group-hover:text-stripe-indigo transition-colors" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'TRAINING' && (
              <div className="glass-card-premium rounded-[64px] border border-stripe-indigo/10 h-full overflow-y-auto no-scrollbar p-12 shadow-2xl flex flex-col">
                 <div className="flex justify-between items-center mb-12">
                    <div>
                        <h3 className="text-3xl font-black text-stripe-indigo tracking-tighter mb-2">Pelatihan Mandiri Petani</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kurikulum Berbasis Standar Keunggulan BUMDes</p>
                    </div>
                    <BookOpen size={40} weight="fill" className="text-stripe-indigo opacity-10" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {MODULES.map(module => (
                      <div key={module.id} className="p-10 rounded-[44px] bg-slate-50/50 border border-slate-100 hover:bg-white transition-all group flex flex-col justify-between h-[300px]">
                         <div>
                            <div className="flex justify-between items-start mb-8">
                               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${module.type === 'VIDEO' ? 'bg-stripe-indigo/5 text-stripe-indigo' : 'bg-stripe-emerald/5 text-stripe-emerald'}`}>
                                  {module.type === 'VIDEO' ? <Video size={28} weight="fill" /> : <FilePdf size={28} weight="fill" />}
                               </div>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.type === 'VIDEO' ? module.duration : module.size}</span>
                            </div>
                            <h5 className="text-2xl font-black text-stripe-indigo tracking-tight leading-tight">{module.title}</h5>
                         </div>
                         <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                            {module.progress ? (
                               <div className="flex items-center space-x-3 flex-1">
                                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-stripe-indigo" style={{ width: module.progress }}></div>
                                  </div>
                                  <span className="text-[10px] font-black text-stripe-indigo">{module.progress}</span>
                               </div>
                            ) : (
                               <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest">{module.status}</span>
                            )}
                            <button className="ml-8 w-10 h-10 rounded-full border border-stripe-indigo/20 flex items-center justify-center text-stripe-indigo group-hover:bg-stripe-indigo group-hover:text-white transition-all">
                               <CaretRight size={18} weight="bold" />
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
    <div className="glass-card p-8 rounded-[36px] bg-white border border-slate-100 hover:shadow-xl transition-all">
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 opacity-70">{label}</p>
       <div className="flex items-end justify-between">
          <span className="text-2xl font-black text-stripe-indigo tracking-tighter">{value}</span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{trend}</span>
       </div>
    </div>
  );
}
