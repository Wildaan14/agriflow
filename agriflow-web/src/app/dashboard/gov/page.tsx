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
    <div className="w-full h-full bg-[#F4FAF0] flex items-center justify-center rounded-[32px] border border-[#C7E0B0]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-[#4A9E3F] opacity-50 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-[#1B4D1B]/40 uppercase tracking-widest">Loading Command Map…</p>
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
  CRITICAL: { dot: '#f43f5e', glow: 'rgba(244,63,94,0.2)', popup: '#FFFFFF', text: '#f43f5e' },
  WARNING:  { dot: '#f59e0b', glow: 'rgba(245,158,11,0.2)', popup: '#FFFFFF', text: '#f59e0b' },
  AMAN:     { dot: '#4A9E3F', glow: 'rgba(74,158,63,0.2)', popup: '#FFFFFF', text: '#4A9E3F' },
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
              'circle-stroke-color': '#FFFFFF',
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
              'text-halo-color': '#FFFFFF',
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
    <div className="space-y-8 py-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* SaaS Header - Refined */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-8 lg:p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="bg-[#4A9E3F]/10 text-[#4A9E3F] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-[#4A9E3F]/20">Status Keamanan Pangan: TERJAGA</span>
           </div>
           <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 leading-none text-[#1B4D1B]">National <span className="text-[#4A9E3F]">Command Center</span></h1>
           <p className="text-[#1A2E1A]/50 font-medium text-sm lg:text-base">Monitoring strategis dan intervensi real-time untuk stabilitas harga pangan nasional.</p>
        </div>
        <div className="flex bg-[#1B4D1B]/5 p-1.5 rounded-2xl border border-[#C7E0B0]/50 overflow-x-auto w-full lg:w-auto">
           {(['COMMAND', 'INFLATION', 'POLICY'] as const).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 lg:flex-none px-6 lg:px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#1B4D1B] text-white shadow-lg' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Main Layout: Map Top, Grid Bottom */}
      <div className="space-y-8">
         {/* Top Section: Full Width Map */}
         <div className="h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden border border-[#C7E0B0] relative group shadow-xl">
            {activeTab === 'COMMAND' ? (
               <>
                  <MapboxMap
                    style={mapStyle}
                    center={[118.0148634, -2.548926]}
                    zoom={4.5}
                    onMapLoad={handleMapLoad}
                  />
                  
                  {/* Floating Style Switcher */}
                  <div className="absolute top-6 right-6 z-20 flex bg-white/80 backdrop-blur-xl p-1.5 rounded-xl border border-[#C7E0B0] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                     {[
                       { id: 'mapbox://styles/mapbox/light-v11', label: 'LIGHT' },
                       { id: 'mapbox://styles/mapbox/satellite-v9', label: 'SAT' },
                       { id: 'mapbox://styles/mapbox/dark-v11', label: 'DARK' }
                     ].map(s => (
                       <button
                         key={s.id}
                         onClick={() => setMapStyle(s.id)}
                         className={`px-4 py-2 rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest ${mapStyle === s.id ? 'bg-[#1B4D1B] text-white' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
                       >
                         {s.label}
                       </button>
                     ))}
                  </div>
               </>
            ) : (
               <div className="w-full h-full bg-[#F4FAF0] flex items-center justify-center animate-in zoom-in-95 duration-700">
                  <div className="text-center group-hover:scale-110 transition-transform">
                     <Globe size={120} className="text-[#4A9E3F]/20 animate-pulse mx-auto" weight="thin" />
                     <p className="text-[10px] font-bold text-[#1B4D1B]/30 uppercase tracking-[0.5em] mt-8">System Analysis Active</p>
                  </div>
               </div>
            )}
         </div>

         {/* Bottom Section: Dynamic Content Based on Tabs */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeTab === 'COMMAND' && (
               <>
                  {/* Selection Intelligence */}
                  <div className="lg:col-span-1">
                     <div className="bg-white/60 p-8 lg:p-10 rounded-[32px] shadow-xl h-full flex flex-col border border-[#C7E0B0] backdrop-blur-xl overflow-hidden relative">
                        {selectedSpot ? (
                           <div className="animate-in slide-in-from-left duration-500 h-full flex flex-col">
                              <button 
                                onClick={() => setSelectedSpot(null)}
                                className="mb-8 text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity"
                              >
                                 <ArrowRight size={14} className="rotate-180" />
                                 <span>Back to Alerts</span>
                              </button>
                              
                              <div className="mb-8">
                                 <span className={`text-[9px] font-bold px-3 py-1 rounded border uppercase tracking-[0.2em] mb-4 inline-block shadow-sm ${selectedSpot.level === 'CRITICAL' ? 'bg-[#f43f5e]/10 text-rose-600 border-rose-500/20' : selectedSpot.level === 'WARNING' ? 'bg-[#f59e0b]/10 text-amber-600 border-amber-500/20' : 'bg-[#4A9E3F]/10 text-[#4A9E3F] border-[#4A9E3F]/20'}`}>
                                    {selectedSpot.level} PRIORITY
                                 </span>
                                 <h3 className="text-3xl font-semibold text-[#1B4D1B] tracking-tight mb-2">{selectedSpot.name}</h3>
                                 <div className="w-full h-1 bg-[#1B4D1B]/5 rounded-full overflow-hidden mb-6 mt-4">
                                    <div className="h-full bg-[#4A9E3F] shadow-sm" style={{ width: `${selectedSpot.risk * 100}%` }}></div>
                                 </div>
                                 <p className="text-sm font-medium text-[#1A2E1A]/60 leading-relaxed">{selectedSpot.detail}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-auto">
                                 <div className="bg-white p-5 rounded-2xl border border-[#C7E0B0] flex flex-col justify-center text-center shadow-sm">
                                    <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">Risk Factor</p>
                                    <p className="text-2xl font-bold text-[#1B4D1B] tracking-tight">{selectedSpot.risk}</p>
                                 </div>
                                 <div className="bg-white p-5 rounded-2xl border border-[#C7E0B0] flex flex-col justify-center text-center shadow-sm">
                                    <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">Status</p>
                                    <p className={`text-lg font-bold tracking-wide ${selectedSpot.level === 'CRITICAL' ? 'text-rose-600' : selectedSpot.level === 'WARNING' ? 'text-amber-600' : 'text-[#4A9E3F]'}`}>ACTIVE</p>
                                 </div>
                              </div>

                              <button className="w-full bg-[#1B4D1B] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B]/90 transition-all mt-8 shadow-lg">
                                 Authorize Intervention
                              </button>
                           </div>
                        ) : (
                           <div className="animate-in fade-in duration-500 flex flex-col h-full">
                              <h3 className="text-xs font-bold text-[#1B4D1B] uppercase tracking-[0.2em] mb-8 flex items-center">
                                 <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-3 shadow-sm"></div>
                                 Live Security Alerts
                              </h3>
                              <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pr-2">
                                 {ALERTS.map(alert => (
                                    <div 
                                       key={alert.id} 
                                       onClick={() => {
                                          const spot = NATIONAL_HOTSPOTS.find(s => s.name === alert.region);
                                          if (spot) setSelectedSpot(spot);
                                       }}
                                       className="p-6 rounded-2xl bg-white/40 border border-[#C7E0B0] hover:border-[#4A9E3F]/30 hover:bg-white transition-all cursor-pointer group shadow-sm"
                                    >
                                       <div className="flex justify-between items-center mb-3">
                                          <span className={`text-[8px] font-bold px-2.5 py-1 rounded border uppercase tracking-widest ${alert.type === 'CRITICAL' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>{alert.type}</span>
                                          <BellRinging size={16} weight="fill" className={alert.type === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'} />
                                       </div>
                                       <h4 className="text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest mb-2 group-hover:text-[#1B4D1B] transition-colors">{alert.region}</h4>
                                       <p className="text-sm font-medium text-[#1A2E1A]/80 leading-relaxed line-clamp-2">{alert.msg}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Strategic Overview Metrics */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
                     <div className="bg-white/60 p-8 lg:p-10 rounded-[32px] border border-[#C7E0B0] shadow-xl hover:border-[#4A9E3F]/20 transition-all flex flex-col justify-between min-h-[250px] backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-8">
                           <div className="w-12 h-12 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-xl flex items-center justify-center text-[#4A9E3F]">
                              <Scales size={24} weight="fill" />
                           </div>
                           <span className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-[0.2em]">Impact Index</span>
                        </div>
                        <div>
                           <div className="flex items-baseline space-x-3 mb-1">
                              <p className="text-4xl lg:text-5xl font-bold text-[#1B4D1B] tracking-tight">92.4%</p>
                              <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-widest">+4.2%</span>
                           </div>
                           <p className="text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest mt-2">National Supply Stability Score</p>
                        </div>
                     </div>

                     <div className="bg-white/60 p-8 lg:p-10 rounded-[32px] border border-[#C7E0B0] shadow-xl hover:border-[#4A9E3F]/20 transition-all flex flex-col justify-between min-h-[250px] backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-8">
                           <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
                              <ChartLineUp size={24} weight="fill" />
                           </div>
                           <span className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-[0.2em]">Risk Analytics</span>
                        </div>
                        <div>
                           <div className="flex items-baseline space-x-3 mb-1">
                              <p className="text-4xl lg:text-5xl font-bold text-[#1B4D1B] tracking-tight">0.24</p>
                              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Low Risk</span>
                           </div>
                           <p className="text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest mt-2">Aggregate National Inflation Risk</p>
                        </div>
                     </div>

                     {/* Strategic Insight Item */}
                     <div className="bg-[#4A9E3F]/5 p-8 lg:p-10 rounded-[32px] border border-[#4A9E3F]/20 shadow-xl lg:col-span-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
                           <ShieldCheck size={240} weight="fill" className="text-[#4A9E3F]" />
                        </div>
                        <div className="relative z-10">
                           <p className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-[0.2em] mb-4">Wawasan Strategis Pusat Komando</p>
                           <h4 className="text-2xl lg:text-3xl font-bold text-[#1B4D1B] tracking-tight lg:w-3/4 mb-6">Optimasi Distribusi Surplus di Jawa Timur Direkomendasikan</h4>
                           <div className="p-6 rounded-2xl bg-white border border-[#C7E0B0] group-hover:border-[#4A9E3F]/30 transition-colors shadow-sm">
                              <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">
                                 "Berdasarkan data surplus beras di Jawa Timur sebesar <span className="font-bold text-[#1B4D1B]">420 Ton</span>, sistem merekomendasikan pengalihan 20% stok ke wilayah DKI Jakarta guna menekan probabilitas gejolak harga yang kini mencapai <span className="font-bold text-rose-600">92%</span>."
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}

            {/* Other Tabs content - kept clean and consistent */}
            {activeTab === 'INFLATION' && (
               <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/60 p-10 lg:p-12 rounded-[32px] border border-[#C7E0B0] shadow-xl flex flex-col justify-between group hover:border-[#4A9E3F]/20 transition-all min-h-[450px]">
                     <div>
                        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-600 mb-10">
                           <CurrencyCircleDollar size={32} weight="fill" />
                        </div>
                        <h4 className="text-3xl lg:text-4xl font-bold text-[#1B4D1B] tracking-tight mb-8">Inflation Sensitivity <br />Deep-Analysis</h4>
                        <div className="space-y-4">
                           <MetricRow label="Target CPI" value="2.5%" />
                           <MetricRow label="Current CPI (Food)" value="3.1%" active />
                           <MetricRow label="Forecasting (2w)" value="2.9%" />
                        </div>
                     </div>
                     <button className="w-full bg-[#1B4D1B] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all mt-10">Generate Executive Report</button>
                  </div>
                  <div className="bg-white/60 p-10 lg:p-12 rounded-[32px] border border-[#C7E0B0] shadow-xl flex flex-col justify-between group hover:border-[#4A9E3F]/20 transition-all min-h-[450px]">
                       <div>
                          <div className="w-16 h-16 bg-[#4A9E3F]/10 border border-[#4A9E3F]/20 rounded-2xl flex items-center justify-center text-[#4A9E3F] mb-10">
                             <Scales size={32} weight="fill" />
                          </div>
                          <h4 className="text-3xl lg:text-4xl font-bold text-[#1B4D1B] tracking-tight mb-8">Redirection Node <br />Authorization</h4>
                          <div className="p-8 bg-white rounded-2xl border border-[#C7E0B0] shadow-sm">
                              <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-4">Kontrol Logika Distribusi</p>
                             <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed">"Authorize logistics nodes to offset 15% price increase in metropolitan clusters via direct redistribution."</p>
                          </div>
                       </div>
                       <button className="w-full border border-[#1B4D1B] text-[#1B4D1B] py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1B4D1B] hover:text-white transition-all mt-10">Authorize High-Impact Decision</button>
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
    <div className={`flex justify-between items-center p-6 rounded-2xl border transition-all ${active ? 'bg-rose-500/10 border-rose-500/20 shadow-sm' : 'bg-white border-[#C7E0B0] hover:border-[#4A9E3F]/20'}`}>
       <span className="text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest">{label}</span>
       <span className={`text-lg font-bold tracking-tight ${active ? 'text-rose-600' : 'text-[#1B4D1B]'}`}>{value}</span>
    </div>
  );
}

function PolicyCard({ title, impact, desc }: { title: string, impact: string, desc: string }) {
  const impactColor = impact === 'CRITICAL' ? 'text-rose-600 border-rose-500/20 bg-rose-500/5' : 
                      impact === 'HIGH' ? 'text-amber-600 border-amber-500/20 bg-amber-500/5' : 
                      'text-[#4A9E3F] border-[#4A9E3F]/20 bg-[#4A9E3F]/5';

  return (
    <div className="p-8 lg:p-10 rounded-[32px] bg-white/60 border border-[#C7E0B0] flex flex-col justify-between hover:border-[#4A9E3F]/30 hover:bg-white transition-all group min-h-[350px] shadow-sm">
       <div>
          <div className="flex justify-between items-center mb-8">
             <span className={`text-[8px] font-bold px-3 py-1.5 rounded-lg border uppercase tracking-widest ${impactColor}`}>{impact} IMPACT</span>
          </div>
          <h5 className="text-2xl font-bold text-[#1B4D1B] mb-6 tracking-tight group-hover:text-[#4A9E3F] transition-colors">{title}</h5>
          <p className="text-sm font-medium text-[#1A2E1A]/60 leading-relaxed mb-6">{desc}</p>
       </div>
       <div className="flex items-center space-x-3 text-[#4A9E3F] text-[10px] font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-2 cursor-pointer w-fit">
          <span>Explore Policy Analysis</span>
          <ArrowRight size={16} weight="bold" />
       </div>
    </div>
  );
}
