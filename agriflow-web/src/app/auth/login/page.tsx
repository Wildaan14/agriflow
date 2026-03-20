"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  ArrowRight, 
  ShieldCheck, 
  LockKey, 
  EnvelopeSimple,
  Fingerprint,
  Eye,
  EyeSlash,
  UserCircle
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
  { email: 'admin@agriflow.com', pass: 'admin2026', role: 'ADMIN' },
  { email: 'farmer@agriflow.com', pass: 'farmer123', role: 'FARMER' },
  { email: 'gov@agriflow.com', pass: 'gov123', role: 'GOVERNMENT' },
  { email: 'bumdes@agriflow.com', pass: 'bumdes123', role: 'BUMDES' },
  { email: 'buyer.local@agriflow.com', pass: 'buyer123', role: 'BUYER_LOCAL' },
  { email: 'buyer.export@agriflow.com', pass: 'export123', role: 'BUYER_EXPORT' },
  { email: 'data@agriflow.com', pass: 'data123', role: 'DATA_SUBSCRIBER' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login logic
    const account = DEMO_CREDENTIALS.find(acc => acc.email === email && acc.pass === password);
    
    setTimeout(() => {
      if (account) {
        document.cookie = `agriflow_role=${account.role}; path=/`;
        router.push('/dashboard');
      } else {
        alert("Invalid email or password. Use demo credentials shown below.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const quickFill = (acc: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(acc.email);
    setPassword(acc.pass);
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-8 selection:bg-stripe-violet selection:text-white">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Branding (Consistent with previous high-end style) */}
        <div className="hidden lg:block space-y-12 pr-12">
            <div className="flex items-center space-x-4 mb-20 animate-in fade-in slide-in-from-left-10 duration-700">
               <div className="w-16 h-16 bg-stripe-violet rounded-[24px] shadow-2xl shadow-stripe-violet/30 flex items-center justify-center text-white">
                  <Leaf size={36} weight="fill" />
               </div>
               <div>
                  <h1 className="text-4xl font-black text-stripe-indigo tracking-tighter">AgriFlow</h1>
                  <p className="text-[10px] font-black text-stripe-emerald uppercase tracking-[0.4em]">Digital Infrastructure</p>
               </div>
            </div>

            <h2 className="text-[72px] font-black text-stripe-indigo leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-left-10 delay-100 duration-700">
               Securing the <br />
               <span className="text-gradient">national</span> <br />
               food supply.
            </h2>

            <p className="text-xl font-bold text-stripe-slate opacity-60 leading-relaxed max-w-md animate-in fade-in slide-in-from-left-10 delay-200 duration-700">
               Please authenticate to access the National Command Center and all 14 ecosystem modules.
            </p>

            <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left-10 delay-300 duration-700">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <ShieldCheck size={20} className="text-stripe-emerald" />
               </div>
               <p className="text-sm font-black text-stripe-indigo uppercase tracking-wider">Verified System v2.4.0</p>
            </div>
        </div>

        {/* Right Side: Normal Login Form */}
        <div className="glass-card-premium rounded-[60px] p-12 lg:p-20 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-stripe-violet/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-14">
               <h3 className="text-4xl font-black text-stripe-indigo tracking-tight mb-2">Login</h3>
               <p className="text-[12px] font-black text-stripe-slate/40 uppercase tracking-widest">Digital ID Verification Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                     <EnvelopeSimple size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-slate opacity-30" />
                     <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@agency.gov.id"
                        className="w-full bg-slate-50 border border-slate-100 px-16 py-5 rounded-[24px] font-bold text-stripe-indigo focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 transition-all"
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest">Password</label>
                     <a href="#" className="text-[10px] font-black text-stripe-violet uppercase tracking-widest hover:underline">Forgot?</a>
                  </div>
                  <div className="relative">
                     <Fingerprint size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-stripe-slate opacity-30" />
                     <input 
                        type={showPass ? "text" : "password"} 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-100 px-16 py-5 rounded-[24px] font-bold text-stripe-indigo focus:outline-none focus:ring-4 focus:ring-stripe-indigo/5 transition-all"
                     />
                     <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-stripe-slate hover:text-stripe-indigo transition-colors"
                     >
                        {showPass ? <EyeSlash size={20} /> : <Eye size={20} />}
                     </button>
                  </div>
               </div>

               <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-stripe-indigo text-white py-6 rounded-[28px] font-black text-lg shadow-2xl shadow-stripe-indigo/20 hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center group disabled:opacity-50"
               >
                  {isLoading ? (
                     <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                     <>
                        <span>Continue to Command Center</span>
                        <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform" />
                     </>
                  )}
               </button>
            </form>

            <div className="mt-14 pt-8 border-t border-slate-100/50">
               <p className="text-[10px] font-black text-stripe-slate/50 uppercase tracking-[0.2em] mb-6">Demo Access (One-Click Fill)</p>
               <div className="grid grid-cols-2 gap-3">
                  {DEMO_CREDENTIALS.map((acc) => (
                     <button 
                        key={acc.role}
                        onClick={() => quickFill(acc)}
                        className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 hover:bg-stripe-indigo hover:text-white transition-all text-left group"
                     >
                        <UserCircle size={20} weight="fill" className="text-stripe-indigo/20 group-hover:text-white/40" />
                        <div>
                           <p className="text-[10px] font-black leading-none mb-1">{acc.role.replace('_', ' ')}</p>
                           <p className="text-[8px] font-bold opacity-40">{acc.email}</p>
                        </div>
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
