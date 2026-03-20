"use client";

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import mapboxgl from 'mapbox-gl';
import ewsData from '@/data/modul10_early_warning.json';
import Link from 'next/link';
import { 
  Warning, 
  MapTrifold, 
  ArrowRight, 
  ShieldCheck, 
  WhatsappLogo, 
  ChartLineUp, 
  FileText, 
  Globe, 
  CloudRain, 
  BellRinging,
  DeviceMobile,
  CheckCircle,
  PaperPlaneTilt,
  X,
  CaretRight
} from '@phosphor-icons/react';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[40px]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-rose-400 opacity-30 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Risk Map…</p>
      </div>
    </div>
  ),
});

// Koordinat per kabupaten/provinsi berdasarkan data EWS
const REGION_COORDS: Record<string, [number, number]> = {
  'Purbalingga':          [109.3641, -7.3966],
  'Brebes':               [109.0317, -6.8726],
  'Banyumas':             [109.2300, -7.5090],
  'Cilacap':              [109.0000, -7.7199],
  'Sragen':               [111.0280, -7.4250],
  'Deli Serdang':         [98.7600,  3.5270],
  'Langkat':              [98.1200,  3.9500],
  'Kutai Kartanegara':    [117.0000, -0.5000],
  'Penajam Paser Utara':  [116.5900, -1.1400],
  'Bojonegoro':           [111.8816, -7.1509],
  'Lamongan':             [112.4167, -7.1167],
};

const STATUS_STYLE: Record<string, { dot: string; glow: string; text: string; badge: string }> = {
  'Kritis':  { dot: '#f43f5e', glow: 'rgba(244,63,94,0.2)',  text: '#be123c', badge: 'bg-rose-500 text-white' },
  'Tinggi':  { dot: '#f97316', glow: 'rgba(249,115,22,0.2)', text: '#9a3412', badge: 'bg-orange-500 text-white' },
  'Sedang':  { dot: '#f59e0b', glow: 'rgba(245,158,11,0.2)', text: '#b45309', badge: 'bg-amber-400 text-white' },
  'Aman':    { dot: '#10b981', glow: 'rgba(16,185,129,0.2)', text: '#065f46', badge: 'bg-emerald-500 text-white' },
  'Waspada': { dot: '#f59e0b', glow: 'rgba(245,158,11,0.2)', text: '#b45309', badge: 'bg-amber-400 text-white' },
};

