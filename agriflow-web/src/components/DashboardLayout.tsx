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
    className={`flex items-center justify-between px-6 py-3 rounded-[16px] transition-all duration-300 group ${
      active 
      ? 'bg-[#1B4D1B] text-white border border-[#1B4D1B] shadow-md' 
      : 'text-[#1B4D1B]/60 border border-transparent hover:bg-[#1B4D1B]/5 hover:text-[#1B4D1B] hover:border-[#C7E0B0]'
    }`}
  >
    <div className="flex items-center space-x-3">
      <Icon size={20} weight={active ? "fill" : "bold"} className={active ? "text-white" : "opacity-50 group-hover:opacity-100 transition-opacity"} />
      <span className="font-bold text-[13px] tracking-tight">{label}</span>
    </div>
    {active && <CaretRight size={12} weight="bold" className="text-white/50" />}
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
    <div className="flex h-screen bg-[#F4FAF0] mesh-gradient font-sans overflow-hidden selection:bg-[#1B4D1B]/10 selection:text-[#1B4D1B] text-[#1A2E1A]">
      {/* Premium Sidebar */}
      <aside className="w-[320px] bg-white/60 backdrop-blur-3xl border border-[#C7E0B0] m-6 rounded-[32px] p-8 flex flex-col h-[calc(100vh-48px)] z-50 shadow-xl">
        <div className="flex items-center space-x-4 mb-10 px-4 group cursor-pointer">
          <div className="w-14 h-14 bg-[#1B4D1B] rounded-[22px] flex items-center justify-center border border-[#1B4D1B]/30 shadow-lg group-hover:rotate-[10deg] transition-all duration-500">
            <span className="text-white font-black text-[28px] tracking-tighter">A</span>
          </div>
          <div>
            <span className="text-[24px] font-black text-[#1B4D1B] tracking-tighter block leading-none">AgriFlow</span>
            <span className="text-[10px] font-black text-[#4A9E3F] uppercase tracking-[0.3em] mt-1 block">Command Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-2 overflow-y-auto no-scrollbar scroll-smooth">
          {filteredSidebarItems.map((item, index) => (
            'category' in item ? (
              <p key={`cat-${index}`} className="text-[10px] font-black text-[#1B4D1B]/30 uppercase tracking-[0.2em] px-4 pt-5 pb-2 mt-2 border-t border-[#C7E0B0]/30 first:border-0 first:mt-0">
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

        <div className="mt-auto pt-6 border-t border-[#C7E0B0]/30 space-y-4">
           <div className="bg-[#4A9E3F]/10 p-6 rounded-[24px] border border-[#4A9E3F]/20 relative overflow-hidden group/upgrade cursor-pointer hover:bg-[#4A9E3F]/20 transition-all">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#4A9E3F]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center space-x-2 mb-3">
                  <Sparkle size={14} weight="fill" className="text-[#1B4D1B]" />
                  <p className="text-[10px] font-black text-[#1B4D1B] uppercase tracking-[0.2em]">Scale Up</p>
              </div>
              <p className="text-[12px] font-bold text-[#1B4D1B]/70 leading-relaxed">Early Access: Quantum AI Analysis.</p>
           </div>
          <SidebarItem icon={UserCircle} label="Profile" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-24 bg-transparent flex items-center justify-between px-14 z-50 shrink-0 mt-6">
          <div className="relative w-[560px] group">
            <MagnifyingGlass className="absolute left-8 top-1/2 -translate-y-1/2 text-[#1B4D1B]/30 group-focus-within:opacity-100 group-focus-within:text-[#1B4D1B] transition-all" size={24} />
            <input 
              type="text" 
              placeholder="Search farmers, regions, or commodities..."
              className="w-full bg-white/40 backdrop-blur-xl border border-[#C7E0B0] group-hover:bg-white/60 rounded-[24px] py-5 pl-20 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1B4D1B]/10 transition-all focus:border-[#1B4D1B]/50 font-bold text-[16px] placeholder:text-[#1B4D1B]/30 text-[#1B4D1B]"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-4 bg-white/40 backdrop-blur-xl rounded-[20px] border border-[#C7E0B0] hover:bg-white/60 hover:border-[#1B4D1B]/20 transition-all text-[#1B4D1B]/60 hover:text-[#1B4D1B] group">
              <Bell size={28} weight="bold" className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-4 right-4 w-3 h-3 bg-[#B91C1C] rounded-full border-2 border-[#F4FAF0] shadow-sm animate-pulse"></span>
            </button>
            
            {isSignedIn ? (
              <div className="flex items-center space-x-5 bg-white/40 backdrop-blur-xl p-3 pr-8 rounded-[24px] border border-[#C7E0B0] hover:bg-white/60 transition-all cursor-pointer group shadow-sm">
                <PremiumUserButton />
                <div className="text-left hidden xl:block">
                  <p className="text-[15px] font-black text-[#1B4D1B] tracking-tight mb-0.5 whitespace-nowrap">Wildan (Admin)</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#4A9E3F] rounded-full mr-2 shadow-sm"></div>
                    <p className="text-[10px] font-black text-[#4A9E3F] uppercase tracking-widest leading-none opacity-80">Superuser Access</p>
                  </div>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="px-10 py-4 bg-[#1B4D1B] text-white rounded-[20px] font-black shadow-lg hover:bg-[#1B4D1B]/90 transition-all active:scale-95">
                  Secure Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </header>

        {/* Dynamic Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-14 pb-14 pt-4 scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
