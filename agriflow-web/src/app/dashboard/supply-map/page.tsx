"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";
import {
  MapTrifold,
  CaretRight,
  Warning,
  Globe,
  WhatsappLogo,
  ChartLineUp,
  Database,
  Leaf,
  Bell,
  ArrowRight,
  Scales
} from "@phosphor-icons/react";

const MapboxMap = dynamic(() => import("@/components/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[64px]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-stripe-indigo opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Intelligence Map…</p>
      </div>
    </div>
  ),
});

const REGIONS = [
  {
    id: "REG-01",
    name: "Kab. Kediri",
    status: "SURPLUS",
    commodity: "Cabai Keriting",
    volume: "+120 Ton",
    price: "Rp 18.500",
    coordinates: [112.0086, -7.8172] as [number, number],
  },
  {
    id: "REG-02",
    name: "Kab. Malang",
    status: "SURPLUS",
    commodity: "Jagung",
    volume: "+450 Ton",
    price: "Rp 5.200",
    coordinates: [112.6304, -7.9797] as [number, number],
  },
  {
    id: "REG-03",
    name: "Kota Surabaya",
    status: "DEFICIT",
    commodity: "Beras",
    volume: "-2.4k Ton",
    price: "Rp 14.200",
    coordinates: [112.7520, -7.2575] as [number, number],
  },
  {
    id: "REG-04",
    name: "Kab. Brebes",
    status: "SURPLUS",
    commodity: "Bawang Merah",
    volume: "+320 Ton",
    price: "Rp 16.500",
    coordinates: [109.0317, -6.8726] as [number, number],
  },
  {
    id: "REG-05",
    name: "Kab. Blitar",
    status: "SURPLUS",
    commodity: "Pisang",
    volume: "+220 Ton",
    price: "Rp 3.800",
    coordinates: [112.1936, -8.1003] as [number, number],
  },
  {
    id: "REG-06",
    name: "Kota Bandung",
    status: "DEFICIT",
    commodity: "Sayuran",
    volume: "-180 Ton",
    price: "Rp 9.500",
    coordinates: [107.6186, -6.9175] as [number, number],
  },
];

