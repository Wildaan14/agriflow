"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  House, 
  MapTrifold, 
  Storefront, 
  Truck, 
  ChartLineUp, 
  Bell, 
  UserCircle,
  MagnifyingGlass,
  Sparkle,
  CaretRight,
  MagicWand,
  QrCode,
  ShieldCheck,
  Cube,
  Globe,
  Warning,
  Star,
  Leaf,
  Users,
  Database,
  Vault
} from '@phosphor-icons/react';
import { useAuth, SignInButton } from "@clerk/nextjs";
import { PremiumUserButton } from '@/components/auth/user-button';

// 7 Types of Accounts according to "Alur Sistem Lengkap"
export type UserRole = 
  | 'FARMER'           // Petani
  | 'BUYER_LOCAL'      // Pembeli Lokal
  | 'BUYER_EXPORT'     // Buyer Ekspor
  | 'GOVERNMENT'       // Pemerintah/B2G
  | 'BUMDES'           // Agen BUMDes
  | 'DATA_SUBSCRIBER'  // Data Subscriber
  | 'ADMIN';           // Admin Platform

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  roles?: UserRole[];
}

const SidebarItem = ({ icon: Icon, label, href, active = false }: SidebarItemProps) => (
  <Link 
    href={href}
    className={`flex items-center justify-between px-6 py-3.5 rounded-[22px] transition-all duration-300 group ${
      active 
      ? 'bg-stripe-indigo text-white shadow-xl shadow-stripe-indigo/20 scale-[1.02]' 
      : 'text-stripe-slate hover:bg-white hover:text-stripe-indigo hover:shadow-lg'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-white/20' : 'bg-stripe-indigo/5 group-hover:bg-stripe-indigo/10'}`}>
        <Icon size={20} weight={active ? "fill" : "bold"} className={active ? "text-white" : "opacity-60 group-hover:opacity-100 transition-opacity"} />
      </div>
      <span className="font-black text-[14px] tracking-tight">{label}</span>
    </div>
    {active && <CaretRight size={14} weight="bold" className="text-white/40" />}
  </Link>
);

type SidebarNavItem = (SidebarItemProps & { category?: never }) | { category: string; icon?: never; label?: never; href?: never; roles?: never; active?: never };

