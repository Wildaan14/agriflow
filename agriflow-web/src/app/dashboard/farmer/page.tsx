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
    <div className="min-h-screen bg-[#0A0D14] pb-32 flex justify-center text-white">
      {/* Mobile-Style Container */}
      <div className="w-full max-w-md min-h-screen bg-[#0A0D14] shadow-2xl relative overflow-hidden flex flex-col border-x border-white/[0.05]">
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {activeTab === 'BERANDA' && <BerandaTab setActiveTab={setActiveTab} />}
          {activeTab === 'JUAL' && <JualTab setActiveTab={setActiveTab} />}
          {activeTab === 'DETEKSI' && <DeteksiTab />}
          {activeTab === 'DOMPET' && <DompetTab />}
          {activeTab === 'PROFIL' && <ProfilTab />}
        </div>

        {/* Bottom Navigation Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0A0D14]/80 backdrop-blur-2xl border-t border-white/[0.05] px-6 py-4 flex justify-between items-center z-50 w-full max-w-md mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-t-[32px]">
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
    <div className="p-6 animate-in slide-in-from-bottom-4 duration-500">
       {/* Header */}
       <div className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 bg-white/[0.05] rounded-full border-2 border-[#14b850]/30 shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div>
                <div className="flex items-center space-x-2 mb-1">
                   <p className="text-[9px] font-bold text-white/50">Halo,</p>
                   <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-[#14b850]/10 rounded-md border border-[#14b850]/20 cursor-pointer hover:bg-[#14b850]/20 transition-colors">
                      <div className="w-1.5 h-1.5 bg-[#14b850] rounded-full animate-pulse"></div>
                      <span className="text-[7px] font-bold text-[#14b850] uppercase tracking-widest">Synced & Offline Ready</span>
                   </div>
                </div>
                <h2 className="text-xl font-semibold text-white leading-none">Pak Slamet! 👋</h2>
             </div>
          </div>
          <div className="relative">
             <div className="w-12 h-12 bg-white/[0.05] rounded-2xl flex items-center justify-center text-white/70 border border-white/[0.1] hover:text-white transition-colors cursor-pointer">
                <Bell size={24} />
             </div>
             <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#f43f5e] border-2 border-[#0A0D14] rounded-full"></div>
          </div>
       </div>

       {/* AgriScore Badge */}
        <Link href="/dashboard/score" className="block">
           <div className="bg-[#14b850]/10 border border-[#14b850]/30 p-6 rounded-[32px] text-white shadow-[0_0_20px_rgba(20,184,80,0.1)] mb-10 flex items-center justify-between group cursor-pointer hover:shadow-[0_0_30px_rgba(20,184,80,0.2)] transition-all">
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14b850] mb-1">AgriScore Rating</p>
                 <div className="flex items-center space-x-2">
                    <span className="text-4xl font-bold tracking-tighter">782</span>
                    <div className="px-2 py-1 bg-[#14b850] text-[#0A0D14] rounded-lg">
                       <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Ahli ✦</span>
                    </div>
                 </div>
              </div>
              <div className="w-16 h-16 bg-[#0A0D14] rounded-2xl flex items-center justify-center border border-white/[0.05] group-hover:border-[#14b850]/50 transition-colors">
                 <ChartLineUp size={32} weight="fill" className="text-[#14b850]" />
              </div>
           </div>
        </Link>

       {/* Hero Price Card */}
       <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[40px] shadow-sm mb-10 group hover:border-[#14b850]/30 transition-all relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#14b850]/5 blur-2xl rounded-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
             <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest leading-none">Harga Cabai Keriting Hari Ini</p>
             <span className="text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 border border-[#14b850]/20 px-3 py-1.5 rounded-full uppercase tracking-widest">▲ 12.4%</span>
          </div>
          <div className="flex items-end space-x-2 mb-8 relative z-10">
             <h3 className="text-4xl font-bold text-white tracking-tighter">Rp 24.500</h3>
             <span className="text-lg font-medium text-white/40 mb-1.5">/kg</span>
          </div>
          <button className="w-full bg-white/[0.05] border border-white/[0.1] py-4 rounded-2xl flex items-center justify-center space-x-3 group-hover:bg-[#14b850] group-hover:text-[#0A0D14] group-hover:border-[#14b850] transition-all relative z-10">
             <span className="text-xs font-bold uppercase tracking-widest">Lihat Prediksi 2 Minggu</span>
             <CaretRight size={14} weight="bold" />
          </button>
       </div>

       {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
           <QuickAction icon={Package} label="Lapor Stok" color="bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30" onClick={() => setActiveTab('JUAL')} />
           <Link href="/dashboard/marketplace" className="w-full block">
              <QuickAction icon={Handshake} label="Cari Pembeli" color="bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30" />
           </Link>
           <Link href="/dashboard/disease" className="w-full block">
              <QuickAction icon={Camera} label="Foto Panen" color="bg-[#14b850]/20 text-[#14b850] border-[#14b850]/30" />
           </Link>
           <Link href="/dashboard/logistics" className="w-full block">
              <QuickAction icon={Truck} label="Lacak Kiriman" color="bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/30" />
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
                color="bg-[#f59e0b]/20 border border-[#f59e0b]/30"
                iconColor="text-[#f59e0b]"
              />
           </Link>
        </div>

       {/* Bantuan & Tutorial Section */}
       <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
             <h4 className="text-lg font-semibold text-white tracking-tight">Bantuan & Panduan</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-white/[0.02] rounded-3xl border border-white/[0.05] flex flex-col items-center text-center group cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.1] transition-all">
                <Video size={28} weight="fill" className="text-[#0ea5e9] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Tutorial Voice</span>
             </div>
             <div className="p-5 bg-white/[0.02] rounded-3xl border border-white/[0.05] flex flex-col items-center text-center group cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.1] transition-all">
                <Question size={28} weight="fill" className="text-[#14b850] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Tanya Ahli AI</span>
             </div>
          </div>
       </div>

       {/* Recent Transactions */}
       <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold text-white tracking-tight">Transaksi Terakhir</h4>
          <button className="text-xs font-bold text-[#14b850] uppercase tracking-widest">Lihat Semua</button>
       </div>
       <div className="space-y-4">
          <TransactionRow buyer="Superindo Retail" product="Cabai Keriting • 250kg" status="Dana Cair" amount="Rp 6.125.000" statusColor="text-[#14b850]" />
       </div>
    </div>
  );
}

function JualTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  const [subPage, setSubPage] = useState<'INPUT' | 'MATCH' | 'LOGISTICS'>('INPUT');

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-500">
       <div className="flex space-x-2 mb-10 bg-[#0A0D14] p-1.5 rounded-2xl border border-white/[0.05]">
          <button onClick={() => setSubPage('INPUT')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subPage === 'INPUT' ? 'bg-[#14b850] text-[#0A0D14] shadow-sm' : 'text-white/50 hover:text-white'}`}>Lapor Stok</button>
          <button onClick={() => setSubPage('MATCH')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subPage === 'MATCH' ? 'bg-[#14b850] text-[#0A0D14] shadow-sm' : 'text-white/50 hover:text-white'}`}>Cari Pembeli</button>
          <button onClick={() => setSubPage('LOGISTICS')} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${subPage === 'LOGISTICS' ? 'bg-[#14b850] text-[#0A0D14] shadow-sm' : 'text-white/50 hover:text-white'}`}>Logistik</button>
       </div>

       {subPage === 'INPUT' && (
         <div className="animate-in slide-in-from-bottom-4">
            <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">Lapor Stok Panen</h3>
            <p className="text-sm font-light text-white/50 mb-8">Pilih metode input stok Anda.</p>
            
            <button className="w-full h-40 bg-white/[0.02] border border-white/[0.05] text-white rounded-[32px] mb-8 flex flex-col items-center justify-center space-y-4 hover:border-[#14b850]/50 transition-all relative overflow-hidden group">
               <div className="absolute inset-0 bg-[#14b850]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-16 h-16 bg-[#14b850]/10 rounded-2xl flex items-center justify-center animate-pulse text-[#14b850]">
                  <Microphone size={32} weight="fill" />
               </div>
               <span className="text-lg font-semibold tracking-tight">Gunakan Suara (AI Voice)</span>
               <span className="text-[10px] font-medium opacity-50 uppercase tracking-widest text-center px-12 italic">"Saya punya cabai dua kwintal harga lima ribu per kilo..."</span>
            </button>

            <div className="relative mb-8 text-center px-12">
               <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.1] -z-10"></div>
               <span className="bg-[#0A0D14] px-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Offline Mode Ready</span>
            </div>

            <div className="space-y-4">
               <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Komoditas</p>
                  <select className="w-full bg-transparent font-semibold text-lg text-white focus:outline-none appearance-none">
                     <option className="bg-[#0A0D14]">Cabai Keriting</option>
                     <option className="bg-[#0A0D14]">Jagung Hibrida</option>
                  </select>
               </div>
               <div className="flex gap-4">
                  <div className="flex-[2] bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Volume</p>
                    <input type="number" placeholder="0" className="w-full bg-transparent font-semibold text-xl text-white focus:outline-none placeholder:text-white/20" />
                  </div>
                  <div className="flex-1 bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Satuan</p>
                    <span className="font-semibold text-lg text-[#14b850]">KWINTAL</span>
                  </div>
               </div>
               <button className="w-full bg-[#14b850] text-[#0A0D14] mt-4 py-6 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(20,184,80,0.2)] hover:shadow-[0_0_25px_rgba(20,184,80,0.4)] transition-all flex items-center justify-center space-x-3">
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
       <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">Deteksi AI Penyakit</h3>
       <p className="text-sm font-light text-white/50 mb-12 capitalize">Fungsi Berjalan Offline • GeoAI Edge</p>
       
       <div className="w-full aspect-[4/5] bg-white/[0.02] rounded-[48px] border-2 border-dashed border-white/[0.1] flex flex-col items-center justify-center p-12 mb-10 overflow-hidden relative group">
          <Camera size={80} weight="fill" className="text-white/10 group-hover:text-white/20 group-hover:scale-110 transition-all duration-700" />
          <p className="text-white/40 font-medium mt-8">Ambil Foto Daun / Batang yang Sakit</p>
          <button className="absolute bottom-8 left-8 right-8 bg-white/[0.05] border border-white/[0.1] text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all">
             <Camera size={20} weight="bold" />
             <span>Buka Kamera AI</span>
          </button>
       </div>

       <div className="bg-[#14b850]/10 p-8 rounded-[32px] border border-[#14b850]/20 text-left">
          <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 bg-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850]">
                <Plant size={24} weight="fill" />
             </div>
             <h4 className="font-semibold text-white">Rekomendasi Tanam</h4>
          </div>
          <p className="text-[13px] font-light text-white/70 leading-relaxed">
             Berdasarkan profil lahan Anda, bulan depan paling optimal menanam <strong className="text-white">Jagung Manis</strong>. Prediksi harga panen stabil di Rp 6.200/kg.
          </p>
       </div>
    </div>
  );
}

function DompetTab() {
  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-500">
       <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[48px] shadow-sm mb-10 text-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#14b850]/10 rounded-full blur-[50px] pointer-events-none"></div>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">AgriWallet Balance</p>
          <div className="flex items-center justify-center space-x-3 mb-10 relative z-10">
             <span className="text-2xl font-bold text-white/50">Rp</span>
             <h2 className="text-4xl font-bold text-white tracking-tighter">8.472.000</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 relative z-10">
             <button className="bg-[#14b850] text-[#0A0D14] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(20,184,80,0.2)] hover:shadow-[0_0_25px_rgba(20,184,80,0.4)] transition-all">Tarik Dana</button>
          </div>
       </div>

       <div className="space-y-8">
          {/* Insurance Gauge */}
          <div>
              <div className="flex justify-between items-center mb-4">
                 <h4 className="font-semibold text-white">Geo-Insurance Proteksi</h4>
                 <div className="w-12 h-6 bg-[#14b850]/20 border border-[#14b850]/50 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3.5 h-3.5 bg-[#14b850] rounded-full shadow-[0_0_5px_rgba(20,184,80,0.5)]"></div>
                 </div>
              </div>
          <Link href="/dashboard/insurance" className="block">
              <div className="bg-[#0A0D14] border border-white/[0.05] p-8 rounded-[32px] flex items-center justify-between hover:border-white/[0.1] hover:bg-white/[0.02] transition-all cursor-pointer">
                 <div className="text-center flex-1 border-r border-white/[0.05]">
                    <Thermometer size={24} className="mx-auto mb-2 text-[#f43f5e]" weight="fill" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Suhu Lahan</p>
                    <p className="text-lg font-bold text-white">32°C</p>
                 </div>
                 <div className="text-center flex-1">
                    <CloudRain size={24} className="mx-auto mb-2 text-[#0ea5e9]" weight="fill" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Curah Hujan</p>
                    <p className="text-lg font-bold text-white">12mm</p>
                 </div>
                 <div className="text-center flex-1 border-l border-white/[0.05]">
                    <CheckCircle size={24} className="mx-auto mb-2 text-[#14b850]" weight="fill" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-lg font-bold text-[#14b850]">AMAN</p>
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
          <div className="w-28 h-28 bg-white/[0.05] rounded-full mx-auto mb-6 border-4 border-white/[0.1] shadow-xl overflow-hidden relative group">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-1">Slamet Raharjo</h2>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Petani Kediri • Sejak Mar 2024</p>
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
    <button onClick={onClick} className="flex flex-col items-center space-y-1.5 min-w-[64px] group outline-none">
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-[#14b850] text-[#0A0D14] shadow-[0_0_15px_rgba(20,184,80,0.3)] -translate-y-1' : 'text-white/40 group-hover:bg-white/[0.05] group-hover:text-white/80'}`}>
          <Icon size={24} weight={active ? "fill" : "regular"} />
       </div>
       <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${active ? 'text-[#14b850]' : 'text-white/40'}`}>{label}</span>
    </button>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex flex-col items-center p-6 bg-white/[0.02] rounded-[32px] border border-white/[0.05] hover:bg-white/[0.05] hover:border-[#14b850]/30 transition-all group outline-none">
       <div className={`w-12 h-12 ${color} border rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon size={24} weight="fill" />
       </div>
       <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest text-center">{label}</span>
    </button>
  );
}

