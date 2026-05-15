"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  MapTrifold,
  Globe,
  ChartLineUp,
  Scales,
  TrendUp,
  TrendDown,
  NavigationArrow
} from "@phosphor-icons/react";

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic(() => import("@/components/maps/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center rounded-3xl border border-white/5">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Initialising Supply Map…</p>
      </div>
    </div>
  ),
});

const REGIONS = [
  { id: "REG-01", name: "Kab. Kediri", status: "SURPLUS", commodity: "Cabai Keriting", volume: "+120 Ton", coordinates: [-7.8172, 112.0086] as [number, number] },
  { id: "REG-02", name: "Kab. Malang", status: "SURPLUS", commodity: "Jagung", volume: "+450 Ton", coordinates: [-7.9797, 112.6304] as [number, number] },
  { id: "REG-03", name: "Kota Surabaya", status: "DEFICIT", commodity: "Beras", volume: "-2.4k Ton", coordinates: [-7.2575, 112.7520] as [number, number] },
  { id: "REG-04", name: "Kab. Brebes", status: "SURPLUS", commodity: "Bawang Merah", volume: "+320 Ton", coordinates: [-6.8726, 109.0317] as [number, number] },
  { id: "REG-05", name: "Kab. Banyuwangi", status: "SURPLUS", commodity: "Padi", volume: "+600 Ton", coordinates: [-8.2192, 114.3692] as [number, number] },
  { id: "REG-06", name: "DKI Jakarta", status: "DEFICIT", commodity: "Sayuran", volume: "-5.2k Ton", coordinates: [-6.2088, 106.8456] as [number, number] },
  { id: "REG-07", name: "Kota Bandung", status: "DEFICIT", commodity: "Cabai", volume: "-800 Ton", coordinates: [-6.9175, 107.6191] as [number, number] },
  { id: "REG-08", name: "Kab. Garut", status: "SURPLUS", commodity: "Tomat", volume: "+250 Ton", coordinates: [-7.2279, 107.9087] as [number, number] },
];

export default function SupplyMapPage() {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-7.2, 110.5]); // Centered on Java
  const [mapZoom, setMapZoom] = useState(7);

  const markers = useMemo(() => {
    return REGIONS.map(region => ({
      id: region.id,
      position: region.coordinates,
      title: region.name,
      status: region.status,
      content: (
        <div className="mt-2 border-t border-gray-100 pt-2">
           <p className="text-[11px] font-bold text-gray-900">{region.commodity}</p>
           <p className={`text-[10px] font-bold ${region.status === 'SURPLUS' ? 'text-green-600' : 'text-red-600'}`}>{region.volume}</p>
        </div>
      )
    }));
  }, []);

  const handleRegionSelect = (region: any) => {
    setSelectedRegion(region);
    setMapCenter(region.coordinates);
    setMapZoom(10);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Intelligence Map</h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Supply & Demand Equilibrium Analysis for Food Security</p>
        </div>
        <div className="flex bg-white shadow-sm border border-gray-100 p-1.5 rounded-xl">
           <button className="px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 mr-2 transition-colors">
              Simulasi Logistik
           </button>
           <button className="px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-[#1B4D1B] text-white shadow-md hover:bg-[#133813] transition-colors flex items-center gap-2">
              <NavigationArrow size={16} weight="bold" /> Optimasi Jalur
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
         {/* Sidebar: Market Intelligence */}
         <div className="lg:w-1/3 xl:w-1/4 space-y-4 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-[600px] flex flex-col">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Market Nodes</h3>
                 <span className="text-[10px] font-bold px-2 py-1 bg-[#1B4D1B]/10 text-[#1B4D1B] rounded-md">{REGIONS.length} Active</span>
               </div>
               
               <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pr-1">
                  {REGIONS.map(region => (
                    <div 
                      key={region.id} 
                      onClick={() => handleRegionSelect(region)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-start gap-3 ${selectedRegion?.id === region.id ? 'bg-[#1B4D1B] border-[#1B4D1B] text-white shadow-md' : 'bg-white border-gray-100 hover:border-[#1B4D1B]/30 hover:shadow-sm'}`}
                    >
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${selectedRegion?.id === region.id ? 'bg-white/20' : region.status === 'SURPLUS' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {region.status === 'SURPLUS' ? <TrendUp size={16} weight="bold" /> : <TrendDown size={16} weight="bold" />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className={`text-sm font-bold truncate ${selectedRegion?.id === region.id ? 'text-white' : 'text-gray-900'}`}>{region.name}</h4>
                          </div>
                          <p className={`text-[11px] font-medium ${selectedRegion?.id === region.id ? 'text-white/80' : 'text-gray-500'}`}>{region.commodity}</p>
                          <p className={`text-[11px] font-bold mt-1 ${selectedRegion?.id === region.id ? 'text-white' : region.status === 'SURPLUS' ? 'text-green-600' : 'text-red-600'}`}>{region.volume}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Map Viewport */}
         <div className="lg:w-2/3 xl:w-3/4 space-y-6">
            <div className="h-[600px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative group bg-gray-100">
               <LeafletMap
                 center={mapCenter}
                 zoom={mapZoom}
                 markers={markers}
                 onMarkerClick={(m) => {
                   const region = REGIONS.find(r => r.id === m.id);
                   if (region) handleRegionSelect(region);
                 }}
               />
               
               {/* Minimal Info Overlay */}
               <div className="absolute top-6 right-6 z-[400] flex bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-gray-100 shadow-lg space-x-4 items-center">
                  <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(20,184,80,0.5)] border-2 border-white"></div>
                     <span className="text-[10px] font-bold text-gray-700 uppercase">Surplus</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] border-2 border-white"></div>
                     <span className="text-[10px] font-bold text-gray-700 uppercase">Defisit</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Bottom Insight Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Arbitrage Opportunity</p>
               <p className="text-2xl font-bold text-[#1B4D1B] tracking-tight">Rp 1.25B Potential</p>
               <p className="text-xs text-gray-500 mt-1">Based on current surplus-deficit mismatches</p>
            </div>
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
               <ChartLineUp size={28} weight="duotone" />
            </div>
         </div>
         <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Trading Nodes</p>
               <p className="text-2xl font-bold text-[#1B4D1B] tracking-tight">{REGIONS.length} Regions</p>
               <p className="text-xs text-gray-500 mt-1">Monitored in real-time across Java</p>
            </div>
            <div className="w-14 h-14 bg-[#1B4D1B]/5 rounded-2xl flex items-center justify-center text-[#1B4D1B]">
               <Globe size={28} weight="duotone" />
            </div>
         </div>
      </div>
    </div>
  );
}

