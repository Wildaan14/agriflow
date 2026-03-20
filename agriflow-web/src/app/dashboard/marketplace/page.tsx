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
  ClockCounterClockwise
} from '@phosphor-icons/react';
import Link from 'next/link';
import MapboxMap from '@/components/MapboxMap';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Cabai Keriting Gayo', farmer: 'Slamet R.', location: 'Kediri', price: 24500, volume: '250kg', grade: 'Emas', rating: 4.9, image: '🌶️', coldChain: true, co2: '12.4kg' },
  { id: 2, name: 'Bawang Merah Brebes', farmer: 'H. Sudomo', location: 'Nganjuk', price: 18000, volume: '1.2t', grade: 'Perak', rating: 4.7, image: '🧅', coldChain: false, co2: '45.2kg' },
  { id: 3, name: 'Kopi Arabika Gayo', farmer: 'Ibu Ratna', location: 'Aceh Tengah', price: 85000, volume: '40kg', grade: 'Emas', rating: 5.0, image: '☕', coldChain: false, co2: '8.1kg' },
  { id: 4, name: 'Padi Ciherang Pulen', farmer: 'Bpk. Ahmad', location: 'Sragen', price: 12500, volume: '5t', grade: 'Perunggu', rating: 4.5, image: '🌾', coldChain: false, co2: '320kg' },
  { id: 5, name: 'Jagung Hibrida', farmer: 'Koperasi Tani', location: 'Malang', price: 6200, volume: '15t', grade: 'Emas', rating: 4.8, image: '🌽', coldChain: false, co2: '412kg' },
  { id: 6, name: 'Tomat Cherry', farmer: 'Greenhouse X', location: 'Lembang', price: 32000, volume: '150kg', grade: 'Emas', rating: 4.6, image: '🍅', coldChain: true, co2: '18kg' },
];

