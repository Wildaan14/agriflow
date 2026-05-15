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
  Cpu,
  X,
  Storefront,
  Scales
} from '@phosphor-icons/react';
import Link from 'next/link';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Cabai Keriting Gayo', category: 'Hortikultura', farmer: 'Koperasi Tani Harapan', location: 'Kediri', price: 24500, volume: '250kg', grade: 'A', rating: 4.9, image: 'https://images.unsplash.com/photo-1596541571731-31f47883bc24?w=800&q=80', coldChain: true, harvestDate: '12 May 2026' },
  { id: 2, name: 'Bawang Merah Brebes', category: 'Hortikultura', farmer: 'Kelompok Tani Berkah', location: 'Brebes', price: 18000, volume: '1.2t', grade: 'B', rating: 4.7, image: 'https://images.unsplash.com/photo-1615485458066-e83296c0d832?w=800&q=80', coldChain: false, harvestDate: '10 May 2026' },
  { id: 3, name: 'Kopi Arabika Gayo', category: 'Perkebunan', farmer: 'Kopi Gayo Bersama', location: 'Aceh Tengah', price: 85000, volume: '40kg', grade: 'A', rating: 5.0, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80', coldChain: false, harvestDate: '1 May 2026' },
  { id: 4, name: 'Beras Ciherang Premium', category: 'Pangan', farmer: 'Desa Mandiri', location: 'Sragen', price: 12500, volume: '5t', grade: 'C', rating: 4.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80', coldChain: false, harvestDate: '14 May 2026' },
  { id: 5, name: 'Jagung Hibrida', category: 'Pangan', farmer: 'Makmur Jaya', location: 'Malang', price: 6200, volume: '15t', grade: 'A', rating: 4.8, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', coldChain: false, harvestDate: '15 May 2026' },
  { id: 6, name: 'Tomat Cherry Lembang', category: 'Hortikultura', farmer: 'Greenhouse Sejahtera', location: 'Lembang', price: 32000, volume: '150kg', grade: 'A', rating: 4.6, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80', coldChain: true, harvestDate: '16 May 2026' },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'MARKET' | 'MATCHMAKING'>('MARKET');
  const [price, setPrice] = useState(23800);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [transactionStep, setTransactionStep] = useState<number>(1);
  const [negotiationPrice, setNegotiationPrice] = useState<number>(0);

  const handleBuyClick = (product: any) => {
    setSelectedProduct(product);
    setTransactionStep(1);
    setNegotiationPrice(product.price);
  };

  const closeSidebar = () => {
    setSelectedProduct(null);
    setTransactionStep(1);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 relative">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Marketplace</h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Premium B2B commodity trading ecosystem.</p>
        </div>
        <div className="flex bg-white shadow-sm border border-gray-100 p-1.5 rounded-xl">
           <button 
             onClick={() => setActiveTab('MARKET')}
             className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'MARKET' ? 'bg-[#1B4D1B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
           >
              Spot Market
           </button>
           <button 
             onClick={() => setActiveTab('MATCHMAKING')}
             className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'MATCHMAKING' ? 'bg-[#1B4D1B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
           >
              Smart Match
           </button>
        </div>
      </div>

      {activeTab === 'MARKET' ? (
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Filters */}
           <aside className="lg:w-1/4 space-y-6 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Quality Grade</h4>
                 <div className="space-y-2">
                    <FilterItem label="Grade A (Premium)" count={242} active />
                    <FilterItem label="Grade B (Standard)" count={1120} />
                    <FilterItem label="Grade C (Industrial)" count={840} />
                 </div>
                 
                 <div className="h-px bg-gray-100 my-8"></div>
                 
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Category</h4>
                 <div className="space-y-2">
                    <FilterItem label="Hortikultura" count={124} />
                    <FilterItem label="Pangan" count={85} />
                    <FilterItem label="Perkebunan" count={64} />
                 </div>

                 <div className="h-px bg-gray-100 my-8"></div>
                 
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Logistics & Compliance</h4>
                 <div className="space-y-4">
                    <CheckboxSimple label="Cold Chain Delivery" checked />
                    <CheckboxSimple label="Export Standard" />
                    <CheckboxSimple label="Fair Trade Certified" />
                    <CheckboxSimple label="Carbon Neutral" />
                 </div>
              </div>
           </aside>

           {/* Product Grid */}
           <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {DUMMY_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-[#4A9E3F]/30 transition-all group flex flex-col justify-between">
                   <div className="relative">
                      <div className="absolute top-4 left-4 z-10 flex space-x-2">
                        <span className="text-[9px] font-bold px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#1B4D1B] rounded-md uppercase tracking-widest shadow-sm">Grade {product.grade}</span>
                        {product.coldChain && (
                           <span className="text-[9px] font-bold px-2.5 py-1 bg-blue-50/90 backdrop-blur-sm text-blue-600 rounded-md uppercase tracking-widest shadow-sm flex items-center gap-1">
                              <Thermometer size={10} weight="bold" /> Cold
                           </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm text-amber-500">
                         <Star size={12} weight="fill" />
                         <span className="text-[10px] font-bold text-gray-800">{product.rating}</span>
                      </div>
                      
                      <div className="w-full h-48 overflow-hidden bg-gray-100">
                         <img 
                           src={product.image} 
                           alt={product.name}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                         />
                      </div>
                   </div>
                   
                   <div className="p-5 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <h5 className="text-[15px] font-bold text-gray-900 leading-tight">{product.name}</h5>
                            <p className="text-[11px] text-gray-500 mt-1">{product.category}</p>
                         </div>
                      </div>
                      
                      <div className="mt-4 space-y-2 mb-6">
                         <div className="flex items-center text-xs text-gray-600">
                            <Storefront size={14} className="mr-2 text-[#4A9E3F]" />
                            {product.farmer}
                         </div>
                         <div className="flex items-center text-xs text-gray-600">
                            <MapPin size={14} className="mr-2 text-[#4A9E3F]" />
                            {product.location}
                         </div>
                         <div className="flex items-center text-xs text-gray-600">
                            <Cube size={14} className="mr-2 text-[#4A9E3F]" />
                            Stock: {product.volume}
                         </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                         <div>
                             <p className="text-lg font-bold text-[#1B4D1B]">Rp {product.price.toLocaleString('id-ID')}</p>
                             <p className="text-[10px] text-gray-400 font-medium">per kg</p>
                         </div>
                         <button 
                           onClick={() => handleBuyClick(product)}
                           className="px-4 py-2 rounded-xl bg-[#1B4D1B] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#133813] transition-colors shadow-md shadow-[#1B4D1B]/20"
                         >
                            Order Now
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      ) : (
        /* Matchmaking UI */
        <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm animate-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto text-center">
           <div className="w-20 h-20 bg-gradient-to-br from-[#1B4D1B]/10 to-[#4A9E3F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1B4D1B]">
              <Cpu size={40} weight="duotone" />
           </div>
           <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Matchmaking</h3>
           <p className="text-sm text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">Our AI analyzes real-time market data, weather patterns, and logistics costs to find the optimal price for your commodity needs.</p>
           
           <div className="max-w-md mx-auto space-y-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div>
                 <h4 className="text-sm font-bold text-gray-900 mb-6">Target Price (IDR/kg)</h4>
                 <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Low: Rp 20.000</span>
                    <div className="text-3xl font-black text-[#1B4D1B] tracking-tight">Rp {price.toLocaleString('id-ID')}</div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">High: Rp 30.000</span>
                 </div>
                 
                 <input 
                   type="range" 
                   min="20000" 
                   max="30000" 
                   step="500"
                   value={price}
                   onChange={(e) => setPrice(parseInt(e.target.value))}
                   className="w-full h-2 bg-gray-200 rounded-full appearance-none outline-none cursor-pointer accent-[#1B4D1B]"
                 />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <button className="py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-colors">Save Request</button>
                 <button className="py-3 rounded-xl bg-[#1B4D1B] text-white font-bold text-sm hover:bg-[#133813] transition-colors shadow-lg shadow-[#1B4D1B]/20 flex items-center justify-center gap-2">
                    <Scales size={18} /> Publish
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Transaction Sidebar Drawer */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={closeSidebar}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Purchase Details</h2>
              <button onClick={closeSidebar} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Product Info */}
              <div className="flex gap-4">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-24 object-cover rounded-2xl" />
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-base">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedProduct.farmer} • {selectedProduct.location}</p>
                  <p className="text-sm font-bold text-[#1B4D1B] mt-2">Rp {selectedProduct.price.toLocaleString('id-ID')} / kg</p>
                </div>
              </div>

              {/* Steps Indicator */}
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-100 -z-10"></div>
                <div className="absolute left-0 right-1/2 top-1/2 h-0.5 bg-[#1B4D1B] -z-10 transition-all duration-500" style={{ width: transactionStep === 1 ? '0%' : '100%' }}></div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${transactionStep >= 1 ? 'bg-[#1B4D1B] border-[#1B4D1B] text-white' : 'bg-white border-gray-200 text-gray-400'}`}>1</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${transactionStep >= 2 ? 'bg-[#1B4D1B] border-[#1B4D1B] text-white' : 'bg-white border-gray-200 text-gray-400'}`}>2</div>
              </div>

              {transactionStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Order Form */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Order Quantity</label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1B4D1B] focus-within:ring-1 focus-within:ring-[#1B4D1B]">
                      <input type="number" defaultValue="100" className="w-full p-4 outline-none text-gray-900 font-semibold" />
                      <span className="px-4 text-gray-500 font-medium bg-gray-50 border-l border-gray-200 h-full flex items-center">kg</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Min. order: 50kg | Available: {selectedProduct.volume}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Offer Price (Negotiation)</label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1B4D1B] focus-within:ring-1 focus-within:ring-[#1B4D1B]">
                      <span className="px-4 text-gray-500 font-medium bg-gray-50 border-r border-gray-200 h-full flex items-center">Rp</span>
                      <input 
                        type="number" 
                        value={negotiationPrice} 
                        onChange={(e) => setNegotiationPrice(parseInt(e.target.value) || 0)}
                        className="w-full p-4 outline-none text-gray-900 font-semibold" 
                      />
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Logistics</label>
                    
                    <label className="flex items-start p-4 border-2 border-[#1B4D1B] bg-[#1B4D1B]/5 rounded-xl cursor-pointer">
                      <div className="mt-0.5">
                        <CheckCircle size={20} weight="fill" className="text-[#1B4D1B]" />
                      </div>
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-gray-900">Standard Freight</span>
                        <span className="block text-xs text-gray-500 mt-1">2-3 days delivery. Basic insurance included.</span>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border-2 border-gray-100 hover:border-gray-200 rounded-xl cursor-pointer transition-colors">
                      <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-gray-900 flex items-center gap-2">Cold Chain <Thermometer size={14} className="text-blue-500" /></span>
                        <span className="block text-xs text-gray-500 mt-1">Temperature controlled. 1-2 days delivery.</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {transactionStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-[#1B4D1B]/5 rounded-2xl p-6 border border-[#1B4D1B]/10">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-[#1B4D1B] mx-auto mb-4 shadow-sm">
                      <ShieldCheck size={24} weight="fill" />
                    </div>
                    <h3 className="text-center font-bold text-gray-900 text-lg mb-1">Contract Summary</h3>
                    <p className="text-center text-sm text-gray-500 mb-6">Review your order details before confirming</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Commodity</span>
                        <span className="font-semibold text-gray-900">{selectedProduct.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Agreed Price</span>
                        <span className="font-semibold text-gray-900">Rp {negotiationPrice.toLocaleString('id-ID')}/kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Quantity</span>
                        <span className="font-semibold text-gray-900">100 kg</span>
                      </div>
                      <div className="h-px bg-[#1B4D1B]/10 my-2"></div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-semibold text-gray-900">Rp {(negotiationPrice * 100).toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Platform Fee (1.5%)</span>
                        <span className="font-semibold text-gray-900">Rp {(negotiationPrice * 100 * 0.015).toLocaleString('id-ID')}</span>
                      </div>
                      <div className="h-px bg-[#1B4D1B]/10 my-2"></div>
                      <div className="flex justify-between text-base font-bold">
                        <span className="text-gray-900">Total Est.</span>
                        <span className="text-[#1B4D1B]">Rp {(negotiationPrice * 100 * 1.015).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-800">
                    <Handshake size={24} className="flex-shrink-0" />
                    <p className="text-xs font-medium leading-relaxed">By confirming, you initiate a smart contract binding both parties. The funds will be held in escrow until delivery is verified.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {transactionStep === 1 ? (
                <button 
                  onClick={() => setTransactionStep(2)}
                  className="w-full py-4 rounded-xl bg-[#1B4D1B] text-white font-bold text-sm hover:bg-[#133813] transition-colors shadow-lg shadow-[#1B4D1B]/20 flex items-center justify-center gap-2"
                >
                  Review Order <ArrowRight size={16} weight="bold" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setTransactionStep(1)}
                    className="w-1/3 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 hover:bg-white transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      alert('Order confirmed! Moving to smart contract escrow.');
                      closeSidebar();
                    }}
                    className="w-2/3 py-4 rounded-xl bg-[#1B4D1B] text-white font-bold text-sm hover:bg-[#133813] transition-colors shadow-lg shadow-[#1B4D1B]/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} weight="bold" /> Confirm Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterItem({ label, count, active }: { label: string, count: number, active?: boolean }) {
  return (
    <button className={`w-full flex justify-between items-center p-3 rounded-xl transition-all ${active ? 'bg-[#1B4D1B]/5 text-[#1B4D1B] font-bold border border-[#1B4D1B]/10' : 'text-gray-500 hover:bg-gray-50 border border-transparent'}`}>
       <span className="text-xs uppercase tracking-wider">{label}</span>
       <span className={`text-[10px] font-bold ${active ? 'opacity-100' : 'opacity-40'}`}>{count}</span>
    </button>
  );
}

function CheckboxSimple({ label, checked }: { label: string, checked?: boolean }) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
       <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-all ${checked ? 'bg-[#1B4D1B] border-[#1B4D1B]' : 'border border-gray-300 group-hover:border-[#1B4D1B]'}`}>
          {checked && <CheckCircle size={12} weight="fill" className="text-white" />}
       </div>
       <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    </label>
  );
}
