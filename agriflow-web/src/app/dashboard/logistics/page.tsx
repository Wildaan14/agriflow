"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Truck,
  MapTrifold,
  Thermometer,
  ShieldCheck,
  Signature,
  Globe,
  Warning,
  CheckCircle,
  Leaf,
  ChartLineUp,
  Clock,
  Package,
  ArrowRight,
  Cube,
  Pulse,
  ArrowsMerge,
} from "@phosphor-icons/react";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

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
    // Coordinates in [lat, lng] for Leaflet
    routeCoords: [
      [-7.8172, 112.0086],
      [-8.1003, 112.1936],
      [-7.9797, 112.6304],
      [-7.2575, 112.7520],
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
      [-6.9175, 107.6186],
      [-6.2088, 106.8456],
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
    routeCoords: [[-7.7956, 110.3695]] as [number, number][],
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
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Import Leaflet directly for icon creation
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  const getCustomIcon = (type: "START" | "END" | "NODE" | "VEHICLE", color: string) => {
    if (!L) return null;
    
    let html = "";
    if (type === "VEHICLE") {
      html = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-10 h-10 bg-[#3b82f6]/20 rounded-full animate-ping"></div>
          <div class="relative w-6 h-6 bg-[#3b82f6] rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,120H214.39L184.79,46a15.91,15.91,0,0,0-14.79-10H86A15.91,15.91,0,0,0,71.21,46L41.61,120H24a8,8,0,0,0,0,16h8v64a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM86,52h84l27.2,68H58.8ZM64,200H48V184H64Zm144,0H192V184h16Z"></path></svg>
          </div>
        </div>
      `;
    } else {
      const scale = type === "END" ? "scale-125" : "scale-100";
      html = `<div class="w-4 h-4 rounded-full border-2 border-white shadow-xl ${color} ${scale}"></div>`;
    }

    return L.divIcon({
      html,
      className: "custom-div-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="bg-transparent text-slate-900 space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D1B]/10 flex items-center justify-center border border-[#1B4D1B]/20">
              <Pulse size={24} className="text-[#1B4D1B]" weight="bold" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">Smart Logistics <span className="text-[#14b850]">Command</span></h1>
          </div>
          <p className="text-slate-500 text-sm ml-13 font-medium">Multi-stop route aggregation & Cold Chain monitoring.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white shadow-sm p-2 rounded-2xl border border-slate-200">
          <div className="px-4 py-2 text-center border-r border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Fleet</p>
            <p className="text-xl font-bold text-slate-900 tracking-tight">12 <span className="text-[10px] font-bold text-[#14b850] bg-[#14b850]/10 px-1.5 py-0.5 rounded ml-1">+2</span></p>
          </div>
          <div className="px-4 py-2 text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efficiency Gain</p>
            <p className="text-xl font-bold text-[#14b850] tracking-tight">+28.4%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-250px)]">
        {/* Left Sidebar: Fleet Navigation */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col h-full overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Truck size={14} className="text-[#14b850]" /> Fleet Status
              </h3>
              <div className="w-2 h-2 rounded-full bg-[#14b850] animate-pulse shadow-[0_0_8px_rgba(20,184,80,0.5)]"></div>
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
                        ? "bg-[#14b850]/5 border-[#14b850]/30 shadow-sm" 
                        : "bg-slate-50 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-[#14b850]" />}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 mb-1">{ship.id}</p>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#14b850] transition-colors">{ship.name}</h4>
                      </div>
                      <div className={`p-1.5 rounded-lg border ${isActive ? 'bg-[#14b850]/10 border-[#14b850]/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <config.icon size={14} className={isActive ? 'text-[#1B4D1B]' : 'text-slate-500'} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Package size={12} className={isActive ? "text-[#14b850]" : ""} /> {ship.weight}</span>
                      <span className="flex items-center gap-1"><MapTrifold size={12} className={isActive ? "text-[#14b850]" : ""} /> {ship.nodes} Nodes</span>
                    </div>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-between items-center animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md border border-slate-100">
                           <Thermometer size={14} className={ship.temp > 8 ? 'text-rose-500' : 'text-[#14b850]'} weight="bold" />
                           <span className={`text-[11px] font-bold ${ship.temp > 8 ? 'text-rose-500' : 'text-slate-700'}`}>{ship.temp}°C</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md border border-slate-100">
                           <Clock size={14} className="text-slate-400" />
                           <span className="text-[11px] font-bold text-slate-700">{ship.eta}</span>
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
          <div className="flex-1 rounded-[32px] overflow-hidden border border-slate-200 shadow-sm relative z-0 bg-slate-100">
            {typeof window !== "undefined" && (
              <MapContainer 
                center={activeShipment.routeCoords[0]} 
                zoom={8} 
                style={{ height: "100%", width: "100%", background: "#f8fafc", zIndex: 1 }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                
                {activeShipment.routeCoords.length > 1 && (
                  <Polyline 
                    positions={activeShipment.routeCoords} 
                    pathOptions={{ 
                      color: STATUS_CONFIG[activeShipment.status as keyof typeof STATUS_CONFIG].color, 
                      weight: 4, 
                      dashArray: activeShipment.status === "AGGREGATING" ? "6, 12" : "0",
                      opacity: 0.8 
                    }} 
                  />
                )}

                {activeShipment.routeCoords.map((coord, idx) => {
                  const isStart = idx === 0;
                  const isEnd = idx === activeShipment.routeCoords.length - 1;
                  const isVehicle = activeShipment.status === "IN_TRANSIT" && idx === 1;
                  
                  const icon = getCustomIcon(
                    isVehicle ? "VEHICLE" : isEnd ? "END" : isStart ? "START" : "NODE",
                    isEnd ? "bg-rose-500" : isStart ? "bg-blue-500" : "bg-[#14b850]"
                  );

                  if (!icon) return null;

                  return (
                    <Marker key={idx} position={coord} icon={icon}>
                      <Popup>
                        <div className="p-1 min-w-[140px] bg-white rounded-xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            {isVehicle ? 'Live Fleet' : isEnd ? 'Destination' : isStart ? 'Origin' : 'Collection Node'}
                          </p>
                          <p className="text-xs font-bold text-slate-900">
                            {isVehicle ? activeShipment.name : isEnd ? 'Central Market JKT' : isStart ? 'Subang Farmer Collective' : 'Node #' + idx}
                          </p>
                          <div className="mt-1 pt-1 border-t border-slate-50 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-600 font-bold">Load: {activeShipment.weight}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{activeShipment.temp}°C • Sensor Active</span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            )}
            
            {/* Overlay: Cold Chain Intelligence */}
            <div className="absolute top-6 left-6 z-[1000] w-64 pointer-events-auto">
              <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-3xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Cold Chain Monitor</p>
                  <Pulse size={16} className="text-[#14b850] animate-pulse" />
                </div>
                
                <div className="flex items-end gap-4 mb-4">
                   <div className="text-4xl font-bold font-mono text-slate-900 leading-none tracking-tighter">
                     {activeShipment.temp.toFixed(1)}<span className="text-lg text-slate-400 font-sans">°C</span>
                   </div>
                   {activeShipment.temp > 8 ? (
                     <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full border border-rose-100 mb-1">
                        <Warning size={12} weight="bold" /> WARNING
                     </div>
                   ) : (
                     <div className="flex items-center gap-1 text-[10px] font-bold text-[#1B4D1B] bg-[#14b850]/10 px-2 py-1 rounded-full border border-[#14b850]/20 mb-1">
                        <CheckCircle size={12} weight="bold" /> STABLE
                     </div>
                   )}
                </div>

                {/* Wave Animation Visualization */}
                <div className="h-12 flex items-end gap-1.5 px-1 overflow-hidden">
                   {[...Array(12)].map((_, i) => (
                     <div 
                       key={i} 
                       className={`w-full rounded-full transition-all duration-700 ${activeShipment.temp > 8 ? 'bg-rose-400' : 'bg-[#14b850]/40'}`} 
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
            <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-4 pointer-events-auto">
               <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-[#14b850]/10 flex items-center justify-center text-[#14b850]">
                     <Leaf size={20} weight="fill" />
                  </div>
                  <div className="pr-2">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CO₂ Saved</p>
                     <p className="text-lg font-bold text-slate-900 leading-tight tracking-tight">{activeShipment.co2Saved}</p>
                  </div>
               </div>
               
               <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                     <ChartLineUp size={20} weight="bold" />
                  </div>
                  <div className="pr-2">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency Gain</p>
                     <p className="text-lg font-bold text-slate-900 leading-tight tracking-tight">{activeShipment.efficiency}</p>
                  </div>
               </div>
            </div>

            {/* Overlay: Digital Manifest Action */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-lg px-6 pointer-events-auto">
               <div className="bg-white/95 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-3xl">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14b850] to-transparent w-full h-1 rotate-45 translate-y-[-100%] group-hover:translate-y-[200%] transition-transform duration-[2000ms] ease-in-out" />
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                     <div className={`w-12 h-12 rounded-xl border flex items-center justify-center relative ${isAuthorized ? 'bg-[#14b850]/10 border-[#14b850]/30' : 'bg-slate-50 border-slate-200'}`}>
                        <ShieldCheck size={28} className={isAuthorized ? "text-[#1B4D1B]" : "text-slate-400"} weight={isAuthorized ? "fill" : "regular"} />
                        {isAuthorized && <div className="absolute inset-0 rounded-xl bg-[#14b850]/20 animate-ping" />}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-slate-900">Digital Manifest</h4>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                           <Globe size={12} weight="bold" /> {isAuthorized ? "Blockchain Recorded" : "Pending Auth"}
                        </p>
                     </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    <button 
                      onClick={() => setIsAuthorized(true)}
                      disabled={isAuthorized}
                      className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2 group ${
                        isAuthorized 
                          ? "bg-slate-50 text-slate-400 border border-slate-200 cursor-default" 
                          : "bg-[#1B4D1B] text-white hover:bg-[#133813] shadow-lg shadow-[#1B4D1B]/20"
                      }`}
                    >
                      {isAuthorized ? (
                        <>
                          <CheckCircle size={16} weight="fill" className="text-[#14b850]" />
                          <span className="text-slate-500">Authorized</span>
                        </>
                      ) : (
                        <>
                          <Signature size={16} weight="bold" />
                          <span>Authorize</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    {isAuthorized && (
                      <a href="/dashboard/trace" className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest text-center flex items-center justify-center gap-1 hover:text-[#1B4D1B] transition-colors mt-1">
                        <Cube size={12} weight="fill" /> View Blockchain Trace
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
        .ml-13 {
          margin-left: 3.25rem;
        }
        .leaflet-container {
          background-color: #f8fafc !important;
          z-index: 1;
        }
        .leaflet-popup-content-wrapper {
          background: white;
          color: #333;
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-popup-tip-container {
          display: none;
        }
        .custom-div-icon {
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
}
