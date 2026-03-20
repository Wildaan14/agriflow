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
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-6 lg:p-12 font-sans selection:bg-stripe-indigo selection:text-white">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-3xl rounded-[48px] shadow-[0_50px_100px_-20px_rgba(30,30,80,0.15)] border border-white overflow-hidden relative">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <div 
            className="h-full bg-stripe-indigo transition-all duration-700" 
            style={{ width: `${(Object.keys(stepMap).indexOf(step) + 1) / 4 * 100}%` }}
          ></div>
        </div>

        <div className="p-10 lg:p-16">
          {step !== 'TYPE_SELECTION' && step !== 'SUCCESS' && (
            <button onClick={() => setStep(prevStep(step))} className="mb-10 flex items-center text-stripe-slate hover:text-stripe-indigo font-bold transition-colors">
               <CaretLeft size={16} weight="bold" className="mr-2" /> Kembali
            </button>
          )}

          {step === 'TYPE_SELECTION' && (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-4">Bergabung sebagai Pembeli</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-60 text-lg">Pilih kategori bisnis Anda untuk akses ekosistem.</p>
               
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

               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center group">
                  Lanjutkan <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          )}

          {step === 'BUSINESS_INFO' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-4">Informasi Bisnis</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-60">Langkah 1/2: Profil Perusahaan</p>
               
               <div className="space-y-6 mb-12">
                  <div className="relative">
                    <BuildingOffice size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-indigo opacity-40" />
                    <input 
                      type="text" 
                      placeholder="Nama Perusahaan / Institusi"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 transition-all font-bold text-lg"
                    />
                  </div>
                  <div className="relative">
                    <Briefcase size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-indigo opacity-40" />
                    <input 
                      type="text" 
                      placeholder="Jabatan Anda"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 transition-all font-bold text-lg"
                    />
                  </div>
               </div>

               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all">
                  Lanjut ke Verifikasi Legal
               </button>
            </div>
          )}

          {step === 'LEGAL' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-4">Verifikasi Legalitas</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-60">{buyerType === 'LOCAL' ? 'Langkah 2/2: Dokumen Bisnis' : 'Langkah 2/3: Export Compliance'}</p>

               <div className="space-y-8 mb-12">
                  <div className="relative">
                    <Files size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-indigo opacity-40" />
                    <input 
                      type="text" 
                      placeholder={buyerType === 'LOCAL' ? "Nomor NIB / NPWP" : "International Trading License (DUNS)"}
                      value={nib}
                      onChange={(e) => setNib(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 pl-16 pr-8 focus:outline-none transition-all font-bold text-lg"
                    />
                  </div>

                  <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center bg-slate-50/50 group cursor-pointer hover:border-stripe-indigo transition-all">
                     <Files size={48} weight="fill" className="text-slate-200 mx-auto mb-4 group-hover:text-stripe-indigo transition-colors" />
                     <p className="text-xs font-black text-stripe-indigo uppercase tracking-widest">Unggah Dokumen (PDF/JPG)</p>
                     <p className="text-[10px] font-bold text-slate-400 mt-2">Maksimum file size: 5MB</p>
                  </div>

                  {buyerType === 'EXPORT' && (
                    <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
                       <div className="flex items-center space-x-3 mb-4">
                          <ShieldCheck size={24} weight="fill" className="text-amber-500" />
                          <h4 className="font-black text-amber-900 text-sm">Ketentuan Khusus Ekspor</h4>
                       </div>
                       <p className="text-xs font-bold text-amber-800/70 leading-relaxed mb-6">Pendaftaran buyer ekspor memerlukan verifikasi manual dan interview virtual dari tim Compliance AgriFlow.</p>
                       <button className="w-full bg-white text-amber-900 py-3 rounded-xl flex items-center justify-center space-x-3 font-black text-[10px] uppercase tracking-widest shadow-sm">
                          <Calendar size={18} />
                          <span>Jadwalkan Interview</span>
                       </button>
                    </div>
                  )}
               </div>

               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all">
                  Selesaikan Pendaftaran
               </button>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center py-10 animate-in zoom-in-95 duration-700">
               <div className="w-24 h-24 bg-stripe-emerald/10 rounded-full flex items-center justify-center text-stripe-emerald mx-auto mb-10">
                  <CheckCircle size={64} weight="fill" />
               </div>
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Pendaftaran Terkirim!</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-60 leading-relaxed px-8">
                  Data perusahaan <span className="text-stripe-indigo">{company}</span> sedang dalam proses verifikasi 1x24 jam. Kami akan mengirimkan notifikasi via Email.
               </p>
               <Link href="/dashboard" className="inline-flex items-center justify-center bg-stripe-indigo text-white px-12 py-6 rounded-3xl font-black text-lg shadow-2xl hover:bg-black transition-all group">
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
      className={`p-10 rounded-[40px] border-4 text-left transition-all ${active ? 'border-stripe-indigo bg-stripe-indigo/5 shadow-2xl shadow-stripe-indigo/10' : 'border-slate-50 hover:border-slate-200 bg-slate-50'}`}
    >
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${active ? 'bg-stripe-indigo text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
          <Icon size={32} weight="fill" />
       </div>
       <h4 className={`text-xl font-black mb-4 ${active ? 'text-stripe-indigo' : 'text-slate-400'}`}>{title}</h4>
       <p className={`text-xs font-bold leading-relaxed ${active ? 'text-stripe-indigo/60' : 'text-slate-400 opacity-60'}`}>{desc}</p>
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
