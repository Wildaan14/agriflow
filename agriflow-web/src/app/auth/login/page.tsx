"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint,
  Eye,
  EyeSlash,
  UserCircle,
  Scan,
  Cpu,
  Checks
} from '@phosphor-icons/react';

type UserRole = 
  | 'FARMER'           
  | 'BUYER_LOCAL'      
  | 'BUYER_EXPORT'     
  | 'GOVERNMENT'       
  | 'BUMDES'           
  | 'DATA_SUBSCRIBER'  
  | 'ADMIN';

const DEMO_CREDENTIALS = [
  { email: 'admin@agriflow.gov.id', pass: 'admin2026', role: 'ADMIN' },
  { email: 'petani@agriflow.id', pass: 'farmer123', role: 'FARMER' },
  { email: 'gov@pertanian.go.id', pass: 'gov123', role: 'GOVERNMENT' },
  { email: 'bumdes@desa.id', pass: 'bumdes123', role: 'BUMDES' },
  { email: 'buyer@market.id', pass: 'buyer123', role: 'BUYER_LOCAL' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const account = DEMO_CREDENTIALS.find(acc => acc.email === email && acc.pass === password);
    
    setTimeout(() => {
      if (account) {
        document.cookie = `agriflow_role=${account.role}; path=/`;
        router.push('/dashboard');
      } else {
        alert("Autentikasi gagal. Silakan gunakan kredensial demo.");
        setIsLoading(false);
      }
    }, 1500);
  };

  const quickFill = (acc: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(acc.email);
    setPassword(acc.pass);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center p-4 lg:p-8 selection:bg-[#14b850] selection:text-white font-sans overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#14b850]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-[1400px] w-full h-[85vh] min-h-[700px] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[40px] flex overflow-hidden z-10 shadow-2xl shadow-black/50">
        
        {/* Left Side: Brand & Visual Context */}
        <div className="hidden lg:flex flex-col justify-between w-[45%] p-16 relative overflow-hidden bg-gradient-to-br from-[#14b850]/10 to-transparent border-r border-white/[0.05]">
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-16">
              <div className="w-14 h-14 bg-[#14b850] rounded-2xl flex items-center justify-center text-[#0A0D14] shadow-[0_0_40px_rgba(20,184,80,0.4)]">
                <Leaf size={32} weight="fill" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">AgriFlow</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#14b850] animate-pulse" />
                  <p className="text-[10px] font-bold text-[#14b850] uppercase tracking-widest">Sistem Aktif</p>
                </div>
              </div>
            </div>

            <h2 className="text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-6">
              Sistem <span className="text-[#14b850]">Ketahanan</span><br /> Pangan Nasional.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-md font-light">
              Portal autentikasi terpusat untuk verifikasi ID digital petani, distributor, dan instansi pemerintah.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-2xl">
              <ShieldCheck size={24} className="text-[#14b850] mb-3" />
              <p className="text-white font-medium text-sm">Enkripsi E2E</p>
              <p className="text-white/40 text-xs mt-1">Data tersertifikasi BSSN</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-2xl">
              <Cpu size={24} className="text-[#0ea5e9] mb-3" />
              <p className="text-white font-medium text-sm">AI Matching</p>
              <p className="text-white/40 text-xs mt-1">Algoritma prediktif cerdas</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Panel */}
        <div className="w-full lg:w-[55%] p-10 lg:p-20 flex flex-col justify-center relative bg-[#0A0D14]/50">
          <div className="max-w-md w-full mx-auto">
            
            <div className="mb-10 text-center lg:text-left">
              <div className="inline-flex items-center justify-center space-x-2 bg-[#14b850]/10 text-[#14b850] px-4 py-2 rounded-full mb-6 border border-[#14b850]/20">
                <Fingerprint size={16} weight="bold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verifikasi ID Digital</span>
              </div>
              <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">Selamat Datang</h3>
              <p className="text-white/50 text-sm">Masuk menggunakan ID AgriFlow Anda.</p>
            </div>

            {/* Toggle Login Method */}
            <div className="flex p-1 bg-white/[0.03] rounded-2xl mb-8 border border-white/[0.05]">
              <button 
                onClick={() => setScanMode(false)}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${!scanMode ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Gunakan Email
              </button>
              <button 
                onClick={() => setScanMode(true)}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${scanMode ? 'bg-[#14b850]/20 text-[#14b850] shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Biometrik / Scan
              </button>
            </div>

            {!scanMode ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-white/60 uppercase tracking-wider ml-1">Email / ID Pengguna</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@pertanian.go.id"
                      className="w-full bg-white/[0.03] border border-white/[0.1] text-white px-5 py-4 rounded-2xl font-medium focus:outline-none focus:border-[#14b850] focus:bg-[#14b850]/5 transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Kata Sandi</label>
                    <a href="#" className="text-[11px] font-semibold text-[#14b850] hover:underline">Lupa Sandi?</a>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPass ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/[0.03] border border-white/[0.1] text-white px-5 py-4 rounded-2xl font-medium focus:outline-none focus:border-[#14b850] focus:bg-[#14b850]/5 transition-all placeholder:text-white/20"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPass ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#14b850] text-[#0A0D14] py-4 rounded-2xl font-bold text-base shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center group disabled:opacity-50 disabled:hover:translate-y-0 mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#0A0D14]/30 border-t-[#0A0D14] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Autentikasi Sekarang</span>
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 bg-white/[0.02] border border-white/[0.05] rounded-3xl border-dashed">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#14b850]/20 rounded-full blur-2xl animate-pulse" />
                  <Scan size={80} weight="light" className="text-[#14b850] relative z-10" />
                </div>
                <p className="text-white font-medium mt-6">Pindai Wajah atau Sidik Jari</p>
                <p className="text-white/40 text-sm mt-2 text-center px-8">Gunakan aplikasi AgriFlow Mobile untuk scan QR atau masuk dengan biometrik.</p>
              </div>
            )}

            {/* Quick Login Demo */}
            <div className="mt-12 pt-8 border-t border-white/[0.05]">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-4">Akses Cepat (Demo Mode)</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {DEMO_CREDENTIALS.map((acc) => (
                  <button 
                    key={acc.role}
                    onClick={() => quickFill(acc)}
                    className="flex flex-col items-start p-3 rounded-xl bg-white/[0.03] hover:bg-[#14b850]/10 border border-transparent hover:border-[#14b850]/30 transition-all group"
                  >
                    <p className="text-[11px] font-bold text-white/80 group-hover:text-[#14b850] mb-1">{acc.role}</p>
                    <p className="text-[9px] text-white/40 truncate w-full text-left">{acc.email}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