const SIDEBAR_ITEMS: SidebarNavItem[] = [
  { icon: House, label: "Overview", href: "/dashboard", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL', 'BUYER_EXPORT', 'GOVERNMENT', 'BUMDES', 'DATA_SUBSCRIBER'] },
  
  { category: "Market & Trade" },
  { icon: Storefront, label: "Marketplace", href: "/dashboard/marketplace", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL', 'BUYER_EXPORT'] },
  { icon: Globe, label: "Export Gateway", href: "/dashboard/export", roles: ['ADMIN', 'FARMER', 'BUYER_EXPORT'] },

  { category: "Supply Chain" },
  { icon: Cube, label: "Blockchain Trace", href: "/dashboard/trace", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL', 'BUYER_EXPORT'] },
  { icon: Truck, label: "Smart Logistics", href: "/dashboard/logistics", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL'] },
  { icon: MapTrifold, label: "Intelligence Map", href: "/dashboard/supply-map", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL', 'GOVERNMENT'] },

  { category: "Agri-Finance" },
  { icon: ShieldCheck, label: "Asuransi Mikro", href: "/dashboard/insurance", roles: ['ADMIN', 'FARMER'] },
  { icon: Star, label: "AgriScore", href: "/dashboard/score", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL', 'BUMDES'] },
  { icon: Vault, label: "Subsidi & Wallet", href: "/dashboard/subsidy", roles: ['ADMIN', 'GOVERNMENT', 'FARMER'] },

  { category: "Command & Data" },
  { icon: Warning, label: "National EWS", href: "/dashboard/ews", roles: ['ADMIN', 'GOVERNMENT'] },
  { icon: ChartLineUp, label: "Market Analytics", href: "/dashboard/analytics", roles: ['ADMIN', 'FARMER', 'GOVERNMENT', 'DATA_SUBSCRIBER'] },
  { icon: Database, label: "Data Market", href: "/dashboard/data", roles: ['ADMIN', 'GOVERNMENT', 'BUYER_EXPORT', 'DATA_SUBSCRIBER'] },

  { category: "Ecosystem Hub" },
  { icon: Leaf, label: "Disease Detector", href: "/dashboard/disease", roles: ['ADMIN', 'FARMER', 'BUYER_LOCAL'] },
  { icon: Users, label: "BUMDes Network", href: "/dashboard/bumdes", roles: ['ADMIN', 'BUMDES'] },
];


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  
  // Local state for role - defaulting to 'ADMIN' if cookie is set or 'FARMER'
  const [userRole, setUserRole] = useState<UserRole>('FARMER');

  useEffect(() => {
    // Client-side cookie reading
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const savedRole = getCookie('agriflow_role') as UserRole;
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  const handleSetRole = (role: UserRole) => {
    setUserRole(role);
    document.cookie = `agriflow_role=${role}; path=/`;
  };

  const handleLogout = () => {
    document.cookie = "agriflow_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/auth/login');
  };

  const filteredSidebarItems = SIDEBAR_ITEMS.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="flex h-screen mesh-gradient font-sans overflow-hidden selection:bg-stripe-violet selection:text-white">
      {/* Premium Sidebar */}
      <aside className="w-[320px] glass-card-premium m-6 rounded-[40px] p-8 flex flex-col h-[calc(100vh-48px)] z-50 shrink-0">
        <div className="flex items-center space-x-4 mb-12 px-4 group cursor-pointer">
          <div className="w-14 h-14 bg-stripe-indigo rounded-[22px] flex items-center justify-center shadow-2xl shadow-stripe-indigo/40 group-hover:rotate-[10deg] transition-all duration-500">
            <span className="text-white font-black text-[28px] tracking-tighter">A</span>
          </div>
          <div>
            <span className="text-[24px] font-black text-stripe-indigo tracking-tighter block leading-none">AgriFlow</span>
            <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-[0.3em]">Command Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 px-2 overflow-y-auto no-scrollbar scroll-smooth">
          {filteredSidebarItems.map((item, index) => (
            'category' in item ? (
              <p key={`cat-${index}`} className="text-[10px] font-black text-stripe-slate/40 uppercase tracking-[0.2em] px-6 pt-5 pb-1 mt-2 border-t border-stripe-indigo/5 first:border-0 first:mt-0">
                {item.category}
              </p>
            ) : (
              <SidebarItem 
                key={index}
                icon={item.icon} 
                label={item.label} 
                href={item.href} 
                active={pathname === item.href} 
              />
            )
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-stripe-indigo/5 space-y-4">
            <div className="bg-stripe-violet/5 p-6 rounded-[28px] border border-stripe-violet/10 relative overflow-hidden group/upgrade cursor-pointer hover:bg-stripe-violet/10 transition-all">
               <div className="absolute top-0 right-0 w-20 h-20 bg-stripe-emerald/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
               <p className="text-[12px] font-bold text-stripe-slate leading-relaxed">AgriFlow Intelligence Gateway active.</p>
            </div>
          <SidebarItem icon={UserCircle} label="Profile" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-24 bg-transparent flex items-center justify-between px-14 z-50 shrink-0">
          <div className="relative w-[500px] group">
            <MagnifyingGlass className="absolute left-8 top-1/2 -translate-y-1/2 text-stripe-slate opacity-40 group-focus-within:opacity-100 group-focus-within:text-stripe-violet transition-all" size={24} />
            <input 
              type="text" 
              placeholder="Search data, farmers, or markets..."
              className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 group-hover:bg-white/60 rounded-[28px] py-4 pl-20 pr-10 focus:outline-none focus:ring-4 focus:ring-stripe-violet/5 transition-all shadow-sm focus:shadow-2xl font-bold text-[16px] text-stripe-indigo placeholder:text-stripe-slate/40"
            />
          </div>

          <div className="flex items-center space-x-8">
            <button className="relative p-4 bg-white/40 backdrop-blur-xl rounded-[22px] border border-white/60 hover:bg-white hover:shadow-2xl transition-all text-stripe-indigo group">
              <Bell size={28} weight="bold" className="opacity-70 group-hover:opacity-100" />
              <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-[3px] border-white shadow-lg"></span>
            </button>
            
            {(isSignedIn || userRole) && (
              <div 
                onClick={handleLogout}
                className="flex items-center space-x-5 bg-white/40 backdrop-blur-xl p-2.5 pr-8 rounded-[30px] border border-white/60 shadow-sm hover:shadow-2xl hover:bg-white transition-all cursor-pointer group"
              >
                <PremiumUserButton />
                <div className="text-left hidden xl:block">
                  <p className="text-[14px] font-black text-stripe-indigo tracking-tight mb-0.5">Control Panel</p>
                  <p className="text-[9px] font-black text-stripe-indigo uppercase opacity-50 tracking-widest leading-none">{userRole.replace('_', ' ')}</p>
                </div>
              </div>
            )}
            
            {(!isSignedIn && !userRole) && (
              <SignInButton mode="modal">
                <button className="px-8 py-3.5 bg-stripe-violet text-white rounded-[22px] font-black shadow-2xl shadow-stripe-violet/20 hover:scale-105 active:scale-95 transition-all">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-14 pb-14 mt-4 scroll-smooth">
          <div className="max-w-[1600px] mx-auto pt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
