"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";
import {
  Truck,
  MapTrifold,
  Thermometer,
  ShieldCheck,
  Tree,
  ArrowsMerge,
  Signature,
  Globe,
  Warning,
  CheckCircle,
  Leaf,
  ChartLineUp,
  Clock,
  Package,
  Pulse,
  ArrowRight,
  Cube,
} from "@phosphor-icons/react";

const MapboxMap = dynamic(() => import("@/components/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#020617] flex items-center justify-center rounded-3xl border border-white/5">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initialising Command Map…</p>
      </div>
    </div>
  ),
});

const SHIPMENTS = [
  {
    id: "FLT-7421",
    name: "Cold-Storage Alpha-01",
    status: "AGGREGATING",
    nodes: 6,
    weight: "12.4 Tons",
    temp: 4.2,
    eta: "18m",
    co2Saved: "145kg",
    efficiency: "32%",
    routeCoords: [
      [112.0086, -7.8172], 
      [112.1936, -8.1003], 
      [112.6304, -7.9797], 
      [112.7520, -7.2575], 
    ] as [number, number][],
  },
  {
    id: "FLT-9102",
    name: "Express Carrier-05",
    status: "IN_TRANSIT",
    nodes: 3,
    weight: "4.8 Tons",
    temp: 5.8,
    eta: "42m",
    co2Saved: "68kg",
    efficiency: "24%",
    routeCoords: [
      [107.6186, -6.9175], 
      [106.8456, -6.2088], 
    ] as [number, number][],
  },
  {
    id: "FLT-2204",
    name: "Agri-Hauler Gamma",
    status: "STANDBY",
    nodes: 0,
    weight: "0 Tons",
    temp: 20.1,
    eta: "--",
    co2Saved: "0kg",
    efficiency: "0%",
    routeCoords: [[110.3695, -7.7956]] as [number, number][],
  },
];

const STATUS_CONFIG = {
  AGGREGATING: { color: "#14b850", label: "Aggregating", icon: ArrowsMerge },
  IN_TRANSIT: { color: "#3b82f6", label: "In Transit", icon: Truck },
  STANDBY: { color: "#64748b", label: "Standby", icon: Clock },
};

