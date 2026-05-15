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
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Selamat Datang, <span className="text-[#14b850]">Pak Slamet!</span></h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Ringkasan aktivitas pertanian Anda hari ini.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
           {(['BERANDA', 'JUAL', 'DETEKSI', 'DOMPET', 'PROFIL'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setActiveTab(t as Tab)}
               className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-[#1B4D1B] shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Harga Pasar Terkini</p>
                <div className="flex items-baseline space-x-3">
                   <h3 className="text-4xl font-bold text-[#1B4D1B] tracking-tight">Rp 24.500</h3>
                   <span className="text-sm font-bold text-[#14b850] bg-[#14b850]/10 px-2 py-0.5 rounded-full">▲ 12.4%</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1"><Plant size={14} /> Cabai Keriting (Kediri)</p>
             </div>
             <div className="mt-8 relative z-10">
                <button className="text-xs font-bold text-[#14b850] hover:text-[#0f913f] flex items-center space-x-1 group-hover:translate-x-1 transition-all">
                   <span>Lihat Prediksi Selengkapnya</span>
                   <ArrowRight size={14} weight="bold" />
                </button>
             </div>
             <ChartLineUp size={140} weight="fill" className="absolute -bottom-6 -right-6 text-[#14b850]/5 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* AgriScore Mini Card */}
          <Link href="/dashboard/score" className="card-clean p-8 flex flex-col justify-between hover:border-[#14b850]/30 hover:shadow-md transition-all group relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AgriScore</p>
                <h3 className="text-4xl font-bold text-[#1B4D1B] tracking-tight">782</h3>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-[#14b850]/10 text-[#14b850] rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm border border-[#14b850]/20">
                   Ahli ✦
                </div>
             </div>
             <div className="mt-4 relative z-10 flex justify-between items-end">
                <p className="text-[10px] text-slate-400 font-medium leading-tight max-w-[120px]">Rating Kredibilitas Petani</p>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#14b850] group-hover:text-white transition-colors">
                   <ArrowUpRight size={16} />
                </div>
             </div>
             <Star size={100} weight="fill" className="absolute -top-4 -right-4 text-amber-400/5 group-hover:rotate-12 transition-transform duration-500" />
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
          <div className="card-clean p-6 flex flex-col">
             <h4 className="text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center justify-between">
                <span>Aktivitas Terakhir</span>
                <span className="text-[#14b850] cursor-pointer hover:underline">Lihat Semua</span>
             </h4>
             <div className="space-y-2 flex-1">
                <TransactionRowMinimal buyer="Superindo Retail" product="250kg Cabai" amount="Rp 6.100.000" />
                <TransactionRowMinimal buyer="Indofood" product="500kg Jagung" amount="Rp 4.250.000" />
             </div>
          </div>
          <div className="card-clean p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer border-rose-100">
             <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm border border-rose-100/50">
                   <Warning size={28} weight="duotone" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Peringatan Surplus Wilayah</h4>
                   <p className="text-[11px] text-slate-500 font-medium mt-1">Stok Kediri melimpah, harga berisiko turun 5%.</p>
                </div>
             </div>
             <ArrowRight size={20} className="text-slate-300" />
          </div>
       </div>
    </div>
  );
}

function JualTab({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <div className="card-clean p-10 animate-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto shadow-md">
       <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#14b850]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#14b850]">
             <Package size={32} weight="duotone" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Lapor Stok Panen</h3>
          <p className="text-sm text-slate-500 mt-2">Perbarui inventaris digital Anda ke dalam jaringan blockchain.</p>
       </div>
       
       <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Komoditas Utama</label>
             <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14b850]/20 focus:border-[#14b850] transition-all">
                <option>Cabai Keriting (Grade A)</option>
                <option>Jagung Hibrida (Kadar Air 15%)</option>
             </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volume Estimasi</label>
                <input type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14b850]/20 focus:border-[#14b850] transition-all" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Satuan Ukur</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#14b850]/20 focus:border-[#14b850] transition-all">
                   <option>Kwintal</option>
                   <option>Ton</option>
                   <option>Kg</option>
                </select>
             </div>
          </div>
          <button className="w-full btn-minimal btn-primary py-3.5 text-xs shadow-lg shadow-[#14b850]/20 hover:scale-[1.02] active:scale-[0.98]">
             <CloudArrowUp size={20} weight="bold" />
             <span>Simpan Laporan & Broadcast ke Pasar</span>
          </button>
          
          <div className="text-center py-2">
             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Atau gunakan suara</span>
          </div>

          <button className="w-full btn-minimal border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 py-3.5">
             <Microphone size={20} />
             <span>"Lapor panen cabai 5 kwintal..."</span>
          </button>
       </div>
    </div>
  );
}

function DeteksiTab() {
  return (
    <div className="card-clean p-12 animate-in slide-in-from-right-4 duration-500 text-center max-w-xl mx-auto shadow-md">
       <div className="w-24 h-24 bg-[#14b850]/10 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#14b850]/20">
          <Scan size={48} weight="duotone" className="text-[#1B4D1B]" />
       </div>
       <h3 className="text-2xl font-bold text-slate-900 mb-3">Deteksi Penyakit AI</h3>
       <p className="text-sm text-slate-500 mb-10 px-4 leading-relaxed">Ambil foto daun tanaman Anda menggunakan kamera ponsel untuk analisis patologi secara offline.</p>
       
       <button className="w-full btn-minimal bg-[#1B4D1B] text-white hover:bg-[#133813] py-4 rounded-xl shadow-lg shadow-[#1B4D1B]/20 transition-all hover:scale-[1.02]">
          <Camera size={22} weight="fill" />
          <span className="font-bold text-sm">Buka Kamera Pemindai</span>
       </button>
       
       <div className="mt-10 pt-8 border-t border-slate-100 text-left bg-slate-50 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
             <Plant size={18} className="text-[#14b850]" weight="bold" />
             <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest">Smart Geo-Recommendation</p>
          </div>
          <p className="text-sm font-semibold text-slate-700 leading-relaxed">
             Berdasarkan analisis iklim mikro bulan depan, lahan Anda ideal untuk dirotasi ke <span className="text-[#1B4D1B] font-bold">Jagung Hibrida Bisi-18</span>.
          </p>
       </div>
    </div>
  );
}

function DompetTab() {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 max-w-xl mx-auto">
       <div className="card-clean p-10 text-center bg-gradient-to-br from-[#1B4D1B] to-[#0f300f] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
               <Wallet size={16} /> Saldo AgriWallet
             </p>
             <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">Rp 8.472.000</h2>
             <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <button className="bg-[#14b850] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#0f913f] transition-colors">Tarik Tunai</button>
                <button className="bg-white/10 border border-white/20 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors">Riwayat</button>
             </div>
          </div>
       </div>

       <div className="card-clean p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
             <div>
                <h4 className="font-bold text-slate-900 text-sm">Proteksi Asuransi Mikro</h4>
                <p className="text-[10px] text-slate-500 mt-1">Sistem deteksi cuaca otomatis JASINDO.</p>
             </div>
             <div className="px-3 py-1.5 bg-[#14b850]/10 text-[#14b850] border border-[#14b850]/20 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
               <ShieldCheck size={14} weight="fill" /> Aktif
             </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
             <div className="bg-slate-50 p-4 rounded-2xl">
                <Thermometer size={24} className="mx-auto mb-3 text-rose-500" weight="duotone" />
                <p className="text-xl font-bold text-slate-900 tracking-tight">32°C</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Suhu Udara</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl">
                <CloudRain size={24} className="mx-auto mb-3 text-blue-500" weight="duotone" />
                <p className="text-xl font-bold text-slate-900 tracking-tight">12mm</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Curah Hujan</p>
             </div>
             <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <CheckCircle size={24} className="mx-auto mb-3 text-[#14b850]" weight="fill" />
                <p className="text-lg font-bold text-[#1B4D1B]">Aman</p>
                <p className="text-[9px] font-bold text-[#14b850]/70 uppercase mt-1">Status Lahan</p>
             </div>
          </div>
       </div>
    </div>
  );
}

function ProfilTab() {
  return (
    <div className="max-w-xl mx-auto animate-in slide-in-from-right-4 duration-500">
       <div className="card-clean p-10 text-center mb-8 shadow-sm">
          <div className="w-28 h-28 bg-slate-50 rounded-[32px] mx-auto mb-6 border-4 border-white shadow-lg overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=f8fafc" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Slamet Raharjo</h2>
          <div className="flex items-center justify-center gap-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Petani Kediri</span>
             <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bergabung 2024</span>
          </div>
       </div>

       <div className="space-y-3">
          <ProfilActionMinimal icon={User} label="Informasi Data Diri & Lahan" />
          <ProfilActionMinimal icon={Bell} label="Pengaturan Notifikasi" />
          <ProfilActionMinimal icon={Globe} label="Portal Ekspor (Premium)" badge="Baru" />
          <ProfilActionMinimal icon={Handshake} label="Riwayat Kontrak Kerjasama" />
       </div>
    </div>
  );
}

function QuickActionMinimal({ icon: Icon, label, href, onClick }: { icon: any, label: string, href?: string, onClick?: () => void }) {
  const content = (
    <div className="card-clean p-6 flex flex-col items-center hover:border-[#14b850]/30 hover:shadow-md transition-all cursor-pointer group">
       <div className="w-12 h-12 bg-[#14b850]/5 rounded-2xl flex items-center justify-center mb-4 text-[#1B4D1B] group-hover:scale-110 group-hover:bg-[#14b850]/10 transition-all">
          <Icon size={24} weight="duotone" />
       </div>
       <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-900 text-center">{label}</span>
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return <div onClick={onClick}>{content}</div>;
}

function TransactionRowMinimal({ buyer, product, amount }: { buyer: string, product: string, amount: string }) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl mb-3 hover:bg-slate-50 transition-colors">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
             <Handshake size={20} weight="fill" />
          </div>
          <div>
             <h5 className="text-sm font-bold text-slate-900">{buyer}</h5>
             <p className="text-[11px] text-slate-500 font-medium">{product}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-sm font-bold text-[#1B4D1B] tracking-tight">{amount}</p>
          <p className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest mt-1">Selesai</p>
       </div>
    </div>
  );
}

function ProfilActionMinimal({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
   return (
      <button className="w-full card-clean px-6 py-5 flex items-center justify-between hover:bg-slate-50 hover:border-slate-200 transition-all group">
         <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-[#1B4D1B] group-hover:shadow-sm transition-all">
               <Icon size={18} weight="bold" />
            </div>
            <span className="text-sm font-bold text-slate-800">{label}</span>
         </div>
         <div className="flex items-center space-x-3">
            {badge && <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">{badge}</span>}
            <CaretRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
         </div>
      </button>
   );
}
