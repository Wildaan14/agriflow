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
    <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-3xl border border-gray-200">
      <div className="text-center">
        <Globe size={48} className="text-[#4A9E3F] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Intelligence Map…</p>
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
    coordinates: [112.0086, -7.8172] as [number, number],
  },
  {
    id: "REG-02",
    name: "Kab. Malang",
    status: "SURPLUS",
    commodity: "Jagung",
    volume: "+450 Ton",
    coordinates: [112.6304, -7.9797] as [number, number],
  },
  {
    id: "REG-03",
    name: "Kota Surabaya",
    status: "DEFICIT",
    commodity: "Beras",
    volume: "-2.4k Ton",
    coordinates: [112.7520, -7.2575] as [number, number],
  },
  {
    id: "REG-04",
    name: "Kab. Brebes",
    status: "SURPLUS",
    commodity: "Bawang Merah",
    volume: "+320 Ton",
    coordinates: [109.0317, -6.8726] as [number, number],
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
        const markerColor = isSurplus ? "#4A9E3F" : "#ef4444";

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

        // Main marker
        if (!map.getLayer(`${sourceId}-dot`)) {
          map.addLayer({
            id: `${sourceId}-dot`,
            type: "circle",
            source: sourceId,
            paint: {
              "circle-radius": 6,
              "circle-color": markerColor,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#FFFFFF",
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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Intelligence Map</h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Global supply & demand surveillance.</p>
        </div>
        <div className="flex space-x-3">
           <button className="btn-minimal btn-secondary text-xs px-4">Simulation</button>
           <button className="btn-minimal btn-primary text-xs px-4">Logistics Opt.</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar: Market Intelligence */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6 h-[600px] flex flex-col">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Market Nodes</h3>
               <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
                  {REGIONS.map(region => (
                    <div 
                      key={region.id} 
                      onClick={() => setSelectedRegion(region)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer group ${selectedRegion?.id === region.id ? 'bg-[#1B4D1B]/5 border-[#1B4D1B]/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
                    >
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-bold text-gray-900">{region.name}</h4>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${region.status === 'SURPLUS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{region.status}</span>
                       </div>
                       <p className="text-[10px] text-gray-500 font-medium">{region.commodity} • {region.volume}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Map Viewport */}
         <div className="lg:col-span-3 space-y-6">
            <div className="h-[600px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative group">
               <MapboxMap
                 style={mapStyle}
                 center={[113.9213, -0.7893]}
                 zoom={4.8}
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

            {/* Bottom Insight Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="card-clean p-6 flex items-center justify-between">
                  <div>
                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Arbitrage Opportunity</p>
                     <p className="text-xl font-bold text-[#1B4D1B]">Rp 1.25B Potential</p>
                  </div>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                     <ChartLineUp size={20} />
                  </div>
               </div>
               <div className="card-clean p-6 flex items-center justify-between">
                  <div>
                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Nodes</p>
                     <p className="text-xl font-bold text-[#1B4D1B]">11 Provinces</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                     <MapTrifold size={20} />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