export default function LogisticsPage() {
  const [activeShipment, setActiveShipment] = useState(SHIPMENTS[0]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    mapRef.current = map;
    SHIPMENTS.forEach((ship) => {
      const config = STATUS_CONFIG[ship.status as keyof typeof STATUS_CONFIG];
      const sourceId = `route-${ship.id}`;

      if (ship.routeCoords.length > 1) {
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
              "line-color": config.color,
              "line-width": 3,
              "line-opacity": 0.6,
              "line-dasharray": ship.status === "IN_TRANSIT" ? [1, 0] : [2, 2],
            },
          });
        }
      }

      ship.routeCoords.forEach((coord, idx) => {
        const isStart = idx === 0;
        const isEnd = idx === ship.routeCoords.length - 1;
        const isVehicle = ship.status === "IN_TRANSIT" && idx === 1;
        
        const el = document.createElement('div');
        el.className = `relative flex items-center justify-center cursor-pointer`;
        
        if (isVehicle) {
          el.innerHTML = `
            <div class="absolute w-10 h-10 bg-[#3b82f6]/20 rounded-full animate-ping"></div>
            <div class="relative w-6 h-6 bg-[#3b82f6] rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,120H214.39L184.79,46a15.91,15.91,0,0,0-14.79-10H86A15.91,15.91,0,0,0,71.21,46L41.61,120H24a8,8,0,0,0,0,16h8v64a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM86,52h84l27.2,68H58.8ZM64,200H48V184H64Zm144,0H192V184h16Z"></path></svg>
            </div>
          `;
        } else {
          el.innerHTML = `
            <div class="w-4 h-4 rounded-full border-2 border-white shadow-xl ${isEnd ? 'bg-rose-500 scale-125' : isStart ? 'bg-blue-500' : 'bg-[#14b850]' }"></div>
          `;
        }
        
        const popup = new mapboxgl.Popup({ offset: 15, closeButton: false })
          .setHTML(`
            <div class="p-3 min-w-[140px] bg-white rounded-xl shadow-2xl border border-slate-100">
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">${isVehicle ? 'Live Fleet' : isEnd ? 'Destination' : isStart ? 'Origin' : 'Collection Node'}</p>
              <p class="text-xs font-bold text-slate-900">${isVehicle ? ship.name : isEnd ? 'Central Market JKT' : isStart ? 'Subang Farmer Collective' : 'Node #' + idx}</p>
              <div class="mt-2 pt-2 border-t border-slate-50 flex flex-col gap-1">
                <span class="text-[10px] text-slate-600 font-bold">Load: ${ship.weight}</span>
                <span class="text-[10px] text-slate-400 font-medium">${ship.temp}°C • Sensor Active</span>
              </div>
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat(coord as [number, number])
          .setPopup(popup)
          .addTo(map);

        el.addEventListener('mouseenter', () => popup.addTo(map));
        el.addEventListener('mouseleave', () => popup.remove());
      });
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const coords = activeShipment.routeCoords;
    if (coords.length > 1) {
      const bounds = coords.reduce(
        (b, c) => b.extend(c as mapboxgl.LngLatLike),
        new mapboxgl.LngLatBounds(coords[0], coords[0])
      );
      mapRef.current.fitBounds(bounds, { padding: 120, duration: 1200 });
    } else {
      mapRef.current.flyTo({ center: coords[0] as [number, number], zoom: 14, speed: 0.8 });
    }
  }, [activeShipment]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 lg:p-8 space-y-8 animate-in fade-in duration-1000">
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14b850]/20 flex items-center justify-center border border-[#14b850]/30 shadow-[0_0_20px_rgba(20,184,80,0.2)]">
              <Pulse size={24} className="text-[#14b850]" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white font-outfit">Smart Logistics <span className="text-[#14b850]">Command</span></h1>
          </div>
          <p className="text-slate-400 text-sm ml-13">Multi-stop route aggregation & Cold Chain monitoring.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
          <div className="px-4 py-2 text-center border-r border-white/10">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Fleet</p>
            <p className="text-xl font-bold text-white">12 <span className="text-[10px] text-[#14b850]">+2</span></p>
          </div>
          <div className="px-4 py-2 text-center">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Efficiency Gain</p>
            <p className="text-xl font-bold text-[#14b850]">+28.4%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-250px)]">
        {/* Left Sidebar: Fleet Navigation */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col h-full overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Truck size={14} className="text-[#14b850]" /> Fleet Status
              </h3>
              <div className="w-2 h-2 rounded-full bg-[#14b850] animate-pulse shadow-[0_0_8px_rgba(20,184,80,1)]"></div>
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pr-1">
              {SHIPMENTS.map((ship) => {
                const config = STATUS_CONFIG[ship.status as keyof typeof STATUS_CONFIG];
                const isActive = activeShipment.id === ship.id;
                
                return (
                  <div
                    key={ship.id}
                    onClick={() => setActiveShipment(ship)}
                    className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive 
                        ? "bg-[#14b850]/10 border-[#14b850]/40 shadow-[0_0_20px_rgba(20,184,80,0.1)]" 
                        : "bg-white/5 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-[#14b850]" />}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 mb-1">{ship.id}</p>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#14b850] transition-colors">{ship.name}</h4>
                      </div>
                      <div className={`p-1.5 rounded-lg border ${isActive ? 'bg-[#14b850]/20 border-[#14b850]/30' : 'bg-white/5 border-white/10'}`}>
                        <config.icon size={14} className={isActive ? 'text-[#14b850]' : 'text-slate-400'} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><Package size={12} /> {ship.weight}</span>
                      <span className="flex items-center gap-1"><MapTrifold size={12} /> {ship.nodes} Nodes</span>
                    </div>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="flex items-center gap-2">
                           <Thermometer size={14} className={ship.temp > 8 ? 'text-rose-500' : 'text-[#14b850]'} />
                           <span className={`text-[11px] font-bold ${ship.temp > 8 ? 'text-rose-500' : 'text-white'}`}>{ship.temp}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock size={14} className="text-slate-400" />
                           <span className="text-[11px] font-bold text-white">{ship.eta}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Central Intelligence: Map & Real-time Overlays */}
        <div className="lg:col-span-9 flex flex-col gap-6 h-full relative">
          <div className="flex-1 rounded-[32px] overflow-hidden border border-white/10 shadow-3xl relative">
            <MapboxMap
              style="mapbox://styles/mapbox/dark-v11"
              center={[112.0086, -7.5]}
              zoom={7}
              onMapLoad={handleMapLoad}
            />
            
            {/* Overlay: Cold Chain Intelligence */}
            <div className="absolute top-6 left-6 z-10 w-64">
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cold Chain Monitor</p>
                  <Pulse size={16} className="text-[#14b850] animate-pulse" />
                </div>
                
                <div className="flex items-end gap-4 mb-4">
                   <div className="text-4xl font-bold font-mono text-white leading-none">
                     {activeShipment.temp.toFixed(1)}<span className="text-lg text-slate-500">°C</span>
                   </div>
                   {activeShipment.temp > 8 ? (
                     <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20 mb-1">
                        <Warning size={12} /> WARNING
                     </div>
                   ) : (
                     <div className="flex items-center gap-1 text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 px-2 py-1 rounded-full border border-[#14b850]/20 mb-1">
                        <CheckCircle size={12} /> STABLE
                     </div>
                   )}
                </div>

                {/* Wave Animation Visualization */}
                <div className="h-12 flex items-end gap-1.5 px-1 overflow-hidden">
                   {[...Array(12)].map((_, i) => (
                     <div 
                       key={i} 
                       className={`w-full rounded-full transition-all duration-700 ${activeShipment.temp > 8 ? 'bg-rose-500/40' : 'bg-[#14b850]/40'}`} 
                       style={{ 
                         height: `${20 + Math.random() * 80}%`,
                         animation: `pulse-bar 1.5s infinite ${i * 0.1}s`
                       }}
                     />
                   ))}
                </div>
              </div>
            </div>

            {/* Overlay: Sustainability Metrics */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-4">
               <div className="bg-[#14b850]/10 backdrop-blur-2xl border border-[#14b850]/20 p-4 rounded-3xl flex items-center gap-4 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#14b850] flex items-center justify-center text-white shadow-[0_0_15px_rgba(20,184,80,0.5)]">
                     <Leaf size={24} weight="fill" />
                  </div>
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CO₂ Saved</p>
                     <p className="text-xl font-bold text-white">{activeShipment.co2Saved}</p>
                  </div>
               </div>
               
               <div className="bg-blue-500/10 backdrop-blur-2xl border border-blue-500/20 p-4 rounded-3xl flex items-center gap-4 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                     <ChartLineUp size={24} weight="fill" />
                  </div>
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency Gain</p>
                     <p className="text-xl font-bold text-white">{activeShipment.efficiency}</p>
                  </div>
               </div>
            </div>

            {/* Overlay: Digital Manifest Action */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-6">
               <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-3xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14b850] to-transparent w-full h-1 rotate-45 translate-y-[-100%] group-hover:translate-y-[200%] transition-transform duration-[2000ms] ease-in-out" />
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                        <ShieldCheck size={32} className={isAuthorized ? "text-[#14b850]" : "text-slate-500"} />
                        {isAuthorized && <div className="absolute inset-0 rounded-2xl bg-[#14b850]/20 animate-ping" />}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-white font-outfit">Digital Manifest</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                           <Globe size={10} /> {isAuthorized ? "Blockchain Recorded" : "Pending Auth"}
                        </p>
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setIsAuthorized(true)}
                      disabled={isAuthorized}
                      className={`relative overflow-hidden px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-500 flex items-center gap-2 group ${
                        isAuthorized 
                          ? "bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30 cursor-default" 
                          : "bg-[#14b850] text-white hover:bg-[#0f913f] shadow-[0_0_20px_rgba(20,184,80,0.4)] hover:shadow-[0_0_30px_rgba(20,184,80,0.6)]"
                      }`}
                    >
                      {isAuthorized ? (
                        <>
                          <CheckCircle size={18} weight="fill" />
                          <span>Authorized</span>
                        </>
                      ) : (
                        <>
                          <Signature size={18} />
                          <span>Authorize</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    {isAuthorized && (
                      <a href="/dashboard/trace" className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest text-center flex items-center justify-center gap-1 hover:underline animate-in fade-in duration-500">
                        <Cube size={12} /> View Blockchain Trace
                      </a>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-bar {
          0%, 100% { opacity: 0.4; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.6);
        }
        .ml-13 {
          margin-left: 3.25rem;
        }
        .mapboxgl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .mapboxgl-popup-tip {
          border-top-color: white !important;
        }
      `}</style>
    </div>
  );
}