export default function EWSPage() {
  const [isBroadcastOpen, setIsBroadcastOpen] = React.useState(false);
  const [mapStyle, setMapStyle] = React.useState('mapbox://styles/mapbox/light-v11');
  const [selectedEWS, setSelectedEWS] = React.useState<any>(null);

  const displayRegions = ewsData.regions.slice(0, 5);

  const getStatusColor = (status: string) => {
    if (status === 'Kritis') return 'bg-rose-500';
    if (status === 'Tinggi' || status === 'Waspada' || status === 'Sedang') return 'bg-amber-400';
    return 'bg-stripe-emerald';
  };

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    const addLayers = () => {
      ewsData.regions.forEach((region) => {
        const coords = REGION_COORDS[region.region];
        if (!coords) return;

        const style = STATUS_STYLE[region.status] ?? STATUS_STYLE['Aman'];
        const sourceId = `ews-${region.region_id}`;

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: coords },
              properties: {
                id: region.region_id,
                name: region.region,
                province: region.province,
                status: region.status,
                risk_score: region.risk_score,
                description: region.description,
                recommended_action: region.recommended_action,
              },
            },
          });
        }

        // Outer glow
        if (!map.getLayer(`${sourceId}-glow`)) {
          map.addLayer({
            id: `${sourceId}-glow`,
            type: 'circle',
            source: sourceId,
            paint: {
              'circle-radius': 30 + region.risk_score / 5,
              'circle-color': style.dot,
              'circle-opacity': 0.12,
              'circle-blur': 1.0,
            },
          });
        }

        // Main marker
        if (!map.getLayer(`${sourceId}-dot`)) {
          map.addLayer({
            id: `${sourceId}-dot`,
            type: 'circle',
            source: sourceId,
            paint: {
              'circle-radius': 11,
              'circle-color': style.dot,
              'circle-opacity': 0.95,
              'circle-stroke-width': 4,
              'circle-stroke-color': '#ffffff',
            },
          });
        }

        // Label
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
              'text-color': style.text,
              'text-halo-color': '#ffffff',
              'text-halo-width': 2,
            },
          });
        }

        // Selection Logic (No Popup)
        map.on('click', `${sourceId}-dot`, () => {
          setSelectedEWS(region);
          map.flyTo({ center: coords, zoom: 7, duration: 1500 });
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
      {/* Premium EWS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] border border-white/60">
        <div>
           <h1 className="text-5xl font-black text-stripe-indigo tracking-tight mb-4 leading-none">Early Warning System Nasional</h1>
           <p className="text-stripe-slate font-bold text-lg opacity-70">Pemantauan risiko krisis pangan berbasis AI dan deteksi anomali.</p>
        </div>
        <div className="flex space-x-6">
           <button 
             onClick={() => setIsBroadcastOpen(true)}
             className="bg-rose-500 text-white px-10 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.2em] shadow-2xl shadow-rose-500/20 hover:bg-black transition-all flex items-center space-x-4"
           >
              <BellRinging size={22} weight="bold" />
              <span>Simulasi Broadcast Nasional</span>
           </button>
        </div>
      </div>

      <div className="space-y-10">
         {/* Top Area: Full Width Map */}
         <div className="h-[600px] rounded-[64px] overflow-hidden border border-white shadow-[0_40px_100px_-20px_rgba(10,37,64,0.1)] relative">
            <MapboxMap
              style={mapStyle}
              center={[113.9213, -0.7893]}
              zoom={4.8}
              onMapLoad={handleMapLoad}
            />
            
            {/* Style Switcher Top Right */}
            <div className="absolute top-8 right-8 z-20 flex bg-white/80 backdrop-blur-2xl p.1.5 rounded-[24px] border border-white shadow-xl">
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

         {/* Bottom Data Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Side: Risk Index & Details Panel */}
            <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex-1 glass-card-premium p-10 rounded-[48px] shadow-2xl overflow-y-auto no-scrollbar flex flex-col">
               {selectedEWS ? (
                 <div className="animate-in slide-in-from-left duration-500">
                    <button 
                      onClick={() => setSelectedEWS(null)}
                      className="mb-8 text-[10px] font-black text-stripe-indigo uppercase tracking-widest flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity"
                    >
                       <ArrowRight size={14} className="rotate-180" />
                       <span>Kembali ke Ringkasan Risiko</span>
                    </button>
                    
                    <div className="mb-10">
                       <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-white mb-4 inline-block ${STATUS_STYLE[selectedEWS.status]?.badge || 'bg-slate-500'}`}>
                          {selectedEWS.status} ALERT
                       </span>
                       <h3 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-2">{selectedEWS.region}</h3>
                       <p className="text-[12px] font-bold text-stripe-slate opacity-50 uppercase tracking-widest mb-6">{selectedEWS.province}</p>
                       
                       <div className="p-6 bg-rose-50 rounded-[32px] border border-rose-100 mb-8">
                          <p className="text-sm font-bold text-stripe-indigo leading-relaxed">{selectedEWS.description}</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Score</p>
                          <p className="text-2xl font-black text-stripe-indigo">{selectedEWS.risk_score}/100</p>
                       </div>
                       <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                          <p className={`text-xl font-black ${getStatusColor(selectedEWS.status).replace('bg-', 'text-')}`}>Active</p>
                       </div>
                    </div>

                    <div className="p-8 bg-stripe-indigo/5 rounded-[40px] border border-dashed border-stripe-indigo/20 mb-8">
                       <p className="text-[9px] font-black text-stripe-indigo uppercase tracking-widest mb-4 opacity-60">Recommended Action</p>
                       <p className="text-sm font-black text-stripe-indigo">{selectedEWS.recommended_action}</p>
                       <div className="flex space-x-6 mt-8">
                          <Link href="/dashboard/insurance" className="flex-1">
                             <button className="w-full bg-stripe-indigo text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-stripe-indigo/20 hover:bg-black transition-all flex items-center justify-center space-x-3">
                                <span>Buka Klaim Terkait</span>
                                <ArrowRight size={18} weight="bold" />
                             </button>
                          </Link>
                       </div>
                    </div>

                    <button className="w-full bg-rose-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-black transition-all">
                       Deploy Mitigation Team
                    </button>
                 </div>
               ) : (
                 <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-sm font-black text-stripe-indigo uppercase tracking-[0.2em] flex items-center">
                         <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-3"></div>
                         Critical Hotspots
                       </h3>
                       <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{ewsData.statistik.Kritis} ZONA KRITIS</span>
                    </div>
                    
                    <div className="space-y-6">
                       {ewsData.regions.slice(0, 6).map((r) => (
                         <div 
                           key={r.region_id} 
                           onClick={() => setSelectedEWS(r)}
                           className="p-6 rounded-[36px] bg-white/40 border border-white hover:bg-white transition-all cursor-pointer group shadow-sm"
                         >
                            <div className="flex items-center space-x-5">
                               <div className={`w-2.5 h-10 rounded-full ${getStatusColor(r.status)} shadow-lg`}></div>
                               <div className="flex-1">
                                  <div className="flex justify-between items-start mb-0.5">
                                     <h4 className="text-lg font-black text-stripe-indigo tracking-tight">{r.region}</h4>
                                     <span className="text-[8px] font-black text-slate-400 uppercase">{r.status}</span>
                                  </div>
                                  <p className="text-[9px] font-bold text-stripe-slate opacity-40 uppercase tracking-widest leading-none">Score: {r.risk_score}</p>
                               </div>
                               <CaretRight size={18} className="text-stripe-indigo opacity-20 group-hover:opacity-100 transition-opacity" />
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-12 p-8 rounded-[40px] bg-rose-500/5 border border-dashed border-rose-500/30">
                       <div className="flex items-center space-x-5 mb-6 text-rose-500">
                          <ShieldCheck size={32} weight="fill" />
                          <p className="font-black text-sm uppercase tracking-widest">AI Action Plan</p>
                       </div>
                       <p className="text-sm font-bold text-stripe-slate opacity-70 leading-relaxed italic">
                         "Operasi pasar disarankan di Jabar & DKI dalam 72 jam ke depan."
                       </p>
                    </div>
                 </div>
               )}
            </div>

            {/* Legend Area (Integrated into Sidebar) */}
            <div className="glass-card-premium p-8 rounded-[40px] shadow-lg">
               <p className="text-[9px] font-black text-stripe-indigo uppercase tracking-widest mb-6 opacity-60">Risk Scale Index</p>
               <div className="flex justify-between gap-4">
                  {[
                    { color: 'bg-rose-500', label: 'Kritis' },
                    { color: 'bg-orange-500', label: 'Tinggi' },
                    { color: 'bg-amber-400', label: 'Waspada' },
                    { color: 'bg-emerald-500', label: 'Stable' },
                  ].map(l => (
                    <div key={l.label} className="text-center flex flex-col items-center">
                       <div className={`w-3 h-3 rounded-full ${l.color} shadow-md mb-2`} />
                       <p className="text-[8px] font-black text-stripe-indigo uppercase tracking-tighter">{l.label}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>

            {/* Right Side Bottom: Metrics & Strategy */}
            <div className="lg:col-span-2 flex flex-col gap-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card-premium p-8 rounded-[40px] flex items-center space-x-6 border-b-8 border-rose-500 border-x border-t border-white shadow-xl shadow-rose-500/5 transition-all hover:scale-[1.02]">
                     <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                        <CloudRain size={32} weight="fill" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Climate Anomaly</p>
                        <p className="text-2xl font-black text-stripe-indigo tracking-tighter leading-none">+42% Rainfall</p>
                     </div>
                  </div>
                  
                  <div className="glass-card-premium p-8 rounded-[40px] flex items-center space-x-6 border-b-8 border-orange-500 border-x border-t border-white shadow-xl shadow-orange-500/5 transition-all hover:scale-[1.02]">
                     <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                        <ChartLineUp size={32} weight="fill" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Price Divergence</p>
                        <p className="text-2xl font-black text-stripe-indigo tracking-tighter leading-none">Rp18.4K Avg</p>
                     </div>
                  </div>
               </div>

               <div className="glass-card-premium p-12 rounded-[56px] shadow-2xl relative overflow-hidden group border border-white flex-1 min-h-[400px]">
                  <div className="absolute top-0 right-0 opacity-5 rotate-[15deg] group-hover:rotate-0 transition-transform duration-1000">
                     <BellRinging size={240} weight="fill" className="text-rose-500" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col">
                     <div className="flex justify-between items-start mb-10">
                        <div>
                           <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4 italic">Analisis Keamanan Pangan</p>
                           <h4 className="text-4xl font-black text-stripe-indigo tracking-tighter">Mitigasi Risiko Otomatis</h4>
                        </div>
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
                           <ShieldCheck size={36} weight="fill" />
                        </div>
                     </div>
                     <p className="text-xl font-bold text-stripe-indigo opacity-70 mb-12 max-w-2xl leading-relaxed italic">
                        "Anomali curah hujan ekstrem terdeteksi di koordinat satelit Jawa Barat. 
                        Sistem merekomendasikan aktivasi penyaluran cadangan pangan pemerintah (CPP) sebesar 12% untuk wilayah Jabodetabek dalam 48 jam ke depan."
                     </p>
                     <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/50 p-8 rounded-[40px] border border-white flex flex-col justify-center shadow-inner">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60">Masyarakat Terdampak</p>
                           <p className="text-3xl font-black text-stripe-indigo tracking-tighter line-clamp-1">12,410,230 Jiwa</p>
                        </div>
                        <div className="bg-rose-500 p-8 rounded-[40px] border border-rose-500 flex flex-col justify-center shadow-2xl shadow-rose-500/20">
                           <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Status Respon</p>
                           <p className="text-3xl font-black text-white tracking-tighter">HIGH ALERT</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {isBroadcastOpen && (
        <BroadcastModal onClose={() => setIsBroadcastOpen(false)} />
      )}
    </div>
  );
}

function BroadcastModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = React.useState<'CONFIG' | 'SENDING' | 'DONE'>('CONFIG');

  return (
    <div className="fixed inset-0 bg-stripe-indigo/40 backdrop-blur-md z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[60px] shadow-[0_50px_100px_-20px_rgba(30,30,80,0.4)] overflow-hidden relative animate-in zoom-in slide-in-from-bottom-10 duration-500">
        
        <button onClick={onClose} className="absolute top-10 right-10 p-4 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all z-20">
          <X size={24} weight="bold" />
        </button>

        <div className="p-14">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-stripe-indigo tracking-tighter mb-4">
              {step === 'CONFIG' && "National Broadcast Control"}
              {step === 'SENDING' && "Disseminating Alerts..."}
              {step === 'DONE' && "Alert Disseminated"}
            </h2>
             <p className="text-stripe-slate font-bold opacity-40 uppercase tracking-widest text-[10px]">Secure Alert Gateway — ACTIVE</p>
          </div>

          {step === 'CONFIG' && (
            <div className="space-y-8">
               <div className="bg-rose-50/50 p-8 rounded-[40px] border border-rose-100">
                  <div className="flex items-center space-x-3 mb-6">
                     <Warning size={20} weight="fill" className="text-rose-500" />
                     <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Active Risk Detected</span>
                  </div>
                  <textarea 
                    className="w-full bg-white border-2 border-rose-100 rounded-3xl p-6 font-bold text-stripe-indigo text-lg focus:outline-none focus:border-rose-500 min-h-[120px] shadow-sm"
                    defaultValue="WASPADA: Curah hujan ekstrem di Jawa Barat 48 jam ke depan. Potensi gagal panen tinggi. Segera aktivasi proteksi Modul 7."
                  />
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-[28px] border border-slate-100 flex items-center space-x-4">
                     <WhatsappLogo size={24} weight="fill" className="text-emerald-500" />
                     <span className="text-[11px] font-black text-stripe-indigo uppercase tracking-widest">12.4K WhatsApp Direct</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[28px] border border-slate-100 flex items-center space-x-4">
                     <DeviceMobile size={24} weight="fill" className="text-stripe-violet" />
                     <span className="text-[11px] font-black text-stripe-indigo uppercase tracking-widest">Push Notifications</span>
                  </div>
               </div>

               <div className="bg-stripe-emerald/5 p-6 rounded-[28px] border border-stripe-emerald/20 flex items-start space-x-4">
                  <ShieldCheck size={28} weight="fill" className="text-stripe-emerald shrink-0" />
                   <div className="text-[11px] font-bold text-stripe-emerald/80 leading-relaxed uppercase tracking-tighter">
                     <span className="font-black">Integrasi Asuransi:</span> Menyiarkan alert ini akan secara otomatis memicu validasi klaim asuransi parametrik untuk area yang terdampak.
                  </div>
               </div>

               <button onClick={() => setStep('SENDING')} className="w-full bg-rose-500 text-white py-6 rounded-[28px] font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center space-x-4">
                  <PaperPlaneTilt size={28} weight="bold" />
                  <span>Kirim Alert &amp; Picu Klaim</span>
               </button>
            </div>
          )}

          {step === 'SENDING' && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center">
               <div className="w-32 h-32 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-8 animate-ping">
                  <BellRinging size={64} weight="fill" />
               </div>
               <p className="text-xl font-black text-stripe-indigo animate-pulse">Broadcasting to National Gateway...</p>
               <button onClick={() => setStep('DONE')} className="mt-12 text-xs font-black text-stripe-slate uppercase tracking-widest hover:text-rose-500 transition-colors">Abort (Emergency Only)</button>
            </div>
          )}

          {step === 'DONE' && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center">
               <div className="w-32 h-32 bg-stripe-emerald/10 rounded-full flex items-center justify-center text-stripe-emerald mb-8">
                  <CheckCircle size={64} weight="fill" />
               </div>
               <h3 className="text-3xl font-black text-stripe-indigo mb-4">Alert Distributed</h3>
               <p className="text-lg font-bold text-stripe-slate opacity-60 mb-10 max-w-sm">
                  Seluruh stakeholders telah menerima notifikasi. Payouts Modul 7 telah dijadwalkan secara otomatis.
               </p>
               <div className="w-full space-y-4">
                  <Link href="/dashboard/insurance" className="w-full bg-stripe-indigo text-white py-6 rounded-[28px] font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center justify-center">
                     Lihat Klaim Asuransi Terpicu
                  </Link>
                  <button onClick={onClose} className="w-full py-4 font-black text-xs text-stripe-slate uppercase tracking-widest">
                     Tutup Dashboard EWS
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Suppress unused import warning
const _unused = { ChartLineUp, CloudRain, Globe, MapTrifold, CaretRight, ShieldCheck };
