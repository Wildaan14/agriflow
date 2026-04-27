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
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Selamat Datang, <span className="text-[#4A9E3F]">Pak Slamet!</span></h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Ringkasan aktivitas pertanian Anda hari ini.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
           {(['BERANDA', 'JUAL', 'DETEKSI', 'DOMPET', 'PROFIL'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t as Tab)}
               className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-[#1B4D1B] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
               {t}
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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stat Card */}
          <div className="lg:col-span-2 card-clean p-8 flex flex-col justify-between relative overflow-hidden group">
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Harga Pasar Terkini</p>
                <div className="flex items-baseline space-x-2">
                   <h3 className="text-4xl font-bold text-[#1B4D1B]">Rp 24.500</h3>
                   <span className="text-sm font-bold text-[#4A9E3F]">▲ 12.4%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">Cabai Keriting (Kediri)</p>
             </div>
             <div className="mt-8 relative z-10">
                <button className="text-xs font-bold text-[#1B4D1B] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                   <span>Lihat Prediksi Selengkapnya</span>
                   <ArrowRight size={14} />
                </button>
             </div>
             <ChartLineUp size={120} weight="fill" className="absolute -bottom-4 -right-4 text-[#4A9E3F]/5 group-hover:scale-110 transition-transform" />
          </div>

          {/* AgriScore Mini Card */}
          <Link href="/dashboard/score" className="card-clean p-8 flex flex-col justify-between hover:border-[#4A9E3F]/30 group">
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">AgriScore</p>
                <h3 className="text-4xl font-bold text-[#1B4D1B]">782</h3>
                <div className="mt-2 inline-flex items-center px-2 py-0.5 bg-[#4A9E3F]/10 text-[#4A9E3F] rounded text-[10px] font-bold uppercase tracking-widest">
                   Ahli ✦
                </div>
             </div>
             <div className="mt-4">
                <p className="text-[10px] text-gray-400 font-medium">Rating Kredibilitas Petani</p>
             </div>
          </Link>
       </div>

       {/* Quick Actions - Clean Icons */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionMinimal icon={Package} label="Lapor Stok" onClick={() => setActiveTab('JUAL')} />
          <QuickActionMinimal icon={Handshake} label="Cari Pembeli" href="/dashboard/marketplace" />
          <QuickActionMinimal icon={Camera} label="Deteksi Hama" href="/dashboard/disease" />
          <QuickActionMinimal icon={Truck} label="Logistik" href="/dashboard/logistics" />
       </div>

       {/* Secondary Info Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-clean p-6">
             <h4 className="text-sm font-bold text-[#1B4D1B] mb-4 uppercase tracking-widest">Aktivitas Terakhir</h4>
             <div className="space-y-4">
                <TransactionRowMinimal buyer="Superindo Retail" product="250kg Cabai" amount="Rp 6.1M" />
                <TransactionRowMinimal buyer="Indofood" product="500kg Jagung" amount="Rp 4.2M" />
             </div>
          </div>
          <div className="card-clean p-6 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                   <Warning size={24} weight="bold" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-[#1B4D1B]">Peringatan Surplus</h4>
                   <p className="text-xs text-gray-500 font-medium">Stok melimpah, harga berisiko turun.</p>
                </div>
             </div>
             <ArrowRight size={20} className="text-gray-300" />
          </div>
       </div>
    </div>
  );
}

function JualTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className="card-clean p-8 animate-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
       <h3 className="text-xl font-bold text-[#1B4D1B] mb-6">Lapor Stok Panen</h3>
       <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Komoditas</label>
             <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D1B]/5">
                <option>Cabai Keriting</option>
                <option>Jagung Hibrida</option>
             </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Volume</label>
                <input type="number" placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D1B]/5" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Satuan</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D1B]/5">
                   <option>Kwintal</option>
                   <option>Ton</option>
                   <option>Kg</option>
                </select>
             </div>
          </div>
          <button className="w-full btn-minimal btn-primary mt-4">
             <CloudArrowUp size={20} />
             <span>Simpan Laporan Stok</span>
          </button>
          
          <div className="text-center py-4">
             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">atau</span>
          </div>

          <button className="w-full btn-minimal border border-dashed border-gray-200 text-gray-500 hover:bg-gray-50">
             <Microphone size={20} />
             <span>Lapor via Suara (AI)</span>
          </button>
       </div>
    </div>
  );
}

function DeteksiTab() {
  return (
    <div className="card-clean p-10 animate-in slide-in-from-right-4 duration-500 text-center max-w-xl mx-auto">
       <div className="w-20 h-20 bg-[#1B4D1B]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Camera size={40} weight="bold" className="text-[#1B4D1B]" />
       </div>
       <h3 className="text-xl font-bold text-[#1B4D1B] mb-2">Deteksi Penyakit AI</h3>
       <p className="text-sm text-gray-500 mb-10 px-8">Ambil foto tanaman Anda untuk analisis penyakit secara real-time dan offline.</p>
       
       <button className="w-full btn-minimal btn-primary py-4">
          <Camera size={20} />
          <span>Mulai Pemindaian</span>
       </button>
       
       <div className="mt-8 pt-8 border-t border-gray-100 text-left">
          <p className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest mb-2">Geo-Recommendation</p>
          <p className="text-sm font-bold text-gray-700 leading-relaxed">
             Bulan depan ideal untuk menanam <span className="text-[#1B4D1B]">Jagung Manis</span> berdasarkan histori lahan Anda.
          </p>
       </div>
    </div>
  );
}

function DompetTab() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 max-w-xl mx-auto">
       <div className="card-clean p-10 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Saldo AgriWallet</p>
          <h2 className="text-4xl font-bold text-[#1B4D1B] tracking-tight mb-8">Rp 8.472.000</h2>
          <div className="grid grid-cols-2 gap-4">
             <button className="btn-minimal btn-primary text-xs">Tarik Tunai</button>
             <button className="btn-minimal btn-secondary text-xs">Riwayat</button>
          </div>
       </div>

       <div className="card-clean p-8">
          <div className="flex justify-between items-center mb-6">
             <h4 className="font-bold text-[#1B4D1B] text-sm uppercase tracking-widest">Proteksi Geo-Asuransi</h4>
             <div className="px-2 py-1 bg-[#4A9E3F]/10 text-[#4A9E3F] rounded text-[9px] font-bold uppercase tracking-widest">Aktif</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
             <div>
                <Thermometer size={20} className="mx-auto mb-2 text-rose-500" />
                <p className="text-lg font-bold text-gray-800">32°C</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Suhu</p>
             </div>
             <div>
                <CloudRain size={20} className="mx-auto mb-2 text-blue-500" />
                <p className="text-lg font-bold text-gray-800">12mm</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Hujan</p>
             </div>
             <div>
                <CheckCircle size={20} className="mx-auto mb-2 text-[#4A9E3F]" />
                <p className="text-lg font-bold text-[#4A9E3F]">AMAN</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Status</p>
             </div>
          </div>
       </div>
    </div>
  );
}

function ProfilTab() {
  return (
    <div className="max-w-xl mx-auto animate-in slide-in-from-right-4 duration-500">
       <div className="card-clean p-10 text-center mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl mx-auto mb-6 border-4 border-white shadow-sm overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Slamet Raharjo</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Petani Kediri • Sejak 2024</p>
       </div>

       <div className="space-y-3">
          <ProfilActionMinimal icon={User} label="Profil Saya" />
          <ProfilActionMinimal icon={Bell} label="Notifikasi" />
          <ProfilActionMinimal icon={Globe} label="Portal Ekspor" badge="New" />
          <ProfilActionMinimal icon={Handshake} label="Riwayat Kerjasama" />
       </div>
    </div>
  );
}

function QuickActionMinimal({ icon: Icon, label, href, onClick }: { icon: any, label: string, href?: string, onClick?: () => void }) {
  const content = (
    <div className="card-clean p-6 flex flex-col items-center hover:border-[#4A9E3F]/30 transition-all cursor-pointer">
       <div className="w-10 h-10 bg-[#1B4D1B]/5 rounded-xl flex items-center justify-center mb-3 text-[#1B4D1B]">
          <Icon size={20} weight="bold" />
       </div>
       <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">{label}</span>
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return <div onClick={onClick}>{content}</div>;
}

function TransactionRowMinimal({ buyer, product, amount }: { buyer: string, product: string, amount: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
       <div>
          <h5 className="text-sm font-bold text-gray-900">{buyer}</h5>
          <p className="text-[10px] text-gray-500 font-medium">{product}</p>
       </div>
       <div className="text-right">
          <p className="text-sm font-bold text-[#1B4D1B] tracking-tight">{amount}</p>
          <p className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest">Selesai</p>
       </div>
    </div>
  );
}

function ProfilActionMinimal({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
   return (
      <button className="w-full card-clean px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
         <div className="flex items-center space-x-4">
            <Icon size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-800">{label}</span>
         </div>
         <div className="flex items-center space-x-2">
            {badge && <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] text-[8px] font-bold px-2 py-0.5 rounded uppercase">{badge}</span>}
            <CaretRight size={14} className="text-gray-300" />
         </div>
      </button>
   );
}
