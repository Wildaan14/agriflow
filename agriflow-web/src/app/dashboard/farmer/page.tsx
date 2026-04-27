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
    <div className="space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-[#4A9E3F]/20">Farmer Command Center — ONLINE</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-[#1B4D1B]">Selamat Datang, <span className="text-[#4A9E3F]">Pak Slamet!</span> 👋</h1>
           <p className="text-[#1A2E1A]/50 font-medium text-sm lg:text-base leading-relaxed">Kelola stok panen, pantau harga pasar, dan akses asuransi dalam satu pusat kendali.</p>
        </div>
        <div className="flex bg-[#1B4D1B]/5 p-1.5 rounded-2xl border border-[#C7E0B0]/50 overflow-x-auto w-full lg:w-auto shrink-0">
           {(['BERANDA', 'JUAL', 'DETEKSI', 'DOMPET', 'PROFIL'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t as Tab)}
               className={`flex-1 lg:flex-none px-6 lg:px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === t ? 'bg-[#1B4D1B] text-white shadow-lg' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
             >
               {t === 'DETEKSI' ? 'AI DETECT' : t}
             </button>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
          {activeTab === 'BERANDA' && <BerandaTab setActiveTab={setActiveTab} />}
          {activeTab === 'JUAL' && <JualTab setActiveTab={setActiveTab} />}
          {activeTab === 'DETEKSI' && <DeteksiTab />}
          {activeTab === 'DOMPET' && <DompetTab />}
          {activeTab === 'PROFIL' && <ProfilTab />}
      </div>
    </div>
  );
}

function BerandaTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className="p-6 animate-in slide-in-from-bottom-4 duration-500">
       {/* Header */}
       <div className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 bg-white rounded-full border-2 border-[#C7E0B0] shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div>
                <div className="flex items-center space-x-2 mb-1">
                   <p className="text-[9px] font-bold text-[#1A2E1A]/50">Halo,</p>
                   <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-[#4A9E3F]/10 rounded-md border border-[#4A9E3F]/20 cursor-pointer hover:bg-[#4A9E3F]/20 transition-colors">
                      <div className="w-1.5 h-1.5 bg-[#4A9E3F] rounded-full animate-pulse"></div>
                      <span className="text-[7px] font-bold text-[#4A9E3F] uppercase tracking-widest">Synced & Offline Ready</span>
                   </div>
                </div>
                <h2 className="text-xl font-semibold text-[#1B4D1B] leading-none">Pak Slamet! 👋</h2>
             </div>
          </div>
          <div className="relative">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1B4D1B]/70 border border-[#C7E0B0] hover:text-[#1B4D1B] transition-colors cursor-pointer shadow-sm">
                <Bell size={24} />
             </div>
             <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full"></div>
          </div>
       </div>

       {/* AgriScore Badge */}
        <Link href="/dashboard/score" className="block">
           <div className="bg-[#4A9E3F]/10 border border-[#4A9E3F]/30 p-6 rounded-[32px] text-[#1B4D1B] shadow-sm mb-10 flex items-center justify-between group cursor-pointer hover:shadow-lg transition-all">
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A9E3F] mb-1">AgriScore Rating</p>
                 <div className="flex items-center space-x-2">
                    <span className="text-4xl font-bold tracking-tighter">782</span>
                    <div className="px-2 py-1 bg-[#4A9E3F] text-white rounded-lg">
                       <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Ahli ✦</span>
                    </div>
                 </div>
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-[#C7E0B0] group-hover:border-[#4A9E3F]/50 transition-colors shadow-sm">
                 <ChartLineUp size={32} weight="fill" className="text-[#4A9E3F]" />
              </div>
           </div>
        </Link>

       {/* Hero Price Card */}
       <div className="bg-white/60 border border-[#C7E0B0] p-8 rounded-[40px] shadow-sm mb-10 group hover:border-[#4A9E3F]/30 transition-all relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A9E3F]/5 blur-2xl rounded-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
             <p className="text-[11px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest leading-none">Harga Cabai Keriting Hari Ini</p>
             <span className="text-[10px] font-bold text-[#4A9E3F] bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 px-3 py-1.5 rounded-full uppercase tracking-widest">▲ 12.4%</span>
          </div>
          <div className="flex items-end space-x-2 mb-8 relative z-10">
             <h3 className="text-4xl font-bold text-[#1B4D1B] tracking-tighter">Rp 24.500</h3>
             <span className="text-lg font-medium text-[#1A2E1A]/40 mb-1.5">/kg</span>
          </div>
          <button className="w-full bg-[#1B4D1B]/5 border border-[#C7E0B0] py-4 rounded-2xl flex items-center justify-center text-[#1B4D1B] space-x-3 hover:bg-[#1B4D1B] hover:text-white transition-all relative z-10 font-bold uppercase tracking-widest text-[10px]">
             <span>Lihat Prediksi 2 Minggu</span>
             <CaretRight size={14} weight="bold" />
          </button>
       </div>

       {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
           <QuickAction icon={Package} label="Lapor Stok" color="bg-amber-500/10 text-amber-600 border-amber-500/20" onClick={() => setActiveTab('JUAL')} />
           <Link href="/dashboard/marketplace" className="w-full block">
              <QuickAction icon={Handshake} label="Cari Pembeli" color="bg-[#0D7A6B]/10 text-[#0D7A6B] border-[#0D7A6B]/20" />
           </Link>
           <Link href="/dashboard/disease" className="w-full block">
              <QuickAction icon={Camera} label="Foto Panen" color="bg-[#4A9E3F]/10 text-[#4A9E3F] border-[#4A9E3F]/20" />
           </Link>
           <Link href="/dashboard/logistics" className="w-full block">
              <QuickAction icon={Truck} label="Lacak Kiriman" color="bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20" />
           </Link>
        </div>

       {/* Alert Section */}
        <div className="space-y-4 mb-10">
           <Link href="/dashboard/marketplace" className="block">
              <AlertCard 
                type="SURPLUS" 
                icon={Warning} 
                title="Surplus Cabai Terdeteksi!" 
                desc="Harga berisiko turun di wilayah Kediri. Ketuk untuk segera cari pembeli." 
                color="bg-amber-500/10 border border-amber-500/20"
                iconColor="text-amber-600"
              />
           </Link>
        </div>

       {/* Bantuan & Tutorial Section */}
       <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
             <h4 className="text-lg font-semibold text-[#1B4D1B] tracking-tight">Bantuan & Panduan</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-white/60 rounded-3xl border border-[#C7E0B0] flex flex-col items-center text-center group cursor-pointer hover:bg-white hover:border-[#4A9E3F]/30 transition-all shadow-sm">
                <Video size={28} weight="fill" className="text-[#0D7A6B] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-[#1A2E1A]/70 uppercase tracking-widest">Tutorial Voice</span>
             </div>
             <div className="p-5 bg-white/60 rounded-3xl border border-[#C7E0B0] flex flex-col items-center text-center group cursor-pointer hover:bg-white hover:border-[#4A9E3F]/30 transition-all shadow-sm">
                <Question size={28} weight="fill" className="text-[#4A9E3F] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-[#1A2E1A]/70 uppercase tracking-widest">Tanya Ahli AI</span>
             </div>
          </div>
       </div>

       {/* Recent Transactions */}
       <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold text-[#1B4D1B] tracking-tight">Transaksi Terakhir</h4>
          <button className="text-xs font-bold text-[#4A9E3F] uppercase tracking-widest">Lihat Semua</button>
       </div>
       <div className="space-y-4">
          <TransactionRow buyer="Superindo Retail" product="Cabai Keriting • 250kg" status="Dana Cair" amount="Rp 6.125.000" statusColor="text-[#4A9E3F]" />
       </div>
    </div>
  );
}

function JualTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  const [subPage, setSubPage] = useState<'INPUT' | 'MATCH' | 'LOGISTICS'>('INPUT');

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-500">
       <div className="flex space-x-2 mb-10 bg-[#1B4D1B]/5 p-1.5 rounded-2xl border border-[#C7E0B0]">
          <button onClick={() => setSubPage('INPUT')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subPage === 'INPUT' ? 'bg-[#1B4D1B] text-white shadow-sm' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}>Lapor Stok</button>
          <button onClick={() => setSubPage('MATCH')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subPage === 'MATCH' ? 'bg-[#1B4D1B] text-white shadow-sm' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}>Cari Pembeli</button>
          <button onClick={() => setSubPage('LOGISTICS')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subPage === 'LOGISTICS' ? 'bg-[#1B4D1B] text-white shadow-sm' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}>Logistik</button>
       </div>

       {subPage === 'INPUT' && (
         <div className="animate-in slide-in-from-bottom-4">
            <h3 className="text-2xl font-semibold text-[#1B4D1B] mb-2 tracking-tight">Lapor Stok Panen</h3>
            <p className="text-sm font-medium text-[#1A2E1A]/50 mb-8">Pilih metode input stok Anda.</p>
            
            <button className="w-full h-40 bg-white/60 border border-[#C7E0B0] text-[#1B4D1B] rounded-[32px] mb-8 flex flex-col items-center justify-center space-y-4 hover:border-[#4A9E3F]/50 transition-all relative overflow-hidden group shadow-sm">
               <div className="absolute inset-0 bg-[#4A9E3F]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-16 h-16 bg-[#4A9E3F]/10 rounded-2xl flex items-center justify-center animate-pulse text-[#4A9E3F]">
                  <Microphone size={32} weight="fill" />
               </div>
               <span className="text-lg font-semibold tracking-tight">Gunakan Suara (AI Voice)</span>
               <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest text-center px-12 italic">"Saya punya cabai dua kwintal harga lima ribu per kilo..."</span>
            </button>

            <div className="relative mb-8 text-center px-12">
               <div className="absolute top-1/2 left-0 w-full h-px bg-[#C7E0B0] -z-10"></div>
               <span className="bg-[#F4FAF0] px-4 text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Offline Mode Ready</span>
            </div>

            <div className="space-y-4">
               <div className="bg-white/60 border border-[#C7E0B0] p-6 rounded-3xl shadow-sm">
                  <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-2">Komoditas</p>
                  <select className="w-full bg-transparent font-semibold text-lg text-[#1B4D1B] focus:outline-none appearance-none">
                     <option>Cabai Keriting</option>
                     <option>Jagung Hibrida</option>
                  </select>
               </div>
               <div className="flex gap-4">
                  <div className="flex-[2] bg-white/60 border border-[#C7E0B0] p-6 rounded-3xl shadow-sm">
                    <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-2">Volume</p>
                    <input type="number" placeholder="0" className="w-full bg-transparent font-semibold text-xl text-[#1B4D1B] focus:outline-none placeholder:text-[#1A2E1A]/20" />
                  </div>
                  <div className="flex-1 bg-white/60 border border-[#C7E0B0] p-6 rounded-3xl shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-2">Satuan</p>
                    <span className="font-bold text-lg text-[#4A9E3F]">KWINTAL</span>
                  </div>
               </div>
               <button className="w-full bg-[#1B4D1B] text-white mt-4 py-6 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all flex items-center justify-center space-x-3">
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
    <div className="p-6 animate-in slide-in-from-right-4 duration-500 text-center">
       <h3 className="text-2xl font-semibold text-[#1B4D1B] mb-2 tracking-tight">Deteksi AI Penyakit</h3>
       <p className="text-sm font-medium text-[#1A2E1A]/50 mb-12 capitalize">Fungsi Berjalan Offline • GeoAI Edge</p>
       
       <div className="w-full aspect-[4/5] bg-white/60 rounded-[48px] border-2 border-dashed border-[#C7E0B0] flex flex-col items-center justify-center p-12 mb-10 overflow-hidden relative group shadow-sm">
          <Camera size={80} weight="fill" className="text-[#1B4D1B]/10 group-hover:text-[#4A9E3F]/20 group-hover:scale-110 transition-all duration-700" />
          <p className="text-[#1A2E1A]/40 font-bold mt-8">Ambil Foto Daun / Batang yang Sakit</p>
          <button className="absolute bottom-8 left-8 right-8 bg-[#1B4D1B] text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 hover:bg-[#1B4D1B]/90 transition-all">
             <Camera size={20} weight="bold" />
             <span>Buka Kamera AI</span>
          </button>
       </div>

       <div className="bg-[#4A9E3F]/10 p-8 rounded-[32px] border border-[#4A9E3F]/20 text-left">
          <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 bg-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F]">
                <Plant size={24} weight="fill" />
             </div>
             <h4 className="font-semibold text-[#1B4D1B]">Rekomendasi Tanam</h4>
          </div>
          <p className="text-[13px] font-medium text-[#1A2E1A]/70 leading-relaxed">
             Berdasarkan profil lahan Anda, bulan depan paling optimal menanam <strong className="text-[#1B4D1B]">Jagung Manis</strong>. Prediksi harga panen stabil di Rp 6.200/kg.
          </p>
       </div>
    </div>
  );
}

function DompetTab() {
  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-500">
       <div className="bg-white/60 border border-[#C7E0B0] p-8 rounded-[48px] shadow-sm mb-10 text-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4A9E3F]/10 rounded-full blur-[50px] pointer-events-none"></div>
          <p className="text-xs font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-4">AgriWallet Balance</p>
          <div className="flex items-center justify-center space-x-3 mb-10 relative z-10">
             <span className="text-2xl font-bold text-[#1A2E1A]/50">Rp</span>
             <h2 className="text-4xl font-bold text-[#1B4D1B] tracking-tighter">8.472.000</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 relative z-10">
             <button className="bg-[#1B4D1B] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all">Tarik Dana</button>
          </div>
       </div>

       <div className="space-y-8">
          {/* Insurance Gauge */}
          <div>
              <div className="flex justify-between items-center mb-4">
                 <h4 className="font-semibold text-[#1B4D1B]">Geo-Insurance Proteksi</h4>
                 <div className="w-12 h-6 bg-[#4A9E3F]/20 border border-[#4A9E3F]/50 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3.5 h-3.5 bg-[#4A9E3F] rounded-full shadow-sm"></div>
                 </div>
              </div>
          <Link href="/dashboard/insurance" className="block">
              <div className="bg-white/60 border border-[#C7E0B0] p-8 rounded-[32px] flex items-center justify-between hover:border-[#4A9E3F]/30 hover:bg-white transition-all cursor-pointer shadow-sm">
                 <div className="text-center flex-1 border-r border-[#C7E0B0]">
                    <Thermometer size={24} className="mx-auto mb-2 text-rose-500" weight="fill" />
                    <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">Suhu Lahan</p>
                    <p className="text-lg font-bold text-[#1B4D1B]">32°C</p>
                 </div>
                 <div className="text-center flex-1">
                    <CloudRain size={24} className="mx-auto mb-2 text-[#0D7A6B]" weight="fill" />
                    <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">Curah Hujan</p>
                    <p className="text-lg font-bold text-[#1B4D1B]">12mm</p>
                 </div>
                 <div className="text-center flex-1 border-l border-[#C7E0B0]">
                    <CheckCircle size={24} className="mx-auto mb-2 text-[#4A9E3F]" weight="fill" />
                    <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-lg font-bold text-[#4A9E3F]">AMAN</p>
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
    <div className="p-6 animate-in slide-in-from-right-4 duration-500">
       <div className="text-center mb-12 pt-8">
          <div className="w-28 h-28 bg-white rounded-full mx-auto mb-6 border-4 border-[#C7E0B0] shadow-xl overflow-hidden relative group">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-semibold text-[#1B4D1B] tracking-tight mb-1">Slamet Raharjo</h2>
          <p className="text-xs font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Petani Kediri • Sejak Mar 2024</p>
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

function QuickAction({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex flex-col items-center p-6 bg-white/60 rounded-[32px] border border-[#C7E0B0] hover:bg-white hover:border-[#4A9E3F]/30 transition-all group outline-none shadow-sm">
       <div className={`w-12 h-12 ${color} border rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon size={24} weight="fill" />
       </div>
       <span className="text-[10px] font-bold text-[#1A2E1A]/70 uppercase tracking-widest text-center">{label}</span>
    </button>
  );
}

function AlertCard({ type, icon: Icon, title, desc, color, iconColor }: { type: string, icon: any, title: string, desc: string, color: string, iconColor: string }) {
  return (
    <div className={`p-5 rounded-[28px] ${color} text-[#1A2E1A] flex items-start space-x-4 group cursor-pointer hover:border-amber-500/50 transition-all shadow-sm`}>
       <div className={`w-10 h-10 bg-white/40 rounded-xl flex items-center justify-center mt-1 ${iconColor} border border-current/10 shadow-inner`}>
          <Icon size={22} weight="fill" />
       </div>
       <div>
          <h4 className="font-bold text-sm tracking-tight mb-1 text-[#1B4D1B]">{title}</h4>
          <p className="text-[11px] font-medium opacity-80 leading-relaxed">{desc}</p>
       </div>
       <div className="ml-auto opacity-40 group-hover:opacity-100 group-hover:text-amber-600 transition-colors mt-2">
          <CaretRight size={16} weight="bold" />
       </div>
    </div>
  );
}

function TransactionRow({ buyer, product, status, amount, statusColor }: { buyer: string, product: string, status: string, amount: string, statusColor: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-[#C7E0B0] hover:border-[#4A9E3F]/20 transition-all shadow-sm">
       <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#1B4D1B]/5 rounded-xl flex items-center justify-center text-[#1B4D1B]/50 border border-[#C7E0B0]">
             <Handshake size={20} />
          </div>
          <div>
             <h5 className="text-[13px] font-bold text-[#1B4D1B] leading-none mb-1.5">{buyer}</h5>
             <p className="text-[10px] font-medium text-[#1A2E1A]/40">{product}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${statusColor}`}>{status}</p>
          <p className="text-sm font-bold text-[#1B4D1B] tracking-tight">{amount}</p>
       </div>
    </div>
  );
}

function ProfilAction({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
   return (
      <button className="w-full flex items-center justify-between p-6 bg-white/60 rounded-3xl border border-[#C7E0B0] hover:bg-white hover:border-[#4A9E3F]/30 transition-all outline-none group shadow-sm">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#1B4D1B]/5 rounded-xl flex items-center justify-center text-[#1B4D1B]/60 group-hover:text-[#4A9E3F] transition-colors border border-[#C7E0B0]">
               <Icon size={22} weight="fill" />
            </div>
            <span className="text-sm font-bold text-[#1B4D1B]">{label}</span>
         </div>
         <div className="flex items-center space-x-3">
            {badge && <span className="bg-[#4A9E3F]/20 text-[#4A9E3F] border border-[#4A9E3F]/30 text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">{badge}</span>}
            <CaretRight size={16} weight="bold" className="text-[#1B4D1B]/30 group-hover:text-[#4A9E3F] transition-colors" />
         </div>
      </button>
   );
}
