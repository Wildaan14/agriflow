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
  QrCode,
  ShieldCheck,
  Cube,
  Globe,
  Warning,
  Star,
  Leaf,
  Users,
  Database,
  Vault,
  List
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
    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 group ${
      active 
      ? 'bg-[#14b850] text-white shadow-sm' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center space-x-3">
      <Icon size={18} weight={active ? "fill" : "regular"} className={active ? "text-white" : "opacity-70 group-hover:opacity-100"} />
      <span className="font-semibold text-[13px] tracking-tight">{label}</span>
    </div>
  </Link>
);

type SidebarNavItem = (SidebarItemProps & { category?: never }) | { category: string; icon?: never; label?: never; href?: never; roles?: never; active?: never };

const SIDEBAR_ITEMS: SidebarNavItem[] = [
  { category: "Intelligence" },
  { icon: House, label: "Overview", href: "/dashboard", roles: ['ADMIN', 'FARMER', 'BUYER', 'GOVERNMENT'] },
  { icon: MapTrifold, label: "Global Map", href: "/dashboard/supply-map", roles: ['ADMIN', 'FARMER', 'GOVERNMENT'] },
  { icon: Storefront, label: "Marketplace", href: "/dashboard/marketplace", roles: ['ADMIN', 'BUYER'] },
  
  { category: "Operations" },
  { icon: Truck, label: "Logistics", href: "/dashboard/logistics", roles: ['ADMIN', 'FARMER', 'BUYER'] },
  { icon: ChartLineUp, label: "Analytics", href: "/dashboard/analytics", roles: ['ADMIN', 'BUYER', 'GOVERNMENT'] },
  { icon: QrCode, label: "Payments", href: "/dashboard/payments", roles: ['FARMER', 'BUYER'] },
  { icon: ShieldCheck, label: "Insurance", href: "/dashboard/insurance", roles: ['FARMER'] },
  
  { category: "Compliance" },
  { icon: Star, label: "AgriScore", href: "/dashboard/score", roles: ['FARMER', 'ADMIN'] },
  { icon: Globe, label: "Export Gateway", href: "/dashboard/export", roles: ['ADMIN', 'BUYER'] },
  { icon: Cube, label: "Traceability", href: "/dashboard/trace", roles: ['BUYER', 'GOVERNMENT', 'ADMIN'] },
  { icon: Warning, label: "Early Warning", href: "/dashboard/ews", roles: ['GOVERNMENT', 'ADMIN'] },
  { icon: Leaf, label: "Disease Detect", href: "/dashboard/disease", roles: ['FARMER'] },
  { icon: Database, label: "Data Market", href: "/dashboard/data", roles: ['ADMIN', 'GOVERNMENT'] },

  { category: "Governance" },
  { icon: Vault, label: "Subsidy", href: "/dashboard/subsidy", roles: ['GOVERNMENT', 'ADMIN'] },
  { icon: Users, label: "BUMDes", href: "/dashboard/bumdes", roles: ['GOVERNMENT', 'ADMIN', 'FARMER'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  
  // Simulated Role
  const userRole: UserRole = 'ADMIN';

  const filteredSidebarItems = SIDEBAR_ITEMS.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden text-slate-900">
      {/* Minimalist Sidebar */}
      <aside className="w-64 border-r border-slate-100 flex flex-col h-full z-50">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#14b850] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">AgriFlow</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 overflow-y-auto no-scrollbar">
          {filteredSidebarItems.map((item, index) => (
            'category' in item ? (
              <p key={`cat-${index}`} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-6 pb-2">
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

        <div className="p-4 border-t border-slate-50">
          <SidebarItem icon={UserCircle} label="My Account" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-slate-100 flex items-center justify-between px-8 z-50 shrink-0">
          <div className="relative w-80 group">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search data..."
              className="w-full bg-slate-50 border-none rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#14b850]/20 transition-all text-sm placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="h-6 w-px bg-slate-100 mx-1"></div>
            
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">Wildan</p>
                  <p className="text-[10px] text-slate-400 font-medium">Admin Mode</p>
                </div>
                <PremiumUserButton />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-minimal btn-primary py-1.5 px-4 text-xs">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
