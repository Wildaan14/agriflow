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
  CaretRight,
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

export type UserRole = 
  | 'FARMER'
  | 'BUYER_LOCAL'
  | 'BUYER_EXPORT'
  | 'GOVERNMENT'
  | 'BUMDES'
  | 'DATA_SUBSCRIBER'
  | 'ADMIN';

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
    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
      active 
      ? 'bg-[#14b850]/10 border border-[#14b850]/20 text-[#14b850]' 
      : 'text-white/50 border border-transparent hover:bg-white/[0.03] hover:text-white hover:border-white/[0.05]'
    }`}
  >
    <div className="flex items-center space-x-4">
      <Icon size={20} weight={active ? "fill" : "regular"} className={active ? "text-[#14b850]" : "opacity-80"} />
      <span className="font-semibold text-[13px] tracking-wide">{label}</span>
    </div>
    {active && <CaretRight size={14} weight="bold" className="text-[#14b850]" />}
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
  
  const [userRole, setUserRole] = useState<UserRole>('FARMER');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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

  const handleLogout = () => {
    document.cookie = "agriflow_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/auth/login');
  };

  const filteredSidebarItems = SIDEBAR_ITEMS.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="flex h-screen bg-[#0A0D14] font-sans overflow-hidden selection:bg-[#14b850] selection:text-[#0A0D14] relative text-white">
      {/* Background Visuals */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#14b850]/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Premium Sidebar */}
      <aside className="w-[300px] bg-white/[0.02] border-r border-white/[0.05] flex flex-col h-full z-20 shrink-0 backdrop-blur-2xl">
        <div className="flex items-center space-x-3 p-8">
          <div className="w-10 h-10 bg-[#14b850] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(20,184,80,0.4)]">
            <Leaf size={24} weight="fill" className="text-[#0A0D14]" />
          </div>
          <div>
            <span className="text-[18px] font-bold text-white tracking-tight block leading-none">AgriFlow</span>
            <span className="text-[9px] font-bold text-[#14b850] uppercase tracking-[0.2em]">Command Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 overflow-y-auto no-scrollbar scroll-smooth">
          {filteredSidebarItems.map((item, index) => (
            'category' in item ? (
              <p key={`cat-${index}`} className="text-[9px] font-bold text-white/30 uppercase tracking-widest px-5 pt-6 pb-2 mt-2">
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

        <div className="p-4 border-t border-white/[0.05]">
          <div className="bg-[#14b850]/10 p-4 rounded-2xl border border-[#14b850]/20 relative overflow-hidden mb-4">
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#14b850]/30 rounded-full blur-xl"></div>
             <p className="text-[11px] font-medium text-[#14b850] flex items-center">
               <ShieldCheck size={14} className="mr-2" /> Gateway Aktif
             </p>
          </div>
          <SidebarItem icon={UserCircle} label="Pengaturan Profil" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="h-20 bg-white/[0.01] border-b border-white/[0.05] flex items-center justify-between px-10 z-50 shrink-0 backdrop-blur-xl">
          <div className="relative w-[400px] group">
            <MagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#14b850] transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari data, petani, atau pasar..."
              className="w-full bg-white/[0.03] border border-white/[0.1] rounded-full py-2.5 pl-12 pr-6 focus:outline-none focus:border-[#14b850]/50 focus:bg-[#14b850]/5 transition-all text-[13px] text-white placeholder:text-white/30"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2.5 bg-white/[0.03] border border-white/[0.1] rounded-full hover:bg-white/[0.1] transition-all text-white/70 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#14b850] rounded-full shadow-[0_0_10px_rgba(20,184,80,0.8)]"></span>
            </button>
            
            {(isSignedIn || userRole) && (
              <div className="flex items-center space-x-4 bg-white/[0.03] border border-white/[0.1] p-1.5 pr-6 rounded-full hover:bg-white/[0.05] transition-all cursor-pointer" onClick={handleLogout}>
                {isSignedIn ? (
                    <PremiumUserButton />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[#14b850]/20 border border-[#14b850]/30 flex items-center justify-center font-bold text-[#14b850] text-sm">
                      {userRole.charAt(0)}
                    </div>
                )}
                <div className="text-left hidden xl:block">
                  <p className="text-[12px] font-semibold text-white leading-tight">Sesi Aktif</p>
                  <p className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest leading-none">{userRole.replace('_', ' ')}</p>
                </div>
              </div>
            )}
            
            {(!isSignedIn && !userRole) && (
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-[#14b850] text-[#0A0D14] rounded-full font-bold shadow-[0_0_15px_rgba(20,184,80,0.3)] hover:scale-105 active:scale-95 transition-all text-sm">
                  Masuk
                </button>
              </SignInButton>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 scroll-smooth">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
