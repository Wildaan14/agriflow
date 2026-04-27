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
    <div className="w-full h-full bg-[#F4FAF0] flex items-center justify-center rounded-[32px] border border-[#C7E0B0]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-[#4A9E3F] opacity-50 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-[#1B4D1B]/40 uppercase tracking-widest">Memuat Intelligence Map…</p>
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
        const markerColor = isSurplus ? "#4A9E3F" : "#f43f5e";

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
              "circle-radius": 40,
              "circle-color": markerColor,
              "circle-opacity": 0.15,
              "circle-blur": 1.5,
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
              "circle-radius": 8,
              "circle-color": markerColor,
              "circle-stroke-width": 3,
              "circle-stroke-color": "#FFFFFF",
              "circle-opacity": 1.0,
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
              "text-size": 11,
              "text-offset": [0, 1.5],
              "text-anchor": "top",
            },
            paint: {
              "text-color": "#1B4D1B",
              "text-halo-color": "#FFFFFF",
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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Refined Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
           <div className="flex items-center space-x-2 mb-4">
             <MapTrifold size={20} className="text-[#4A9E3F]" />
             <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-[0.3em]">Pemetaan Wilayah Cerdas</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-none text-[#1B4D1B]">Supply & Demand <span className="text-[#0D7A6B]">Intelligence</span></h1>
           <p className="text-[#1A2E1A]/50 font-medium text-sm max-w-xl leading-relaxed">Visualisasi real-time surplus, defisit, dan analisis kesesuaian komoditas pertanian di seluruh wilayah nasional.</p>
        </div>
        <div className="flex space-x-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none bg-white border border-[#C7E0B0] text-[#1B4D1B] px-6 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#1B4D1B]/5 transition-all flex items-center justify-center space-x-3 shadow-sm">
              <Warning size={16} weight="bold" />
              <span>Simulasi Defisit</span>
           </button>
           <button className="flex-1 lg:flex-none bg-[#1B4D1B] text-white px-6 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all flex items-center justify-center space-x-3 group">
              <span>Optimasi Logistik</span>
              <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* Main Content Area: Map Top, Content Bottom */}
      <div className="space-y-8">
         {/* Top Area: Full Width Map */}
         <div className="h-[500px] rounded-[32px] overflow-hidden border border-[#C7E0B0] shadow-xl relative group">
            <MapboxMap
              style={mapStyle}
              center={[113.9213, -0.7893]}
              zoom={4.8}
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
                   className={`px-4 py-2 rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest ${mapStyle === s.id ? 'bg-[#1B4D1B] text-white shadow-sm' : 'text-[#1B4D1B]/40 hover:text-[#1B4D1B]'}`}
                 >
                   {s.label}
                 </button>
               ))}
            </div>
         </div>

         {/* Bottom Area: Insights & Analytics */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Regional Selection Intelligence */}
            <div className="lg:col-span-1">
               <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] shadow-xl min-h-[500px] flex flex-col backdrop-blur-3xl overflow-hidden relative">
                  {selectedRegion ? (
                    <div className="animate-in slide-in-from-left duration-500 h-full flex flex-col">
                       <button 
                         onClick={() => setSelectedRegion(null)}
                         className="mb-8 text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest flex items-center space-x-2 hover:text-[#1B4D1B] transition-colors w-fit"
                       >
                          <ArrowRight size={14} className="rotate-180" />
                          <span>Kembali ke Daftar Wilayah</span>
                       </button>
                       
                       <div className="mb-10 flex-1">
                          <span className={`text-[9px] font-bold px-3 py-1.5 rounded-md uppercase tracking-[0.2em] mb-4 inline-block shadow-sm ${selectedRegion.status === 'SURPLUS' ? 'bg-[#4A9E3F]/10 text-[#4A9E3F] border border-[#4A9E3F]/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                             {selectedRegion.status} STOK
                          </span>
                          <h3 className="text-3xl font-bold text-[#1B4D1B] tracking-tight mb-2">{selectedRegion.name}</h3>
                          <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Statistik Wilayah Real-Time</p>
                          
                          <div className="grid grid-cols-1 gap-4 mt-8">
                             <div className="bg-white p-6 rounded-2xl border border-[#C7E0B0] flex justify-between items-center group/item hover:bg-[#F4FAF0] transition-all shadow-sm">
                                <div>
                                   <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1.5">Komoditas Utama</p>
                                   <p className="text-xl font-bold text-[#1B4D1B] tracking-tight">{selectedRegion.commodity}</p>
                                </div>
                                <Leaf size={28} className="text-[#1B4D1B]/10 group-hover/item:text-[#4A9E3F] transition-colors" weight="fill" />
                             </div>
                             <div className="bg-white p-6 rounded-2xl border border-[#C7E0B0] flex justify-between items-center group/item hover:bg-[#F4FAF0] transition-all shadow-sm">
                                <div>
                                   <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1.5">Volume Tersedia</p>
                                   <p className={`text-2xl font-bold tracking-tight ${selectedRegion.status === 'SURPLUS' ? 'text-[#4A9E3F]' : 'text-rose-500'}`}>{selectedRegion.volume}</p>
                                </div>
                                <Database size={28} className="text-[#1B4D1B]/10 group-hover/item:text-[#0D7A6B] transition-colors" weight="fill" />
                             </div>
                          </div>
                       </div>

                       <button className="w-full bg-[#0D7A6B] text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#0D7A6B]/90 transition-all">
                          Pesan Prioritas Logistik
                       </button>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 flex flex-col h-full">
                       <h3 className="text-[11px] font-bold text-[#1B4D1B] uppercase tracking-[0.3em] mb-8 flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0D7A6B] animate-ping mr-2"></div>
                          Market Intelligence
                       </h3>
                       <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pr-2">
                          {REGIONS.map(region => (
                            <div 
                              key={region.id} 
                              onClick={() => setSelectedRegion(region)}
                              className="p-5 rounded-2xl bg-white border border-[#C7E0B0] hover:border-[#4A9E3F]/30 hover:bg-[#F4FAF0] transition-all cursor-pointer group shadow-sm flex flex-col justify-center"
                            >
                               <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-sm font-bold text-[#1B4D1B] leading-none tracking-tight">{region.name}</h4>
                                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border ${region.status === 'SURPLUS' ? 'bg-[#4A9E3F]/10 text-[#4A9E3F] border-[#4A9E3F]/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>{region.status}</span>
                               </div>
                               <div className="flex justify-between items-end">
                                  <p className="text-[9px] font-bold text-[#1A2E1A]/50 uppercase tracking-[0.2em]">{region.commodity}</p>
                                  <span className="text-[10px] font-bold text-[#1B4D1B]/70 font-mono tracking-tighter">{region.volume}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>

            {/* Column 2 & 3: Geo-Suitability Intelligence & Metrics */}
            <div className="lg:col-span-2 space-y-8">
               {/* Metrics Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] shadow-xl flex flex-col justify-between group hover:bg-[#F4FAF0] transition-all backdrop-blur-3xl">
                     <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-[#0D7A6B]/10 rounded-2xl flex items-center justify-center text-[#0D7A6B] group-hover:scale-110 transition-transform">
                           <ChartLineUp size={24} weight="fill" />
                        </div>
                        <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Peluang Arbitrase</p>
                     </div>
                     <div>
                        <p className="text-3xl font-bold text-[#1B4D1B] tracking-tighter mb-2">Rp 1.25B<span className="text-sm font-normal text-[#1A2E1A]/40 ml-2">Potensi Margin</span></p>
                        <p className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest flex items-center">
                           <Warning size={12} className="mr-1" />
                           Surplus Jatim Cocok dengan Defisit NTT
                        </p>
                     </div>
                  </div>

                  <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] shadow-xl flex justify-between items-center group hover:bg-[#F4FAF0] transition-all backdrop-blur-3xl">
                     <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-[#4A9E3F]/10 rounded-2xl flex items-center justify-center text-[#4A9E3F] group-hover:scale-110 transition-transform">
                           <MapTrifold size={32} weight="fill" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1.5">Node Intelijen Aktif</p>
                           <p className="text-3xl font-bold text-[#1B4D1B] tracking-tighter leading-none">11 Provinsi</p>
                        </div>
                     </div>
                     <ArrowRight size={24} className="text-[#1B4D1B]/20 group-hover:text-[#1B4D1B]/60 group-hover:translate-x-2 transition-all" />
                  </div>
               </div>

               {/* Geo-Suitability Analysis Engine */}
               <div className="bg-white/60 p-10 rounded-[40px] border border-[#C7E0B0] relative overflow-hidden group flex-1 min-h-[400px] shadow-xl backdrop-blur-3xl">
                  <div className="absolute top-0 right-0 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                     <Leaf size={300} weight="fill" className="text-[#4A9E3F]" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                     <div className="mb-10">
                        <p className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-[0.3em] mb-3 flex items-center">
                           <Scales size={14} className="mr-1.5" />
                           Mesin Analisis Kesesuaian AI
                        </p>
                        <h4 className="text-3xl font-bold text-[#1B4D1B] tracking-tight lg:w-2/3">Analisis Kecocokan Lahan & Komoditas</h4>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
                          { area: "Kediri", crops: "Cabai, Jagung", match: "98%", status: "IDEAL" },
                          { area: "Malang", crops: "Sayuran, Jagung", match: "94%", status: "OPTIMAL" },
                          { area: "Brebes", crops: "Bawang Merah", match: "99%", status: "SEMPURNA" },
                        ].map(item => (
                          <div key={item.area} className="bg-white p-6 rounded-[24px] border border-[#C7E0B0] hover:border-[#4A9E3F]/30 hover:scale-[1.02] transition-all shadow-sm">
                             <div className="flex justify-between items-start mb-4">
                                <p className="text-[10px] font-bold text-[#1A2E1A]/50 uppercase tracking-widest">{item.area}</p>
                                <span className={`text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-widest ${item.status === 'SEMPURNA' ? 'bg-[#0D7A6B]/10 text-[#0D7A6B]' : 'bg-[#4A9E3F]/10 text-[#4A9E3F]'}`}>{item.status}</span>
                             </div>
                             <p className="text-2xl font-bold text-[#1B4D1B] mb-1.5">{item.match}</p>
                             <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">{item.crops}</p>
                          </div>
                        ))}
                     </div>

                     <div className="p-6 rounded-2xl bg-[#0D7A6B]/5 border border-[#0D7A6B]/20 shadow-sm relative overflow-hidden mb-8">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7A6B]/10 blur-2xl rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-start space-x-4 relative z-10">
                           <div className="w-10 h-10 bg-[#0D7A6B]/20 rounded-xl flex-shrink-0 flex items-center justify-center text-[#0D7A6B]">
                              <Scales size={20} weight="fill" />
                           </div>
                           <p className="text-sm font-bold text-[#1A2E1A]/80 leading-relaxed">
                              "Analisis Geospatial AI mendeteksi pergeseran tingkat keasaman tanah di wilayah Jawa Barat Utara. Direkomendasikan untuk optimalisasi komoditas Bawang Merah varietas Bima Brebes guna menjaga hasil panen tetap di atas 12 Ton/Ha."
                           </p>
                        </div>
                     </div>

                     <div className="mt-auto flex justify-between items-center pt-8 border-t border-[#C7E0B0]">
                        <div className="flex -space-x-3">
                           {[1, 2, 3, 4, 5].map(i => (
                             <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#1B4D1B]/5 flex items-center justify-center text-[9px] font-bold text-[#1B4D1B]/30 hover:bg-[#1B4D1B]/10 hover:text-[#1B4D1B] transition-colors cursor-pointer shadow-sm">
                                A-I
                             </div>
                           ))}
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-[#0D7A6B] text-white flex items-center justify-center text-[10px] font-bold z-10 shadow-sm">
                              +24
                           </div>
                        </div>
                         <div className="text-right">
                            <p className="text-[10px] font-bold text-[#1A2E1A]/30 uppercase tracking-widest">AgriFlow AI Engine Network</p>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4 animate-in slide-in-from-bottom-10" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
         <div className="bg-white p-5 rounded-[24px] border border-[#C7E0B0] shadow-2xl max-w-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A9E3F]/10 blur-xl rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center space-x-3 mb-3 relative z-10">
               <div className="w-6 h-6 bg-[#4A9E3F] rounded-full flex items-center justify-center text-white animate-pulse">
                  <Globe size={12} weight="fill" />
               </div>
               <span className="text-[9px] font-bold text-[#4A9E3F] uppercase tracking-widest">AgriBot Assistant</span>
            </div>
            <p className="text-[11px] font-bold text-[#1A2E1A]/80 leading-relaxed relative z-10">
               Ada potensi <span className="text-[#1B4D1B] font-bold">Arbitrase Bawang Merah</span> dari Brebes ke Jakarta. Keuntungan diprediksi naik +12% besok berdasarkan analisis tren cuaca.
            </p>
         </div>
         <button className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group">
            <WhatsappLogo size={28} weight="fill" className="group-hover:rotate-12 transition-transform" />
         </button>
      </div>

    </div>
  );
}
