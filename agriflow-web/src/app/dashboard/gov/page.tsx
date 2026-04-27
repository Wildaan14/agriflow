"use client";

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import mapboxgl from 'mapbox-gl';
import { 
  ChartLineUp, 
  MapTrifold, 
  Warning, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  CurrencyCircleDollar,
  Scales,
  BellRinging
} from '@phosphor-icons/react';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-3xl border border-gray-200">
      <div className="text-center">
        <Globe size={48} className="text-[#4A9E3F] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Command Map…</p>
      </div>
    </div>
  ),
});

const NATIONAL_HOTSPOTS = [
  { id: 'DKI', name: 'DKI Jakarta', level: 'CRITICAL', risk: '0.82', coordinates: [106.8456, -6.2088] as [number, number], detail: 'Gejolak harga beras (92%)' },
  { id: 'JATIM', name: 'Jawa Timur', level: 'WARNING', risk: '0.61', coordinates: [112.0086, -7.5] as [number, number], detail: 'Anomali harga cabai +42%' },
  { id: 'NTB', name: 'Nusa Tenggara Barat', level: 'WARNING', risk: '0.58', coordinates: [116.4194, -8.6574] as [number, number], detail: 'Defisit stok padi' },
];

export default function GovDashboard() {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'INFLATION' | 'POLICY'>('COMMAND');
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/light-v11');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    const addLayers = () => {
      NATIONAL_HOTSPOTS.forEach((spot) => {
        const color = spot.level === 'CRITICAL' ? '#f43f5e' : spot.level === 'WARNING' ? '#f59e0b' : '#10b981';
        const sourceId = `gov-${spot.id}`;

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: spot.coordinates },
              properties: { id: spot.id, name: spot.name },
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
          setSelectedSpot(spot);
          map.flyTo({ center: spot.coordinates, zoom: 6, duration: 1500 });
        });

        map.on('mouseenter', `${sourceId}-dot`, () => (map.getCanvas().style.cursor = 'pointer'));
        map.on('mouseleave', `${sourceId}-dot`, () => (map.getCanvas().style.cursor = ''));
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
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">National Command Center</h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Strategic food security monitoring.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
           {(['COMMAND', 'INFLATION', 'POLICY'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#1B4D1B] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
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
            <div className="h-[500px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative group">
               <MapboxMap
                 style={mapStyle}
                 center={[118.0148634, -2.548926]}
                 zoom={4.5}
                 onMapLoad={handleMapLoad}
               />
               
               {/* Minimal Style Switcher */}
               <div className="absolute top-4 right-4 z-20 flex bg-white/90 backdrop-blur-md p-1 rounded-lg border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {['LIGHT', 'SAT', 'DARK'].map(label => (
                    <button
                      key={label}
                      onClick={() => setMapStyle(`mapbox://styles/mapbox/${label.toLowerCase()}-v11`)}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-bold transition-all ${mapStyle.includes(label.toLowerCase()) ? 'bg-[#1B4D1B] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {label}
                    </button>
                  ))}
               </div>
            </div>

            {/* Strategic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <MetricCard title="Supply Stability" value="92.4%" trend="+4.2%" icon={ShieldCheck} color="text-green-600" />
               <MetricCard title="Inflation Risk" value="0.24" trend="Low" icon={ChartLineUp} color="text-blue-600" />
               <MetricCard title="Interventions" value="12" trend="Active" icon={Scales} color="text-amber-600" />
            </div>
         </div>

         {/* Sidebar: Control Panel */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6 h-full flex flex-col">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Security Alerts</h3>
               <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
                  {NATIONAL_HOTSPOTS.map(spot => (
                    <div 
                      key={spot.id} 
                      onClick={() => setSelectedSpot(spot)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedSpot?.id === spot.id ? 'bg-[#1B4D1B]/5 border-[#1B4D1B]/20' : 'bg-gray-50 border-gray-100'}`}
                    >
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-bold text-gray-900">{spot.name}</h4>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${spot.level === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{spot.level}</span>
                       </div>
                       <p className="text-[10px] text-gray-500 font-medium">{spot.detail}</p>
                    </div>
                  ))}
               </div>
               
               {selectedSpot && (
                 <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in">
                    <button className="w-full btn-minimal btn-primary py-3 text-[10px]">Authorize Intervention</button>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color }: { title: string, value: string, trend: string, icon: any, color: string }) {
  return (
    <div className="card-clean p-6 flex items-center justify-between">
       <div>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
             <p className="text-xl font-bold text-gray-900">{value}</p>
             <span className={`text-[9px] font-bold ${color}`}>{trend}</span>
          </div>
       </div>
       <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 ${color}`}>
          <Icon size={20} weight="bold" />
       </div>
    </div>
  );
}
