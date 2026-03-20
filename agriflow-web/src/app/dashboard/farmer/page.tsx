"use client";

import React, { useState } from 'react';
import { 
  House, 
  Handshake, 
  Scan, 
  Wallet, 
  User, 
  Bell, 
  CaretRight,
  ChartLineUp,
  Package,
  Camera,
  Truck,
  Warning,
  CloudRain,
  CheckCircle,
  Microphone,
  Thermometer,
  Plant,
  ArrowUpRight,
  ArrowRight,
  Globe,
  Video,
  Question,
  CloudArrowUp
} from '@phosphor-icons/react';
import Link from 'next/link';

type Tab = 'BERANDA' | 'JUAL' | 'DETEKSI' | 'DOMPET' | 'PROFIL';

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('BERANDA');

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Mobile-Style Container */}
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'BERANDA' && <BerandaTab setActiveTab={setActiveTab} />}
          {activeTab === 'JUAL' && <JualTab setActiveTab={setActiveTab} />}
          {activeTab === 'DETEKSI' && <DeteksiTab />}
          {activeTab === 'DOMPET' && <DompetTab />}
          {activeTab === 'PROFIL' && <ProfilTab />}
        </div>

        {/* Bottom Navigation Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 max-w-md mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[32px]">
           <TabButton active={activeTab === 'BERANDA'} onClick={() => setActiveTab('BERANDA')} icon={House} label="Beranda" />
           <TabButton active={activeTab === 'JUAL'} onClick={() => setActiveTab('JUAL')} icon={Handshake} label="Jual" />
           <TabButton active={activeTab === 'DETEKSI'} onClick={() => setActiveTab('DETEKSI')} icon={Scan} label="AI" />
           <TabButton active={activeTab === 'DOMPET'} onClick={() => setActiveTab('DOMPET')} icon={Wallet} label="Dompet" />
           <TabButton active={activeTab === 'PROFIL'} onClick={() => setActiveTab('PROFIL')} icon={User} label="Profil" />
        </div>
      </div>
    </div>
  );
}

function BerandaTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       {/* Header */}
       <div className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 bg-slate-100 rounded-full border-2 border-white shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div>
                <div className="flex items-center space-x-2 mb-1">
                   <p className="text-[9px] font-black text-slate-400">Halo,</p>
                   <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-emerald-50 rounded-md border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">Synced & Offline Ready</span>
                   </div>
                </div>
                <h2 className="text-xl font-black text-stripe-indigo leading-none">Pak Slamet! 👋</h2>
             </div>
          </div>
          <div className="relative">
             <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
                <Bell size={24} />
             </div>
             <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full"></div>
          </div>
       </div>

       {/* AgriScore Badge */}
        <Link href="/dashboard/score">
           <div className="bg-gradient-to-br from-stripe-indigo to-stripe-violet p-6 rounded-[32px] text-white shadow-2xl shadow-stripe-indigo/20 mb-10 flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">AgriScore Rating</p>
                 <div className="flex items-center space-x-2">
                    <span className="text-4xl font-black tracking-tighter">782</span>
                    <div className="px-2 py-1 bg-white/20 rounded-lg">
                       <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Ahli ✦</span>
                    </div>
                 </div>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform">
                 <ChartLineUp size={32} weight="fill" className="text-stripe-emerald" />
              </div>
           </div>
        </Link>

       {/* Hero Price Card */}
       <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm mb-10 group hover:border-stripe-emerald/30 transition-all">
          <div className="flex justify-between items-start mb-6">
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Harga Cabai Keriting Hari Ini</p>
             <span className="text-[10px] font-black text-stripe-emerald bg-stripe-emerald/5 px-3 py-1.5 rounded-full uppercase tracking-widest">▲ 12.4%</span>
          </div>
          <div className="flex items-end space-x-2 mb-8">
             <h3 className="text-5xl font-black text-stripe-indigo tracking-tighter">Rp 24.500</h3>
             <span className="text-lg font-bold text-slate-400 mb-1.5">/kg</span>
          </div>
          <button className="w-full bg-slate-50 py-4 rounded-2xl flex items-center justify-center space-x-3 group-hover:bg-stripe-indigo group-hover:text-white transition-all">
             <span className="text-xs font-black uppercase tracking-widest">Lihat Prediksi 2 Minggu</span>
             <CaretRight size={14} weight="bold" />
          </button>
       </div>

       {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-6 mb-10">
           <QuickAction icon={Package} label="Lapor Stok" color="bg-orange-500" onClick={() => setActiveTab('JUAL')} />
           <Link href="/dashboard/marketplace" className="w-full">
              <QuickAction icon={Handshake} label="Cari Pembeli" color="bg-stripe-indigo" />
           </Link>
           <Link href="/dashboard/disease" className="w-full">
              <QuickAction icon={Camera} label="Foto Panen" color="bg-stripe-emerald" />
           </Link>
           <Link href="/dashboard/logistics" className="w-full">
              <QuickAction icon={Truck} label="Lacak Kiriman" color="bg-stripe-violet" />
           </Link>
        </div>

       {/* Alert Section */}
        <div className="space-y-4 mb-10">
           <Link href="/dashboard/marketplace">
              <AlertCard 
                type="SURPLUS" 
                icon={Warning} 
                title="Surplus Cabai Terdeteksi!" 
                desc="Harga berisiko turun di wilayah Kediri. Ketuk untuk segera cari pembeli." 
                color="bg-amber-400"
              />
           </Link>
        </div>

       {/* Bantuan & Tutorial Section */}
       <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
             <h4 className="text-lg font-black text-stripe-indigo tracking-tight">Bantuan & Panduan</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-all">
                <Video size={28} weight="fill" className="text-stripe-indigo mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest">Tutorial Voice</span>
             </div>
             <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-all">
                <Question size={28} weight="fill" className="text-stripe-emerald mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest">Tanya Ahli AI</span>
             </div>
          </div>
       </div>

       {/* Recent Transactions */}
       <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-black text-stripe-indigo tracking-tight">Transaksi Terakhir</h4>
          <button className="text-xs font-black text-stripe-indigo uppercase tracking-widest">Lihat Semua</button>
       </div>
       <div className="space-y-4">
          <TransactionRow buyer="Superindo Retail" product="Cabai Keriting • 250kg" status="Dana Cair" amount="Rp 6.125.000" color="text-stripe-emerald" />
       </div>
    </div>
  );
}

function JualTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  const [subPage, setSubPage] = useState<'INPUT' | 'MATCH' | 'LOGISTICS'>('INPUT');

  return (
    <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="flex space-x-4 mb-10 bg-slate-50 p-1.5 rounded-2xl">
          <button onClick={() => setSubPage('INPUT')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${subPage === 'INPUT' ? 'bg-white shadow-sm text-stripe-indigo' : 'text-slate-400'}`}>Lapor Stok</button>
          <button onClick={() => setSubPage('MATCH')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${subPage === 'MATCH' ? 'bg-white shadow-sm text-stripe-indigo' : 'text-slate-400'}`}>Cari Pembeli</button>
          <button onClick={() => setSubPage('LOGISTICS')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${subPage === 'LOGISTICS' ? 'bg-white shadow-sm text-stripe-indigo' : 'text-slate-400'}`}>Logistik</button>
       </div>

       {subPage === 'INPUT' && (
         <div className="animate-in slide-in-from-bottom-4">
            <h3 className="text-2xl font-black text-stripe-indigo mb-2 tracking-tight">Lapor Stok Panen</h3>
            <p className="text-sm font-bold text-slate-400 mb-8">Pilih metode input stok Anda.</p>
            
            <button className="w-full h-40 bg-stripe-indigo text-white rounded-[32px] mb-8 flex flex-col items-center justify-center space-y-4 shadow-2xl shadow-stripe-indigo/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                  <Microphone size={32} weight="fill" />
               </div>
               <span className="text-lg font-black tracking-tight">Gunakan Suara (AI Voice)</span>
               <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-center px-12 italic">"Saya punya cabai dua kwintal harga lima ribu per kilo..."</span>
            </button>

            <div className="relative mb-8 text-center px-12">
               <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10"></div>
               <span className="bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Offline Mode Ready</span>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-50 p-6 rounded-3xl">
                  <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest mb-2 opacity-60">Komoditas</p>
                  <select className="w-full bg-transparent font-black text-lg focus:outline-none appearance-none">
                     <option>Cabai Keriting</option>
                     <option>Jagung Hibrida</option>
                  </select>
               </div>
               <div className="flex gap-4">
                  <div className="flex-[2] bg-slate-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest mb-2 opacity-60">Volume</p>
                    <input type="number" placeholder="0" className="w-full bg-transparent font-black text-xl focus:outline-none" />
                  </div>
                  <div className="flex-1 bg-slate-50 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest mb-2 opacity-60">Satuan</p>
                    <span className="font-black text-lg text-stripe-indigo">KWINTAL</span>
                  </div>
               </div>
               <button className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-black transition-all flex items-center justify-center space-x-3">
                  <CloudArrowUp size={24} weight="bold" />
                  <span>Simpan Laporan</span>
               </button>
            </div>
         </div>
       )}
    </div>
  );
}

function DeteksiTab() {
  return (
    <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
       <h3 className="text-2xl font-black text-stripe-indigo mb-2 tracking-tight">Deteksi AI Penyakit</h3>
       <p className="text-sm font-bold text-slate-400 mb-12 capitalize">Fungsi Berjalan Offline • GeoAI Edge</p>
       
       <div className="w-full aspect-[4/5] bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 mb-10 overflow-hidden relative group">
          <Camera size={80} weight="fill" className="text-slate-100 group-hover:scale-110 transition-transform duration-700" />
          <p className="text-slate-300 font-bold mt-8">Ambil Foto Daun / Batang yang Sakit</p>
          <button className="absolute bottom-8 left-8 right-8 bg-stripe-indigo text-white py-5 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center space-x-3">
             <Camera size={24} weight="bold" />
             <span>Buka Kamera AI</span>
          </button>
       </div>

       <div className="bg-stripe-emerald/5 p-8 rounded-[32px] border border-stripe-emerald/10 text-left">
          <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 bg-stripe-emerald/20 rounded-xl flex items-center justify-center text-stripe-emerald">
                <Plant size={24} weight="fill" />
             </div>
             <h4 className="font-black text-stripe-indigo">Rekomendasi Tanam</h4>
          </div>
          <p className="text-[13px] font-bold text-stripe-slate opacity-70 leading-relaxed mb-6">
             Berdasarkan profil lahan Anda, bulan depan paling optimal menanam **Jagung Manis**. Prediksi harga panen stabil di Rp 6.200/kg.
          </p>
       </div>
    </div>
  );
}

function DompetTab() {
  return (
    <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="bg-white border border-slate-100 p-8 rounded-[48px] shadow-sm mb-10 text-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-stripe-emerald/5 rounded-full blur-3xl"></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">AgriWallet Balance</p>
          <div className="flex items-center justify-center space-x-3 mb-10">
             <span className="text-2xl font-black text-slate-300">Rp</span>
             <h2 className="text-5xl font-black text-stripe-indigo tracking-tighter">8.472.000</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <button className="bg-stripe-indigo text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-stripe-indigo/10">Tarik Dana</button>
          </div>
       </div>

       <div className="space-y-8">
          {/* Insurance Gauge */}
          <div>
              <div className="flex justify-between items-center mb-4">
                 <h4 className="font-black text-stripe-indigo">Geo-Insurance Proteksi</h4>
                 <div className="w-12 h-6 bg-stripe-emerald rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                 </div>
              </div>
          <Link href="/dashboard/insurance">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] flex items-center justify-between hover:shadow-xl hover:border-stripe-indigo/20 transition-all cursor-pointer">
                 <div className="text-center flex-1 border-r border-slate-50">
                    <Thermometer size={24} className="mx-auto mb-2 text-rose-500" weight="fill" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Suhu Lahan</p>
                    <p className="text-lg font-black text-stripe-indigo">32°C</p>
                 </div>
                 <div className="text-center flex-1">
                    <CloudRain size={24} className="mx-auto mb-2 text-stripe-indigo" weight="fill" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Curah Hujan</p>
                    <p className="text-lg font-black text-stripe-indigo">12mm</p>
                 </div>
                 <div className="text-center flex-1 border-l border-slate-50">
                    <CheckCircle size={24} className="mx-auto mb-2 text-stripe-emerald" weight="fill" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-lg font-black text-stripe-emerald">AMAN</p>
                 </div>
              </div>
          </Link>
          </div>
       </div>
    </div>
  );
}

function ProfilTab() {
  return (
    <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="text-center mb-12 pt-8">
          <div className="w-28 h-28 bg-slate-50 rounded-full mx-auto mb-6 border-4 border-white shadow-xl overflow-hidden relative group">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-black text-stripe-indigo tracking-tight">Slamet Raharjo</h2>
          <p className="text-sm font-bold text-slate-400">Petani Kediri • Sejak Mar 2024</p>
       </div>

       <div className="space-y-4">
          <ProfilAction icon={User} label="Edit Profil" />
          <ProfilAction icon={Bell} label="Pengaturan Notifikasi" />
          <ProfilAction icon={Globe} label="Export Ready Portal" badge="New" />
          <ProfilAction icon={Truck} label="Daftar Kendaraan" />
       </div>
    </div>
  );
}

function TabButton({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center space-y-1.5 min-w-[64px] group">
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-stripe-indigo text-white shadow-xl shadow-stripe-indigo/20 -translate-y-1' : 'text-slate-300 group-hover:bg-slate-50 group-hover:text-slate-500'}`}>
          <Icon size={24} weight={active ? "fill" : "bold"} />
       </div>
       <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${active ? 'text-stripe-indigo' : 'text-slate-300'}`}>{label}</span>
    </button>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex flex-col items-center p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-white hover:border-stripe-indigo/20 hover:shadow-xl transition-all group">
       <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon size={24} weight="bold" />
       </div>
       <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest text-center">{label}</span>
    </button>
  );
}

function AlertCard({ type, icon: Icon, title, desc, color }: { type: string, icon: any, title: string, desc: string, color: string }) {
  return (
    <div className={`p-5 rounded-[28px] ${color} text-white shadow-lg flex items-start space-x-4 group cursor-pointer hover:scale-[1.02] transition-all`}>
       <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/10 mt-1">
          <Icon size={22} weight="fill" />
       </div>
       <div>
          <h4 className="font-black text-sm tracking-tight mb-1">{title}</h4>
          <p className="text-[11px] font-bold opacity-80 leading-relaxed">{desc}</p>
       </div>
       <div className="ml-auto opacity-40">
          <CaretRight size={16} weight="bold" />
       </div>
    </div>
  );
}

function TransactionRow({ buyer, product, status, amount, color }: { buyer: string, product: string, status: string, amount: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-all">
       <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
             <Handshake size={20} className="text-slate-300" />
          </div>
          <div>
             <h5 className="text-[13px] font-black text-stripe-indigo leading-none mb-1">{buyer}</h5>
             <p className="text-[10px] font-bold text-slate-400">{product}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${color}`}>{status}</p>
          <p className="text-sm font-black text-stripe-indigo tracking-tight">{amount}</p>
       </div>
    </div>
  );
}

function ProfilAction({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
   return (
      <button className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white transition-all">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
               <Icon size={22} weight="bold" />
            </div>
            <span className="text-sm font-black text-stripe-indigo">{label}</span>
         </div>
         <div className="flex items-center space-x-3">
            {badge && <span className="bg-stripe-emerald text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{badge}</span>}
            <CaretRight size={16} weight="bold" className="text-slate-300" />
         </div>
      </button>
   );
}
