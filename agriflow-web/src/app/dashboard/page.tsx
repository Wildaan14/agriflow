"use client";

import React, { useState, useEffect } from 'react';
import { UserRole } from './layout';

import FarmerDashboard from './farmer/page';
import MarketplacePage from './marketplace/page';
import GovernmentDashboard from './gov/page';
import BumdesDashboard from './bumdes/page';
import DataMarketDashboard from './data/page';

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<UserRole>('FARMER');
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
           <div className="w-16 h-16 border-4 border-stripe-indigo border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
           <p className="text-stripe-indigo font-black uppercase tracking-[0.3em] text-xs">Synchronizing Intelligence Hub...</p>
        </div>
      </div>
    );
  }

  // Render role-specific content
  // Note: For BUYER roles, we show the Marketplace as their primary dashboard as per Alur.
  // For GOVERNMENT/ADMIN, we show the National Command Center.
  switch (userRole) {
    case 'FARMER':
      return <FarmerDashboard />;
    case 'BUYER_LOCAL':
    case 'BUYER_EXPORT':
      return <MarketplacePage />;
    case 'GOVERNMENT':
    case 'ADMIN':
      return <GovernmentDashboard />;
    case 'BUMDES':
      return <BumdesDashboard />;
    case 'DATA_SUBSCRIBER':
      return <DataMarketDashboard />;
    default:
      return <FarmerDashboard />;
  }
}
