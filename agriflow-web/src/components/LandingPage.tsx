"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Leaf, 
  MapTrifold, 
  ShieldCheck, 
  Cube, 
  Globe,
  Handshake,
  Truck,
  CaretRight,
  Sparkle,
  Quotes
} from '@phosphor-icons/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0D14] mesh-gradient overflow-x-hidden selection:bg-[#14b850]/30 selection:text-white text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 md:px-14 py-10 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-12 h-12 bg-[#14b850]/20 rounded-2xl flex items-center justify-center text-[#14b850] shadow-[0_0_20px_rgba(20,184,80,0.2)] border border-[#14b850]/30 group-hover:rotate-[15deg] transition-all duration-500">
            <Leaf size={28} weight="fill" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">AgriFlow</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-10 text-[15px] font-bold text-white/60">
          <a href="#how-it-works" className="hover:text-white transition-colors flex items-center group">
            Cara Kerja
          </a>
          <a href="#features" className="hover:text-white transition-colors flex items-center group">
            Fitur Utama
          </a>
          <a href="#users" className="hover:text-white transition-colors flex items-center group">
            Solusi
          </a>
        </div>

        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-[15px] font-black text-white hover:opacity-100 opacity-80 transition-opacity flex items-center group">
            Masuk <CaretRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/dashboard" className="bg-[#14b850] text-[#0A0D14] px-8 py-3.5 rounded-full font-black text-[15px] shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 hover:-translate-y-1 active:scale-95 transition-all">
            Mulai Sekarang
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 md:px-14 pt-20 pb-40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14b850]/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-3 bg-white/[0.02] backdrop-blur-3xl px-5 py-2 rounded-full border border-white/[0.05] shadow-sm mb-12 transform hover:-translate-y-1 transition-all">
            <div className="w-2 h-2 bg-[#14b850] rounded-full animate-pulse shadow-[0_0_10px_rgba(20,184,80,0.8)]"></div>
            <span className="text-[12px] font-black text-white/80 uppercase tracking-widest">Digital Agri-Ecosystem</span>
          </div>

          <h1 className="text-[64px] md:text-[90px] font-black text-white leading-[0.9] tracking-tighter mb-12">
            Jual Lebih Mahal, <br />
            <span className="text-[#14b850]">Panen Lebih Aman.</span>
          </h1>

          <p className="text-[22px] text-white/60 leading-relaxed mb-14 max-w-2xl font-medium">
             Platform Ekosistem Pangan Digital Indonesia. Menghubungkan petani langsung ke pasar nasional dan global dengan proteksi asuransi & blockchain.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
             <Link href="/auth/farmer" className="w-full sm:w-auto bg-[#14b850] text-[#0A0D14] px-12 py-6 rounded-full font-black text-xl shadow-[0_0_30px_rgba(20,184,80,0.4)] hover:bg-[#15c958] hover:-translate-y-1.5 active:translate-y-0 transition-all flex items-center justify-center group btn-premium">
                Daftar sebagai Petani <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform duration-500" />
             </Link>
             <Link href="/auth/buyer" className="w-full sm:w-auto bg-white/[0.02] backdrop-blur-xl text-white px-10 py-6 rounded-full font-black text-xl border border-white/[0.05] shadow-sm hover:bg-white/[0.05] hover:shadow-xl transition-all flex items-center justify-center group">
                Saya Pembeli / Distributor
             </Link>
          </div>
          <Link href="/dashboard" className="text-white/40 font-bold text-sm hover:text-white transition-colors flex items-center group">
             Untuk Pemerintah & Lembaga <CaretRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      {/* Urgency Stats Section */}
      <section className="bg-white/[0.02] backdrop-blur-3xl py-32 border-y border-white/[0.05] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14b850]/5 to-transparent opacity-50"></div>
          <div className="max-w-7xl mx-auto px-14 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="group">
                      <p className="text-7xl font-black text-white mb-6 tracking-tighter group-hover:scale-110 transition-transform origin-left">47%</p>
                      <p className="text-lg font-bold text-white/50 leading-snug">Produk pangan Indonesia terbuang percuma setiap tahun.</p>
                  </div>
                  <div className="group">
                      <p className="text-7xl font-black text-rose-500 mb-6 tracking-tighter group-hover:scale-110 transition-transform origin-left">10–20%</p>
                      <p className="text-lg font-bold text-white/50 leading-snug">Bagian harga yang diterima petani dari harga akhir konsumen.</p>
                  </div>
                  <div className="group">
                      <p className="text-7xl font-black text-[#14b850] mb-6 tracking-tighter group-hover:scale-110 transition-transform origin-left drop-shadow-[0_0_15px_rgba(20,184,80,0.5)]">41.5Jt</p>
                      <p className="text-lg font-bold text-white/50 leading-snug">Rumah tangga petani yang menantikan solusi nyata.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-14 py-40">
          <div className="text-center mb-32 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#14b850]/10 rounded-full blur-[80px] -z-10"></div>
             <p className="text-[12px] font-black text-[#14b850] uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_8px_rgba(20,184,80,0.5)]">Bagaimana AgriFlow Bekerja</p>
             <h2 className="text-5xl font-black text-white tracking-tight">4 Langkah Menuju Kedaulatan Pangan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
             <StepCard icon={Leaf} number="01" title="Petani Lapor Stok" desc="Input panen via suara atau teks dengan grading AI instan." />
             <StepCard icon={Handshake} number="02" title="Sistem Cocokkan Pembeli" desc="AI merekomendasikan pembeli terbaik di wilayah Anda." />
             <StepCard icon={Truck} number="03" title="Logistik Dioptimasi" desc="Pengiriman efisien dengan rute VRP hemat biaya." />
             <StepCard icon={Sparkle} number="04" title="Dana Cair" desc="Penerimaan dana cepat & otomatis via escrow AgriFlow." />
          </div>
      </section>

      {/* User Segments Section */}
      <section id="users" className="bg-[#14b850]/10 border-y border-[#14b850]/20 py-40 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14b850] opacity-10 rounded-full blur-[100px] -mr-64 -mt-64 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-14 relative z-10">
              <h2 className="text-4xl font-black mb-24 max-w-xl leading-tight">Memberdayakan Seluruh Rantai Nilai Pertanian</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <UserCard title="Petani" desc="Akses pasar, asuransi otomatis, dan deteksi penyakit AI." />
                  <UserCard title="Pembeli" desc="Sumber pasokan segar, terverifikasi, dan logistik teratur." />
                  <UserCard title="Pemerintah" desc="Data real-time untuk kebijakan stok & subsidi tepat sasaran." />
                  <UserCard title="Buyer Ekspor" desc="Produk Grade A dengan standar traceability blockchain." />
              </div>
          </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="max-w-7xl mx-auto px-14 py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
              <div>
                 <div className="w-16 h-16 bg-[#14b850]/20 rounded-2xl flex items-center justify-center text-[#14b850] mb-10 shadow-[0_0_15px_rgba(20,184,80,0.3)] border border-[#14b850]/40">
                    <MapTrifold size={32} weight="fill" />
                 </div>
                 <h3 className="text-4xl font-black text-white mb-6 tracking-tight">Intelligence Map</h3>
                 <p className="text-xl font-medium text-white/60 leading-relaxed mb-10">
                    Sistem pemetaan surplus & defisit nasional untuk stabilitas harga dan pencegahan kelangkaan pangan.
                 </p>
                 <button className="flex items-center space-x-3 text-[#14b850] font-black uppercase text-xs tracking-widest border-b border-[#14b850]/30 pb-2 hover:border-[#14b850] transition-colors">
                    <span>Lihat Teknologi Peta</span>
                    <CaretRight size={14} weight="bold" />
                 </button>
              </div>
              <div className="glass-card p-1 rounded-[56px] shadow-[0_0_50px_rgba(20,184,80,0.1)] rotate-2 hover:rotate-0 transition-transform duration-700">
                 <div className="h-80 bg-[#0A0D14]/80 backdrop-blur-xl rounded-[50px] border border-white/[0.05] flex items-center justify-center relative overflow-hidden">
                    <MapTrifold size={120} weight="fill" className="text-[#14b850] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#14b850]/10 to-transparent"></div>
                 </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <MiniFeature 
                icon={ShieldCheck} 
                title="Asuransi Parametrik" 
                desc="Klaim cair otomatis saat curah hujan atau suhu melampaui batas aman untuk tanaman." 
              />
              <MiniFeature 
                icon={Cube} 
                title="Blockchain Trace" 
                desc="Verifikasi asal-usul produk dari kebun hingga ke piring untuk standar global." 
              />
              <MiniFeature 
                icon={Globe} 
                title="Agri-Export Gateway" 
                desc="Portal khusus untuk menghubungkan produk Grade A dengan buyer mancanegara." 
              />
          </div>
      </section>

      {/* Footer & Partners */}
      <footer className="max-w-7xl mx-auto px-14 py-40 border-t border-white/[0.05]">
          <div className="flex flex-col items-center mb-24">
             <div className="flex items-center space-x-12 mb-16 px-8 py-4 bg-white/[0.02] backdrop-blur-xl rounded-full border border-white/[0.05]">
                <Quotes size={32} weight="fill" className="text-[#14b850] opacity-50" />
                <p className="text-sm font-bold text-white/60">Didukung oleh ekosistem strategis Indonesia.</p>
             </div>
             <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000 cursor-default">
                <span className="text-3xl font-black tracking-tighter">BANK INDONESIA</span>
                <span className="text-3xl font-black tracking-widest">OJK</span>
                <span className="text-3xl font-black tracking-tighter font-serif">KEMENTAN</span>
                <span className="text-3xl font-black tracking-tighter">BRI</span>
             </div>
          </div>
          
          <div className="flex justify-between items-center text-[11px] font-black text-white/40 uppercase tracking-widest">
             <span>© 2026 AgriFlow — GeoAgri Innovators Team</span>
             <div className="space-x-8">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Security</a>
             </div>
          </div>
      </footer>
    </div>
  );
}

