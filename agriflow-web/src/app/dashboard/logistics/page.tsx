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
    <div className="w-full h-full bg-[#F4FAF0] flex items-center justify-center rounded-[32px] border border-[#C7E0B0]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-[#4A9E3F] opacity-50 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-[#1B4D1B]/40 uppercase tracking-widest">Memuat Peta Logistik…</p>
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
  "AG-7421": "#0D7A6B", 
  "AG-9102": "#4A9E3F", 
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
          background: ${isLast ? "#FFFFFF" : color};
          border: ${isLast ? '4px solid ' + color : '3px solid #FFFFFF'};
          box-shadow: 0 0 15px ${color}80;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        `;

        el.addEventListener('mouseenter', () => { 
          el.style.transform = 'scale(1.3)'; 
          el.style.boxShadow = `0 0 25px ${color}`;
        });
        el.addEventListener('mouseleave', () => { 
          el.style.transform = 'scale(1)'; 
          el.style.boxShadow = `0 0 15px ${color}80`;
        });
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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 text-[#1A2E1A]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/60 backdrop-blur-3xl p-10 rounded-[32px] border border-[#C7E0B0] shadow-sm">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Truck size={20} className="text-[#4A9E3F]" />
            <span className="text-[10px] font-bold text-[#4A9E3F] uppercase tracking-[0.3em]">AI Fleet Tracking Aktif</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-tight text-[#1B4D1B]">
            Smart Logistics <span className="text-[#4A9E3F]">Optimizer</span>
          </h1>
          <p className="text-[#1A2E1A]/50 text-sm max-w-xl font-medium leading-relaxed">
            Optimasi rute logistik multi-stop dengan peningkatan efisiensi bahan bakar 22–31% menggunakan teknologi pencatatan jejak blockchain.
          </p>
        </div>
        <div className="flex w-full lg:w-auto bg-[#1B4D1B]/5 p-1.5 rounded-xl border border-[#C7E0B0]">
          {(["MONITOR", "CONFIRM"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`flex-1 lg:flex-none px-6 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
                step === s ? "bg-[#1B4D1B] text-white shadow-lg" : "text-[#1B4D1B]/40 hover:text-[#1B4D1B]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Vertical Stack */}
      <div className="space-y-8">
        {step === "MONITOR" ? (
          <>
            {/* Top Area: Full Width Map */}
            <div className="h-[500px] rounded-[32px] overflow-hidden border border-[#C7E0B0] shadow-xl relative">
               <MapboxMap
                 style="mapbox://styles/mapbox/light-v11"
                 center={[112.0086, -7.5]}
                 zoom={6.5}
                 onMapLoad={handleMapLoad}
               />
               
               {/* CO2 badge Floating */}
               <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-xl p-4 rounded-2xl z-20 shadow-xl flex items-center space-x-4 border border-[#C7E0B0]">
                  <div className="w-12 h-12 bg-[#4A9E3F]/10 rounded-xl flex items-center justify-center border border-[#4A9E3F]/20">
                     <Tree size={24} weight="fill" className="text-[#4A9E3F]" />
                  </div>
                  <div>
                     <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest leading-none mb-1">Total CO₂ Dihemat</p>
                     <p className="text-xl font-bold text-[#1B4D1B] tracking-tight">
                       {SHIPMENTS.reduce((acc, s) => acc + parseInt(s.co2Saved), 0)} <span className="text-sm font-normal text-[#1A2E1A]/40">kg</span>
                     </p>
                  </div>
               </div>

               {/* Active Route Legend */}
               <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-xl p-6 rounded-2xl text-[#1B4D1B] z-20 border border-[#C7E0B0] shadow-xl min-w-[200px]">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A2E1A]/40 mb-4 flex items-center">
                    <Truck size={14} className="mr-2" /> 
                    Armada Aktif
                 </p>
                 <div className="space-y-3">
                   {SHIPMENTS.map((s) => (
                     <div key={s.id} className={`flex items-center space-x-3 transition-opacity ${activeShipment.id === s.id ? 'opacity-100' : 'opacity-40 hover:opacity-70 cursor-pointer'}`} onClick={() => setActiveShipment(s)}>
                       <div className="w-5 h-1.5 rounded-full shadow-sm" style={{ background: ROUTE_COLORS[s.id], color: ROUTE_COLORS[s.id] }} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">{s.id}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Bottom Area: Aggregation & Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Load Aggregation */}
               <div className="lg:col-span-1 bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] shadow-xl backdrop-blur-xl h-[500px] overflow-y-auto no-scrollbar flex flex-col">
                  <h3 className="text-[11px] font-bold text-[#1B4D1B] uppercase tracking-[0.2em] mb-8 flex items-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#4A9E3F] animate-ping mr-2"></div>
                     Pusat Agregasi Load
                  </h3>
                  
                  <div className="space-y-4">
                    {SHIPMENTS.map((ship) => (
                      <div
                        key={ship.id}
                        onClick={() => setActiveShipment(ship)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer group shadow-sm ${
                          activeShipment.id === ship.id
                            ? "border-[#4A9E3F] bg-[#4A9E3F]/5 shadow-md"
                            : "border-[#C7E0B0] bg-white hover:border-[#4A9E3F]/30"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${activeShipment.id === ship.id ? 'bg-[#1B4D1B] text-white' : 'bg-[#1B4D1B]/5 text-[#1B4D1B]'}`}>
                            {ship.id}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-widest ${
                              ship.status === "IN_TRANSIT" ? "text-[#4A9E3F]" : "text-[#1A2E1A]/40"
                            }`}
                          >
                            {ship.status.replace("_", " ")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${activeShipment.id === ship.id ? 'bg-[#4A9E3F]/20 text-[#4A9E3F] border-[#4A9E3F]/30' : 'bg-[#1B4D1B]/5 text-[#1B4D1B]/50 border-[#C7E0B0] group-hover:text-[#1B4D1B]'}`}>
                            <ArrowsMerge size={20} weight="fill" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1B4D1B]">{ship.farmers} Petani Terkonsolidasi</p>
                            <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">{ship.weight} Total Beban</p>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t border-[#C7E0B0]">
                          <div className="flex items-center space-x-1.5 text-[#4A9E3F]">
                            <Tree size={14} weight="fill" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{ship.co2Saved} CO₂ Hemat</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#0D7A6B]">Efisiensi +{ship.savings}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Right Side Bottom: Selection Details & ESG */}
               <div className="lg:col-span-2 flex flex-col gap-8">
                  <div className="bg-white/60 p-8 rounded-[32px] border border-[#C7E0B0] shadow-xl backdrop-blur-xl flex-1 flex flex-col">
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1">IoT Cold Chain Monitor</p>
                           <h4 className="text-3xl font-bold text-[#1B4D1B] tracking-tight">Status {activeShipment.id}</h4>
                        </div>
                        <div className="flex items-center space-x-6">
                           <div className="text-right">
                              <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest">Keuntungan Efisiensi</p>
                              <p className="text-2xl font-bold text-[#4A9E3F] tracking-tight">+{activeShipment.savings}</p>
                           </div>
                           <button 
                             onClick={() => setStep('CONFIRM')}
                             className="bg-white text-[#1B4D1B] px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-[#C7E0B0] hover:bg-[#1B4D1B] hover:text-white transition-all flex items-center space-x-2 shadow-sm"
                           >
                             <FileText size={16} />
                             <span>Buat Manifes</span>
                           </button>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-[#C7E0B0] flex items-center justify-between group shadow-sm">
                           <div>
                              <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1.5">Suhu Kargo</p>
                              <p className="text-3xl font-bold text-[#1B4D1B] tracking-tight">18.2<span className="text-lg font-normal text-[#1A2E1A]/40">°C</span></p>
                           </div>
                           <Thermometer size={40} weight="fill" className="text-rose-500 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#C7E0B0] flex items-center justify-between group shadow-sm">
                           <div>
                              <p className="text-[9px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-1.5">Kelembapan</p>
                              <p className="text-3xl font-bold text-[#1B4D1B] tracking-tight">64<span className="text-lg font-normal text-[#1A2E1A]/40">%</span></p>
                           </div>
                           <Drop size={40} weight="fill" className="text-[#0D7A6B] opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                        </div>
                     </div>

                     <div className="bg-[#4A9E3F]/10 rounded-[24px] p-8 border border-[#4A9E3F]/20 relative overflow-hidden mt-auto shadow-sm">
                        <Tree size={160} weight="fill" className="absolute -bottom-10 -right-10 text-[#4A9E3F] opacity-10 rotate-12" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div>
                              <div className="flex items-center space-x-3 mb-3">
                                 <div className="p-2 bg-[#4A9E3F]/20 rounded-lg">
                                    <Tree size={20} weight="fill" className="text-[#4A9E3F]" />
                                 </div>
                                 <span className="text-lg font-bold tracking-tight text-[#1B4D1B]">Dampak ESG & Carbon Ledger</span>
                              </div>
                              <p className="text-sm font-medium text-[#1A2E1A]/70 leading-relaxed max-w-lg">
                                 Optimasi rute logistik hari ini telah mencegah rilis emisi sebesar <span className="text-[#4A9E3F] font-bold">357kg CO₂</span> ke atmosfer. Terverifikasi via oracle cuaca.
                              </p>
                           </div>
                           <Link href="/dashboard/trace">
                               <button className="bg-[#1B4D1B] text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg hover:bg-[#1B4D1B]/90 whitespace-nowrap">
                                  Lihat Buku Besar
                               </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="bg-white/60 rounded-[32px] border border-[#C7E0B0] p-10 shadow-xl flex flex-col animate-in slide-in-from-right duration-500 relative overflow-hidden min-h-[600px] backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A9E3F]/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className="flex items-center space-x-5">
                <div className="w-16 h-16 bg-[#0D7A6B]/10 rounded-2xl flex items-center justify-center text-[#0D7A6B] border border-[#0D7A6B]/20 shadow-sm">
                  <Signature size={32} weight="fill" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#1B4D1B] tracking-tight">
                    Manifes Keamanan Blockchain
                  </h3>
                  <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mt-1">
                    ID Pengiriman: <span className="text-[#0D7A6B]">{activeShipment.id}</span> • Secure Ledger PoD
                  </p>
                </div>
              </div>
              <button onClick={() => setStep('MONITOR')} className="p-3 bg-white rounded-full hover:bg-rose-500 hover:text-white border border-[#C7E0B0] transition-all shadow-sm">
                 <X size={20} weight="bold" />
              </button>
            </div>

            <div className="flex-1 bg-white rounded-[24px] border border-[#C7E0B0] p-10 mb-10 relative z-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <p className="text-[10px] font-bold text-[#1A2E1A]/40 uppercase tracking-widest mb-6 border-b border-[#C7E0B0] pb-3">
                    Rincian Biaya (Dengan Subsidi Pemerintah)
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold text-[#1A2E1A]/70">
                      <span>Biaya Dasar Logistik</span>
                      <span>Rp 1.450.000</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#4A9E3F]">
                      <span>Subsidi Pemerintah (30%)</span>
                      <span>- Rp 435.000</span>
                    </div>
                    <div className="pt-6 border-t border-[#C7E0B0] flex justify-between items-end">
                      <span className="text-xs font-bold text-[#1A2E1A]/50 uppercase tracking-widest">Total Tagihan Bersih</span>
                      <span className="text-3xl font-bold text-[#1B4D1B] tracking-tight">Rp 1.015.000</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-[#4A9E3F]/5 rounded-2xl border border-[#4A9E3F]/20 flex flex-col justify-center relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A9E3F]/10 blur-2xl rounded-full -mr-10 -mt-10"></div>
                  <ShieldCheck size={40} weight="fill" className="text-[#4A9E3F] mb-4 relative z-10" />
                  <p className="text-sm font-medium text-[#1A2E1A]/80 leading-relaxed relative z-10">
                    "Manifes ini telah di-hash dan dienkripsi ke dalam buku besar AgriFlow Blockchain. Tanda tangan digital dari kurir dan pembeli di titik tujuan akan secara otomatis memicu pencairan dana via Smart Contract ke AgriWallet."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <button className="flex-1 bg-white border border-[#C7E0B0] py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest text-[#1B4D1B] hover:bg-[#1B4D1B]/5 transition-all flex items-center justify-center space-x-2 shadow-sm">
                <FileText size={18} />
                <span>Unduh Manifes PDF</span>
              </button>
              <button className="flex-1 bg-[#1B4D1B] text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#1B4D1B]/90 transition-all flex items-center justify-center space-x-2 group">
                <Signature size={18} weight="fill" />
                <span>Deploy ke Blockchain</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
