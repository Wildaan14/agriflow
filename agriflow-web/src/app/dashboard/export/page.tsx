"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  Files, 
  ShieldCheck, 
  Boat, 
  ArrowRight, 
  CheckCircle,
  FilePdf,
  DotsThreeVertical,
  CaretRight,
  MapPin,
  Certificate,
  Truck,
  SquaresFour,
  MagnifyingGlass,
  ArrowUpRight
} from '@phosphor-icons/react';

const SHIPMENTS = [
  { id: 'EX-5021', dest: 'Singapore (Port of Singapore)', status: 'CLEARANCE', eta: 'Tomorrow', doc: 'Phytosanitary ✓' },
  { id: 'EX-9110', dest: 'Japan (Tokyo Bay)', status: 'OCEAN_TRANSIT', eta: '6 Days', doc: 'CoO ✓' },
  { id: 'EX-2045', dest: 'Netherlands (Rotterdam)', status: 'PRE-LOADING', eta: '12 Days', doc: 'Pending' },
];

const CATALOG = [
  { id: 1, name: 'Cabai Keriting (Grade A)', standard: 'ASEAN Agri-Standard', cert: 'GAP Certified', price: '$1.85 / kg' },
  { id: 2, name: 'Kopi Arabika Gayo', standard: 'SCA / Fairtrade', cert: 'Organic Certified', price: '$8.40 / kg' },
  { id: 3, name: 'Bawang Merah (Super)', standard: 'Global GAP', cert: 'Phyto Ready', price: '$1.20 / kg' },
];