function StepCard({ icon: Icon, number, title, desc }: any) {
  return (
    <div className="relative group">
       <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#14b850] group-hover:text-[#0A0D14] group-hover:border-[#14b850] text-[#14b850] transition-all duration-500 group-hover:-translate-y-2 shadow-[0_0_20px_rgba(0,0,0,0)] group-hover:shadow-[0_10px_30px_rgba(20,184,80,0.3)]">
          <Icon size={28} weight="bold" />
       </div>
       <div className="absolute top-0 right-0 text-7xl font-black text-white opacity-[0.02] -mt-4 -mr-4 group-hover:text-[#14b850] group-hover:opacity-[0.1] transition-colors">{number}</div>
       <h3 className="text-xl font-black text-white mb-4">{title}</h3>
       <p className="text-[15px] font-bold text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}

function UserCard({ title, desc }: any) {
  return (
    <div className="p-10 rounded-[40px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] hover:bg-white/[0.05] hover:border-[#14b850]/30 transition-all cursor-default">
       <h4 className="text-xl font-black mb-6">{title}</h4>
       <p className="text-[15px] font-bold opacity-60 leading-relaxed mb-8">{desc}</p>
       <button className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#14b850]">
          <span>Pelajari Selengkapnya</span>
          <ArrowRight size={12} weight="bold" />
       </button>
    </div>
  );
}

function MiniFeature({ icon: Icon, title, desc }: any) {
  return (
    <div className="group">
       <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-center text-white/40 mb-8 group-hover:bg-[#14b850]/20 group-hover:text-[#14b850] group-hover:border-[#14b850]/50 transition-all duration-500">
          <Icon size={24} weight="bold" />
       </div>
       <h4 className="text-xl font-black text-white mb-4">{title}</h4>
       <p className="text-[15px] font-bold text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}