function AlertCard({ type, icon: Icon, title, desc, color, iconColor }: { type: string, icon: any, title: string, desc: string, color: string, iconColor: string }) {
  return (
    <div className={`p-5 rounded-[28px] ${color} text-white flex items-start space-x-4 group cursor-pointer hover:border-[#14b850]/50 transition-all`}>
       <div className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mt-1 ${iconColor}`}>
          <Icon size={22} weight="fill" />
       </div>
       <div>
          <h4 className="font-semibold text-sm tracking-tight mb-1">{title}</h4>
          <p className="text-[11px] font-light opacity-80 leading-relaxed">{desc}</p>
       </div>
       <div className="ml-auto opacity-40 group-hover:opacity-100 group-hover:text-[#14b850] transition-colors mt-2">
          <CaretRight size={16} weight="bold" />
       </div>
    </div>
  );
}

function TransactionRow({ buyer, product, status, amount, statusColor }: { buyer: string, product: string, status: string, amount: string, statusColor: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05] hover:border-white/[0.1] transition-all">
       <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center text-white/50">
             <Handshake size={20} />
          </div>
          <div>
             <h5 className="text-[13px] font-semibold text-white leading-none mb-1.5">{buyer}</h5>
             <p className="text-[10px] font-medium text-white/40">{product}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${statusColor}`}>{status}</p>
          <p className="text-sm font-bold text-white tracking-tight">{amount}</p>
       </div>
    </div>
  );
}

function ProfilAction({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
   return (
      <button className="w-full flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all outline-none group">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center text-white/60 group-hover:text-[#14b850] transition-colors">
               <Icon size={22} weight="fill" />
            </div>
            <span className="text-sm font-semibold text-white">{label}</span>
         </div>
         <div className="flex items-center space-x-3">
            {badge && <span className="bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30 text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">{badge}</span>}
            <CaretRight size={16} weight="bold" className="text-white/30 group-hover:text-[#14b850] transition-colors" />
         </div>
      </button>
   );
}
