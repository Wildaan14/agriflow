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
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-2 mb-4">
             <Cpu size={20} className="text-[#14b850]" />
             <span className="text-[10px] font-bold text-[#14b850] uppercase tracking-[0.3em]">AI Matching Engine Aktif</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">Marketplace & <span className="text-[#14b850]">AI Matching</span></h1>
           <p className="text-white/50 text-sm max-w-xl font-light leading-relaxed">Ekosistem perdagangan hasil tani premium dengan negosiasi cerdas otomatis berbasis algoritma prediktif AgriFlow.</p>
        </div>
        <div className="flex bg-white/[0.03] border border-white/[0.05] p-1.5 rounded-2xl w-full lg:w-auto">
           <button 
             onClick={() => setActiveTab('MARKET')}
             className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'MARKET' ? 'bg-[#14b850] text-[#0A0D14] shadow-[0_0_20px_rgba(20,184,80,0.4)]' : 'text-white/40 hover:text-white'}`}
           >
              Bursa Komoditas
           </button>
           <button 
             onClick={() => setActiveTab('MATCHMAKING')}
             className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'MATCHMAKING' ? 'bg-[#14b850] text-[#0A0D14] shadow-[0_0_20px_rgba(20,184,80,0.4)]' : 'text-white/40 hover:text-white'}`}
           >
              Ruang Matchmaking
           </button>
        </div>
      </div>

      {activeTab === 'MARKET' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar Filter */}
           <aside className="space-y-6">
              <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] shadow-2xl backdrop-blur-xl">
                 <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center">
                   <Star size={14} className="mr-2 text-amber-500" />
                   Filter Kualitas AI
                 </h4>
                 <div className="space-y-2">
                    <FilterToggle label="Grade Emas (A)" count={242} active />
                    <FilterToggle label="Grade Perak (B)" count={1120} />
                    <FilterToggle label="Grade Perunggu (C)" count={840} />
                 </div>

                 <div className="h-px bg-white/[0.05] my-8"></div>

                 <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center">
                   <Cube size={14} className="mr-2 text-[#0ea5e9]" />
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
                <div key={product.id} className="bg-white/[0.02] p-6 rounded-[32px] border border-white/[0.05] hover:border-[#14b850]/50 transition-all group cursor-pointer hover:shadow-[0_0_30px_rgba(20,184,80,0.1)] flex flex-col justify-between backdrop-blur-xl">
                   <div>
                      <div className="flex justify-between items-start mb-6">
                         <span className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest ${product.grade === 'Emas' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>Grade {product.grade}</span>
                         <div className="flex items-center space-x-1 text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                            <Star size={12} weight="fill" />
                            <span className="text-[10px] font-bold">{product.rating}</span>
                         </div>
                      </div>
                      
                      <div className="w-full h-32 bg-white/[0.02] rounded-2xl flex items-center justify-center text-6xl mb-6 group-hover:scale-105 transition-transform border border-white/[0.02]">
                         {product.image}
                      </div>
                      
                      <h5 className="text-xl font-semibold text-white tracking-tight mb-2 leading-none">{product.name}</h5>
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6 border-b border-white/[0.05] pb-4">
                         <span className="text-[#14b850]">{product.farmer}</span>
                         <span>•</span>
                         <span>{product.location}</span>
                      </div>

                      <div className="flex items-center space-x-3 mb-6">
                         {product.coldChain && (
                            <div className="flex items-center space-x-1.5 bg-[#0ea5e9]/10 text-[#0ea5e9] px-2.5 py-1.5 rounded-md border border-[#0ea5e9]/20">
                               <Thermometer size={12} weight="fill" />
                               <span className="text-[9px] font-bold uppercase tracking-widest">Cold Chain</span>
                            </div>
                         )}
                         <div className="flex items-center space-x-1.5 bg-[#14b850]/10 text-[#14b850] px-2.5 py-1.5 rounded-md border border-[#14b850]/20">
                            <Tree size={12} weight="fill" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{product.co2} CO2</span>
                         </div>
                      </div>
                   </div>

                    <div className="pt-4 flex items-center justify-between">
                      <div>
                          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none mb-1.5">Harga B2B</p>
                          <p className="text-xl font-bold text-white tracking-tight">Rp {product.price.toLocaleString()}<span className="text-[10px] text-white/40 font-normal">/kg</span></p>
                      </div>
                      <div className="flex space-x-2">
                         <button 
                           onClick={() => setActiveTab('MATCHMAKING')}
                           className="w-10 h-10 rounded-xl bg-[#14b850]/10 text-[#14b850] border border-[#14b850]/20 flex items-center justify-center hover:bg-[#14b850] hover:text-[#0A0D14] transition-all group/btn relative"
                         >
                            <Handshake size={20} weight="fill" />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0A0D14] border border-[#14b850]/30 text-[#14b850] text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap z-50">Nego via AI</span>
                         </button>
                         <button className="w-10 h-10 rounded-xl bg-white/[0.05] text-white/70 border border-white/[0.1] flex items-center justify-center hover:bg-white hover:text-[#0A0D14] transition-all">
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
                 <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] backdrop-blur-xl">
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="w-14 h-14 bg-white/[0.05] rounded-2xl flex items-center justify-center text-2xl border border-white/[0.1]">
                          🏢
                       </div>
                       <div>
                          <h4 className="text-lg font-bold text-white tracking-tight">Superindo Retail</h4>
                          <p className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest mt-1">Pembeli Terverifikasi</p>
                       </div>
                    </div>

                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Detail Permintaan</p>
                    <div className="space-y-3 mb-8">
                       <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/[0.02]">
                          <span className="text-[11px] text-white/60">Komoditas</span>
                          <span className="text-[11px] font-bold text-white">Cabai Keriting</span>
                       </div>
                       <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/[0.02]">
                          <span className="text-[11px] text-white/60">Volume Target</span>
                          <span className="text-[11px] font-bold text-[#14b850]">250 kg</span>
                       </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-[#0ea5e9]/20 blur-xl rounded-full -mr-10 -mt-10"></div>
                       <p className="text-[11px] text-[#0ea5e9] leading-relaxed relative z-10">
                          Probabilitas deal <strong className="font-black text-white">84%</strong> pada kisaran harga Rp 23.500 - Rp 23.800 berdasarkan sentimen pasar hari ini.
                       </p>
                    </div>
                 </div>

                 <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] backdrop-blur-xl">
                    <div className="flex items-center space-x-2 mb-6 text-white/40">
                       <ClockCounterClockwise size={16} />
                       <h4 className="text-[9px] font-bold uppercase tracking-widest">Riwayat Negosiasi</h4>
                    </div>
                    <div className="space-y-3">
                       {MATCH_HISTORY.map((log, i) => (
                         <div key={log.id} className="flex justify-between items-center text-[10px] font-semibold bg-white/[0.02] border border-white/[0.02] p-3 rounded-xl hover:border-white/[0.1] transition-all">
                            <span className="text-white/30 font-mono w-10">{log.time}</span>
                            <span className={`uppercase flex-1 px-3 ${i === MATCH_HISTORY.length - 1 ? 'text-[#0ea5e9]' : 'text-white/50'}`}>{log.action}</span>
                            <span className={i === MATCH_HISTORY.length - 1 ? 'text-[#14b850] font-bold' : 'text-white'}>{log.price}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </aside>

              {/* Main Interactor Area */}
              <div className="lg:col-span-3 h-full overflow-hidden flex flex-col">
                 <div className="flex space-x-2 mb-6 bg-white/[0.02] backdrop-blur-xl p-1.5 rounded-2xl w-fit border border-white/[0.05]">
                    <button 
                      onClick={() => setMatchingStep('NEGOTIATION')}
                      className={`px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 ${matchingStep === 'NEGOTIATION' ? 'bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/30' : 'text-white/40 hover:text-white'}`}
                    >
                       <Handshake size={16} weight={matchingStep === 'NEGOTIATION' ? 'fill' : 'regular'} />
                       <span>Ruang Negosiasi AI</span>
                    </button>
                    <button 
                      onClick={() => setMatchingStep('CONTRACT')}
                      className={`px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 ${matchingStep === 'CONTRACT' ? 'bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30' : 'text-white/40 hover:text-white'}`}
                    >
                       <ShieldCheck size={16} weight={matchingStep === 'CONTRACT' ? 'fill' : 'regular'} />
                       <span>Draf Kontrak Pintar</span>
                    </button>
                 </div>

                 <div className="flex-1 bg-white/[0.01] backdrop-blur-3xl rounded-[40px] border border-white/[0.05] shadow-2xl overflow-hidden relative">
                    {matchingStep === 'NEGOTIATION' ? (
                      <div className="h-full p-16 flex flex-col justify-center items-center text-center animate-in fade-in zoom-in-95 duration-500">
                         <div className="w-24 h-24 bg-[#0ea5e9]/10 rounded-3xl flex items-center justify-center text-[#0ea5e9] mb-8 border border-[#0ea5e9]/20 shadow-[0_0_40px_rgba(14,165,233,0.2)]">
                            <CurrencyCircleDollar size={48} weight="fill" />
                         </div>
                         <h3 className="text-3xl font-semibold text-white tracking-tight mb-4">Interaksi Harga Otomatis</h3>
                         <p className="text-white/40 text-sm mb-16 max-w-lg font-light leading-relaxed">
                           Sesuaikan tawaran Anda secara real-time. Sistem AI AgriFlow akan membantu menyelaraskan margin keuntungan Anda dengan ekspektasi pembeli.
                         </p>
                         
                         <div className="w-full max-w-2xl px-8">
                             <div className="flex justify-between items-end mb-6">
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Batas Bawah: Rp 20K</span>
                                <div className="bg-gradient-to-r from-[#0ea5e9] to-[#14b850] p-[1px] rounded-2xl transform -translate-y-2">
                                  <div className="bg-[#0A0D14] text-white px-8 py-3 rounded-[15px]">
                                     <span className="text-2xl font-bold tracking-tight">Rp {price.toLocaleString()}</span>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Batas Atas: Rp 30K</span>
                             </div>
                             
                             <div className="relative mb-16">
                               <input 
                                 type="range" 
                                 min="20000" 
                                 max="30000" 
                                 value={price}
                                 onChange={(e) => setPrice(parseInt(e.target.value))}
                                 className="w-full h-2 bg-white/10 rounded-full appearance-none outline-none cursor-pointer"
                                 style={{
                                   background: `linear-gradient(to right, #0ea5e9 0%, #14b850 ${(price - 20000) / 100}%, rgba(255,255,255,0.1) ${(price - 20000) / 100}%, rgba(255,255,255,0.1) 100%)`
                                 }}
                               />
                               {/* Custom range thumb using CSS pseudo-elements normally, but inline styles are limited for thumbs. We rely on browser default styled by accent-color if possible, or leave it minimal. */}
                             </div>
                             
                             <div className="flex space-x-4">
                                <button className="flex-1 bg-white/[0.02] border border-white/[0.1] py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest text-white hover:bg-white/[0.05] transition-all">Simpan Draf</button>
                                <button 
                                  onClick={() => setMatchingStep('CONTRACT')}
                                  className="flex-[2] bg-[#14b850] text-[#0A0D14] py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all flex items-center justify-center space-x-3 group"
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
                               <div className="w-16 h-16 bg-[#14b850]/10 rounded-2xl flex items-center justify-center text-[#14b850] border border-[#14b850]/30 shadow-[0_0_30px_rgba(20,184,80,0.2)]">
                                  <ShieldCheck size={36} weight="fill" />
                               </div>
                               <div>
                                  <h3 className="text-2xl font-semibold text-white tracking-tight">Review Kontrak Pintar AI</h3>
                                  <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest mt-1 flex items-center">
                                     <Cube size={12} className="mr-1.5" />
                                     Dihasilkan oleh Protokol Geo-Escrow #SC-802
                                  </p>
                               </div>
                            </div>
                            <span className="text-[9px] font-bold bg-white/[0.05] text-white/50 border border-white/[0.1] px-4 py-2 rounded-lg uppercase tracking-[0.2em]">DRAF VERSI 1.2</span>
                         </div>
                         
                         <div className="flex-1 bg-white/[0.01] rounded-3xl border border-white/[0.05] p-8 overflow-y-auto no-scrollbar font-mono text-[11px] leading-relaxed text-white/50 mb-8 shadow-inner relative">
                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                               <ShieldCheck size={300} />
                            </div>

                            <p className="mb-8 text-[#14b850] font-bold uppercase tracking-[0.4em] text-center border-b border-white/[0.05] pb-6">*** AGRIFLOW SECURE TRADE PROTOCOL ***</p>
                            
                            <div className="grid grid-cols-2 gap-8 mb-10">
                               <div className="bg-white/[0.02] p-5 rounded-xl border border-white/[0.02]">
                                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Produsen / Pihak A</p>
                                  <p className="text-base font-bold text-white">Slamet Raharjo</p>
                                  <p className="opacity-50 text-[9px] mt-1 text-[#0ea5e9]">ID AgriFlow: PR-9942-IDN</p>
                               </div>
                               <div className="bg-white/[0.02] p-5 rounded-xl border border-white/[0.02]">
                                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Pembeli / Pihak B</p>
                                  <p className="text-base font-bold text-white">Superindo Retail Indonesia</p>
                                  <p className="opacity-50 text-[9px] mt-1 text-[#0ea5e9]">ID AgriFlow: BY-5521-IND</p>
                               </div>
                            </div>

                            <div className="p-6 bg-[#14b850]/5 border border-[#14b850]/20 rounded-2xl mb-10 text-white">
                               <div className="grid grid-cols-2 gap-4">
                                  <div>
                                     <p className="text-[9px] text-[#14b850] uppercase tracking-widest mb-1">Komoditas</p>
                                     <p className="font-semibold text-sm">Cabai Merah (Grade A)</p>
                                  </div>
                                  <div>
                                     <p className="text-[9px] text-[#14b850] uppercase tracking-widest mb-1">Volume Target</p>
                                     <p className="font-semibold text-sm">250 KG (Berat Bersih)</p>
                                  </div>
                                  <div className="col-span-2 pt-4 border-t border-[#14b850]/20 mt-2">
                                     <p className="text-[9px] text-[#14b850] uppercase tracking-widest mb-1">Harga Kesepakatan</p>
                                     <p className="font-bold text-xl tracking-tight">Rp {price.toLocaleString()} <span className="text-[10px] font-normal text-white/50">/ KG</span></p>
                                  </div>
                               </div>
                            </div>

                            <p className="mb-4 text-white font-bold uppercase tracking-widest border-l-2 border-[#0ea5e9] pl-4 text-xs">Syarat Pencairan Dana Escrow:</p>
                            <div className="space-y-3 pl-4 text-white/60">
                               <p>1. Pencairan dana otomatis dilakukan setelah Bukti Pengiriman Digital terverifikasi dari Node Logistik.</p>
                               <p>2. Log suhu *real-time* dari Sensor Cold Chain harus menunjukkan konsistensi (±2°C).</p>
                               <p>3. Resolusi perselisihan otomatis melalui Node Tata Kelola Pintar (BUMDes).</p>
                            </div>
                            
                            <p className="mt-12 text-center opacity-30 italic">--- Membutuhkan Tanda Tangan Digital untuk finalisasi ---</p>
                         </div>

                          <div className="flex space-x-4">
                            <button 
                              onClick={() => setMatchingStep('NEGOTIATION')}
                              className="flex-1 bg-white/[0.02] border border-white/[0.1] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/[0.05] transition-all font-mono"
                            >
                              [ KEMBALI KE NEGOSIASI ]
                            </button>
                            <Link href="/dashboard/logistics" className="flex-[2]">
                               <button className="w-full bg-[#14b850] text-[#0A0D14] py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all flex items-center justify-center space-x-3 group">
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