const MATCH_HISTORY = [
  { id: 1, party: 'Slamet R.', action: 'OFFER', price: 'Rp 24.500', time: '10:15' },
  { id: 2, party: 'Superindo', action: 'COUNTER', price: 'Rp 23.200', time: '10:42' },
  { id: 3, party: 'AI Suggester', action: 'ADVICE', price: 'Rp 23.800', time: '10:45' },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'MARKET' | 'MATCHMAKING'>('MARKET');
  const [matchingStep, setMatchingStep] = useState<'NEGOTIATION' | 'CONTRACT'>('NEGOTIATION');
  const [price, setPrice] = useState(23800);

  return (
    <div className="space-y-12 py-8 animate-in mt-12">
      {/* Updated Header - No Static Labels */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none italic">Marketplace & AI Matching</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70">Ekosistem perdagangan hasil tani premium dengan negosiasi otomatis berbasis AI.</p>
        </div>
        <div className="flex space-x-4 bg-slate-100/50 p-2 rounded-[28px]">
           <button 
             onClick={() => setActiveTab('MARKET')}
             className={`px-8 py-4 rounded-[22px] font-black text-[12px] uppercase tracking-widest transition-all ${activeTab === 'MARKET' ? 'bg-stripe-indigo text-white shadow-xl' : 'text-slate-400 hover:text-stripe-indigo'}`}
           >
              Market
           </button>
           <button 
             onClick={() => setActiveTab('MATCHMAKING')}
             className={`px-8 py-4 rounded-[22px] font-black text-[12px] uppercase tracking-widest transition-all ${activeTab === 'MATCHMAKING' ? 'bg-stripe-indigo text-white shadow-xl' : 'text-slate-400 hover:text-stripe-indigo'}`}
           >
              Matchmaking
           </button>
        </div>
      </div>

      {activeTab === 'MARKET' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           {/* Sidebar Filter */}
           <aside className="space-y-8">
              <div className="glass-card-premium p-10 rounded-[48px] border border-white shadow-2xl">
                 <h4 className="text-[10px] font-black text-stripe-indigo uppercase tracking-[0.2em] mb-8">AI Grading Intelligence</h4>
                 <div className="space-y-3">
                    <FilterToggle label="Grade Emas (A)" count={242} active />
                    <FilterToggle label="Grade Perak (B)" count={1120} />
                    <FilterToggle label="Grade Perunggu (C)" count={840} />
                 </div>

                 <div className="h-px bg-slate-100 my-10"></div>

                 <h4 className="text-[10px] font-black text-stripe-indigo uppercase tracking-[0.2em] mb-8">Supply Features</h4>
                 <div className="space-y-4">
                    <Checkbox label="Cold-Chain Monitored" />
                    <Checkbox label="Export Ready" />
                    <Checkbox label="Carbon Neutral" />
                 </div>
              </div>
           </aside>

           {/* Product Grid */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {DUMMY_PRODUCTS.map(product => (
                <div key={product.id} className="glass-card-premium p-8 rounded-[48px] border border-white hover:border-stripe-indigo/20 transition-all group cursor-pointer hover:shadow-2xl flex flex-col justify-between">
                   <div>
                      <div className="flex justify-between items-start mb-6">
                         <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${product.grade === 'Emas' ? 'bg-amber-400 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>Grade {product.grade}</span>
                         <div className="flex items-center space-x-1 text-amber-500">
                            <Star size={14} weight="fill" />
                            <span className="text-[10px] font-black">{product.rating}</span>
                         </div>
                      </div>
                      <div className="w-full h-40 bg-slate-50/50 rounded-[32px] flex items-center justify-center text-6xl mb-8 group-hover:scale-110 transition-transform">
                         {product.image}
                      </div>
                      <h5 className="text-xl font-black text-stripe-indigo tracking-tight mb-2 leading-none">{product.name}</h5>
                      <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-dashed border-slate-100 pb-4">
                         <span className="text-stripe-indigo">{product.farmer}</span>
                         <span>•</span>
                         <span>{product.location}</span>
                      </div>

                      <div className="flex items-center space-x-4 mb-8">
                         {product.coldChain && (
                            <div className="flex items-center space-x-1.5 bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-lg border border-blue-100">
                               <Thermometer size={12} weight="fill" />
                               <span className="text-[8px] font-black uppercase tracking-widest">Cold Chain</span>
                            </div>
                         )}
                         <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                            <Tree size={12} weight="fill" />
                            <span className="text-[8px] font-black uppercase tracking-widest">{product.co2} CO2</span>
                         </div>
                      </div>
                   </div>

                    <div className="pt-8 flex items-center justify-between">
                      <div>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Price (B2B)</p>
                          <p className="text-xl font-black text-stripe-indigo tracking-tighter">Rp {product.price.toLocaleString()}<span className="text-xs text-slate-400">/kg</span></p>
                      </div>
                      <div className="flex space-x-2">
                         <button 
                           onClick={() => setActiveTab('MATCHMAKING')}
                           className="w-12 h-12 rounded-2xl bg-stripe-indigo/5 text-stripe-indigo border border-stripe-indigo/10 flex items-center justify-center hover:bg-stripe-indigo hover:text-white transition-all shadow-sm group/btn relative"
                         >
                            <Handshake size={22} weight="bold" />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap z-50">Nego via AI</span>
                         </button>
                         <button className="w-12 h-12 rounded-2xl bg-slate-50 text-stripe-indigo border border-slate-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                            <ShoppingCart size={22} weight="bold" />
                         </button>
                      </div>
                    </div>
                </div>
              ))}
           </div>
        </div>
      ) : (
        /* Integrated AI Matchmaking UI */
        <div className="flex flex-col space-y-10 animate-in slide-in-from-bottom-10 duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 h-[800px]">
              {/* Sidebar: Active Match Details */}
              <aside className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar">
                 <div className="glass-card-premium p-8 rounded-[40px] border border-white bg-white shadow-2xl">
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-slate-100">
                          🏢
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-stripe-indigo tracking-tight">Superindo Retail</h4>
                          <p className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest">Verified Buyer</p>
                       </div>
                    </div>

                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 opacity-60 italic">Request Detail</p>
                    <div className="space-y-4 mb-10">
                       <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-3">
                          <span className="text-xs font-bold text-stripe-slate">Commodity</span>
                          <span className="text-xs font-black text-stripe-indigo">Cabai Keriting</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-stripe-slate">Target Volume</span>
                          <span className="text-xs font-black text-stripe-indigo">250kg</span>
                       </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-stripe-indigo/5 border border-dashed border-stripe-indigo/20 shadow-inner">
                       <p className="text-[11px] font-black text-stripe-indigo leading-relaxed italic opacity-80">
                          "Probabilitas deal **84%** pada kisaran harga Rp 23.500 - Rp 23.800 berdasarkan sentimen pasar hari ini."
                       </p>
                    </div>
                 </div>

                 <div className="glass-card-premium p-8 rounded-[40px] border border-white">
                    <div className="flex items-center space-x-3 mb-6 opacity-40">
                       <ClockCounterClockwise size={18} />
                       <h4 className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest">Live Negotiation History</h4>
                    </div>
                    <div className="space-y-5">
                       {MATCH_HISTORY.map(log => (
                         <div key={log.id} className="flex justify-between items-center text-[11px] font-bold border-b border-slate-50 pb-4 last:border-0 hover:bg-slate-50 transition-colors p-2 rounded-xl">
                            <span className="text-slate-400 font-mono">{log.time}</span>
                            <span className="text-stripe-indigo uppercase opacity-40">{log.action}</span>
                            <span className="text-stripe-indigo font-black">{log.price}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </aside>

              {/* Main Interactor Area */}
              <div className="lg:col-span-3 h-full overflow-hidden flex flex-col">
                 <div className="flex space-x-4 mb-10 bg-white shadow-xl p-3 rounded-[32px] w-fit border border-white">
                    <button 
                      onClick={() => setMatchingStep('NEGOTIATION')}
                      className={`px-10 py-4 rounded-[24px] font-black text-[11px] uppercase tracking-[0.1em] transition-all flex items-center space-x-3 ${matchingStep === 'NEGOTIATION' ? 'bg-stripe-indigo text-white shadow-2xl' : 'text-slate-400'}`}
                    >
                       <Handshake size={18} weight={matchingStep === 'NEGOTIATION' ? 'fill' : 'bold'} />
                       <span>Negotiation Room</span>
                    </button>
                    <button 
                      onClick={() => setMatchingStep('CONTRACT')}
                      className={`px-10 py-4 rounded-[24px] font-black text-[11px] uppercase tracking-[0.1em] transition-all flex items-center space-x-3 ${matchingStep === 'CONTRACT' ? 'bg-stripe-indigo text-white shadow-2xl' : 'text-slate-400'}`}
                    >
                       <ShieldCheck size={18} weight={matchingStep === 'CONTRACT' ? 'fill' : 'bold'} />
                       <span>Smart Contract Draft</span>
                    </button>
                 </div>

                 <div className="flex-1 bg-white glass-card-premium rounded-[64px] border border-white shadow-2xl overflow-hidden relative">
                    {matchingStep === 'NEGOTIATION' ? (
                      <div className="h-full p-20 flex flex-col justify-center items-center text-center animate-in fade-in duration-500">
                         <div className="w-28 h-28 bg-stripe-indigo/5 rounded-[40px] flex items-center justify-center text-stripe-indigo mb-10 shadow-inner">
                            <CurrencyCircleDollar size={64} weight="fill" />
                         </div>
                         <h3 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-4 italic">Interaktif AI Bargaining</h3>
                         <p className="text-xl font-bold text-stripe-slate opacity-40 mb-16 max-w-xl">Sesuaikan tawaran Anda secara real-time. Sistem AI AgriFlow akan membantu menyelaraskan profit margin Anda.</p>
                         
                         <div className="w-full max-w-3xl px-12">
                             <div className="flex justify-between mb-8">
                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Floor: Rp 20K</span>
                                <div className="bg-stripe-indigo text-white px-8 py-3 rounded-2xl shadow-2xl transform -translate-y-4">
                                   <span className="text-lg font-black tracking-widest">Rp {price.toLocaleString()}</span>
                                </div>
                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Ceil: Rp 30K</span>
                             </div>
                             <input 
                               type="range" 
                               min="20000" 
                               max="30000" 
                               value={price}
                               onChange={(e) => setPrice(parseInt(e.target.value))}
                               className="w-full h-4 bg-slate-100 rounded-full appearance-none accent-stripe-indigo cursor-pointer mb-20"
                             />
                             <div className="flex space-x-6">
                                <button className="flex-1 border border-slate-200 py-7 rounded-[32px] font-black text-xs uppercase tracking-widest text-stripe-indigo hover:border-stripe-indigo hover:bg-slate-50 transition-all">Save Draft Offer</button>
                                <button 
                                  onClick={() => setMatchingStep('CONTRACT')}
                                  className="flex-[2] bg-stripe-indigo text-white py-7 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-[0_30px_60px_-12px_rgba(100,90,255,0.4)] hover:bg-black transition-all flex items-center justify-center space-x-4"
                                >
                                  <span>Ajukan Tawaran & Review Kontrak</span>
                                  <ArrowRight size={20} weight="bold" />
                                </button>
                             </div>
                         </div>
                      </div>
                    ) : (
                      <div className="h-full p-20 flex flex-col animate-in fade-in duration-500">
                         <div className="flex justify-between items-center mb-16">
                            <div className="flex items-center space-x-6">
                               <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-stripe-emerald shadow-inner border border-emerald-100">
                                  <ShieldCheck size={48} weight="fill" />
                               </div>
                               <div>
                                  <h3 className="text-4xl font-black text-stripe-indigo tracking-tighter italic">AI Smart Contract Review</h3>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                     <Clock size={14} className="mr-2" />
                                     Auto-Generated by Geo-Escrow Protocol #SC-802
                                  </p>
                               </div>
                            </div>
                            <span className="text-[11px] font-black bg-slate-100 px-6 py-3 rounded-2xl uppercase tracking-[0.2em] border border-white">DRAFT VERSION 1.2</span>
                         </div>
                         
                         <div className="flex-1 bg-slate-50/70 rounded-[56px] border border-slate-100 p-12 overflow-y-auto no-scrollbar font-mono text-xs leading-relaxed text-slate-500 mb-12 shadow-inner">
                            <p className="mb-10 text-stripe-indigo font-black uppercase tracking-[0.4em] text-center border-b border-slate-200 pb-8">*** AGRIFLOW SECURE TRADE PROTOCOL ***</p>
                            
                            <div className="grid grid-cols-2 gap-10 mb-12">
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Producer / Party A</p>
                                  <p className="text-lg font-black text-stripe-indigo">Slamet Raharjo</p>
                                  <p className="opacity-60 text-[10px]">AgriFlow ID: PR-9942-IDN</p>
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Buyer / Party B</p>
                                  <p className="text-lg font-black text-stripe-indigo">Superindo Retail Indonesia</p>
                                  <p className="opacity-60 text-[10px]">AgriFlow ID: BY-5521-IND</p>
                               </div>
                            </div>

                            <div className="p-8 bg-white border border-slate-100 rounded-[32px] mb-12">
                               <p className="mb-6"><span className="font-black text-stripe-indigo">COMMODITY:</span> Red Chili (Grade A Excellence)</p>
                               <p className="mb-6"><span className="font-black text-stripe-indigo">TARGET VOLUME:</span> 250 KG (Nett Weight)</p>
                               <p className="mb-0"><span className="font-black text-stripe-indigo">NEGOTIATED PRICE:</span> Rp {price.toLocaleString()} / KG</p>
                            </div>

                            <p className="mb-8 text-stripe-indigo font-black uppercase tracking-widest border-l-4 border-stripe-indigo pl-6 py-2">Escrow Release Conditions:</p>
                            <p className="mb-4 pl-4">1. Automatical payout release upon Digital Proof of Delivery from Logistic Node.</p>
                            <p className="mb-4 pl-4">2. Real-time temperature logs from Cold Chain Sensor must show consistency (±2°C).</p>
                            <p className="mb-4 pl-4">3. Automated dispute resolution via Smart Governance Node (BUMDes).</p>
                            
                            <p className="mt-16 text-center opacity-20 italic">--- E-Signatures required to finalize ---</p>
                         </div>

                          <div className="flex space-x-6">
                            <button 
                              onClick={() => setMatchingStep('NEGOTIATION')}
                              className="flex-1 border border-slate-200 py-7 rounded-[32px] font-black text-xs uppercase tracking-widest text-stripe-indigo hover:border-stripe-indigo hover:bg-slate-50 transition-all font-mono"
                            >
                              [ RESTORE NEGOTIATION ]
                            </button>
                            <Link href="/dashboard/logistics" className="flex-1">
                               <button className="w-full bg-stripe-emerald text-white py-7 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-[0_30px_60px_-12px_rgba(16,185,129,0.4)] hover:bg-black transition-all flex items-center justify-center space-x-4">
                                  <span>Confirm Trade & Book Fleet</span>
                                  <ArrowRight size={22} weight="bold" />
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
    <button className={`w-full flex justify-between items-center p-5 rounded-2xl border transition-all ${active ? 'bg-stripe-indigo border-stripe-indigo text-white shadow-xl shadow-stripe-indigo/20' : 'bg-slate-50 border-slate-100 hover:bg-white'}`}>
       <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
       <span className={`text-[10px] font-black ${active ? 'opacity-40' : 'text-slate-300'}`}>{count}</span>
    </button>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center space-x-4 cursor-pointer group">
       <div className="w-6 h-6 border-2 border-slate-100 rounded-lg group-hover:border-stripe-indigo transition-colors flex items-center justify-center">
          <CheckCircle size={14} weight="fill" className="text-stripe-indigo opacity-0 group-hover:opacity-10 transition-opacity" />
       </div>
       <span className="text-xs font-bold text-stripe-slate group-hover:text-stripe-indigo transition-colors">{label}</span>
    </label>
  );
}
