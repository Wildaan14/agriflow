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
    <div className="space-y-8 py-8 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 lg:p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#14b850]/20 text-[#14b850] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(20,184,80,0.2)] border border-[#14b850]/30">Pusat Perdagangan Global</span>
              <span className="text-white/40 font-bold text-[10px] uppercase tracking-widest hidden md:inline-block">Kepatuhan Ekspor: Standar Internasional Terpenuhi</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-white">Export <span className="text-[#14b850]">Agri-Gateway</span></h1>
           <p className="text-white/50 font-light text-sm lg:text-base leading-relaxed max-w-2xl">Simplified international trade with automated compliance and global visibility.</p>
        </div>
        <div className="flex bg-[#0A0D14] p-1.5 rounded-2xl border border-white/[0.05] overflow-x-auto w-full lg:w-auto shrink-0">
           {(['TRACKING', 'DOCUMENT', 'CATALOG'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 lg:flex-none px-6 lg:px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#14b850] text-[#0A0D14] shadow-[0_0_15px_rgba(20,184,80,0.3)]' : 'text-white/40 hover:text-white'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
         {/* Sidebar: Status Feed */}
         <aside className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-6 flex items-center">
               <div className="w-2 h-2 rounded-full bg-[#14b850] mr-3"></div>
               Live Tracking Feed
            </h3>
            <div className="space-y-4">
              {SHIPMENTS.map(ship => (
                <div 
                  key={ship.id}
                  className={`bg-[#0A0D14] p-6 rounded-2xl border border-white/[0.05] transition-all cursor-pointer group hover:bg-white/[0.02] hover:shadow-xl hover:border-[#14b850]/30`}
                >
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest bg-[#14b850]/10 border border-[#14b850]/20 px-2.5 py-1 rounded-md">{ship.id}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${ship.status === 'CLEARANCE' ? 'text-[#f59e0b]' : 'text-[#14b850]'}`}>{ship.status.replace('_', ' ')}</span>
                   </div>
                   <h4 className="text-sm font-semibold text-white mb-2 tracking-tight group-hover:text-[#14b850] transition-colors">{ship.dest}</h4>
                   <div className="flex items-center space-x-2 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">
                      <Boat size={14} className="text-[#0ea5e9]" />
                      <span>ETA: {ship.eta}</span>
                   </div>
                   <div className="flex justify-between pt-4 border-t border-white/[0.05]">
                      <span className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest">{ship.doc}</span>
                      <CaretRight size={16} weight="bold" className="text-white/20 group-hover:text-[#14b850] transition-colors" />
                   </div>
                </div>
              ))}
            </div>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'TRACKING' && (
              <div className="bg-white/[0.02] rounded-[32px] border border-white/[0.05] h-full relative overflow-hidden group shadow-2xl min-h-[500px]">
                 <div className="absolute inset-0 bg-[#0A0D14] group-hover:scale-105 transition-transform duration-[8000ms]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000')] bg-cover opacity-10 mix-blend-luminosity transition-all group-hover:opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent"></div>
                 </div>
                 <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-10 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#14b850] leading-none mb-3">Monitoring Kapal Real-time</p>
                    <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white">Vessel Positioning System</h3>
                 </div>
                 {/* Visual Simulated AIS Map */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Globe size={300} weight="thin" className="text-[#14b850]/10 animate-pulse" />
                    <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-[#14b850] rounded-full shadow-[0_0_20px_rgba(20,184,80,0.8)] animate-ping"></div>
                    <div className="absolute top-[45%] left-[55%] w-2 h-2 bg-[#0ea5e9] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>
                    <div className="absolute top-[60%] left-[45%] w-2 h-2 bg-[#f59e0b] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                 </div>
              </div>
            )}

            {activeTab === 'DOCUMENT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                 <div className="bg-white/[0.02] p-8 lg:p-12 rounded-[32px] border border-white/[0.05] flex flex-col justify-between shadow-2xl hover:border-[#14b850]/20 transition-all min-h-[450px]">
                    <div>
                       <div className="w-14 h-14 bg-[#14b850]/10 border border-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850] mb-8">
                          <Certificate size={28} weight="fill" />
                       </div>
                       <h4 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4 leading-tight">Phytosanitary <br />Document Generator</h4>
                       <p className="text-sm font-light text-white/50 leading-relaxed mb-8">Generate automated phytosanitary certificates compliant with ISPM 15 standards using blockchain-verified logs.</p>
                       <ul className="space-y-4 mb-8">
                          <DocStep label="Verified Batch #AG-7421" checked />
                          <DocStep label="Fumigation Logs Attached" checked />
                          <DocStep label="Inspector Digital Signature Ready" checked />
                       </ul>
                    </div>
                    <button className="w-full bg-[#14b850] text-[#0A0D14] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all flex items-center justify-center space-x-2">
                       <FilePdf size={18} weight="fill" />
                       <span>Generate & Sign (PDF)</span>
                    </button>
                 </div>

                 <div className="bg-white/[0.02] p-8 lg:p-12 rounded-[32px] border border-white/[0.05] flex flex-col justify-between shadow-2xl hover:border-[#14b850]/20 transition-all min-h-[450px]">
                    <div>
                       <div className="w-14 h-14 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-xl flex items-center justify-center text-[#0ea5e9] mb-8">
                          <Files size={28} weight="fill" />
                       </div>
                       <h4 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4 leading-tight">Certificate of Origin <br />(CoO) ASEAN E-Form</h4>
                       <p className="text-sm font-light text-white/50 leading-relaxed mb-8">Automated CoO generation for reduced tariff trading within ASEAN and global trade agreements.</p>
                       <div className="p-5 bg-[#0A0D14] rounded-2xl border border-white/[0.05] text-[11px] font-light text-white/70 leading-relaxed relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#0ea5e9] rounded-l-2xl"></div>
                          "Analisis menunjukkan tarif ekspor ke Singapura sebesar <span className="font-semibold text-white">0%</span> untuk komoditas Cabai berdasarkan skema kerjasama regional."
                       </div>
                    </div>
                    <button className="w-full border border-white/[0.1] text-white/70 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:border-[#14b850]/50 hover:text-[#14b850] hover:bg-[#14b850]/5 transition-all flex items-center justify-center space-x-2 mt-8">
                       <Files size={18} weight="bold" />
                       <span>Preview Draft</span>
                    </button>
                 </div>
              </div>
            )}

            {activeTab === 'CATALOG' && (
               <div className="bg-white/[0.02] rounded-[32px] border border-white/[0.05] h-full overflow-y-auto no-scrollbar p-8 lg:p-10 shadow-2xl min-h-[500px]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                     <h3 className="text-2xl font-semibold text-white tracking-tight">Export-Grade Catalog</h3>
                     <div className="flex space-x-4 w-full md:w-auto">
                        <div className="relative w-full md:w-auto">
                           <MagnifyingGlass size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                           <input type="text" placeholder="Search standard..." className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0D14] border border-white/[0.1] text-[11px] font-medium text-white placeholder-white/30 focus:outline-none focus:border-[#14b850]/50 focus:bg-white/[0.02] transition-all" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {CATALOG.map(item => (
                        <div key={item.id} className="p-6 lg:p-8 rounded-[24px] bg-[#0A0D14] border border-white/[0.05] hover:border-[#14b850]/30 hover:bg-white/[0.02] transition-all group flex flex-col justify-between h-[280px] cursor-pointer shadow-lg">
                           <div>
                              <div className="flex justify-between items-start mb-6">
                                 <div className="w-10 h-10 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center text-white/60 group-hover:text-[#14b850] transition-colors">
                                    <SquaresFour size={20} weight="fill" />
                                 </div>
                                 <span className="text-[8px] font-bold text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-2.5 py-1 rounded uppercase tracking-widest">{item.cert}</span>
                              </div>
                              <h5 className="text-lg font-semibold text-white tracking-tight mb-1 group-hover:text-[#14b850] transition-colors">{item.name}</h5>
                              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.standard}</p>
                           </div>
                           <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
                              <span className="text-xl font-semibold text-white tracking-tight">{item.price}</span>
                              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/60 flex items-center justify-center group-hover:bg-[#14b850] group-hover:text-[#0A0D14] group-hover:border-[#14b850] transition-all">
                                 <ArrowUpRight size={14} weight="bold" />
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
    <div className="flex items-center space-x-3">
       <div className={`w-4 h-4 rounded-full flex items-center justify-center ${checked ? 'bg-[#14b850]/20 text-[#14b850]' : 'bg-white/10 text-white/30'}`}>
          <CheckCircle size={12} weight="fill" />
       </div>
       <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">{label}</span>
    </div>
  );
}
