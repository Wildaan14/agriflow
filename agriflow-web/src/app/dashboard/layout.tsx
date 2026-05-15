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
    className={`flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group ${
      active 
      ? 'bg-[#1B4D1B]/5 border border-[#1B4D1B]/10 text-[#1B4D1B] font-bold shadow-sm' 
      : 'text-slate-500 border border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-100 font-semibold'
    }`}
  >
    <div className="flex items-center space-x-4">
      <Icon size={20} weight={active ? "fill" : "regular"} className={active ? "text-[#1B4D1B]" : "text-slate-400 group-hover:text-slate-600 transition-colors"} />
      <span className="text-[13px] tracking-wide">{label}</span>
    </div>
    {active && <CaretRight size={14} weight="bold" className="text-[#1B4D1B]" />}
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
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden selection:bg-[#1B4D1B] selection:text-white relative text-slate-900">
      {/* Premium Sidebar */}
      <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-full z-20 shrink-0 shadow-sm relative">
        <div className="flex items-center space-x-3 p-8">
          <div className="w-10 h-10 bg-[#1B4D1B] rounded-xl flex items-center justify-center shadow-md">
            <Leaf size={24} weight="fill" className="text-white" />
          </div>
          <div>
            <span className="text-[18px] font-bold text-slate-900 tracking-tight block leading-none">AgriFlow</span>
            <span className="text-[9px] font-bold text-[#14b850] uppercase tracking-[0.2em]">Command Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 overflow-y-auto no-scrollbar scroll-smooth pb-6">
          {filteredSidebarItems.map((item, index) => (
            'category' in item ? (
              <p key={`cat-${index}`} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 pt-6 pb-2 mt-2">
                {item.category}
              </p>
            ) : (
              <SidebarItem 
                key={index}
                icon={item.icon} 
                label={item.label} 
                href={item.href} 
                active={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')} 
              />
            )
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="bg-[#1B4D1B]/5 p-4 rounded-xl border border-[#1B4D1B]/10 relative overflow-hidden mb-4">
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#1B4D1B]/10 rounded-full blur-xl"></div>
             <p className="text-[11px] font-bold text-[#1B4D1B] flex items-center tracking-wide">
               <ShieldCheck size={16} className="mr-2" weight="fill" /> Gateway Aktif
             </p>
          </div>
          <SidebarItem icon={UserCircle} label="Pengaturan Profil" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-10 z-50 shrink-0 shadow-sm">
          <div className="relative w-[400px] group">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1B4D1B] transition-colors" size={18} weight="bold" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari komoditas, petani, atau data spasial..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-11 pr-4 focus:outline-none focus:border-[#1B4D1B] focus:ring-2 focus:ring-[#1B4D1B]/10 transition-all text-[13px] text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all text-slate-600 hover:text-slate-900">
              <Bell size={18} weight="bold" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            {(isSignedIn || userRole) && (
              <div className="flex items-center space-x-3 bg-white border border-slate-200 p-1.5 pr-5 rounded-full hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group" onClick={handleLogout}>
                {isSignedIn ? (
                    <PremiumUserButton />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1B4D1B]/10 border border-[#1B4D1B]/20 flex items-center justify-center font-bold text-[#1B4D1B] text-sm group-hover:scale-105 transition-transform">
                      {userRole.charAt(0)}
                    </div>
                )}
                <div className="text-left hidden xl:block">
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">Sesi Aktif</p>
                  <p className="text-[9px] font-bold text-[#1B4D1B] uppercase tracking-widest leading-none">{userRole.replace('_', ' ')}</p>
                </div>
              </div>
            )}
            
            {(!isSignedIn && !userRole) && (
              <SignInButton mode="modal">
                <button className="px-5 py-2 bg-[#1B4D1B] text-white rounded-xl font-bold shadow-[0_4px_14px_0_rgba(27,77,27,0.39)] hover:shadow-[0_6px_20px_rgba(27,77,27,0.23)] hover:bg-[#133813] active:scale-95 transition-all text-xs tracking-wide">
                  Masuk Portal
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
