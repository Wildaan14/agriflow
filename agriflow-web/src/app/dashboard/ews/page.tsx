"use client";

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import mapboxgl from 'mapbox-gl';
import ewsData from '@/data/modul10_early_warning.json';
import Link from 'next/link';
import { 
  Warning, 
  MapTrifold, 
  ArrowRight, 
  ShieldCheck, 
  WhatsappLogo, 
  ChartLineUp, 
  FileText, 
  Globe, 
  CloudRain, 
  BellRinging,
  DeviceMobile,
  CheckCircle,
  PaperPlaneTilt,
  X,
  CaretRight
} from '@phosphor-icons/react';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-3xl border border-gray-100">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Risk Map…</p>
      </div>
    </div>
  ),
});

const REGION_COORDS: Record<string, [number, number]> = {
  'Purbalingga':          [109.3641, -7.3966],
  'Brebes':               [109.0317, -6.8726],
  'Banyumas':             [109.2300, -7.5090],
  'Cilacap':              [109.0000, -7.7199],
  'Sragen':               [111.0280, -7.4250],
  'Deli Serdang':         [98.7600,  3.5270],
};

export default function EWSPage() {
  const [isBroadcastOpen, setIsBroadcastOpen] = React.useState(false);
  const [mapStyle, setMapStyle] = React.useState('mapbox://styles/mapbox/light-v11');
  const [selectedEWS, setSelectedEWS] = React.useState<any>(null);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    const addLayers = () => {
      ewsData.regions.forEach((region) => {
        const coords = REGION_COORDS[region.region];
        if (!coords) return;

        const color = region.status === 'Kritis' ? '#ef4444' : region.status === 'Tinggi' ? '#f59e0b' : '#14b850';
        const sourceId = `ews-${region.region_id}`;

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: coords },
              properties: { name: region.region },
            },
          });
        }

        if (!map.getLayer(`${sourceId}-dot`)) {
          map.addLayer({
            id: `${sourceId}-dot`,
            type: 'circle',
            source: sourceId,
            paint: {
              'circle-radius': 8,
              'circle-color': color,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
            },
          });
        }

        map.on('click', `${sourceId}-dot`, () => {
          setSelectedEWS(region);
          map.flyTo({ center: coords, zoom: 7, duration: 1500 });
        });
      });
    };

    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.on('style.load', addLayers);
    }
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Early Warning System</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">AI-driven anomaly detection and crisis mitigation.</p>
        </div>
        <div className="flex space-x-3">
           <button 
             onClick={() => setIsBroadcastOpen(true)}
             className="btn-minimal bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white text-xs px-6 py-2.5"
           >
              <BellRinging size={18} />
              <span>Simulate Broadcast</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Map Viewport */}
         <div className="lg:col-span-3 space-y-6">
            <div className="h-[500px] rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative group">
               <MapboxMap
                 style={mapStyle}
                 center={[113.9213, -0.7893]}
                 zoom={4.8}
                 onMapLoad={handleMapLoad}
               />
               <div className="absolute top-4 right-4 z-20 flex bg-white/90 backdrop-blur-md p-1 rounded-lg border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {['LIGHT', 'SAT', 'DARK'].map(label => (
                    <button
                      key={label}
                      onClick={() => setMapStyle(`mapbox://styles/mapbox/${label.toLowerCase()}-v11`)}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-bold transition-all ${mapStyle.includes(label.toLowerCase()) ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {label}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="card-clean p-6 flex items-center space-x-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                     <CloudRain size={24} weight="fill" />
                  </div>
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Weather Anomaly</p>
                     <p className="text-xl font-bold text-slate-900">+42% Rainfall</p>
                  </div>
               </div>
               <div className="card-clean p-6 flex items-center space-x-5">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                     <ChartLineUp size={24} weight="fill" />
                  </div>
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Market Divergence</p>
                     <p className="text-xl font-bold text-slate-900">Rp 18.4k <span className="text-xs font-normal text-slate-400">/avg</span></p>
                  </div>
               </div>
            </div>
         </div>

         {/* Risk Panel */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6 h-[650px] flex flex-col">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Hot Zones</h3>
               <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
                  {ewsData.regions.slice(0, 8).map((r) => (
                    <div 
                      key={r.region_id} 
                      onClick={() => setSelectedEWS(r)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedEWS?.region_id === r.region_id ? 'bg-slate-50 border-slate-200' : 'bg-white border-transparent hover:border-slate-100'}`}
                    >
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-bold text-slate-900">{r.region}</h4>
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${r.status === 'Kritis' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
                       </div>
                       <p className="text-[10px] text-slate-500 font-medium">Risk Score: {r.risk_score}</p>
                    </div>
                  ))}
               </div>
               
               {selectedEWS && (
                 <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in">
                    <button className="w-full btn-minimal btn-primary py-3 text-[10px]">Authorize Mitigation</button>
                 </div>
               )}
            </div>
         </div>
      </div>

      {isBroadcastOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-white w-full max-w-md rounded-3xl p-10 relative shadow-2xl">
              <button onClick={() => setIsBroadcastOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                 <X size={20} />
              </button>
              <div className="text-center">
                 <Warning size={48} className="text-rose-500 mx-auto mb-6" weight="fill" />
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Emergency Alert</h2>
                 <p className="text-sm text-slate-500 mb-8 leading-relaxed">Send a high-priority warning to 12.4k farmers and logistics nodes via WhatsApp & Push Notification.</p>
                 <button onClick={() => setIsBroadcastOpen(false)} className="w-full btn-minimal bg-rose-600 text-white py-3">Deploy Alert</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
