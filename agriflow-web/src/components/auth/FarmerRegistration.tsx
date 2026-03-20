"use client";

import React, { useState } from 'react';
import { 
  Phone, 
  ChatCircleDots, 
  User, 
  MapPin, 
  Plant, 
  ArrowRight, 
  CheckCircle,
  CaretLeft,
  Gps
} from '@phosphor-icons/react';
import Link from 'next/link';

type Step = 'PHONE' | 'OTP' | 'PROFILE_NAME' | 'PROFILE_LOCATION' | 'PROFILE_AGRI' | 'SUCCESS';

export default function FarmerRegistration() {
  const [step, setStep] = useState<Step>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [province, setProvince] = useState('');
  const [regency, setRegency] = useState('');
  const [crops, setCrops] = useState<string[]>([]);
  const [landSize, setLandSize] = useState(1);

  const availableCrops = [
    { id: 'padi', name: 'Padi', emoji: '🌾' },
    { id: 'jagung', name: 'Jagung', emoji: '🌽' },
    { id: 'cabai', name: 'Cabai', emoji: '🌶️' },
    { id: 'bawang', name: 'Bawang Merah', emoji: '🧅' },
    { id: 'tomat', name: 'Tomat', emoji: '🍅' },
    { id: 'kopi', name: 'Kopi', emoji: '☕' },
  ];

  const handleNext = () => {
    if (step === 'PHONE') setStep('OTP');
    else if (step === 'OTP') setStep('PROFILE_NAME');
    else if (step === 'PROFILE_NAME') setStep('PROFILE_LOCATION');
    else if (step === 'PROFILE_LOCATION') setStep('PROFILE_AGRI');
    else if (step === 'PROFILE_AGRI') setStep('SUCCESS');
  };

  const toggleCrop = (id: string) => {
    if (crops.includes(id)) setCrops(crops.filter(c => c !== id));
    else setCrops([...crops, id]);
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-6 lg:p-12 font-sans selection:bg-stripe-violet selection:text-white">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-3xl rounded-[48px] shadow-[0_50px_100px_-20px_rgba(30,30,80,0.15)] border border-white overflow-hidden relative">
        
        {/* Progress Bar */}
        {step !== 'SUCCESS' && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
             <div 
               className="h-full bg-stripe-emerald transition-all duration-700" 
               style={{ width: `${(Object.keys(stepMap).indexOf(step) + 1) / Object.keys(stepMap).length * 100}%` }}
             ></div>
          </div>
        )}

        <div className="p-10 lg:p-16">
          {step !== 'SUCCESS' && step !== 'PHONE' && (
            <button onClick={() => setStep(prevStep(step))} className="mb-10 flex items-center text-stripe-slate hover:text-stripe-indigo font-bold transition-colors">
               <CaretLeft size={16} weight="bold" className="mr-2" /> Kembali
            </button>
          )}

          {step === 'PHONE' && (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Daftar Petani</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-70">Masukkan nomor handphone Anda untuk memulai.</p>
               <div className="relative mb-10">
                  <Phone size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-indigo opacity-40" />
                  <input 
                    type="tel" 
                    placeholder="Contoh: 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 focus:border-stripe-indigo/20 transition-all font-bold text-lg"
                  />
               </div>
               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all flex items-center justify-center group">
                  Kirim OTP <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          )}

          {step === 'OTP' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Verifikasi OTP</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-70">Kami telah mengirim kode ke <span className="text-stripe-indigo">{phone}</span>.</p>
               <div className="relative mb-8">
                  <ChatCircleDots size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-indigo opacity-40" />
                  <input 
                    type="text" 
                    maxLength={6}
                    placeholder="Kode 6 Digit"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 focus:border-stripe-indigo/20 transition-all font-bold text-2xl tracking-[0.5em] text-center"
                  />
               </div>
               <p className="text-center text-sm font-bold text-stripe-slate opacity-60 mb-10">
                  Tidak menerima kode? <button className="text-stripe-indigo underline">Kirim Ulang (59s)</button>
               </p>
               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center">
                  Verifikasi & Lanjut
               </button>
            </div>
          )}

          {step === 'PROFILE_NAME' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Siapa Nama Anda?</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-70">Langkah 1/3: Informasi Dasar</p>
               <div className="space-y-6 mb-12">
                  <div className="relative">
                    <User size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-indigo opacity-40" />
                    <input 
                      type="text" 
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 transition-all font-bold text-lg"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Nama Panggilan"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 px-8 focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 transition-all font-bold text-lg"
                    />
                  </div>
               </div>
               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all">
                  Lanjut ke Lokasi
               </button>
            </div>
          )}

          {step === 'PROFILE_LOCATION' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Dimana Lokasi Lahan?</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-70">Langkah 2/3: Pemetaan Wilayah</p>
               
               <button onClick={handleNext} className="w-full bg-stripe-emerald/10 border border-stripe-emerald/20 text-stripe-emerald py-6 rounded-3xl font-black text-lg mb-8 flex items-center justify-center space-x-4 hover:bg-stripe-emerald/20 transition-all">
                  <Gps size={28} weight="fill" />
                  <span>Gunakan GPS (Otomatis)</span>
               </button>

               <div className="relative mb-6 text-center">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10"></div>
                  <span className="bg-white px-4 text-xs font-black text-stripe-slate uppercase tracking-widest opacity-40">Atau Pilih Manual</span>
               </div>

               <div className="space-y-6 mb-12">
                  <select 
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 px-8 focus:outline-none transition-all font-bold text-lg appearance-none"
                  >
                    <option value="">Pilih Provinsi</option>
                    <option value="jatim">Jawa Timur</option>
                    <option value="jateng">Jawa Tengah</option>
                  </select>
                  <select 
                    value={regency}
                    onChange={(e) => setRegency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-6 px-8 focus:outline-none transition-all font-bold text-lg appearance-none"
                  >
                    <option value="">Pilih Kabupaten</option>
                    <option value="kediri">Kediri</option>
                    <option value="nganjuk">Nganjuk</option>
                  </select>
               </div>
               <button onClick={handleNext} className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all">
                  Lanjut ke Info Tanam
               </button>
            </div>
          )}

          {step === 'PROFILE_AGRI' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Apa yang Anda Tanam?</h2>
               <p className="text-stripe-slate font-bold mb-10 opacity-70">Langkah Terakhir: Detail Pertanian</p>
               
               <div className="mb-10">
                  <p className="text-xs font-black text-stripe-indigo uppercase tracking-widest mb-4 opacity-60">Komoditas Utama (Bisa Pilih Banyak)</p>
                  <div className="flex flex-wrap gap-4">
                     {availableCrops.map(crop => (
                        <button 
                          key={crop.id}
                          onClick={() => toggleCrop(crop.id)}
                          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border flex items-center space-x-2 ${crops.includes(crop.id) ? 'bg-stripe-indigo text-white border-stripe-indigo shadow-lg' : 'bg-white text-stripe-slate border-slate-200 hover:border-stripe-indigo/40'}`}
                        >
                           <span>{crop.emoji}</span>
                           <span>{crop.name}</span>
                        </button>
                     ))}
                  </div>
               </div>

               <div className="mb-12">
                  <div className="flex justify-between items-end mb-4">
                     <p className="text-xs font-black text-stripe-indigo uppercase tracking-widest opacity-60">Luas Lahan Total</p>
                     <p className="text-2xl font-black text-stripe-indigo">{landSize} <span className="text-sm opacity-40">Hektar</span></p>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="20" 
                    step="0.5"
                    value={landSize}
                    onChange={(e) => setLandSize(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-stripe-indigo"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-black text-stripe-slate uppercase tracking-widest opacity-30">
                     <span>0.5 Ha</span>
                     <span>20 Ha</span>
                  </div>
               </div>

               <div className="flex items-center space-x-4 p-6 bg-stripe-indigo/5 rounded-3xl border border-stripe-indigo/10 mb-12">
                  <div className="w-10 h-10 bg-stripe-indigo/10 rounded-xl flex items-center justify-center text-stripe-indigo">
                     <Plant size={24} weight="fill" />
                  </div>
                  <p className="text-sm font-bold text-stripe-indigo">Terdaftar di Kelompok Tani / BUMDes?</p>
                  <div className="ml-auto">
                     <div className="w-12 h-6 bg-stripe-indigo rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                  </div>
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
               <h2 className="text-4xl font-black text-stripe-indigo tracking-tight mb-4">Pendaftaran Berhasil!</h2>
               <p className="text-stripe-slate font-bold mb-12 opacity-70 leading-relaxed px-8">
                  Selamat Pak {nickname || name}, akun Anda telah aktif. Anda kini terhubung ke ekosistem AgriFlow Nasional.
               </p>
               <Link href="/dashboard" className="inline-flex items-center justify-center bg-stripe-indigo text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-black transition-all group">
                  Masuk ke Dashboard <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const stepMap: Record<Step, string> = {
  PHONE: 'Nomor HP',
  OTP: 'Verifikasi',
  PROFILE_NAME: 'Nama',
  PROFILE_LOCATION: 'Lokasi',
  PROFILE_AGRI: 'Pertanian',
  SUCCESS: 'Selesai'
};

const prevStep = (current: Step): Step => {
  const steps: Step[] = ['PHONE', 'OTP', 'PROFILE_NAME', 'PROFILE_LOCATION', 'PROFILE_AGRI', 'SUCCESS'];
  const idx = steps.indexOf(current);
  return steps[Math.max(0, idx - 1)];
};
