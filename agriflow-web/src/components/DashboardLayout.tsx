"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { PremiumUserButton } from './auth/user-button';

export type UserRole = 'ADMIN' | 'FARMER' | 'BUYER' | 'GOVERNMENT';

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
    className={`flex items-center justify-between px-6 py-2.5 rounded-[18px] transition-all duration-300 group ${
      active 
      ? 'bg-stripe-indigo text-white shadow-xl shadow-stripe-indigo/20' 
      : 'text-[#2D3748] hover:bg-white/60 hover:text-stripe-indigo hover:shadow-sm'
    }`}
  >
    <div className="flex items-center space-x-3">
      <Icon size={20} weight={active ? "fill" : "bold"} className={active ? "text-stripe-emerald" : "opacity-50 group-hover:opacity-100 transition-opacity"} />
      <span className="font-bold text-[13px] tracking-tight">{label}</span>
    </div>
    {active && <CaretRight size={12} weight="bold" className="text-white/40" />}
  </Link>
);

type SidebarNavItem = (SidebarItemProps & { category?: never }) | { category: string; icon?: never; label?: never; href?: never; roles?: never; active?: never };

const SIDEBAR_ITEMS: SidebarNavItem[] = [
  { category: "Intelligence & Logistics" },
  { icon: House, label: "Overview", href: "/dashboard", roles: ['ADMIN', 'FARMER', 'BUYER', 'GOVERNMENT'] },
  { icon: MapTrifold, label: "Intelligence Map", href: "/dashboard/supply-map", roles: ['ADMIN', 'FARMER', 'GOVERNMENT'] },
  { icon: Storefront, label: "Marketplace", href: "/dashboard/marketplace", roles: ['ADMIN', 'BUYER'] },
  { icon: Truck, label: "Smart Logistics", href: "/dashboard/logistics", roles: ['ADMIN', 'FARMER', 'BUYER'] },
  { icon: ChartLineUp, label: "Harga Prediktif", href: "/dashboard/analytics", roles: ['ADMIN', 'BUYER', 'GOVERNMENT'] },
  
  { category: "Financial Services" },
  { icon: QrCode, label: "QRIS & Tabungan", href: "/dashboard/payments", roles: ['FARMER', 'BUYER'] },
  { icon: ShieldCheck, label: "Asuransi Mikro", href: "/dashboard/insurance", roles: ['FARMER'] },
  { icon: Star, label: "AgriScore", href: "/dashboard/score", roles: ['FARMER', 'ADMIN'] },
  { icon: Globe, label: "Export Gateway", href: "/dashboard/export", roles: ['ADMIN', 'BUYER'] },

  { category: "Transparency & Food Security" },
  { icon: Cube, label: "Blockchain Trace", href: "/dashboard/trace", roles: ['BUYER', 'GOVERNMENT', 'ADMIN'] },
  { icon: Warning, label: "Early Warning", href: "/dashboard/ews", roles: ['GOVERNMENT', 'ADMIN'] },
  { icon: Leaf, label: "Disease Detector", href: "/dashboard/disease", roles: ['FARMER'] },
  { icon: Database, label: "Data Market", href: "/dashboard/data", roles: ['ADMIN', 'GOVERNMENT'] },

  { category: "Governance & Community" },
  { icon: Vault, label: "Subsidi Dashboard", href: "/dashboard/subsidy", roles: ['GOVERNMENT', 'ADMIN'] },
  { icon: Users, label: "BUMDes Network", href: "/dashboard/bumdes", roles: ['GOVERNMENT', 'ADMIN', 'FARMER'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  
  // Simulated Role - Set to ADMIN for the current user session
  const userRole: UserRole = 'ADMIN';

  const filteredSidebarItems = SIDEBAR_ITEMS.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="flex h-screen mesh-gradient font-sans overflow-hidden selection:bg-stripe-violet selection:text-white">
      {/* Premium Sidebar */}
      <aside className="w-[320px] glass-card-premium m-6 rounded-[40px] p-8 flex flex-col h-[calc(100vh-48px)] z-50">
        <div className="flex items-center space-x-4 mb-16 px-4 group cursor-pointer">
          <div className="w-14 h-14 bg-stripe-indigo rounded-[22px] flex items-center justify-center shadow-2xl shadow-stripe-indigo/40 group-hover:rotate-[10deg] transition-all duration-500">
            <span className="text-white font-black text-[28px] tracking-tighter">A</span>
          </div>
          <div>
            <span className="text-[24px] font-black text-stripe-indigo tracking-tighter block leading-none">AgriFlow</span>
            <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-[0.3em]">Command Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2 overflow-y-auto no-scrollbar scroll-smooth">
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
              <div className="flex items-center space-x-2 mb-3">
                  <Sparkle size={14} weight="fill" className="text-stripe-violet" />
                  <p className="text-[10px] font-black text-stripe-violet uppercase tracking-[0.2em]">Scale Up</p>
              </div>
              <p className="text-[12px] font-bold text-stripe-slate leading-relaxed">Early Access: Quantum AI Analysis.</p>
           </div>
          <SidebarItem icon={UserCircle} label="Profile" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-24 bg-transparent flex items-center justify-between px-14 z-50 shrink-0">
          <div className="relative w-[560px] group">
            <MagnifyingGlass className="absolute left-8 top-1/2 -translate-y-1/2 text-stripe-slate opacity-40 group-focus-within:opacity-100 group-focus-within:text-stripe-violet transition-all" size={24} />
            <input 
              type="text" 
              placeholder="Search farmers, regions, or commodities..."
              className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 group-hover:bg-white/60 rounded-[28px] py-5 pl-20 pr-10 focus:outline-none focus:ring-4 focus:ring-stripe-violet/5 transition-all shadow-sm focus:shadow-2xl focus:border-stripe-violet/20 font-bold text-[16px] placeholder:text-stripe-slate/40 text-stripe-indigo"
            />
          </div>

          <div className="flex items-center space-x-12">
            <button className="relative p-4 bg-white/40 backdrop-blur-xl rounded-[22px] border border-white/60 hover:bg-white hover:shadow-2xl transition-all text-stripe-indigo group">
              <Bell size={28} weight="bold" className="opacity-70 group-hover:opacity-100" />
              <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-[3px] border-white shadow-lg animate-pulse"></span>
            </button>
            
            {isSignedIn ? (
              <div className="flex items-center space-x-5 bg-white/40 backdrop-blur-xl p-3 pr-8 rounded-[30px] border border-white/60 shadow-sm hover:shadow-2xl hover:bg-white transition-all cursor-pointer group">
                <PremiumUserButton />
                <div className="text-left hidden xl:block">
                  <p className="text-[15px] font-black text-stripe-indigo tracking-tight mb-0.5 whitespace-nowrap">Wildan (Admin)</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-stripe-indigo rounded-full mr-2 shadow-[0_0_10px_rgba(99,91,255,0.5)]"></div>
                    <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest leading-none">Superuser Access</p>
                  </div>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="px-10 py-4 bg-stripe-violet text-white rounded-[22px] font-black shadow-2xl shadow-stripe-violet/20 hover:scale-105 active:scale-95 transition-all btn-premium">
                  Secure Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </header>

        {/* Dynamic Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-14 pb-14 mt-4 scroll-smooth">
          <div className="max-w-[1600px] mx-auto pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
