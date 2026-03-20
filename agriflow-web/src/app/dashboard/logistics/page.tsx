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
    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-stripe-indigo opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Map…</p>
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
    // farm nodes → warehouse → buyer
    routeCoords: [
      [112.0086, -7.8172], // Kediri
      [112.1936, -8.1003], // Blitar
      [112.6304, -7.9797], // Malang
      [112.7520, -7.2575], // Surabaya (warehouse)
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
      [107.6186, -6.9175], // Bandung
      [106.8456, -6.2088], // Jakarta
    ] as [number, number][],
  },
  {
    id: "AG-85B2",
    status: "ARRIVED",
    farmers: 6,
    weight: "6.5 Tons",
    savings: "31%",
    co2Saved: "188kg",
    routeCoords: [
      [109.0317, -6.8726], // Brebes
      [107.6186, -6.9175], // Bandung
      [106.8456, -6.2088], // Jakarta
      [112.7520, -7.2575], // Surabaya
    ] as [number, number][],
  },
];

const ROUTE_COLORS: Record<string, string> = {
  "AG-7421": "#635bff",
  "AG-9102": "#00d924",
  "AG-85B2": "#f43f5e",
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

      // Route line
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: ship.routeCoords,
          },
          properties: {},
        },
      });

      map.addLayer({
        id: `${sourceId}-line`,
        type: "line",
        source: sourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": color,
          "line-width": 4,
          "line-opacity": 0.85,
          "line-dasharray": ship.status === "IN_TRANSIT" ? [1, 0] : [2, 2],
        },
      });

      // Farm node markers
      ship.routeCoords.forEach((coord, idx) => {
        const el = document.createElement("div");
        const isLast = idx === ship.routeCoords.length - 1;
        el.style.cssText = `
          width: ${isLast ? 24 : 16}px;
          height: ${isLast ? 24 : 16}px;
          border-radius: 50%;
          background: ${isLast ? "#0a2540" : color};
          border: 4px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;

        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.2)'; });
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
        el.addEventListener('click', () => {
          setActiveShipment(ship);
        });

        new mapboxgl.Marker({ element: el })
          .setLngLat(coord)
          .addTo(map);
      });
    });
  }, []);

  // Fly to active shipment route
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
    <div className="space-y-12 py-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
          <h1 className="text-5xl font-black text-stripe-indigo tracking-tighter mb-4 leading-tight">
            Smart Logistics Optimizer
          </h1>
          <p className="text-stripe-slate font-bold text-lg opacity-60">
            Multi-stop routing with 22–31% efficiency &amp; blockchain-backed manifests.
          </p>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-[22px] border border-slate-100">
          {(["MONITOR", "CONFIRM"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`px-8 py-3.5 rounded-[18px] font-black text-[10px] uppercase tracking-widest transition-all ${
                step === s ? "bg-white text-stripe-indigo shadow-lg" : "text-slate-400 hover:text-stripe-indigo"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Vertical Stack */}
      <div className="space-y-10">
        {step === "MONITOR" ? (
          <>
            {/* Top Area: Full Width Map */}
            <div className="h-[600px] rounded-[64px] overflow-hidden border border-white shadow-[0_40px_100px_-20px_rgba(10,37,64,0.1)] relative">
               <MapboxMap
                 style="mapbox://styles/mapbox/dark-v11"
                 center={[112.0086, -7.5]}
                 zoom={6.5}
                 onMapLoad={handleMapLoad}
               />
               
               {/* CO2 badge Floating */}
               <div className="absolute top-8 left-8 bg-stripe-emerald text-white px-6 py-3.5 rounded-[24px] z-20 shadow-2xl flex items-center space-x-4 border border-white/20 backdrop-blur-md">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Tree size={20} weight="fill" />
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-70 leading-none mb-1">Total CO₂ Saved</p>
                    <p className="text-xl font-black leading-none">
                      {SHIPMENTS.reduce((acc, s) => acc + parseInt(s.co2Saved), 0)}kg
                    </p>
                 </div>
               </div>

               {/* Active Route Legend */}
               <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-2xl p-6 rounded-[32px] text-white z-20 border border-white/10 shadow-2xl">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Active Vessel Tracking</p>
                 <div className="space-y-3">
                   {SHIPMENTS.map((s) => (
                     <div key={s.id} className={`flex items-center space-x-3 transition-opacity ${activeShipment.id === s.id ? 'opacity-100' : 'opacity-40'}`}>
                       <div className="w-6 h-1 rounded-full" style={{ background: ROUTE_COLORS[s.id] }} />
                       <span className="text-[10px] font-black uppercase tracking-widest">{s.id}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Bottom Area: Aggregation & Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Load Aggregation */}
               <div className="lg:col-span-1 glass-card-premium p-10 rounded-[48px] shadow-2xl h-[600px] overflow-y-auto no-scrollbar flex flex-col">
                  <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.2em] mb-10 flex items-center">
                     <div className="w-2 h-2 rounded-full bg-stripe-emerald animate-ping mr-3"></div>
                     Aggregation Hub
                  </h3>
                  
                  <div className="space-y-6">
                    {SHIPMENTS.map((ship) => (
                      <div
                        key={ship.id}
                        onClick={() => setActiveShipment(ship)}
                        className={`p-6 rounded-[36px] border-2 transition-all cursor-pointer ${
                          activeShipment.id === ship.id
                            ? "border-stripe-indigo bg-white shadow-xl scale-[1.02]"
                            : "border-transparent bg-white/40 hover:bg-white/60"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black text-stripe-indigo uppercase tracking-widest bg-stripe-indigo/5 px-3 py-1.5 rounded-lg">
                            {ship.id}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest ${
                              ship.status === "IN_TRANSIT" ? "text-stripe-emerald" : "text-slate-300"
                            }`}
                          >
                            {ship.status.replace("_", " ")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-stripe-indigo">
                            <ArrowsMerge size={18} weight="fill" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-stripe-indigo">{ship.farmers} Petani Terkonsolidasi</p>
                            <p className="text-[10px] font-bold text-slate-400">{ship.weight} Total Load</p>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t border-stripe-indigo/5">
                          <div className="flex items-center space-x-1 text-stripe-emerald">
                            <Tree size={12} weight="fill" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{ship.co2Saved} CO₂ Saved</span>
                          </div>
                          <span className="text-[10px] font-black text-stripe-indigo">Efisiensi +{ship.savings}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Right Side Bottom: Selection Details & ESG */}
               <div className="lg:col-span-2 flex flex-col gap-10">
                  <div className="glass-card-premium p-10 rounded-[48px] shadow-lg flex-1">
                     <div className="flex justify-between items-start mb-10">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">IoT Cold Chain Monitor</p>
                           <h4 className="text-3xl font-black text-stripe-indigo tracking-tighter">{activeShipment.id} Status</h4>
                        </div>
                        <div className="flex items-center space-x-4">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency Gain</p>
                              <p className="text-2xl font-black text-stripe-emerald tracking-tighter">+{activeShipment.savings}</p>
                           </div>
                           <button 
                             onClick={() => setStep('CONFIRM')}
                             className="bg-stripe-indigo text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                           >
                             Generate Manifest
                           </button>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8 mb-10">
                        <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-center justify-between">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Temperature</p>
                              <p className="text-3xl font-black text-stripe-indigo tracking-tighter">18.2°C</p>
                           </div>
                           <Thermometer size={48} weight="fill" className="text-rose-500 opacity-20" />
                        </div>
                        <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-center justify-between">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Humidity</p>
                              <p className="text-3xl font-black text-stripe-indigo tracking-tighter">64%</p>
                           </div>
                           <Drop size={48} weight="fill" className="text-blue-500 opacity-20" />
                        </div>
                     </div>

                     <div className="bg-stripe-indigo rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl">
                        <Tree size={100} weight="fill" className="absolute -bottom-8 -right-8 text-stripe-emerald opacity-10 rotate-12" />
                        <div className="relative z-10">
                           <div className="flex items-center space-x-4 mb-6">
                              <Tree size={28} weight="fill" className="text-stripe-emerald" />
                              <span className="text-xl font-black tracking-tight">ESG Carbon Ledger Impact</span>
                           </div>
                           <p className="text-lg font-bold opacity-70 leading-relaxed mb-10 max-w-xl">
                              Optimasi rute logistik hari ini telah mencegah rilis emisi sebesar <span className="text-stripe-emerald font-black">357kg CO₂</span> ke atmosfer.
                           </p>
                           <Link href="/dashboard/trace">
                              <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all">
                                 Explore Immutable Ledger
                              </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 glass-card-premium rounded-[64px] border border-stripe-indigo/5 h-full p-16 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-purple-50 rounded-[28px] flex items-center justify-center text-purple-600 shadow-sm">
                  <Signature size={36} weight="fill" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-stripe-indigo tracking-tighter">
                    Blockchain Manifest
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    Shipment ID: {activeShipment.id} • Secure Ledger PoD
                  </p>
                </div>
              </div>
              <button onClick={() => setStep('MONITOR')} className="p-4 bg-slate-50 rounded-full hover:bg-slate-100 transition-all">
                 <X size={24} weight="bold" />
              </button>
            </div>

            <div className="flex-1 bg-slate-50/50 rounded-[48px] border border-slate-100 p-12 overflow-y-auto no-scrollbar mb-12 text-stripe-indigo">
              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">
                    Summary Biaya (Gov Subsidy Applied)
                  </p>
                  <div className="space-y-5">
                    <div className="flex justify-between text-sm font-bold text-slate-500">
                      <span>Logistic Base Cost</span>
                      <span>Rp 1.450.000</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-stripe-emerald">
                      <span>Gov Subsidy (30%)</span>
                      <span>- Rp 435.000</span>
                    </div>
                    <div className="pt-6 border-t border-slate-200 flex justify-between font-black text-stripe-indigo text-3xl tracking-tighter">
                      <span>Total Final</span>
                      <span>Rp 1.015.000</span>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-white rounded-[40px] border border-slate-100 italic text-sm font-bold text-slate-500 flex flex-col justify-center leading-relaxed">
                  <ShieldCheck size={32} weight="fill" className="text-stripe-indigo mb-6 opacity-20" />
                  &quot;Manifest ini telah terenkripsi ke dalam blockchain AgriFlow. Tanda tangan kurir dan pembeli akan memicu otomasi Smart Contract untuk pembayaran AgriWallet.&quot;
                </div>
              </div>
            </div>

            <div className="flex space-x-6">
              <button className="flex-1 border-2 border-slate-100 py-6 rounded-[32px] font-black text-xs uppercase tracking-widest text-stripe-indigo hover:border-stripe-indigo transition-all">
                Download Manifest PDF
              </button>
              <button className="flex-1 bg-stripe-indigo text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all">
                Deploy to Blockchain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
