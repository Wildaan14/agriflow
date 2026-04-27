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
    <div className="space-y-8 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* SaaS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-8 lg:p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-[#4A9E3F]/20">Pusat Perdagangan Global</span>
              <span className="text-[#1B4D1B]/40 font-bold text-[10px] uppercase tracking-widest hidden md:inline-block">Kepatuhan Ekspor: Standar Internasional Terpenuhi</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-[#1B4D1B]">Export <span className="text-[#4A9E3F]">Agri-Gateway</span></h1>
           <p className="text-[#1A2E1A]/50 font-medium text-sm lg:text-base leading-relaxed max-w-2xl">Simplified international trade with automated compliance and global visibility.</p>
        </div>
        <div className="flex bg-[#1B4D1B]/5 p-1.5 rounded-2xl border border-[#C7E0B0]/50 overflow-x-auto w-full lg:w-auto shrink-0">
           {(['TRACKING', 'DOCUMENT', 'CATALOG'] as const).map((tab) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
         {/* Sidebar: Status Feed */}
         <aside className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-bold text-[#1B4D1B]/50 uppercase tracking-[0.2em] mb-6 flex items-center">
               <div className="w-2 h-2 rounded-full bg-[#4A9E3F] mr-3"></div>
               Live Tracking Feed
            </h3>
            <div className="space-y-4">
               {SHIPMENTS.map(ship => (
                 <div 
                   key={ship.id}
                   className={`bg-white/40 p-6 rounded-2xl border border-[#C7E0B0] transition-all cursor-pointer group hover:bg-white/60 hover:shadow-lg hover:border-[#4A9E3F]/50`}
                 >
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 px-2.5 py-1 rounded-md">{ship.id}</span>
                       <span className={`text-[9px] font-bold uppercase tracking-widest ${ship.status === 'CLEARANCE' ? 'text-[#C45C0A]' : 'text-[#4A9E3F]'}`}>{ship.status.replace('_', ' ')}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-[#1B4D1B] mb-2 tracking-tight group-hover:text-[#4A9E3F] transition-colors">{ship.dest}</h4>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-4">
                       <Boat size={14} className="text-[#0D7A6B]" />
                       <span>ETA: {ship.eta}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-[#C7E0B0]/30">
                       <span className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest">{ship.doc}</span>
                       <CaretRight size={16} weight="bold" className="text-[#1B4D1B]/20 group-hover:text-[#4A9E3F] transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
         </aside>

         {/* Main Viewport */}
         <div className="lg:col-span-3 h-full overflow-hidden">
            {activeTab === 'TRACKING' && (
              <div className="bg-white/40 rounded-[32px] border border-[#C7E0B0] h-full relative overflow-hidden group shadow-xl min-h-[500px]">
                 <div className="absolute inset-0 bg-[#F4FAF0] group-hover:scale-105 transition-transform duration-[8000ms]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000')] bg-cover opacity-5 mix-blend-multiply transition-all group-hover:opacity-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F4FAF0] via-transparent to-transparent"></div>
                 </div>
                 <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-10 text-[#1B4D1B]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4A9E3F] leading-none mb-3">Monitoring Kapal Real-time</p>
                    <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">Vessel Positioning System</h3>
                 </div>
                 {/* Visual Simulated AIS Map */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Globe size={300} weight="thin" className="text-[#4A9E3F]/10 animate-pulse" />
                    <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-[#4A9E3F] rounded-full shadow-lg animate-ping"></div>
                    <div className="absolute top-[45%] left-[55%] w-2 h-2 bg-[#0D7A6B] rounded-full shadow-md"></div>
                    <div className="absolute top-[60%] left-[45%] w-2 h-2 bg-[#C45C0A] rounded-full shadow-md"></div>
                 </div>
              </div>
            )}

            {activeTab === 'DOCUMENT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                 <div className="bg-white/60 p-8 lg:p-12 rounded-[32px] border border-[#C7E0B0] flex flex-col justify-between shadow-lg hover:border-[#4A9E3F]/50 transition-all min-h-[450px]">
                    <div>
                       <div className="w-14 h-14 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F] mb-8">
                          <Certificate size={28} weight="fill" />
                       </div>
                       <h4 className="text-2xl lg:text-3xl font-semibold text-[#1B4D1B] tracking-tight mb-4 leading-tight">Phytosanitary <br />Document Generator</h4>
                       <p className="text-sm font-medium text-[#1A2E1A]/50 leading-relaxed mb-8">Generate automated phytosanitary certificates compliant with ISPM 15 standards using blockchain-verified logs.</p>
                       <ul className="space-y-4 mb-8">
                          <DocStep label="Verified Batch #AG-7421" checked />
                          <DocStep label="Fumigation Logs Attached" checked />
                          <DocStep label="Inspector Digital Signature Ready" checked />
                       </ul>
                    </div>
                    <button className="w-full bg-[#1B4D1B] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all flex items-center justify-center space-x-2">
                       <FilePdf size={18} weight="fill" />
                       <span>Generate & Sign (PDF)</span>
                    </button>
                 </div>

                 <div className="bg-white/60 p-8 lg:p-12 rounded-[32px] border border-[#C7E0B0] flex flex-col justify-between shadow-lg hover:border-[#4A9E3F]/50 transition-all min-h-[450px]">
                    <div>
                       <div className="w-14 h-14 bg-[#0D7A6B]/10 border border-[#0D7A6B]/20 rounded-xl flex items-center justify-center text-[#0D7A6B] mb-8">
                          <Files size={28} weight="fill" />
                       </div>
                       <h4 className="text-2xl lg:text-3xl font-semibold text-[#1B4D1B] tracking-tight mb-4 leading-tight">Certificate of Origin <br />(CoO) ASEAN E-Form</h4>
                       <p className="text-sm font-medium text-[#1A2E1A]/50 leading-relaxed mb-8">Automated CoO generation for reduced tariff trading within ASEAN and global trade agreements.</p>
                       <div className="p-5 bg-[#1B4D1B]/5 rounded-2xl border border-[#C7E0B0]/30 text-[11px] font-medium text-[#1A2E1A]/70 leading-relaxed relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#0D7A6B] rounded-l-2xl"></div>
                          "Analisis menunjukkan tarif ekspor ke Singapura sebesar <span className="font-bold text-[#1B4D1B]">0%</span> untuk komoditas Cabai berdasarkan skema kerjasama regional."
                       </div>
                    </div>
                    <button className="w-full border border-[#C7E0B0] text-[#1B4D1B]/70 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:border-[#4A9E3F] hover:text-[#4A9E3F] hover:bg-[#4A9E3F]/5 transition-all flex items-center justify-center space-x-2 mt-8">
                       <Files size={18} weight="bold" />
                       <span>Preview Draft</span>
                    </button>
                 </div>
              </div>
            )}

            {activeTab === 'CATALOG' && (
               <div className="bg-white/40 rounded-[32px] border border-[#C7E0B0] h-full overflow-y-auto no-scrollbar p-8 lg:p-10 shadow-lg min-h-[500px]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                     <h3 className="text-2xl font-semibold text-[#1B4D1B] tracking-tight">Export-Grade Catalog</h3>
                     <div className="flex space-x-4 w-full md:w-auto">
                        <div className="relative w-full md:w-auto">
                           <MagnifyingGlass size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A2E1A]/40" />
                           <input type="text" placeholder="Search standard..." className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-white/60 border border-[#C7E0B0] text-[11px] font-medium text-[#1B4D1B] placeholder-[#1A2E1A]/30 focus:outline-none focus:border-[#4A9E3F]/50 focus:bg-white transition-all" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {CATALOG.map(item => (
                        <div key={item.id} className="p-6 lg:p-8 rounded-[24px] bg-white/60 border border-[#C7E0B0] hover:border-[#4A9E3F]/30 hover:bg-white transition-all group flex flex-col justify-between h-[280px] cursor-pointer shadow-sm">
                           <div>
                              <div className="flex justify-between items-start mb-6">
                                 <div className="w-10 h-10 bg-[#1B4D1B]/5 border border-[#C7E0B0]/50 rounded-xl flex items-center justify-center text-[#1B4D1B]/60 group-hover:text-[#4A9E3F] transition-colors">
                                    <SquaresFour size={20} weight="fill" />
                                 </div>
                                 <span className="text-[8px] font-bold text-[#4A9E3F] bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 px-2.5 py-1 rounded uppercase tracking-widest">{item.cert}</span>
                              </div>
                              <h5 className="text-lg font-semibold text-[#1B4D1B] tracking-tight mb-1 group-hover:text-[#4A9E3F] transition-colors">{item.name}</h5>
                              <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">{item.standard}</p>
                           </div>
                           <div className="pt-6 border-t border-[#C7E0B0]/30 flex items-center justify-between">
                              <span className="text-xl font-semibold text-[#1B4D1B] tracking-tight">{item.price}</span>
                              <div className="w-8 h-8 rounded-full bg-[#1B4D1B]/5 border border-[#C7E0B0]/50 text-[#1B4D1B]/60 flex items-center justify-center group-hover:bg-[#4A9E3F] group-hover:text-white group-hover:border-[#4A9E3F] transition-all">
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
       <div className={`w-4 h-4 rounded-full flex items-center justify-center ${checked ? 'bg-[#4A9E3F]/20 text-[#4A9E3F]' : 'bg-[#1B4D1B]/10 text-[#1B4D1B]/30'}`}>
          <CheckCircle size={12} weight="fill" />
       </div>
       <span className="text-[10px] font-bold text-[#1A2E1A]/60 uppercase tracking-widest leading-none">{label}</span>
    </div>
  );
}
