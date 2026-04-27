"use client";

import React, { useState } from 'react';
import { 
  MagnifyingGlass, 
  Funnel, 
  MapPin, 
  Star, 
  Clock, 
  Tag, 
  Globe,
  ShoppingCart,
  CheckCircle,
  Cube,
  CaretRight,
  Thermometer,
  Tree,
  ArrowUpRight,
  Handshake,
  CurrencyCircleDollar,
  ShieldCheck,
  ArrowRight,
  ClockCounterClockwise,
  Cpu
} from '@phosphor-icons/react';
import Link from 'next/link';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Cabai Keriting Gayo', farmer: 'Slamet R.', location: 'Kediri', price: 24500, volume: '250kg', grade: 'Emas', rating: 4.9, image: '🌶️', coldChain: true, co2: '12.4kg' },
  { id: 2, name: 'Bawang Merah Brebes', farmer: 'H. Sudomo', location: 'Nganjuk', price: 18000, volume: '1.2t', grade: 'Perak', rating: 4.7, image: '🧅', coldChain: false, co2: '45.2kg' },
  { id: 3, name: 'Kopi Arabika Gayo', farmer: 'Ibu Ratna', location: 'Aceh Tengah', price: 85000, volume: '40kg', grade: 'Emas', rating: 5.0, image: '☕', coldChain: false, co2: '8.1kg' },
  { id: 4, name: 'Padi Ciherang Pulen', farmer: 'Bpk. Ahmad', location: 'Sragen', price: 12500, volume: '5t', grade: 'Perunggu', rating: 4.5, image: '🌾', coldChain: false, co2: '320kg' },
  { id: 5, name: 'Jagung Hibrida', farmer: 'Koperasi Tani', location: 'Malang', price: 6200, volume: '15t', grade: 'Emas', rating: 4.8, image: '🌽', coldChain: false, co2: '412kg' },
  { id: 6, name: 'Tomat Cherry', farmer: 'Greenhouse X', location: 'Lembang', price: 32000, volume: '150kg', grade: 'Emas', rating: 4.6, image: '🍅', coldChain: true, co2: '18kg' },
];

