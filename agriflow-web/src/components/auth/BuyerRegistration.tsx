"use client";

import React, { useState } from 'react';
import { 
  BuildingOffice, 
  Files, 
  Globe, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  CaretLeft,
  Briefcase,
  ShieldCheck,
  Calendar
} from '@phosphor-icons/react';
import Link from 'next/link';

type BuyerType = 'LOCAL' | 'EXPORT';
type Step = 'TYPE_SELECTION' | 'BUSINESS_INFO' | 'LEGAL' | 'SUCCESS';

export default function BuyerRegistration() {
  const [buyerType, setBuyerType] = useState<BuyerType>('LOCAL');
  const [step, setStep] = useState<Step>('TYPE_SELECTION');
  
  // Form State
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [nib, setNib] = useState('');

  const handleNext = () => {
    if (step === 'TYPE_SELECTION') setStep('BUSINESS_INFO');
    else if (step === 'BUSINESS_INFO') setStep('LEGAL');
    else if (step === 'LEGAL') setStep('SUCCESS');
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] mesh-gradient flex items-center justify-center p-6 lg:p-12 font-sans selection:bg-[#14b850]/30 selection:text-white text-white">
      <div className="w-full max-w-2xl bg-white/[0.02] backdrop-blur-3xl rounded-[48px] shadow-[0_0_50px_rgba(20,184,80,0.1)] border border-white/[0.05] overflow-hidden relative">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/[0.05]">
          <div 
            className="h-full bg-[#14b850] transition-all duration-700 shadow-[0_0_10px_rgba(20,184,80,0.8)]" 
            style={{ width: `${(Object.keys(stepMap).indexOf(step) + 1) / 4 * 100}%` }}
          ></div>
        </div>

        <div className="p-10 lg:p-16">
          {step !== 'TYPE_SELECTION' && step !== 'SUCCESS' && (
            <button onClick={() => setStep(prevStep(step))} className="mb-10 flex items-center text-white/50 hover:text-white font-bold transition-colors">
               <CaretLeft size={16} weight="bold" className="mr-2" /> Kembali
            </button>
          )}

          {step === 'TYPE_SELECTION' && (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Bergabung sebagai Pembeli</h2>
               <p className="text-white/60 font-bold mb-12 text-lg">Pilih kategori bisnis Anda untuk akses ekosistem.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <SelectionCard 
                    active={buyerType === 'LOCAL'} 
                    onClick={() => setBuyerType('LOCAL')}
                    icon={BuildingOffice}
                    title="Pembeli Lokal"
                    desc="Retailer, Koperasi, Distributor, atau Industri pengolah pangan dalam negeri."
                  />
                  <SelectionCard 
                    active={buyerType === 'EXPORT'} 
                    onClick={() => setBuyerType('EXPORT')}
                    icon={Globe}
                    title="Buyer Ekspor"
                    desc="Importir internasional, Global Trader, atau Export Gateway Hub."
                  />
               </div>

               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all flex items-center justify-center group btn-premium">
                  Lanjutkan <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          )}

          {step === 'BUSINESS_INFO' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Informasi Bisnis</h2>
               <p className="text-white/60 font-bold mb-12">Langkah 1/2: Profil Perusahaan</p>
               
               <div className="space-y-6 mb-12">
                  <div className="relative">
                    <BuildingOffice size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Nama Perusahaan / Institusi"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg text-white placeholder-white/20"
                    />
                  </div>
                  <div className="relative">
                    <Briefcase size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Jabatan Anda"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg text-white placeholder-white/20"
                    />
                  </div>
               </div>

               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all btn-premium">
                  Lanjut ke Verifikasi Legal
               </button>
            </div>
          )}

          {step === 'LEGAL' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Verifikasi Legalitas</h2>
               <p className="text-white/60 font-bold mb-12">{buyerType === 'LOCAL' ? 'Langkah 2/2: Dokumen Bisnis' : 'Langkah 2/3: Export Compliance'}</p>

               <div className="space-y-8 mb-12">
                  <div className="relative">
                    <Files size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text" 
                      placeholder={buyerType === 'LOCAL' ? "Nomor NIB / NPWP" : "International Trading License (DUNS)"}
                      value={nib}
                      onChange={(e) => setNib(e.target.value)}
                      className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg text-white placeholder-white/20"
                    />
                  </div>

                  <div className="p-10 border-2 border-dashed border-white/[0.1] rounded-3xl text-center bg-white/[0.01] group cursor-pointer hover:border-[#14b850]/50 hover:bg-[#14b850]/5 transition-all">
                     <Files size={48} weight="fill" className="text-white/20 mx-auto mb-4 group-hover:text-[#14b850] transition-colors" />
                     <p className="text-xs font-black text-[#14b850] uppercase tracking-widest">Unggah Dokumen (PDF/JPG)</p>
                     <p className="text-[10px] font-bold text-white/30 mt-2">Maksimum file size: 5MB</p>
                  </div>

                  {buyerType === 'EXPORT' && (
                    <div className="p-8 bg-amber-500/10 rounded-3xl border border-amber-500/20 backdrop-blur-md">
                       <div className="flex items-center space-x-3 mb-4">
                          <ShieldCheck size={24} weight="fill" className="text-amber-400" />
                          <h4 className="font-black text-amber-400 text-sm">Ketentuan Khusus Ekspor</h4>
                       </div>
                       <p className="text-xs font-bold text-amber-100/70 leading-relaxed mb-6">Pendaftaran buyer ekspor memerlukan verifikasi manual dan interview virtual dari tim Compliance AgriFlow.</p>
                       <button className="w-full bg-amber-400 text-amber-950 py-3 rounded-xl flex items-center justify-center space-x-3 font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-amber-300 transition-colors">
                          <Calendar size={18} />
                          <span>Jadwalkan Interview</span>
                       </button>
                    </div>
                  )}
               </div>

               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all btn-premium">
                  Selesaikan Pendaftaran
               </button>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center py-10 animate-in zoom-in-95 duration-700">
               <div className="w-24 h-24 bg-[#14b850]/20 rounded-full flex items-center justify-center text-[#14b850] mx-auto mb-10 shadow-[0_0_30px_rgba(20,184,80,0.2)]">
                  <CheckCircle size={64} weight="fill" />
               </div>
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Pendaftaran Terkirim!</h2>
               <p className="text-white/60 font-bold mb-12 leading-relaxed px-8">
                  Data perusahaan <span className="text-[#14b850]">{company}</span> sedang dalam proses verifikasi 1x24 jam. Kami akan mengirimkan notifikasi via Email.
               </p>
               <Link href="/dashboard" className="inline-flex items-center justify-center bg-[#14b850] text-[#0A0D14] px-12 py-6 rounded-3xl font-black text-lg shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all group btn-premium">
                  Masuk ke Dashboard <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectionCard({ active, onClick, icon: Icon, title, desc }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-10 rounded-[40px] border-2 text-left transition-all ${active ? 'border-[#14b850] bg-[#14b850]/10 shadow-[0_0_30px_rgba(20,184,80,0.15)]' : 'border-white/[0.05] hover:border-white/[0.1] bg-white/[0.02]'}`}
    >
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${active ? 'bg-[#14b850] text-[#0A0D14] shadow-lg' : 'bg-white/[0.05] text-white/40'}`}>
          <Icon size={32} weight="fill" />
       </div>
       <h4 className={`text-xl font-black mb-4 ${active ? 'text-[#14b850]' : 'text-white'}`}>{title}</h4>
       <p className={`text-xs font-bold leading-relaxed ${active ? 'text-[#14b850]/80' : 'text-white/40'}`}>{desc}</p>
    </button>
  );
}

const stepMap: Record<Step, string> = {
  TYPE_SELECTION: 'Tipe',
  BUSINESS_INFO: 'Informasi',
  LEGAL: 'Verifikasi',
  SUCCESS: 'Selesai'
};

const prevStep = (current: Step): Step => {
  const steps: Step[] = ['TYPE_SELECTION', 'BUSINESS_INFO', 'LEGAL', 'SUCCESS'];
  const idx = steps.indexOf(current);
  return steps[Math.max(0, idx - 1)];
};
