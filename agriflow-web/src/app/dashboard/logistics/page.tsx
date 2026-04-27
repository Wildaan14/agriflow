"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";
import {
  Truck,
  MapTrifold,
  Thermometer,
  Drop,
  ShieldCheck,
  Tree,
  ArrowsMerge,
  FileText,
  Signature,
  Globe,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";

const MapboxMap = dynamic(() => import("@/components/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-3xl border border-gray-100">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Logistics Map…</p>
      </div>
    </div>
  ),
});

const SHIPMENTS = [
  {
    id: "AG-7421",
    status: "AGGREGATING",
    farmers: 4,
    weight: "4.2 Tons",
    savings: "28%",
    co2Saved: "124kg",
    routeCoords: [
      [112.0086, -7.8172], 
      [112.1936, -8.1003], 
      [112.6304, -7.9797], 
      [112.7520, -7.2575], 
    ] as [number, number][],
  },
  {
    id: "AG-9102",
    status: "IN_TRANSIT",
    farmers: 2,
    weight: "1.8 Tons",
    savings: "22%",
    co2Saved: "45kg",
    routeCoords: [
      [107.6186, -6.9175], 
      [106.8456, -6.2088], 
    ] as [number, number][],
  },
];

const ROUTE_COLORS: Record<string, string> = {
  "AG-7421": "#14b850", 
  "AG-9102": "#64748b", 
};

export default function LogisticsPage() {
  const [activeShipment, setActiveShipment] = useState(SHIPMENTS[0]);
  const [step, setStep] = useState<"MONITOR" | "CONFIRM">("MONITOR");
  const mapRef = React.useRef<mapboxgl.Map | null>(null);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    mapRef.current = map;
    SHIPMENTS.forEach((ship) => {
      const color = ROUTE_COLORS[ship.id];
      const sourceId = `route-${ship.id}`;

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates: ship.routeCoords },
            properties: {},
          },
        });
      }

      if (!map.getLayer(`${sourceId}-line`)) {
        map.addLayer({
          id: `${sourceId}-line`,
          type: "line",
          source: sourceId,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": color,
            "line-width": 3,
            "line-opacity": 0.8,
            "line-dasharray": ship.status === "IN_TRANSIT" ? [1, 0] : [2, 2],
          },
        });
      }

      ship.routeCoords.forEach((coord, idx) => {
        const isLast = idx === ship.routeCoords.length - 1;
        const marker = new mapboxgl.Marker({
          color: isLast ? "#000000" : color,
          scale: isLast ? 0.8 : 0.6
        }).setLngLat(coord).addTo(map);
      });
    });
  }, []);

  React.useEffect(() => {
    if (!mapRef.current) return;
    const coords = activeShipment.routeCoords;
    const bounds = coords.reduce(
      (b, c) => b.extend(c as mapboxgl.LngLatLike),
      new mapboxgl.LngLatBounds(coords[0], coords[0])
    );
    mapRef.current.fitBounds(bounds, { padding: 80, duration: 800 });
  }, [activeShipment]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Logistics Optimizer</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Multi-stop route aggregation & efficiency tracking.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {(["MONITOR", "CONFIRM"] as const).map((s) => (
             <button
               key={s}
               onClick={() => setStep(s)}
               className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${step === s ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
             >
               {s}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar: Active Fleet */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-clean p-6 h-[600px] flex flex-col">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Active Fleet</h3>
               <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
                  {SHIPMENTS.map((ship) => (
                    <div
                      key={ship.id}
                      onClick={() => setActiveShipment(ship)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${activeShipment.id === ship.id ? "bg-slate-50 border-slate-200" : "bg-white border-transparent hover:border-slate-100"}`}
                    >
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-slate-900">{ship.id}</span>
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${ship.status === 'IN_TRANSIT' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{ship.status}</span>
                       </div>
                       <p className="text-[11px] text-slate-500 font-medium">{ship.farmers} Nodes • {ship.weight}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Map Viewport & Status */}
         <div className="lg:col-span-3 space-y-6">
            <div className="h-[450px] rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative group">
               <MapboxMap
                 style="mapbox://styles/mapbox/light-v11"
                 center={[112.0086, -7.5]}
                 zoom={6.5}
                 onMapLoad={handleMapLoad}
               />
               <div className="absolute top-4 left-4 z-20 flex bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm space-x-4">
                  <div className="flex items-center space-x-2">
                     <Tree size={16} className="text-[#14b850]" />
                     <span className="text-[11px] font-bold text-slate-900">{SHIPMENTS.reduce((acc, s) => acc + parseInt(s.co2Saved), 0)}kg CO₂ Saved</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="card-clean p-6 flex items-center justify-between">
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cold Chain (Active)</p>
                     <p className="text-xl font-bold text-slate-900">18.2°C <span className="text-xs font-normal text-slate-400">Stable</span></p>
                  </div>
                  <Thermometer size={24} className="text-rose-500" />
               </div>
               <div className="card-clean p-6 flex items-center justify-between">
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efficiency Gain</p>
                     <p className="text-xl font-bold text-[#14b850]">+{activeShipment.savings}</p>
                  </div>
                  <ArrowsMerge size={24} className="text-[#14b850]" />
               </div>
            </div>
            
            <button className="w-full btn-minimal btn-primary py-3">
               <Signature size={18} />
               <span>Authorize Digital Manifest</span>
            </button>
         </div>
      </div>
    </div>
  );
}
