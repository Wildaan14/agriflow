"use client";

import React, { useState, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl/mapbox';
import { MapTrifold, Info, CaretDown, MapPin, Scan, ArrowRight } from '@phosphor-icons/react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Satellite view of Indonesia / Java
const INITIAL_VIEW_STATE = {
  longitude: 112.5,
  latitude: -7.5,
  zoom: 7,
  pitch: 45,
  bearing: 0
};

export default function SupplyMap() {
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Expanded GeoJSON for more visual density
  const provinces = useMemo(() => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Kediri Cluster', status: 'surplus', volume: 1250 },
        geometry: { type: 'Polygon', coordinates: [[[111.8, -7.7], [112.3, -7.7], [112.3, -8.1], [111.8, -8.1], [111.8, -7.7]]] }
      },
      {
        type: 'Feature',
        properties: { name: 'Malang Cluster', status: 'balanced', volume: 650 },
        geometry: { type: 'Polygon', coordinates: [[[112.5, -7.8], [113.0, -7.8], [113.0, -8.3], [112.5, -8.3], [112.5, -7.8]]] }
      },
      {
        type: 'Feature',
        properties: { name: 'Nganjuk Cluster', status: 'deficit', volume: 120 },
        geometry: { type: 'Polygon', coordinates: [[[111.8, -7.3], [112.2, -7.3], [112.2, -7.6], [111.8, -7.6], [111.8, -7.3]]] }
      },
    ]
  }), []);

  const layers = [
    new GeoJsonLayer({
      id: 'provinces-layer',
      data: provinces as any,
      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,
      getElevation: f => (f as any).properties.volume * 20,
      getFillColor: f => {
        const volume = (f as any).properties.volume || 0;
        if (volume > 1000) return [20, 184, 80, 180]; // Emerald (#14b850)
        if (volume > 500) return [14, 165, 233, 180]; // Ocean Blue (#0ea5e9)
        return [244, 63, 94, 180]; // Rose Red (#f43f5e)
      },
      getLineColor: [255, 255, 255, 200],
      getLineWidth: 2,
      onHover: info => setHoverInfo(info)
    })
  ];

  const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  return (
    <div className="relative w-full h-[800px] rounded-[64px] overflow-hidden border border-white/[0.05] shadow-[0_80px_160px_-30px_rgba(0,0,0,0.5)] bg-[#0A0D14] group">
      {!hasToken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-10 z-30 bg-[#0A0D14]/60 backdrop-blur-3xl">
           <div className="w-32 h-32 bg-[#14b850]/20 rounded-[44px] flex items-center justify-center text-[#14b850] shadow-[0_0_50px_rgba(20,184,80,0.3)] animate-pulse">
              <MapTrifold size={64} weight="fill" />
           </div>
           <div className="text-center px-10">
              <h2 className="text-white font-semibold text-4xl tracking-tight mb-4">Satellite Intelligence <span className="text-[#14b850]">Offline</span></h2>
              <p className="text-lg text-white/50 font-light max-w-md leading-relaxed">Securely inject your Mapbox API key to unlock real-time cluster analysis and terrain mapping.</p>
           </div>
           <div className="bg-white/[0.05] p-4 rounded-3xl border border-white/[0.1] font-mono text-xs text-[#14b850]">
              NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=MISSING
           </div>
        </div>
      )}

      {/* Map Content */}
      <div className={`w-full h-full transition-opacity duration-1000 ${hasToken && isMounted ? 'opacity-100' : 'opacity-20'}`}>
        {isMounted && hasToken && (
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layers}
          >
            <Map
              mapLib={import('mapbox-gl').then(m => m.default)}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            />
          </DeckGL>
        )}
      </div>

      {/* Floating HUD - Left */}
      <div className="absolute top-12 left-12 flex flex-col space-y-4 z-40">
         <div className="bg-white/[0.05] backdrop-blur-3xl px-8 py-5 rounded-[28px] flex items-center space-x-5 shadow-2xl border border-white/[0.1] hover:bg-white/[0.1] transition-all transform hover:-translate-y-1 cursor-pointer">
            <Scan size={26} className="text-[#14b850] animate-spin-slow" />
            <div>
               <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Scanning Mode</p>
               <p className="text-[15px] font-semibold text-white tracking-tight">Active Commodity Clusters</p>
            </div>
            <CaretDown size={16} className="text-white/40 ml-4" />
         </div>
      </div>

      {/* Floating HUD - Right (Legend) */}
      <div className="absolute bottom-12 right-12 bg-white/[0.05] backdrop-blur-3xl p-8 rounded-[40px] border border-white/[0.1] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] w-[280px] z-40 transform group-hover:scale-[1.02] transition-all duration-700">
        <div className="flex items-center justify-between mb-6">
           <h3 className="font-semibold text-white text-xl tracking-tight">Supply Index</h3>
           <div className="w-8 h-8 bg-[#14b850]/10 rounded-lg flex items-center justify-center text-[#14b850]">
              <Info size={16} weight="bold" />
           </div>
        </div>
        <div className="space-y-4">
          <LegendItem color="bg-[#14b850]" label="Surplus Cluster" sub="Volume > 1000 Tons" />
          <LegendItem color="bg-[#0ea5e9]" label="Healthy Yield" sub="Volume 500-1000 Tons" />
          <LegendItem color="bg-[#f43f5e]" label="Stock Deficit" sub="Immediate Demand Detected" />
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.05] space-y-4">
           <button className="w-full bg-[#14b850] text-[#0A0D14] py-4 rounded-[20px] font-bold text-[12px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all flex items-center justify-center space-x-3">
              <span>Recalculate AI</span>
           </button>
           <p className="text-[9px] text-center font-bold text-white/30 uppercase tracking-widest italic">Last Scan: 2 mins ago</p>
        </div>
      </div>

      {/* Tooltip */}
      {hoverInfo?.object && (
        <div 
          className="absolute z-50 bg-[#0A0D14]/90 backdrop-blur-3xl p-10 rounded-[44px] border border-white/[0.1] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] min-w-[320px]"
          style={{ left: hoverInfo.x + 30, top: hoverInfo.y + 30 }}
        >
          <div className="flex items-center justify-between mb-8">
             <div>
                <p className="font-semibold text-white text-3xl mb-1 tracking-tight">{(hoverInfo.object as any).properties.name}</p>
                <div className="flex items-center text-[13px] font-medium text-white/50">
                   <MapPin size={18} className="mr-2 text-[#14b850]" />
                   <span>East Java Division</span>
                </div>
             </div>
             <div className="w-12 h-12 bg-white/[0.05] rounded-2xl flex items-center justify-center text-[#14b850] border border-white/[0.1] shadow-xl">
                <MapTrifold size={24} weight="bold" />
             </div>
          </div>

          <div className="space-y-8">
             <div>
                <div className="flex justify-between items-end mb-3">
                   <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">Volume Intensity</span>
                   <span className="font-bold text-white text-2xl tracking-tight">{(hoverInfo.object as any).properties.volume} Tons</span>
                </div>
                <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden">
                   <div 
                      className="h-full bg-gradient-to-r from-[#14b850] to-[#0ea5e9] shadow-[0_0_20px_rgba(20,184,80,0.5)] transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (hoverInfo.object as any).properties.volume / 12.5)}%` }}
                   ></div>
                </div>
             </div>
             
             <div className="flex space-x-3">
                <div className={`flex-1 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-center shadow-sm border ${
                  (hoverInfo.object as any).properties.status === 'surplus' ? 'bg-[#14b850]/10 text-[#14b850] border-[#14b850]/20' : 
                  (hoverInfo.object as any).properties.status === 'balanced' ? 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20' :
                  'bg-[#f43f5e]/10 text-[#f43f5e] border-[#f43f5e]/20'
                }`}>
                  {(hoverInfo.object as any).properties.status}
                </div>
                <button className="bg-white/[0.05] text-white px-5 rounded-2xl border border-white/[0.1] hover:bg-[#14b850] hover:text-[#0A0D14] hover:border-[#14b850] transition-all">
                   <ArrowRight size={20} weight="bold" />
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface LegendItemProps {
  color: string;
  label: string;
  sub: string;
}

function LegendItem({ color, label, sub }: LegendItemProps) {
  return (
    <div className="flex items-center group/leg cursor-pointer p-2 rounded-2xl hover:bg-white/[0.02] transition-all">
      <div className={`w-4 h-4 rounded-full ${color} mr-5 shadow-2xl group-hover/leg:scale-125 transition-transform duration-500`}></div>
      <div>
         <span className="block text-[15px] font-semibold text-white tracking-tight group-hover/leg:text-[#14b850] transition-colors">{label}</span>
         <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest">{sub}</span>
      </div>
    </div>
  );
}
