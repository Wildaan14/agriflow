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
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[64px]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-stripe-indigo opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Command Map…</p>
      </div>
    </div>
  ),
});

const NATIONAL_HOTSPOTS = [
  { id: 'DKI', name: 'DKI Jakarta', level: 'CRITICAL', risk: '0.82', coordinates: [106.8456, -6.2088] as [number, number], detail: 'Probabilitas gejolak harga beras 92%' },
  { id: 'JATIM', name: 'Jawa Timur', level: 'WARNING', risk: '0.61', coordinates: [112.0086, -7.5] as [number, number], detail: 'Anomali harga cabai +42%' },
  { id: 'NTB', name: 'Nusa Tenggara Barat', level: 'WARNING', risk: '0.58', coordinates: [116.4194, -8.6574] as [number, number], detail: 'Defisit stok padi di 4 kabupaten' },
  { id: 'SULSEL', name: 'Sulawesi Selatan', level: 'AMAN', risk: '0.24', coordinates: [120.0, -5.0] as [number, number], detail: 'Stok aman, surplus beras +8%' },
  { id: 'JATENG', name: 'Jawa Tengah', level: 'AMAN', risk: '0.31', coordinates: [110.2, -7.15] as [number, number], detail: 'Distribusi normal, stabil' },
  { id: 'SUMUT', name: 'Sumatera Utara', level: 'WARNING', risk: '0.52', coordinates: [98.6667, 3.5833] as [number, number], detail: 'Harga sawit turun, petani tertekan' },
];

const LEVEL_COLOR: Record<string, { dot: string; glow: string; popup: string; text: string }> = {
  CRITICAL: { dot: '#f43f5e', glow: 'rgba(244,63,94,0.2)', popup: '#fff1f2', text: '#be123c' },
  WARNING:  { dot: '#f59e0b', glow: 'rgba(245,158,11,0.2)', popup: '#fffbeb', text: '#b45309' },
  AMAN:     { dot: '#10b981', glow: 'rgba(16,185,129,0.2)', popup: '#f0fdf4', text: '#065f46' },
};

const ALERTS = [
  { id: 1, type: 'CRITICAL', region: 'Jawa Timur', msg: 'Anomali harga cabai +42% terdeteksi. Risiko inflasi tinggi.', action: 'Intervensi Pasar' },
  { id: 2, type: 'WARNING', region: 'NTB', msg: 'Defisit stok padi di 4 kabupaten. Segera alokasikan surplus dari Jatim.', action: 'Redistribusi Stok' },
];