const MATCH_HISTORY = [
  { id: 1, party: 'Slamet R.', action: 'PENAWARAN AWAL', price: 'Rp 24.500', time: '10:15' },
  { id: 2, party: 'Superindo', action: 'KONTRA PENAWARAN', price: 'Rp 23.200', time: '10:42' },
  { id: 3, party: 'Sistem AI', action: 'REKOMENDASI DEAL', price: 'Rp 23.800', time: '10:45' },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'MARKET' | 'MATCHMAKING'>('MARKET');
  const [matchingStep, setMatchingStep] = useState<'NEGOTIATION' | 'CONTRACT'>('NEGOTIATION');
  const [price, setPrice] = useState(23800);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-2 mb-4">
             <Cpu size={20} className="text-[#4A9E3F]" />
             <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-[0.3em]">AI Matching Engine Aktif</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-[#1B4D1B]">Marketplace & <span className="text-[#4A9E3F]">AI Matching</span></h1>
           <p className="text-[#1A2E1A]/60 text-sm max-w-xl font-medium leading-relaxed">Ekosistem perdagangan hasil tani premium dengan negosiasi cerdas otomatis berbasis algoritma prediktif AgriFlow.</p>
        </div>
        <div className="flex bg-[#1B4D1B]/5 border border-[#C7E0B0]/50 p-1.5 rounded-2xl w-full lg:w-auto">
           <button 
             onClick={() => setActiveTab('MARKET')}
             className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'MARKET' ? 'bg-[#1B4D1B] text-white shadow-lg' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
           >
              Bursa Komoditas
           </button>
           <button 
             onClick={() => setActiveTab('MATCHMAKING')}
             className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'MATCHMAKING' ? 'bg-[#1B4D1B] text-white shadow-lg' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
           >
              Ruang Matchmaking
           </button>
        </div>
      </div>

      {activeTab === 'MARKET' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar Filter */}
           <aside className="space-y-6">
              <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] shadow-xl backdrop-blur-xl">
                 <h4 className="text-[10px] font-bold text-[#1B4D1B]/40 uppercase tracking-[0.2em] mb-6 flex items-center">
                   <Star size={14} className="mr-2 text-[#C45C0A]" />
                   Filter Kualitas AI
                 </h4>
                 <div className="space-y-2">
                    <FilterToggle label="Grade Emas (A)" count={242} active />
                    <FilterToggle label="Grade Perak (B)" count={1120} />
                    <FilterToggle label="Grade Perunggu (C)" count={840} />
                 </div>

                 <div className="h-px bg-[#C7E0B0]/30 my-8"></div>

                 <h4 className="text-[10px] font-bold text-[#1B4D1B]/40 uppercase tracking-[0.2em] mb-6 flex items-center">
                   <Cube size={14} className="mr-2 text-[#0D7A6B]" />
                   Fitur Logistik
                 </h4>
                 <div className="space-y-3">
                    <Checkbox label="Sensor Cold-Chain Aktif" />
                    <Checkbox label="Standar Ekspor Global" />
                    <Checkbox label="Proses Karbon Netral" />
                 </div>
              </div>
           </aside>

           {/* Product Grid */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {DUMMY_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white/40 p-6 rounded-[32px] border border-[#C7E0B0] hover:border-[#4A9E3F] transition-all group cursor-pointer hover:shadow-xl hover:bg-white/60 flex flex-col justify-between backdrop-blur-xl">
                   <div>
                      <div className="flex justify-between items-start mb-6">
                         <span className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest ${product.grade === 'Emas' ? 'bg-[#C45C0A]/10 text-[#C45C0A] border border-[#C45C0A]/20' : 'bg-[#1B4D1B]/5 text-[#1B4D1B]/50 border border-[#1B4D1B]/10'}`}>Grade {product.grade}</span>
                         <div className="flex items-center space-x-1 text-[#C45C0A] bg-[#C45C0A]/10 px-2 py-1 rounded-md border border-[#C45C0A]/20">
                            <Star size={12} weight="fill" />
                            <span className="text-[10px] font-bold">{product.rating}</span>
                         </div>
                      </div>
                      
                      <div className="w-full h-32 bg-[#1B4D1B]/5 rounded-2xl flex items-center justify-center text-6xl mb-6 group-hover:scale-105 transition-transform border border-[#C7E0B0]/20">
                         {product.image}
                      </div>
                      
                      <h5 className="text-xl font-semibold text-[#1B4D1B] tracking-tight mb-2 leading-none">{product.name}</h5>
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-6 border-b border-[#C7E0B0]/30 pb-4">
                         <span className="text-[#4A9E3F]">{product.farmer}</span>
                         <span>•</span>
                         <span>{product.location}</span>
                      </div>

                      <div className="flex items-center space-x-3 mb-6">
                         {product.coldChain && (
                            <div className="flex items-center space-x-1.5 bg-[#0D7A6B]/10 text-[#0D7A6B] px-2.5 py-1.5 rounded-md border border-[#0D7A6B]/20">
                               <Thermometer size={12} weight="fill" />
                               <span className="text-[9px] font-bold uppercase tracking-widest">Cold Chain</span>
                            </div>
                         )}
                         <div className="flex items-center space-x-1.5 bg-[#4A9E3F]/10 text-[#4A9E3F] px-2.5 py-1.5 rounded-md border border-[#4A9E3F]/20">
                            <Tree size={12} weight="fill" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{product.co2} CO2</span>
                         </div>
                      </div>
                   </div>

                    <div className="pt-4 flex items-center justify-between">
                      <div>
                          <p className="text-[9px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest leading-none mb-1.5">Harga B2B</p>
                          <p className="text-xl font-bold text-[#1B4D1B] tracking-tight">Rp {product.price.toLocaleString()}<span className="text-[10px] text-[#1A2E1A]/40 font-normal">/kg</span></p>
                      </div>
                      <div className="flex space-x-2">
                         <button 
                           onClick={() => setActiveTab('MATCHMAKING')}
                           className="w-10 h-10 rounded-xl bg-[#4A9E3F]/10 text-[#4A9E3F] border border-[#4A9E3F]/20 flex items-center justify-center hover:bg-[#4A9E3F] hover:text-white transition-all group/btn relative"
                         >
                            <Handshake size={20} weight="fill" />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1B4D1B] border border-[#4A9E3F]/30 text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap z-50">Nego via AI</span>
                         </button>
                         <button className="w-10 h-10 rounded-xl bg-[#1B4D1B]/5 text-[#1B4D1B]/70 border border-[#C7E0B0] flex items-center justify-center hover:bg-[#1B4D1B] hover:text-white transition-all">
                            <ShoppingCart size={20} weight="fill" />
                         </button>
                      </div>
                    </div>
                </div>
              ))}
           </div>
        </div>
      ) : (
        /* Integrated AI Matchmaking UI */
        <div className="flex flex-col space-y-8 animate-in slide-in-from-bottom-8 duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[700px]">
              {/* Sidebar: Active Match Details */}
              <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar">
                 <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] backdrop-blur-xl">
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="w-14 h-14 bg-[#1B4D1B]/5 rounded-2xl flex items-center justify-center text-2xl border border-[#C7E0B0]">
                          🏢
                       </div>
                       <div>
                          <h4 className="text-lg font-bold text-[#1B4D1B] tracking-tight">Superindo Retail</h4>
                          <p className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest mt-1">Pembeli Terverifikasi</p>
                       </div>
                    </div>

                    <p className="text-[10px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest mb-4">Detail Permintaan</p>
                    <div className="space-y-3 mb-8">
                       <div className="flex justify-between items-center bg-[#1B4D1B]/5 p-3 rounded-xl border border-[#C7E0B0]/20">
                          <span className="text-[11px] text-[#1A2E1A]/60">Komoditas</span>
                          <span className="text-[11px] font-bold text-[#1B4D1B]">Cabai Keriting</span>
                       </div>
                       <div className="flex justify-between items-center bg-[#1B4D1B]/5 p-3 rounded-xl border border-[#C7E0B0]/20">
                          <span className="text-[11px] text-[#1A2E1A]/60">Volume Target</span>
                          <span className="text-[11px] font-bold text-[#4A9E3F]">250 kg</span>
                       </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0D7A6B]/5 border border-[#0D7A6B]/20 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-[#0D7A6B]/10 blur-xl rounded-full -mr-10 -mt-10"></div>
                       <p className="text-[11px] text-[#0D7A6B] leading-relaxed relative z-10 font-medium">
                          Probabilitas deal <strong className="font-black text-[#1B4D1B]">84%</strong> pada kisaran harga Rp 23.500 - Rp 23.800 berdasarkan sentimen pasar hari ini.
                       </p>
                    </div>
                 </div>

                 <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] backdrop-blur-xl">
                    <div className="flex items-center space-x-2 mb-6 text-[#1A2E1A]/40">
                       <ClockCounterClockwise size={16} />
                       <h4 className="text-[9px] font-bold uppercase tracking-widest">Riwayat Negosiasi</h4>
                    </div>
                    <div className="space-y-3">
                       {MATCH_HISTORY.map((log, i) => (
                         <div key={log.id} className="flex justify-between items-center text-[10px] font-semibold bg-[#1B4D1B]/5 border border-[#C7E0B0]/10 p-3 rounded-xl hover:border-[#C7E0B0] transition-all">
                            <span className="text-[#1A2E1A]/30 font-mono w-10">{log.time}</span>
                            <span className={`uppercase flex-1 px-3 ${i === MATCH_HISTORY.length - 1 ? 'text-[#0D7A6B]' : 'text-[#1A2E1A]/50'}`}>{log.action}</span>
                            <span className={i === MATCH_HISTORY.length - 1 ? 'text-[#4A9E3F] font-bold' : 'text-[#1B4D1B]'}>{log.price}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </aside>

              {/* Main Interactor Area */}
              <div className="lg:col-span-3 h-full overflow-hidden flex flex-col">
                 <div className="flex space-x-2 mb-6 bg-white/40 backdrop-blur-xl p-1.5 rounded-2xl w-fit border border-[#C7E0B0]">
                    <button 
                      onClick={() => setMatchingStep('NEGOTIATION')}
                      className={`px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 ${matchingStep === 'NEGOTIATION' ? 'bg-[#1B4D1B] text-white' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
                    >
                       <Handshake size={16} weight={matchingStep === 'NEGOTIATION' ? 'fill' : 'regular'} />
                       <span>Ruang Negosiasi AI</span>
                    </button>
                    <button 
                      onClick={() => setMatchingStep('CONTRACT')}
                      className={`px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 ${matchingStep === 'CONTRACT' ? 'bg-[#1B4D1B] text-white' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
                    >
                       <ShieldCheck size={16} weight={matchingStep === 'CONTRACT' ? 'fill' : 'regular'} />
                       <span>Draf Kontrak Pintar</span>
                    </button>
                 </div>

                 <div className="flex-1 bg-white/40 backdrop-blur-3xl rounded-[40px] border border-[#C7E0B0] shadow-xl overflow-hidden relative">
                    {matchingStep === 'NEGOTIATION' ? (
                      <div className="h-full p-16 flex flex-col justify-center items-center text-center animate-in fade-in zoom-in-95 duration-500">
                         <div className="w-24 h-24 bg-[#1B4D1B]/5 rounded-3xl flex items-center justify-center text-[#1B4D1B] mb-8 border border-[#C7E0B0] shadow-sm">
                            <CurrencyCircleDollar size={48} weight="fill" />
                         </div>
                         <h3 className="text-3xl font-semibold text-[#1B4D1B] tracking-tight mb-4">Interaksi Harga Otomatis</h3>
                         <p className="text-[#1A2E1A]/40 text-sm mb-16 max-w-lg font-medium leading-relaxed">
                           Sesuaikan tawaran Anda secara real-time. Sistem AI AgriFlow akan membantu menyelaraskan margin keuntungan Anda dengan ekspektasi pembeli.
                         </p>
                         
                         <div className="w-full max-w-2xl px-8">
                             <div className="flex justify-between items-end mb-6">
                                <span className="text-[10px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest">Batas Bawah: Rp 20K</span>
                                <div className="bg-[#1B4D1B] p-[1px] rounded-2xl transform -translate-y-2 shadow-lg">
                                  <div className="bg-white text-[#1B4D1B] px-8 py-3 rounded-[15px]">
                                     <span className="text-2xl font-bold tracking-tight">Rp {price.toLocaleString()}</span>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest">Batas Atas: Rp 30K</span>
                             </div>
                             
                             <div className="relative mb-16">
                               <input 
                                 type="range" 
                                 min="20000" 
                                 max="30000" 
                                 value={price}
                                 onChange={(e) => setPrice(parseInt(e.target.value))}
                                 className="w-full h-2 bg-[#C7E0B0] rounded-full appearance-none outline-none cursor-pointer"
                                 style={{
                                   background: `linear-gradient(to right, #1B4D1B 0%, #4A9E3F ${(price - 20000) / 100}%, #C7E0B0 ${(price - 20000) / 100}%, #C7E0B0 100%)`
                                 }}
                               />
                             </div>
                             
                             <div className="flex space-x-4">
                                <button className="flex-1 bg-white border border-[#C7E0B0] py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest text-[#1B4D1B] hover:bg-[#1B4D1B]/5 transition-all">Simpan Draf</button>
                                <button 
                                  onClick={() => setMatchingStep('CONTRACT')}
                                  className="flex-[2] bg-[#1B4D1B] text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all flex items-center justify-center space-x-3 group"
                                >
                                  <span>Ajukan Tawaran & Buat Kontrak</span>
                                  <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                                </button>
                             </div>
                         </div>
                      </div>
                    ) : (
                      <div className="h-full p-12 flex flex-col animate-in fade-in duration-500">
                         <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center space-x-5">
                               <div className="w-16 h-16 bg-[#4A9E3F]/10 rounded-2xl flex items-center justify-center text-[#4A9E3F] border border-[#4A9E3F]/30 shadow-sm">
                                  <ShieldCheck size={36} weight="fill" />
                               </div>
                               <div>
                                  <h3 className="text-2xl font-semibold text-[#1B4D1B] tracking-tight">Review Kontrak Pintar AI</h3>
                                  <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mt-1 flex items-center">
                                     <Cube size={12} className="mr-1.5" />
                                     Dihasilkan oleh Protokol Geo-Escrow #SC-802
                                  </p>
                               </div>
                            </div>
                            <span className="text-[9px] font-bold bg-[#1B4D1B]/5 text-[#1B4D1B]/50 border border-[#C7E0B0] px-4 py-2 rounded-lg uppercase tracking-[0.2em]">DRAF VERSI 1.2</span>
                         </div>
                         
                         <div className="flex-1 bg-white/20 rounded-3xl border border-[#C7E0B0] p-8 overflow-y-auto no-scrollbar font-mono text-[11px] leading-relaxed text-[#1A2E1A]/60 mb-8 shadow-inner relative">
                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none text-[#4A9E3F]">
                               <ShieldCheck size={300} />
                            </div>

                            <p className="mb-8 text-[#1B4D1B] font-bold uppercase tracking-[0.4em] text-center border-b border-[#C7E0B0]/30 pb-6">*** AGRIFLOW SECURE TRADE PROTOCOL ***</p>
                            
                            <div className="grid grid-cols-2 gap-8 mb-10">
                               <div className="bg-[#1B4D1B]/5 p-5 rounded-xl border border-[#C7E0B0]/20">
                                  <p className="text-[9px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest mb-2">Produsen / Pihak A</p>
                                  <p className="text-base font-bold text-[#1B4D1B]">Slamet Raharjo</p>
                                  <p className="opacity-50 text-[9px] mt-1 text-[#0D7A6B]">ID AgriFlow: PR-9942-IDN</p>
                                </div>
                               <div className="bg-[#1B4D1B]/5 p-5 rounded-xl border border-[#C7E0B0]/20">
                                  <p className="text-[9px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest mb-2">Pembeli / Pihak B</p>
                                  <p className="text-base font-bold text-[#1B4D1B]">Superindo Retail Indonesia</p>
                                  <p className="opacity-50 text-[9px] mt-1 text-[#0D7A6B]">ID AgriFlow: BY-5521-IND</p>
                                </div>
                            </div>

                            <div className="p-6 bg-[#4A9E3F]/5 border border-[#4A9E3F]/20 rounded-2xl mb-10 text-[#1B4D1B]">
                               <div className="grid grid-cols-2 gap-4">
                                  <div>
                                     <p className="text-[9px] text-[#4A9E3F] uppercase tracking-widest mb-1">Komoditas</p>
                                     <p className="font-bold text-sm">Cabai Merah (Grade A)</p>
                                  </div>
                                  <div>
                                     <p className="text-[9px] text-[#4A9E3F] uppercase tracking-widest mb-1">Volume Target</p>
                                     <p className="font-bold text-sm">250 KG (Berat Bersih)</p>
                                  </div>
                                  <div className="col-span-2 pt-4 border-t border-[#4A9E3F]/20 mt-2">
                                     <p className="text-[9px] text-[#4A9E3F] uppercase tracking-widest mb-1">Harga Kesepakatan</p>
                                     <p className="font-bold text-xl tracking-tight text-[#1B4D1B]">Rp {price.toLocaleString()} <span className="text-[10px] font-normal text-[#1A2E1A]/50">/ KG</span></p>
                                  </div>
                               </div>
                            </div>

                            <p className="mb-4 text-[#1B4D1B] font-bold uppercase tracking-widest border-l-2 border-[#0D7A6B] pl-4 text-xs">Syarat Pencairan Dana Escrow:</p>
                            <div className="space-y-3 pl-4 text-[#1A2E1A]/70 font-medium">
                               <p>1. Pencairan dana otomatis dilakukan setelah Bukti Pengiriman Digital terverifikasi dari Node Logistik.</p>
                               <p>2. Log suhu *real-time* dari Sensor Cold Chain harus menunjukkan konsistensi (±2°C).</p>
                               <p>3. Resolusi perselisihan otomatis melalui Node Tata Kelola Pintar (BUMDes).</p>
                            </div>
                            
                            <p className="mt-12 text-center opacity-30 italic">--- Membutuhkan Tanda Tangan Digital untuk finalisasi ---</p>
                         </div>

                          <div className="flex space-x-4">
                            <button 
                              onClick={() => setMatchingStep('NEGOTIATION')}
                              className="flex-1 bg-white border border-[#C7E0B0] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest text-[#1B4D1B] hover:bg-[#1B4D1B]/5 transition-all font-mono"
                            >
                              [ KEMBALI KE NEGOSIASI ]
                            </button>
                            <Link href="/dashboard/logistics" className="flex-[2]">
                               <button className="w-full bg-[#1B4D1B] text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all flex items-center justify-center space-x-3 group">
                                  <span>Konfirmasi Perdagangan & Pesan Logistik</span>
                                  <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                               </button>
                            </Link>
                          </div>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function FilterToggle({ label, count, active }: { label: string, count: number | string, active?: boolean }) {
  return (
    <button className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all ${active ? 'bg-[#14b850]/10 border-[#14b850]/30 text-[#14b850]' : 'bg-white/[0.02] border-white/[0.05] text-white/60 hover:bg-white/[0.05] hover:text-white'}`}>
       <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
       <span className={`text-[10px] font-bold ${active ? 'text-[#14b850]' : 'text-white/30'}`}>{count}</span>
    </button>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center space-x-4 cursor-pointer group">
       <div className={`w-5 h-5 border rounded-md flex items-center justify-center transition-colors ${label.includes('Aktif') ? 'border-[#14b850] bg-[#14b850]/10' : 'border-white/[0.1] group-hover:border-white/[0.3]'}`}>
          {label.includes('Aktif') ? <CheckCircle size={14} weight="fill" className="text-[#14b850]" /> : null}
       </div>
       <span className={`text-[11px] font-medium transition-colors ${label.includes('Aktif') ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>{label}</span>
    </label>
  );
}
