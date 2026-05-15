"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  ChartLineUp, 
  MapTrifold, 
  Warning, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  CurrencyCircleDollar,
  Scales,
  BellRinging,
  WarningCircle
} from '@phosphor-icons/react';

const LeafletMap = dynamic(() => import('@/components/maps/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-3xl border border-slate-200">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Command Map…</p>
      </div>
    </div>
  ),
});

const NATIONAL_HOTSPOTS = [
  { id: 'DKI', name: 'DKI Jakarta', level: 'CRITICAL', risk: '0.82', coordinates: [-6.2088, 106.8456] as [number, number], detail: 'Gejolak harga beras (92%)' },
  { id: 'JATIM', name: 'Jawa Timur', level: 'WARNING', risk: '0.61', coordinates: [-7.5, 112.0086] as [number, number], detail: 'Anomali harga cabai +42%' },
  { id: 'NTB', name: 'Nusa Tenggara Barat', level: 'WARNING', risk: '0.58', coordinates: [-8.6574, 116.4194] as [number, number], detail: 'Defisit stok padi' },
];

export default function GovDashboard() {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'INFLATION' | 'POLICY'>('COMMAND');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.548926, 118.0148634]);
  const [mapZoom, setMapZoom] = useState(4.5);

  const markers = useMemo(() => {
    return NATIONAL_HOTSPOTS.map(spot => ({
      id: spot.id,
      position: spot.coordinates,
      title: spot.name,
      status: spot.level,
      color: spot.level === 'CRITICAL' ? '#f43f5e' : '#f59e0b',
      content: (
        <div className="mt-2">
          <p className="text-xs font-bold text-slate-900">{spot.detail}</p>
          <div className="flex justify-between items-center mt-2 mb-1">
            <span className="text-[10px] text-slate-500">Risk Factor</span>
            <span className="text-[10px] font-bold text-rose-600">{spot.risk}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
             <div 
               className={`h-full ${spot.level === 'CRITICAL' ? 'bg-rose-500' : 'bg-amber-500'}`} 
               style={{ width: `${parseFloat(spot.risk) * 100}%` }}
             ></div>
          </div>
        </div>
      )
    }));
  }, []);

  const handleSpotSelect = (spot: typeof NATIONAL_HOTSPOTS[0]) => {
    setSelectedSpot(spot);
    setMapCenter(spot.coordinates);
    setMapZoom(8);
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">National Command Center</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Strategic food security monitoring & policy interventions.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
           {(['COMMAND', 'INFLATION', 'POLICY'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#1B4D1B] shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Map & Alerts */}
         <div className="lg:col-span-3 space-y-6">
            <div className="h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-50">
               <LeafletMap
                 center={mapCenter}
                 zoom={mapZoom}
                 markers={markers}
                 onMarkerClick={(m) => {
                   const spot = NATIONAL_HOTSPOTS.find(s => s.id === m.id);
                   if (spot) handleSpotSelect(spot);
                 }}
               />
               
               <div className="absolute top-6 left-6 z-[400] bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white shadow-lg pointer-events-none">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Live Surveillance</p>
                  <p className="text-sm font-bold text-[#1B4D1B]">Macro-Economic Security</p>
               </div>
            </div>

            {/* Strategic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <MetricCard title="Supply Stability" value="92.4%" trend="+4.2%" icon={ShieldCheck} color="text-[#14b850]" bg="bg-[#14b850]/10" />
               <MetricCard title="Inflation Risk" value="0.24" trend="Low" icon={ChartLineUp} color="text-blue-600" bg="bg-blue-50" />
               <MetricCard title="Interventions" value="12" trend="Active" icon={Scales} color="text-amber-600" bg="bg-amber-50" />
            </div>
         </div>

         {/* Sidebar: Control Panel */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6 h-[600px] flex flex-col shadow-sm">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                  Security Alerts
                  <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-[8px]">LIVE</span>
               </h3>
               <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pr-1">
                  {NATIONAL_HOTSPOTS.map(spot => (
                    <div 
                      key={spot.id} 
                      onClick={() => handleSpotSelect(spot)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-start gap-3 ${selectedSpot?.id === spot.id ? 'bg-[#1B4D1B] border-[#1B4D1B] text-white shadow-md' : 'bg-white border-slate-100 hover:border-[#1B4D1B]/30 hover:shadow-sm'}`}
                    >
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${spot.level === 'CRITICAL' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                          {spot.level === 'CRITICAL' ? <WarningCircle size={16} weight="fill" /> : <Warning size={16} weight="fill" />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className={`text-sm font-bold truncate ${selectedSpot?.id === spot.id ? 'text-white' : 'text-slate-900'}`}>{spot.name}</h4>
                          </div>
                          <p className={`text-[10px] font-medium leading-tight ${selectedSpot?.id === spot.id ? 'text-white/80' : 'text-slate-500'}`}>{spot.detail}</p>
                       </div>
                    </div>
                  ))}
               </div>
               
               {selectedSpot && (
                 <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                    <button className="w-full py-3.5 rounded-xl bg-[#1B4D1B] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#1B4D1B]/20 hover:bg-[#133813] transition-colors">
                      Authorize Intervention
                    </button>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color, bg }: { title: string, value: string, trend: string, icon: any, color: string, bg: string }) {
  return (
    <div className="card-clean p-6 flex items-center justify-between hover:shadow-md transition-shadow">
       <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{title}</p>
          <div className="flex items-baseline space-x-2">
             <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bg} ${color}`}>{trend}</span>
          </div>
       </div>
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg} ${color}`}>
          <Icon size={24} weight="duotone" />
       </div>
    </div>
  );
}