export default function SupplyMapPage() {
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/light-v11');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    const addLayers = () => {
      REGIONS.forEach((region) => {
        const isSurplus = region.status === "SURPLUS";
        const sourceId = `supply-${region.id}`;

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "Point", coordinates: region.coordinates },
              properties: { id: region.id, name: region.name, status: region.status, commodity: region.commodity, volume: region.volume },
            },
          });
        }

        // Pulse effect
        if (!map.getLayer(`${sourceId}-glow`)) {
          map.addLayer({
            id: `${sourceId}-glow`,
            type: "circle",
            source: sourceId,
            paint: {
              "circle-radius": 48,
              "circle-color": isSurplus ? "#10b981" : "#f43f5e",
              "circle-opacity": 0.1,
              "circle-blur": 1.2,
            },
          });
        }

        // Main marker
        if (!map.getLayer(`${sourceId}-dot`)) {
          map.addLayer({
            id: `${sourceId}-dot`,
            type: "circle",
            source: sourceId,
            paint: {
              "circle-radius": 12,
              "circle-color": isSurplus ? "#10b981" : "#f43f5e",
              "circle-stroke-width": 4,
              "circle-stroke-color": "#ffffff",
              "circle-opacity": 0.9,
            },
          });
        }

        // Label
        if (!map.getLayer(`${sourceId}-label`)) {
          map.addLayer({
            id: `${sourceId}-label`,
            type: "symbol",
            source: sourceId,
            layout: {
              "text-field": ["concat", region.name, "\n", region.volume],
              "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              "text-size": 10,
              "text-offset": [0, 2.5],
              "text-anchor": "top",
            },
            paint: {
              "text-color": isSurplus ? "#065f46" : "#be123c",
              "text-halo-color": "#ffffff",
              "text-halo-width": 2,
            },
          });
        }

        map.on("click", `${sourceId}-dot`, () => {
          setSelectedRegion(region);
          map.flyTo({ center: region.coordinates, zoom: 7, duration: 1500 });
        });

        map.on("mouseenter", `${sourceId}-dot`, () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", `${sourceId}-dot`, () => (map.getCanvas().style.cursor = ""));
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
      {/* Refined Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none italic">Supply & Demand Intelligence</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70 italic font-serif leading-none">Visualisasi real-time surplus, defisit, dan analisis kesesuaian wilayah nasional.</p>
        </div>
        <div className="flex space-x-4">
           <button className="bg-white border border-slate-200 text-stripe-indigo px-8 py-4 rounded-[22px] font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-3">
              <Warning size={16} weight="bold" />
              <span>Simulasi Defisit</span>
           </button>
           <button className="bg-stripe-indigo text-white px-8 py-4 rounded-[22px] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all flex items-center space-x-3">
              <span>Optimasi Logistik</span>
              <ArrowRight size={16} weight="bold" />
           </button>
        </div>
      </div>

      {/* Main Content Area: Map Top, Content Bottom */}
      <div className="space-y-10">
         {/* Top Area: Full Width Map */}
         <div className="h-[600px] rounded-[64px] overflow-hidden border border-white shadow-[0_40px_100px_-20px_rgba(10,37,64,0.1)] relative group">
            <MapboxMap
              style={mapStyle}
              center={[113.9213, -0.7893]}
              zoom={4.8}
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
         </div>

         {/* Bottom Area: Insights & Analytics */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Column 1: Regional Selection Intelligence */}
            <div className="lg:col-span-1">
               <div className="glass-card-premium p-10 rounded-[48px] shadow-2xl min-h-[500px] flex flex-col border border-white bg-white/40 backdrop-blur-3xl overflow-hidden relative">
                  {selectedRegion ? (
                    <div className="animate-in slide-in-from-left duration-500 h-full flex flex-col">
                       <button 
                         onClick={() => setSelectedRegion(null)}
                         className="mb-8 text-[10px] font-black text-stripe-indigo uppercase tracking-widest flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity"
                       >
                          <ArrowRight size={14} className="rotate-180" />
                          <span>View Regional List</span>
                       </button>
                       
                       <div className="mb-10">
                          <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-white mb-4 inline-block shadow-lg ${selectedRegion.status === 'SURPLUS' ? 'bg-stripe-emerald' : 'bg-rose-500'}`}>
                             {selectedRegion.status} STOK
                          </span>
                          <h3 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-2 italic">{selectedRegion.name}</h3>
                          <p className="text-xs font-bold text-stripe-slate opacity-40 italic">Statistik Wilayah Berbasis Data Riil</p>
                       </div>

                       <div className="grid grid-cols-1 gap-4 mb-auto">
                          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-inner flex justify-between items-center group/item hover:bg-white transition-all">
                             <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Commodity</p>
                                <p className="text-xl font-black text-stripe-indigo tracking-tight">{selectedRegion.commodity}</p>
                             </div>
                             <Leaf size={24} className="text-stripe-indigo opacity-20 group-hover/item:opacity-100 transition-opacity" weight="fill" />
                          </div>
                          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-inner flex justify-between items-center group/item hover:bg-white transition-all">
                             <div>
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Available Volume</p>
                                <p className={`text-2xl font-black tracking-tight ${selectedRegion.status === 'SURPLUS' ? 'text-stripe-emerald' : 'text-rose-500'}`}>{selectedRegion.volume}</p>
                             </div>
                             <Database size={24} className="text-stripe-indigo opacity-20 group-hover/item:opacity-100 transition-opacity" weight="fill" />
                          </div>
                       </div>

                       <button className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(100,90,255,0.4)] hover:bg-black transition-all mt-10">
                          Book Priority Logistics
                       </button>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full">
                       <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.3em] mb-10 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-stripe-indigo animate-ping mr-3"></div>
                          Market Intelligence
                       </h3>
                       <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-2">
                          {REGIONS.map(region => (
                            <div 
                              key={region.id} 
                              onClick={() => setSelectedRegion(region)}
                              className="p-6 rounded-[32px] bg-white/60 border border-white hover:border-stripe-indigo/20 transition-all cursor-pointer group shadow-sm hover:shadow-2xl"
                            >
                               <div className="flex justify-between items-center mb-4">
                                  <span className={`text-[8px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm ${region.status === 'SURPLUS' ? 'bg-stripe-emerald text-white' : 'bg-rose-500 text-white'}`}>{region.status}</span>
                                  <span className="text-[10px] font-black text-slate-400 opacity-60 font-mono tracking-tighter">{region.volume}</span>
                               </div>
                               <h4 className="text-base font-black text-stripe-indigo mb-1 leading-none tracking-tight italic">{region.name}</h4>
                               <p className="text-[9px] font-bold text-stripe-slate opacity-30 uppercase tracking-[0.2em]">{region.commodity}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>

            {/* Column 2 & 3: Geo-Suitability Intelligence & Metrics */}
            <div className="lg:col-span-2 space-y-10">
               {/* Metrics Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card-premium p-8 rounded-[40px] border border-white shadow-xl bg-white/40 flex flex-col justify-between group hover:bg-white transition-all">
                     <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-stripe-indigo/5 rounded-2xl flex items-center justify-center text-stripe-indigo group-hover:bg-stripe-indigo group-hover:text-white transition-all">
                           <ChartLineUp size={24} weight="fill" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Arbitrage Opportunity</p>
                     </div>
                     <div>
                        <p className="text-4xl font-black text-stripe-indigo tracking-tighter mb-1">Rp 1.25B<span className="text-sm opacity-20 ml-2">Potential Margin</span></p>
                        <p className="text-[10px] font-bold text-stripe-slate opacity-40 uppercase tracking-widest">Surplus Jatim Match with NTT Deficit</p>
                     </div>
                  </div>

                  <div className="glass-card-premium p-8 rounded-[40px] border border-white shadow-xl bg-white/40 flex justify-between items-center group hover:bg-white transition-all">
                     <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-stripe-indigo/5 rounded-2xl flex items-center justify-center text-stripe-indigo shadow-inner group-hover:scale-110 transition-transform">
                           <MapTrifold size={32} weight="fill" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60 italic">Intelligence Nodes</p>
                           <p className="text-4xl font-black text-stripe-indigo tracking-tighter leading-none italic">11 Provinces</p>
                        </div>
                     </div>
                     <ArrowRight size={24} className="text-stripe-indigo opacity-20 group-hover:translate-x-2 transition-transform" />
                  </div>
               </div>

               {/* Geo-Suitability Analysis Engine */}
               <div className="glass-card-premium p-12 rounded-[56px] shadow-2xl relative overflow-hidden group border border-white flex-1 min-h-[400px] bg-white/40 backdrop-blur-3xl">
                  <div className="absolute top-0 right-0 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                     <Leaf size={240} weight="fill" className="text-stripe-emerald" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                     <div className="mb-12">
                        <p className="text-[10px] font-black text-stripe-emerald uppercase tracking-[0.3em] mb-4 italic">Mesin Analisis Kesesuaian</p>
                        <h4 className="text-4xl font-black text-stripe-indigo tracking-tighter lg:w-2/3 italic leading-none">Analisis Kecocokan Wilayah Nasional</h4>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                          { area: "Kediri", crops: "Cabai, Jagung", match: "98%", status: "IDEAL" },
                          { area: "Malang", crops: "Sayuran, Jagung", match: "94%", status: "OPTIMAL" },
                          { area: "Brebes", crops: "Bawang Merah", match: "99%", status: "PERFECT" },
                        ].map(item => (
                          <div key={item.area} className="bg-white/80 p-8 rounded-[36px] border border-white shadow-inner hover:scale-[1.02] transition-all">
                             <div className="flex justify-between items-start mb-6">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.area}</p>
                                <span className="text-[8px] font-black text-stripe-emerald bg-emerald-50 px-3 py-1.5 rounded-xl uppercase shadow-sm border border-emerald-100/50">{item.status}</span>
                             </div>
                             <p className="text-2xl font-black text-stripe-indigo mb-1 tracking-widest font-mono">{item.match}</p>
                             <p className="text-[9px] font-black text-stripe-slate opacity-30 uppercase tracking-[0.2em]">{item.crops}</p>
                          </div>
                        ))}
                     </div>

                     <div className="p-8 rounded-[40px] bg-white border border-dashed border-slate-200 shadow-sm relative overflow-hidden group/text mb-10">
                        <div className="flex items-start space-x-4 relative z-10">
                           <div className="w-10 h-10 bg-stripe-emerald/10 rounded-xl flex-shrink-0 flex items-center justify-center text-stripe-emerald">
                              <Scales size={20} weight="fill" />
                           </div>
                           <p className="text-[11px] font-bold text-stripe-indigo/80 leading-relaxed italic">
                              "Analisis Geospatial mendeteksi pergeseran tingkat keasaman tanah di wilayah Jawa Barat Utara. Direkomendasikan untuk optimalisasi komoditas Bawang Merah varietas Bima Brebes guna menjaga yield panen tetap di atas 12 Ton/Ha."
                           </p>
                        </div>
                        <div className="absolute inset-0 bg-stripe-indigo/5 translate-y-full group-hover/text:translate-y-0 transition-transform duration-700"></div>
                     </div>

                     <div className="mt-auto flex justify-between items-center pt-10 border-t border-dashed border-slate-200">
                        <div className="flex -space-x-4">
                           {[1, 2, 3, 4, 5].map(i => (
                             <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-stripe-indigo shadow-md overflow-hidden relative group/avatar">
                                <span className="opacity-20 uppercase">A-I</span>
                                <div className="absolute inset-0 bg-stripe-indigo/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                             </div>
                           ))}
                           <div className="w-12 h-12 rounded-full border-4 border-white bg-stripe-indigo text-white flex items-center justify-center text-[10px] font-black shadow-xl tracking-tighter">
                              +24
                           </div>
                        </div>
                         <div className="text-right">
                            <p className="text-[11px] font-black text-stripe-indigo uppercase tracking-[0.1em]">AgriFlow Intelligence Gateway</p>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Floating AI Assistant - NEW PREMIUM ELEMENT */}
      <div className="fixed bottom-12 right-12 z-50 flex flex-col items-end space-y-4 animate-slide-up" style={{ animationDelay: '1s' }}>
         <div className="bg-white/80 backdrop-blur-3xl p-6 rounded-[32px] border border-white shadow-2xl max-w-xs animate-float relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-stripe-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center space-x-3 mb-3">
               <div className="w-8 h-8 bg-stripe-indigo rounded-full flex items-center justify-center text-white animate-pulse-gentle">
                  <Globe size={16} weight="fill" />
               </div>
               <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest">AgriBot Assistant</span>
            </div>
            <p className="text-[11px] font-bold text-stripe-slate leading-relaxed italic">
               "Ada potensi **Arbitrase Bawang Merah** dari Brebes ke Jakarta. Keuntungan diprediksi naik +12% besok."
            </p>
         </div>
         <button className="w-20 h-20 bg-stripe-indigo text-white rounded-full flex items-center justify-center shadow-2xl shadow-stripe-indigo/40 hover:scale-110 transition-all hover:bg-black active:scale-95 group">
            <WhatsappLogo size={32} weight="fill" className="group-hover:rotate-12 transition-transform" />
         </button>
      </div>

    </div>
  );
}

function OpportunityItem({ label, value, desc, icon: Icon }: { label: string; value: string; desc: string; icon: any }) {
  return (
    <div className="glass-card-premium p-8 rounded-[40px] group hover:bg-white transition-all border border-white shadow-xl bg-white/40">
       <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-stripe-indigo group-hover:bg-stripe-indigo group-hover:text-white transition-all">
             <Icon size={20} weight="fill" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{label}</p>
       </div>
       <p className="text-4xl font-black text-stripe-indigo mb-1 tracking-tighter italic">{value}</p>
       <p className="text-[10px] font-black text-stripe-slate opacity-30 uppercase tracking-widest">{desc}</p>
    </div>
  );
}