export default function ExportGatewayPage() {
  const [activeTab, setActiveTab] = useState<'TRACKING' | 'DOCUMENT' | 'CATALOG'>('TRACKING');

  return (
    <div className="space-y-12 py-8 animate-in fade-in duration-700">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-stripe-violet/10 text-stripe-violet px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-stripe-violet/10">Pusat Perdagangan Global</span>
              <span className="text-stripe-slate font-bold text-xs opacity-60">Kepatuhan Ekspor: Standar Internasional Terpenuhi</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tighter mb-4 leading-tight">Export Agri-Gateway</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-60">Simplified international trade with automated compliance and global visibility.</p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-[22px] border border-slate-100">
           {['TRACKING', 'DOCUMENT', 'CATALOG'].map((tab) => (
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
         {/* Sidebar: Status Feed */}
         <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar">
            <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.2em] mb-8">Live Tracking Feed</h3>
            {SHIPMENTS.map(ship => (
              <div 
                key={ship.id}
                className={`glass-card p-8 rounded-[40px] border border-stripe-indigo/5 transition-all cursor-pointer group hover:bg-white hover:shadow-2xl hover:border-stripe-indigo/20`}
              >
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest bg-stripe-indigo/5 px-3 py-1.5 rounded-lg">{ship.id}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${ship.status === 'CLEARANCE' ? 'text-amber-500' : 'text-stripe-emerald'}`}>{ship.status.replace('_', ' ')}</span>
                 </div>
                 <h4 className="text-sm font-black text-stripe-indigo mb-2 tracking-tight">{ship.dest}</h4>
                 <div className="flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 leading-none">
                    <Boat size={14} />
                    <span>ETA: {ship.eta}</span>
                 </div>
                 <div className="flex justify-between pt-6 border-t border-stripe-indigo/5">
                    <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest">{ship.doc}</span>
                    <CaretRight size={16} weight="bold" className="text-stripe-indigo opacity-20" />
                 </div>
              </div>
            ))}
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'TRACKING' && (
              <div className="glass-card-premium rounded-[64px] border border-stripe-indigo/10 h-full relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-[8000ms]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000')] bg-cover opacity-20 transition-all group-hover:opacity-40"></div>
                 </div>
                 <div className="absolute top-12 left-12 z-10 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 leading-none mb-4">Monitoring Kapal Real-time</p>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Vessel Positioning System</h3>
                 </div>
                 {/* Visual Simulated AIS Map */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Globe size={300} weight="thin" className="text-white/5 animate-pulse" />
                    <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-stripe-emerald rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-ping"></div>
                    <div className="absolute top-[45%] left-[55%] w-2 h-2 bg-stripe-emerald rounded-full"></div>
                 </div>
              </div>
            )}

            {activeTab === 'DOCUMENT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
                 <div className="glass-card p-12 rounded-[56px] border border-stripe-indigo/5 flex flex-col justify-between">
                    <div>
                       <div className="w-16 h-16 bg-stripe-indigo/5 rounded-2xl flex items-center justify-center text-stripe-indigo mb-8">
                          <Certificate size={32} weight="fill" />
                       </div>
                       <h4 className="text-3xl font-black text-stripe-indigo tracking-tight mb-4 leading-tight">Phytosanitary <br />Document Generator</h4>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 leading-relaxed mb-10">Generate automated phytosanitary certificates compliant with ISPM 15 standards using blockchain-verified logs.</p>
                       <ul className="space-y-4 mb-12">
                          <DocStep label="Verified Batch #AG-7421" checked />
                          <DocStep label="Fumigation Logs Attached" checked />
                          <DocStep label="Inspector Digital Signature Ready" checked />
                       </ul>
                    </div>
                    <button className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all flex items-center justify-center space-x-3">
                       <FilePdf size={20} weight="fill" />
                       <span>Generate & Sign (PDF)</span>
                    </button>
                 </div>

                 <div className="glass-card p-12 rounded-[56px] border border-stripe-indigo/5 flex flex-col justify-between">
                    <div>
                       <div className="w-16 h-16 bg-stripe-emerald/5 rounded-2xl flex items-center justify-center text-stripe-emerald mb-8">
                          <Files size={32} weight="fill" />
                       </div>
                       <h4 className="text-3xl font-black text-stripe-indigo tracking-tight mb-4 leading-tight">Certificate of Origin <br />(CoO) ASEAN E-Form</h4>
                       <p className="text-sm font-bold text-stripe-slate opacity-60 leading-relaxed mb-10">Automated CoO generation for reduced tariff trading within ASEAN and global trade agreements.</p>
                       <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-[11px] font-bold text-stripe-slate">
                          "Analisis menunjukkan tarif ekspor ke Singapura sebesar 0% untuk komoditas Cabai berdasarkan skema kerjasama regional."
                       </div>
                    </div>
                    <button className="w-full border-2 border-slate-100 py-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:border-stripe-indigo hover:text-stripe-indigo transition-all flex items-center justify-center space-x-3">
                       <Files size={20} weight="bold" />
                       <span>Preview Draft</span>
                    </button>
                 </div>
              </div>
            )}

            {activeTab === 'CATALOG' && (
               <div className="glass-card-premium rounded-[64px] border border-stripe-indigo/10 h-full overflow-y-auto no-scrollbar p-12 shadow-2xl">
                  <div className="flex justify-between items-center mb-12">
                     <h3 className="text-3xl font-black text-stripe-indigo tracking-tighter">Export-Grade Catalog</h3>
                     <div className="flex space-x-4">
                        <div className="relative">
                           <MagnifyingGlass size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input type="text" placeholder="Search standard..." className="pl-12 pr-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-xs focus:outline-none focus:border-stripe-indigo w-64" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                     {CATALOG.map(item => (
                        <div key={item.id} className="p-8 rounded-[44px] bg-slate-50/50 border border-slate-100 hover:bg-white transition-all group flex flex-col justify-between h-[360px] cursor-pointer hover:shadow-2xl hover:scale-[1.02]">
                           <div>
                              <div className="flex justify-between items-start mb-8">
                                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-stripe-indigo shadow-sm">
                                    <SquaresFour size={24} weight="fill" />
                                 </div>
                                 <span className="text-[9px] font-black text-stripe-emerald bg-stripe-emerald/5 px-3 py-1.5 rounded-full uppercase tracking-widest">{item.cert}</span>
                              </div>
                              <h5 className="text-xl font-black text-stripe-indigo tracking-tight mb-2">{item.name}</h5>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">{item.standard}</p>
                           </div>
                           <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-2xl font-black text-stripe-indigo">{item.price}</span>
                              <div className="w-10 h-10 rounded-full bg-stripe-indigo text-white flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                                 <ArrowUpRight size={18} weight="bold" />
                              </div>
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

function DocStep({ label, checked }: { label: string, checked?: boolean }) {
  return (
    <div className="flex items-center space-x-4">
       <div className={`w-5 h-5 rounded-full flex items-center justify-center ${checked ? 'bg-stripe-emerald text-white' : 'bg-slate-100'}`}>
          <CheckCircle size={14} weight="fill" />
       </div>
       <span className="text-xs font-black text-stripe-indigo opacity-60 uppercase tracking-widest leading-none">{label}</span>
    </div>
  );
}
