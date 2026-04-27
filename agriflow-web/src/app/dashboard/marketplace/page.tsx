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
  { id: 1, name: 'Cabai Keriting Gayo', farmer: 'Slamet R.', location: 'Kediri', price: 24500, volume: '250kg', grade: 'A', rating: 4.9, image: '🌶️', coldChain: true },
  { id: 2, name: 'Bawang Merah Brebes', farmer: 'H. Sudomo', location: 'Nganjuk', price: 18000, volume: '1.2t', grade: 'B', rating: 4.7, image: '🧅', coldChain: false },
  { id: 3, name: 'Kopi Arabika Gayo', farmer: 'Ibu Ratna', location: 'Aceh', price: 85000, volume: '40kg', grade: 'A', rating: 5.0, image: '☕', coldChain: false },
  { id: 4, name: 'Padi Ciherang Pulen', farmer: 'Bpk. Ahmad', location: 'Sragen', price: 12500, volume: '5t', grade: 'C', rating: 4.5, image: '🌾', coldChain: false },
  { id: 5, name: 'Jagung Hibrida', farmer: 'Koperasi Tani', location: 'Malang', price: 6200, volume: '15t', grade: 'A', rating: 4.8, image: '🌽', coldChain: false },
  { id: 6, name: 'Tomat Cherry', farmer: 'Greenhouse X', location: 'Lembang', price: 32000, volume: '150kg', grade: 'A', rating: 4.6, image: '🍅', coldChain: true },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'MARKET' | 'MATCHMAKING'>('MARKET');
  const [price, setPrice] = useState(23800);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Marketplace</h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Premium commodity trading ecosystem.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab('MARKET')}
             className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'MARKET' ? 'bg-white text-[#1B4D1B] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
           >
              Exchange
           </button>
           <button 
             onClick={() => setActiveTab('MATCHMAKING')}
             className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'MATCHMAKING' ? 'bg-white text-[#1B4D1B] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
           >
              AI Match
           </button>
        </div>
      </div>

      {activeTab === 'MARKET' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar Filters */}
           <aside className="space-y-6">
              <div className="card-clean p-6">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Quality Grade</h4>
                 <div className="space-y-2">
                    <FilterItem label="Grade A" count={242} active />
                    <FilterItem label="Grade B" count={1120} />
                    <FilterItem label="Grade C" count={840} />
                 </div>
                 <div className="h-px bg-gray-100 my-8"></div>
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Logistics</h4>
                 <div className="space-y-3">
                    <CheckboxSimple label="Cold Chain Active" checked />
                    <CheckboxSimple label="Export Standard" />
                    <CheckboxSimple label="Carbon Neutral" />
                 </div>
              </div>
           </aside>

           {/* Product Grid */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {DUMMY_PRODUCTS.map(product => (
                <div key={product.id} className="card-clean p-6 hover:border-[#4A9E3F]/30 group flex flex-col justify-between">
                   <div>
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 rounded uppercase tracking-widest">Grade {product.grade}</span>
                         <div className="flex items-center space-x-1 text-amber-500">
                            <Star size={12} weight="fill" />
                            <span className="text-[10px] font-bold">{product.rating}</span>
                         </div>
                      </div>
                      
                      <div className="w-full h-24 bg-gray-50 rounded-xl flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform">
                         {product.image}
                      </div>
                      
                      <h5 className="text-base font-bold text-gray-900 mb-1">{product.name}</h5>
                      <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-4">{product.farmer} • {product.location}</p>
                   </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                       <div>
                           <p className="text-lg font-bold text-[#1B4D1B]">Rp {product.price.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/kg</span></p>
                       </div>
                       <button 
                         onClick={() => setActiveTab('MATCHMAKING')}
                         className="w-9 h-9 rounded-lg bg-[#1B4D1B]/5 text-[#1B4D1B] flex items-center justify-center hover:bg-[#1B4D1B] hover:text-white transition-all"
                       >
                          <Handshake size={18} weight="bold" />
                       </button>
                    </div>
                </div>
              ))}
           </div>
        </div>
      ) : (
        /* Matchmaking UI */
        <div className="card-clean p-10 animate-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto text-center">
           <div className="w-16 h-16 bg-[#1B4D1B]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1B4D1B]">
              <CurrencyCircleDollar size={32} weight="fill" />
           </div>
           <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Price Negotiation</h3>
           <p className="text-sm text-gray-500 mb-12 max-w-md mx-auto">Sistem AI kami akan membantu Anda mencapai harga terbaik berdasarkan data pasar real-time.</p>
           
           <div className="max-w-md mx-auto space-y-8">
              <div className="flex justify-between items-end">
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Low: Rp 20K</span>
                 <div className="text-3xl font-bold text-[#1B4D1B] tracking-tight">Rp {price.toLocaleString()}</div>
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">High: Rp 30K</span>
              </div>
              
              <input 
                type="range" 
                min="20000" 
                max="30000" 
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-full appearance-none outline-none cursor-pointer accent-[#1B4D1B]"
              />
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <button className="btn-minimal btn-secondary">Save Draft</button>
                 <button className="btn-minimal btn-primary">Submit Offer</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function FilterItem({ label, count, active }: { label: string, count: number, active?: boolean }) {
  return (
    <button className={`w-full flex justify-between items-center p-3 rounded-lg transition-all ${active ? 'bg-gray-100 text-[#1B4D1B]' : 'text-gray-500 hover:bg-gray-50'}`}>
       <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
       <span className="text-[10px] font-bold opacity-40">{count}</span>
    </button>
  );
}

function CheckboxSimple({ label, checked }: { label: string, checked?: boolean }) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
       <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${checked ? 'bg-[#1B4D1B] border-[#1B4D1B]' : 'border-gray-300'}`}>
          {checked && <CheckCircle size={12} weight="fill" className="text-white" />}
       </div>
       <span className="text-xs font-medium text-gray-600">{label}</span>
    </label>
  );
}
