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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">BUMDes & Field Support</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Community empowerment with automated commissions and training.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {(['MANAGEMENT', 'TRAINING', 'COMMISSION'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar: Stats */}
         <aside className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Quick Insights</h3>
               <div className="space-y-4">
                  <SidebarStat label="Total Farmers" value="1,242" trend="+12" />
                  <SidebarStat label="Avg AgriScore" value="742" trend="+5.2%" />
                  <SidebarStat label="Commissions" value="Rp 4.2M" trend="Dec" />
               </div>
            </div>
            
            <button className="w-full btn-minimal btn-primary py-4 text-[10px]">
               <UserPlus size={18} />
               <span>Register Farmer</span>
            </button>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3">
            {activeTab === 'MANAGEMENT' ? (
              <div className="card-clean p-8">
                 <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                    <h3 className="text-lg font-bold text-slate-900">Farmer Directory</h3>
                    <input type="text" placeholder="Search..." className="text-xs px-4 py-2 bg-slate-50 border border-transparent rounded-lg focus:outline-none focus:border-[#14b850]/20" />
                 </div>

                 <div className="space-y-4">
                    {FARMERS.map(farmer => (
                      <div key={farmer.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                         <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${farmer.name}`} alt="" />
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-slate-900">{farmer.name}</h5>
                               <p className="text-[10px] text-slate-400 font-medium">{farmer.id} • Score: {farmer.score}</p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-8">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${farmer.status === 'AKTIF' ? 'bg-green-50 text-[#14b850]' : 'bg-amber-50 text-amber-600'}`}>{farmer.status}</span>
                            <CaretRight size={16} className="text-slate-300" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MODULES.map(module => (
                   <div key={module.id} className="card-clean p-8 flex flex-col justify-between h-[240px]">
                      <div>
                         <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                               {module.type === 'VIDEO' ? <Video size={20} /> : <FilePdf size={20} />}
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">{module.type === 'VIDEO' ? module.duration : module.size}</span>
                         </div>
                         <h5 className="text-base font-bold text-slate-900 leading-snug">{module.title}</h5>
                      </div>
                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-[10px] font-bold text-[#14b850] uppercase">{module.progress || 'Download'}</span>
                         <CaretRight size={16} className="text-slate-300" />
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
      <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-none">
         <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-slate-900">{value}</p>
         </div>
         <span className="text-[9px] font-bold text-[#14b850]">{trend}</span>
      </div>
   );
}