export default function GovDashboard() {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'INFLATION' | 'POLICY'>('COMMAND');
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/light-v11');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    const addLayers = () => {
      NATIONAL_HOTSPOTS.forEach((spot) => {
        const colors = LEVEL_COLOR[spot.level];
        const sourceId = `gov-${spot.id}`;

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: spot.coordinates },
              properties: { id: spot.id, name: spot.name, level: spot.level, risk: spot.risk, detail: spot.detail },
            },
          });
        }

        if (!map.getLayer(`${sourceId}-glow`)) {
          map.addLayer({
            id: `${sourceId}-glow`,
            type: 'circle',
            source: sourceId,
            paint: {
              'circle-radius': 36,
              'circle-color': colors.dot,
              'circle-opacity': 0.15,
              'circle-blur': 1.2,
            },
          });
        }

        if (!map.getLayer(`${sourceId}-dot`)) {
          map.addLayer({
            id: `${sourceId}-dot`,
            type: 'circle',
            source: sourceId,
            paint: {
              'circle-radius': 10,
              'circle-color': colors.dot,
              'circle-opacity': 0.95,
              'circle-stroke-width': 3,
              'circle-stroke-color': '#ffffff',
            },
          });
        }

        if (!map.getLayer(`${sourceId}-label`)) {
          map.addLayer({
            id: `${sourceId}-label`,
            type: 'symbol',
            source: sourceId,
            layout: {
              'text-field': '{name}',
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
              'text-size': 10,
              'text-offset': [0, 2],
              'text-anchor': 'top',
            },
            paint: {
              'text-color': colors.text,
              'text-halo-color': '#ffffff',
              'text-halo-width': 2,
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
    <div className="space-y-12 py-8 animate-in mt-12">
      {/* SaaS Header - Refined */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-rose-500/20">Status Keamanan Pangan: TERJAGA</span>
           </div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none italic">National Food Command Center</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70 italic font-serif">Monitoring strategis dan intervensi real-time untuk stabilitas harga pangan nasional.</p>
        </div>
        <div className="flex bg-slate-100/50 p-1.5 rounded-[22px] border border-slate-200 backdrop-blur-md">
           {(['COMMAND', 'INFLATION', 'POLICY'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-8 py-3.5 rounded-[18px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-stripe-indigo shadow-[0_10px_30px_-5px_rgba(100,90,255,0.2)]' : 'text-slate-400 hover:text-stripe-indigo'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Main Layout: Map Top, Grid Bottom */}
      <div className="space-y-10">
         {/* Top Section: Full Width Map */}
         <div className="h-[600px] rounded-[64px] overflow-hidden border border-white shadow-[0_40px_100px_-20px_rgba(10,37,64,0.1)] relative group">
            {activeTab === 'COMMAND' ? (
               <>
                  <MapboxMap
                    style={mapStyle}
                    center={[118.0148634, -2.548926]}
                    zoom={4.5}
                    onMapLoad={handleMapLoad}
                  />
                  
                  {/* Floating Style Switcher */}
                  <div className="absolute top-8 right-8 z-20 flex bg-white/80 backdrop-blur-2xl p-1.5 rounded-[24px] border border-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                     {[
                       { id: 'mapbox://styles/mapbox/light-v11', label: 'STREET' },
                       { id: 'mapbox://styles/mapbox/dark-v11', label: 'DARK' },
                       { id: 'mapbox://styles/mapbox/satellite-v9', label: 'SAT' }
                     ].map(s => (
                       <button
                         key={s.id}
                         onClick={() => setMapStyle(s.id)}
                         className={`px-4 py-2 rounded-[18px] transition-all text-[9px] font-black uppercase tracking-widest ${mapStyle === s.id ? 'bg-stripe-indigo text-white shadow-md' : 'text-slate-400 hover:text-stripe-indigo'}`}
                       >
                         {s.label}
                       </button>
                     ))}
                  </div>
               </>
            ) : (
               <div className="w-full h-full bg-slate-50 flex items-center justify-center animate-in zoom-in-95 duration-700">
                  <div className="text-center group-hover:scale-110 transition-transform">
                     <Globe size={180} className="text-stripe-indigo/5 animate-pulse" weight="thin" />
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mt-8">System Analysis Active</p>
                  </div>
               </div>
            )}
         </div>

         {/* Bottom Section: Dynamic Content Based on Tabs */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {activeTab === 'COMMAND' && (
               <>
                  {/* Selection Intelligence */}
                  <div className="lg:col-span-1">
                     <div className="glass-card-premium p-10 rounded-[48px] shadow-2xl min-h-[500px] flex flex-col border border-white bg-white/40 backdrop-blur-3xl overflow-hidden relative">
                        {selectedSpot ? (
                           <div className="animate-in slide-in-from-left duration-500 h-full flex flex-col">
                              <button 
                                onClick={() => setSelectedSpot(null)}
                                className="mb-8 text-[10px] font-black text-stripe-indigo uppercase tracking-widest flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity"
                              >
                                 <ArrowRight size={14} className="rotate-180" />
                                 <span>Back to Alerts</span>
                              </button>
                              
                              <div className="mb-10">
                                 <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-white mb-4 inline-block shadow-lg ${LEVEL_COLOR[selectedSpot.level].dot === '#f43f5e' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                                    {selectedSpot.level} PRIORITY
                                 </span>
                                 <h3 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-2 italic">{selectedSpot.name}</h3>
                                 <div className="w-full h-1.5 bg-slate-100/50 rounded-full overflow-hidden mb-6 mt-4">
                                    <div className="h-full bg-stripe-indigo animate-pulse" style={{ width: `${selectedSpot.risk * 100}%` }}></div>
                                 </div>
                                 <p className="text-xs font-bold text-stripe-slate opacity-60 leading-relaxed italic">{selectedSpot.detail}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-auto">
                                 <div className="bg-white/60 p-6 rounded-[32px] border border-white shadow-inner flex flex-col justify-center">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Risk Factor</p>
                                    <p className="text-3xl font-black text-stripe-indigo tracking-tighter italic">{selectedSpot.risk}</p>
                                 </div>
                                 <div className="bg-white/60 p-6 rounded-[32px] border border-white shadow-inner flex flex-col justify-center">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</p>
                                    <p className={`text-xl font-black italic ${selectedSpot.level === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'}`}>ACTIVE</p>
                                 </div>
                              </div>

                              <button className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(100,90,255,0.4)] hover:bg-black transition-all mt-10">
                                 Authorize Intervention
                              </button>
                           </div>
                        ) : (
                           <div className="animate-in fade-in duration-500 flex flex-col h-full">
                              <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.3em] mb-10 flex items-center">
                                 <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-3"></div>
                                 Live Security Alerts
                              </h3>
                              <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-2">
                                 {ALERTS.map(alert => (
                                    <div 
                                       key={alert.id} 
                                       onClick={() => {
                                          const spot = NATIONAL_HOTSPOTS.find(s => s.name === alert.region);
                                          if (spot) setSelectedSpot(spot);
                                       }}
                                       className="p-8 rounded-[40px] bg-white/60 border border-white hover:border-stripe-indigo/20 transition-all cursor-pointer group shadow-sm hover:shadow-2xl"
                                    >
                                       <div className="flex justify-between items-center mb-4">
                                          <span className={`text-[8px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm ${alert.type === 'CRITICAL' ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-amber-50 text-amber-500 border border-amber-100'}`}>{alert.type}</span>
                                          <BellRinging size={18} weight="fill" className={alert.type === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'} />
                                       </div>
                                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{alert.region}</h4>
                                       <p className="text-sm font-bold text-stripe-indigo leading-relaxed line-clamp-2 italic font-serif opacity-80">{alert.msg}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Strategic Overview Metrics */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
                     <div className="glass-card-premium p-10 rounded-[56px] border border-white shadow-xl bg-white/40 group hover:bg-white transition-all flex flex-col justify-between min-h-[300px]">
                        <div className="flex justify-between items-start mb-10">
                           <div className="w-14 h-14 bg-stripe-indigo/5 rounded-2xl flex items-center justify-center text-stripe-indigo group-hover:bg-stripe-indigo group-hover:text-white transition-all">
                              <Scales size={28} weight="fill" />
                           </div>
                           <span className="text-[10px] font-black text-stripe-indigo/40 uppercase tracking-[0.2em] italic">Impact Index</span>
                        </div>
                        <div>
                           <div className="flex items-baseline space-x-3 mb-2">
                              <p className="text-5xl font-black text-stripe-indigo tracking-tighter italic">92.4%</p>
                              <span className="text-[10px] font-black text-stripe-emerald uppercase tracking-widest">+4.2%</span>
                           </div>
                           <p className="text-[11px] font-bold text-stripe-slate opacity-40 uppercase tracking-widest">National Supply Stability Score</p>
                        </div>
                     </div>

                     <div className="glass-card-premium p-10 rounded-[56px] border border-white shadow-xl bg-white/40 group hover:bg-white transition-all transition-all flex flex-col justify-between min-h-[300px]">
                        <div className="flex justify-between items-start mb-10">
                           <div className="w-14 h-14 bg-stripe-indigo/5 rounded-2xl flex items-center justify-center text-stripe-indigo group-hover:bg-stripe-indigo group-hover:text-white transition-all">
                              <ChartLineUp size={28} weight="fill" />
                           </div>
                           <span className="text-[10px] font-black text-stripe-indigo/40 uppercase tracking-[0.2em] italic">Risk Analytics</span>
                        </div>
                        <div>
                           <div className="flex items-baseline space-x-3 mb-2">
                              <p className="text-5xl font-black text-stripe-indigo tracking-tighter italic">0.24</p>
                              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Low Risk</span>
                           </div>
                           <p className="text-[11px] font-bold text-stripe-slate opacity-40 uppercase tracking-widest">Aggregate National Inflation Risk</p>
                        </div>
                     </div>

                     {/* Strategic Insight Item */}
                     <div className="glass-card-premium p-12 rounded-[56px] border border-white shadow-2xl bg-white/40 lg:col-span-2 relative overflow-hidden group/box">
                        <div className="absolute top-0 right-0 opacity-5 rotate-12 group-hover/box:rotate-0 transition-transform duration-1000">
                           <ShieldCheck size={280} weight="fill" className="text-stripe-indigo" />
                        </div>
                        <div className="relative z-10">
                           <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-[0.3em] mb-6 italic">Wawasan Strategis Pusat Komando</p>
                           <h4 className="text-3xl font-black text-stripe-indigo tracking-tighter lg:w-2/3 italic leading-none mb-10">Optimasi Distribusi Surplus di Jawa Timur Direkomendasikan</h4>
                           <div className="p-8 rounded-[40px] bg-white border border-dashed border-slate-200 shadow-sm group-hover/box:shadow-xl transition-all">
                              <p className="text-xs font-bold text-stripe-slate leading-relaxed italic opacity-80">
                                 "Berdasarkan data surplus beras di Jawa Timur sebesar **420 Ton**, sistem merekomendasikan pengalihan 20% stok ke wilayah DKI Jakarta guna menekan probabilitas gejolak harga yang kini mencapai **92%**."
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}

            {/* Other Tabs content - kept clean and consistent */}
            {activeTab === 'INFLATION' && (
               <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="glass-card-premium p-16 rounded-[64px] border border-white shadow-2xl bg-white/40 min-h-[500px] flex flex-col justify-between group hover:bg-white transition-all">
                     <div>
                        <div className="w-20 h-20 bg-rose-50 rounded-[32px] flex items-center justify-center text-rose-500 mb-12 shadow-inner">
                           <CurrencyCircleDollar size={44} weight="fill" />
                        </div>
                        <h4 className="text-5xl font-black text-stripe-indigo tracking-tighter mb-8 italic leading-none">Inflation Sensitivity <br />Deep-Analysis</h4>
                        <div className="space-y-6">
                           <MetricRow label="Target CPI" value="2.5%" />
                           <MetricRow label="Current CPI (Food)" value="3.1%" active />
                           <MetricRow label="Forecasting (2w)" value="2.9%" />
                        </div>
                     </div>
                     <button className="w-full bg-stripe-indigo text-white py-8 rounded-[36px] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all mt-12">Generate Executive Report</button>
                  </div>
                  <div className="glass-card-premium p-16 rounded-[64px] border border-white shadow-2xl bg-white/40 min-h-[500px] flex flex-col justify-between group hover:bg-white transition-all">
                      <div>
                         <div className="w-20 h-20 bg-stripe-indigo/5 rounded-[32px] flex items-center justify-center text-stripe-indigo mb-12 shadow-inner">
                            <Scales size={44} weight="fill" />
                         </div>
                         <h4 className="text-5xl font-black text-stripe-indigo tracking-tighter mb-8 italic leading-none">Redirection Node <br />Authorization</h4>
                         <div className="p-10 bg-slate-50/50 rounded-[44px] border border-slate-100 italic">
                             <p className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest mb-6 opacity-40 italic">Kontrol Logika Distribusi</p>
                            <p className="text-sm font-bold text-stripe-slate leading-relaxed opacity-60">"Authorize logistics nodes to offset 15% price increase in metropolitan clusters via direct redistribution."</p>
                         </div>
                      </div>
                      <button className="w-full border-4 border-slate-200 py-8 rounded-[36px] font-black text-sm uppercase tracking-widest hover:border-stripe-indigo/40 transition-all mt-12">Authorize High-Impact Decision</button>
                  </div>
               </div>
            )}

            {activeTab === 'POLICY' && (
               <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PolicyCard title="Subsidi Pupuk Presisi" impact="HIGH" desc="Analisis NDVI menunjukkan pemupukan berlebih di Kediri. Rekomendasi: Alihkan 20% kuota subsidi ke wilayah defisit pupuk." />
                  <PolicyCard title="Redistribusi Pangan" impact="MEDIUM" desc="Surplus Beras di Jatim (4,5k Ton) dapat menutup 100% defisit di NTT jika menggunakan VRP Solver Optimizer." />
                  <PolicyCard title="Stabilisasi Harga HET" impact="CRITICAL" desc="Penyesuaian HET untuk komoditas Bawang Merah diperlukan guna menjaga margin petani di angka 12%." />
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, active }: { label: string, value: string, active?: boolean }) {
  return (
    <div className={`flex justify-between items-center p-8 rounded-[32px] border-2 transition-all ${active ? 'bg-rose-50 border-rose-100 shadow-md' : 'bg-slate-50/50 border-slate-100 group-hover:bg-white'}`}>
       <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">{label}</span>
       <span className={`text-xl font-black italic tracking-tight ${active ? 'text-rose-600' : 'text-stripe-indigo'}`}>{value}</span>
    </div>
  );
}

function PolicyCard({ title, impact, desc }: { title: string, impact: string, desc: string }) {
  return (
    <div className="p-16 rounded-[64px] bg-white/40 border-[3px] border-white flex flex-col justify-between hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(10,37,64,0.15)] transition-all group min-h-[500px]">
       <div>
          <div className="flex justify-between items-center mb-10">
             <span className={`text-[9px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-widest shadow-sm ${impact === 'CRITICAL' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-stripe-indigo text-white shadow-stripe-indigo/20'}`}>{impact} IMPACT</span>
          </div>
          <h5 className="text-3xl font-black text-stripe-indigo mb-8 tracking-tighter leading-none italic">{title}</h5>
          <p className="text-sm font-bold text-stripe-slate opacity-60 leading-relaxed mb-8 italic font-serif leading-relaxed">{desc}</p>
       </div>
       <div className="flex items-center space-x-4 text-stripe-indigo text-[11px] font-black uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-2">
          <span>Explore Policy Analysis</span>
          <ArrowRight size={18} weight="bold" />
       </div>
    </div>
  );
}
