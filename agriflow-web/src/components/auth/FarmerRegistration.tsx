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
    <div className="min-h-screen bg-[#0A0D14] mesh-gradient flex items-center justify-center p-6 lg:p-12 font-sans selection:bg-[#14b850]/30 selection:text-white text-white">
      <div className="w-full max-w-xl bg-white/[0.02] backdrop-blur-3xl rounded-[48px] shadow-[0_0_50px_rgba(20,184,80,0.1)] border border-white/[0.05] overflow-hidden relative">
        
        {/* Progress Bar */}
        {step !== 'SUCCESS' && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/[0.05]">
             <div 
               className="h-full bg-[#14b850] transition-all duration-700 shadow-[0_0_10px_rgba(20,184,80,0.8)]" 
               style={{ width: `${(Object.keys(stepMap).indexOf(step) + 1) / Object.keys(stepMap).length * 100}%` }}
             ></div>
          </div>
        )}

        <div className="p-10 lg:p-16">
          {step !== 'SUCCESS' && step !== 'PHONE' && (
            <button onClick={() => setStep(prevStep(step))} className="mb-10 flex items-center text-white/50 hover:text-white font-bold transition-colors">
               <CaretLeft size={16} weight="bold" className="mr-2" /> Kembali
            </button>
          )}

          {step === 'PHONE' && (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Daftar Petani</h2>
               <p className="text-white/60 font-bold mb-12">Masukkan nomor handphone Anda untuk memulai.</p>
               <div className="relative mb-10">
                  <Phone size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="tel" 
                    placeholder="Contoh: 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 focus:border-[#14b850]/50 transition-all font-bold text-lg text-white placeholder-white/20"
                  />
               </div>
               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all flex items-center justify-center group btn-premium">
                  Kirim OTP <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          )}

          {step === 'OTP' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Verifikasi OTP</h2>
               <p className="text-white/60 font-bold mb-12">Kami telah mengirim kode ke <span className="text-[#14b850]">{phone}</span>.</p>
               <div className="relative mb-8">
                  <ChatCircleDots size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="text" 
                    maxLength={6}
                    placeholder="Kode 6 Digit"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 focus:border-[#14b850]/50 transition-all font-bold text-2xl tracking-[0.5em] text-center text-white placeholder-white/20"
                  />
               </div>
               <p className="text-center text-sm font-bold text-white/40 mb-10">
                  Tidak menerima kode? <button className="text-[#14b850] hover:text-[#14b850]/80 transition-colors underline">Kirim Ulang (59s)</button>
               </p>
               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all flex items-center justify-center btn-premium">
                  Verifikasi & Lanjut
               </button>
            </div>
          )}

          {step === 'PROFILE_NAME' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Siapa Nama Anda?</h2>
               <p className="text-white/60 font-bold mb-12">Langkah 1/3: Informasi Dasar</p>
               <div className="space-y-6 mb-12">
                  <div className="relative">
                    <User size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg text-white placeholder-white/20"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Nama Panggilan"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 px-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg text-white placeholder-white/20"
                    />
                  </div>
               </div>
               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all btn-premium">
                  Lanjut ke Lokasi
               </button>
            </div>
          )}

          {step === 'PROFILE_LOCATION' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Dimana Lokasi Lahan?</h2>
               <p className="text-white/60 font-bold mb-12">Langkah 2/3: Pemetaan Wilayah</p>
               
               <button onClick={handleNext} className="w-full bg-[#14b850]/10 border border-[#14b850]/30 text-[#14b850] py-6 rounded-3xl font-black text-lg mb-8 flex items-center justify-center space-x-4 hover:bg-[#14b850]/20 transition-all">
                  <Gps size={28} weight="fill" />
                  <span>Gunakan GPS (Otomatis)</span>
               </button>

               <div className="relative mb-6 text-center">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.1] -z-10"></div>
                  <span className="bg-[#0A0D14] px-4 text-xs font-black text-white/40 uppercase tracking-widest">Atau Pilih Manual</span>
               </div>

               <div className="space-y-6 mb-12">
                  <select 
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 px-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg appearance-none text-white"
                  >
                    <option value="">Pilih Provinsi</option>
                    <option value="jatim">Jawa Timur</option>
                    <option value="jateng">Jawa Tengah</option>
                  </select>
                  <select 
                    value={regency}
                    onChange={(e) => setRegency(e.target.value)}
                    className="w-full bg-[#0A0D14]/50 border border-white/[0.1] rounded-3xl py-6 px-8 focus:outline-none focus:ring-2 focus:ring-[#14b850]/50 transition-all font-bold text-lg appearance-none text-white"
                  >
                    <option value="">Pilih Kabupaten</option>
                    <option value="kediri">Kediri</option>
                    <option value="nganjuk">Nganjuk</option>
                  </select>
               </div>
               <button onClick={handleNext} className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all btn-premium">
                  Lanjut ke Info Tanam
               </button>
            </div>
          )}

          {step === 'PROFILE_AGRI' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Apa yang Anda Tanam?</h2>
               <p className="text-white/60 font-bold mb-10">Langkah Terakhir: Detail Pertanian</p>
               
               <div className="mb-10">
                  <p className="text-xs font-black text-[#14b850] uppercase tracking-widest mb-4 opacity-80">Komoditas Utama (Bisa Pilih Banyak)</p>
                  <div className="flex flex-wrap gap-4">
                     {availableCrops.map(crop => (
                        <button 
                          key={crop.id}
                          onClick={() => toggleCrop(crop.id)}
                          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border flex items-center space-x-2 ${crops.includes(crop.id) ? 'bg-[#14b850]/20 text-[#14b850] border-[#14b850] shadow-[0_0_15px_rgba(20,184,80,0.2)]' : 'bg-white/[0.02] text-white/60 border-white/[0.1] hover:border-white/[0.2] hover:text-white'}`}
                        >
                           <span>{crop.emoji}</span>
                           <span>{crop.name}</span>
                        </button>
                     ))}
                  </div>
               </div>

               <div className="mb-12">
                  <div className="flex justify-between items-end mb-4">
                     <p className="text-xs font-black text-[#14b850] uppercase tracking-widest opacity-80">Luas Lahan Total</p>
                     <p className="text-2xl font-black text-[#14b850]">{landSize} <span className="text-sm opacity-60">Hektar</span></p>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="20" 
                    step="0.5"
                    value={landSize}
                    onChange={(e) => setLandSize(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[#14b850]"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                     <span>0.5 Ha</span>
                     <span>20 Ha</span>
                  </div>
               </div>

               <div className="flex items-center space-x-4 p-6 bg-white/[0.02] rounded-3xl border border-white/[0.1] mb-12">
                  <div className="w-10 h-10 bg-[#14b850]/20 rounded-xl flex items-center justify-center text-[#14b850]">
                     <Plant size={24} weight="fill" />
                  </div>
                  <p className="text-sm font-bold text-white">Terdaftar di Kelompok Tani / BUMDes?</p>
                  <div className="ml-auto">
                     <div className="w-12 h-6 bg-[#14b850] rounded-full relative shadow-[0_0_10px_rgba(20,184,80,0.5)]">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-[#0A0D14] rounded-full"></div>
                     </div>
                  </div>
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
               <h2 className="text-4xl font-black text-white tracking-tight mb-4">Pendaftaran Berhasil!</h2>
               <p className="text-white/60 font-bold mb-12 leading-relaxed px-8">
                  Selamat Pak {nickname || name}, akun Anda telah aktif. Anda kini terhubung ke ekosistem AgriFlow Nasional.
               </p>
               <Link href="/dashboard" className="inline-flex items-center justify-center bg-[#14b850] text-[#0A0D14] px-12 py-6 rounded-3xl font-black text-xl shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all group btn-premium">
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
