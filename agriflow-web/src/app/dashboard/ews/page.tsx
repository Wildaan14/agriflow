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
    <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center rounded-[32px] border border-white/[0.05]">
      <div className="text-center">
        <Globe size={48} weight="thin" className="text-rose-500 opacity-50 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Memuat Peta Risiko…</p>
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
  'Kritis':  { dot: '#f43f5e', glow: 'rgba(244,63,94,0.3)',  text: '#ffffff', badge: 'bg-rose-500/20 text-rose-400 border border-rose-500/30' },
  'Tinggi':  { dot: '#f97316', glow: 'rgba(249,115,22,0.3)', text: '#ffffff', badge: 'bg-orange-500/20 text-orange-400 border border-orange-500/30' },
  'Sedang':  { dot: '#f59e0b', glow: 'rgba(245,158,11,0.3)', text: '#ffffff', badge: 'bg-amber-400/20 text-amber-400 border border-amber-400/30' },
  'Aman':    { dot: '#14b850', glow: 'rgba(20,184,80,0.3)', text: '#ffffff', badge: 'bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30' },
  'Waspada': { dot: '#f59e0b', glow: 'rgba(245,158,11,0.3)', text: '#ffffff', badge: 'bg-amber-400/20 text-amber-400 border border-amber-400/30' },
};

export default function EWSPage() {
  const [isBroadcastOpen, setIsBroadcastOpen] = React.useState(false);
  const [mapStyle, setMapStyle] = React.useState('mapbox://styles/mapbox/dark-v11');
  const [selectedEWS, setSelectedEWS] = React.useState<any>(null);

  const displayRegions = ewsData.regions.slice(0, 5);

  const getStatusColor = (status: string) => {
    if (status === 'Kritis') return 'bg-rose-500';
    if (status === 'Tinggi' || status === 'Waspada' || status === 'Sedang') return 'bg-amber-400';
    return 'bg-[#14b850]';
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
              'circle-opacity': 0.15,
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
              'circle-radius': 8,
              'circle-color': style.dot,
              'circle-opacity': 1.0,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#0A0D14',
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
              'text-size': 11,
              'text-offset': [0, 1.5],
              'text-anchor': 'top',
            },
            paint: {
              'text-color': style.text,
              'text-halo-color': '#0A0D14',
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
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 text-white">
      {/* Premium EWS Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05]">
        <div>
           <div className="flex items-center space-x-2 mb-4">
             <Warning size={20} className="text-rose-500 animate-pulse" />
             <span className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.3em]">AI Anomaly Detection Aktif</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">Early Warning System <span className="text-rose-500">Nasional</span></h1>
           <p className="text-white/50 text-sm max-w-xl font-light leading-relaxed">Pemantauan risiko krisis pangan berbasis kecerdasan buatan, deteksi anomali cuaca, dan manajemen pasokan.</p>
        </div>
        <div className="flex w-full lg:w-auto">
           <button 
             onClick={() => setIsBroadcastOpen(true)}
             className="w-full lg:w-auto bg-rose-500/10 text-rose-500 border border-rose-500/30 px-8 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center space-x-3 group"
           >
              <BellRinging size={20} weight="fill" className="group-hover:animate-ping" />
              <span>Simulasi Broadcast Darurat</span>
           </button>
        </div>
      </div>

      <div className="space-y-8">
         {/* Top Area: Full Width Map */}
         <div className="h-[500px] rounded-[32px] overflow-hidden border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
            <MapboxMap
              style={mapStyle}
              center={[113.9213, -0.7893]}
              zoom={4.8}
              onMapLoad={handleMapLoad}
            />
            
            {/* Style Switcher Top Right */}
            <div className="absolute top-6 right-6 z-20 flex bg-[#0A0D14]/80 backdrop-blur-xl p-1.5 rounded-xl border border-white/[0.1] shadow-2xl">
               {[
                 { id: 'mapbox://styles/mapbox/dark-v11', label: 'DARK' },
                 { id: 'mapbox://styles/mapbox/satellite-v9', label: 'SAT' },
                 { id: 'mapbox://styles/mapbox/light-v11', label: 'LIGHT' }
               ].map(s => (
                 <button
                   key={s.id}
                   onClick={() => setMapStyle(s.id)}
                   className={`px-4 py-2 rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest ${mapStyle === s.id ? 'bg-[#14b850] text-[#0A0D14]' : 'text-white/40 hover:text-white'}`}
                 >
                   {s.label}
                 </button>
               ))}
            </div>
         </div>

         {/* Bottom Data Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Risk Index & Details Panel */}
            <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex-1 bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] shadow-2xl backdrop-blur-xl overflow-y-auto no-scrollbar flex flex-col min-h-[500px]">
               {selectedEWS ? (
                 <div className="animate-in slide-in-from-left duration-500 h-full flex flex-col">
                    <button 
                      onClick={() => setSelectedEWS(null)}
                      className="mb-8 text-[10px] font-bold text-white/50 uppercase tracking-widest flex items-center space-x-2 hover:text-white transition-colors w-fit"
                    >
                       <ArrowRight size={14} className="rotate-180" />
                       <span>Kembali ke Ringkasan Risiko</span>
                    </button>
                    
                    <div className="mb-8 flex-1">
                       <span className={`text-[9px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest mb-4 inline-block ${STATUS_STYLE[selectedEWS.status]?.badge || 'bg-white/10 text-white'}`}>
                          {selectedEWS.status} ALERT
                       </span>
                       <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">{selectedEWS.region}</h3>
                       <p className="text-[11px] font-bold text-[#14b850] uppercase tracking-widest mb-6">{selectedEWS.province}</p>
                       
                       <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/20 mb-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-2xl rounded-full -mr-10 -mt-10"></div>
                          <p className="text-xs font-medium text-rose-200/80 leading-relaxed relative z-10">{selectedEWS.description}</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.05]">
                             <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Skor Risiko AI</p>
                             <p className="text-2xl font-semibold text-white">{selectedEWS.risk_score}<span className="text-xs text-white/30 font-normal">/100</span></p>
                          </div>
                          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.05]">
                             <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                             <p className={`text-xl font-semibold ${getStatusColor(selectedEWS.status).replace('bg-', 'text-')}`}>Aktif</p>
                          </div>
                       </div>

                       <div className="p-5 bg-[#0ea5e9]/5 rounded-2xl border border-[#0ea5e9]/20 mb-6">
                          <p className="text-[9px] font-bold text-[#0ea5e9]/60 uppercase tracking-widest mb-3">Tindakan Rekomendasi AI</p>
                          <p className="text-sm font-medium text-[#0ea5e9] leading-relaxed">{selectedEWS.recommended_action}</p>
                       </div>
                    </div>

                    <div className="space-y-3 mt-auto">
                        <Link href="/dashboard/insurance" className="block w-full">
                           <button className="w-full bg-white/[0.05] text-white py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest border border-white/[0.1] hover:bg-white hover:text-[#0A0D14] transition-all flex items-center justify-center space-x-2">
                              <ShieldCheck size={18} weight="fill" />
                              <span>Validasi Klaim Asuransi</span>
                           </button>
                        </Link>
                        <button className="w-full bg-rose-500 text-white py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all flex items-center justify-center space-x-2">
                           <Warning size={18} weight="bold" />
                           <span>Kirim Tim Mitigasi</span>
                        </button>
                    </div>
                 </div>
               ) : (
                 <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-[11px] font-bold text-white/70 uppercase tracking-[0.2em] flex items-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping mr-2"></div>
                         Titik Panas Kritis
                       </h3>
                       <span className="bg-rose-500/20 text-rose-500 border border-rose-500/30 px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest">{ewsData.statistik.Kritis} ZONA</span>
                    </div>
                    
                    <div className="space-y-3">
                       {ewsData.regions.slice(0, 6).map((r) => (
                         <div 
                           key={r.region_id} 
                           onClick={() => setSelectedEWS(r)}
                           className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.2] transition-all cursor-pointer group flex items-center space-x-4"
                         >
                            <div className={`w-1.5 h-10 rounded-full ${getStatusColor(r.status)} shadow-[0_0_10px_${getStatusColor(r.status).replace('bg-', '')}]`}></div>
                            <div className="flex-1">
                               <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-sm font-semibold text-white tracking-tight">{r.region}</h4>
                                  <span className={`text-[8px] font-bold uppercase ${getStatusColor(r.status).replace('bg-', 'text-')}`}>{r.status}</span>
                               </div>
                               <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none">Skor Risiko: {r.risk_score}</p>
                            </div>
                            <CaretRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                         </div>
                       ))}
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-[#0ea5e9]/10 blur-xl rounded-full -mr-10 -mt-10"></div>
                       <div className="flex items-center space-x-3 mb-4 text-[#0ea5e9]">
                          <ShieldCheck size={24} weight="fill" />
                          <p className="font-bold text-[10px] uppercase tracking-widest">Rencana Aksi AI</p>
                       </div>
                       <p className="text-xs font-medium text-[#0ea5e9]/80 leading-relaxed relative z-10">
                         Operasi pasar disarankan di Jabar & DKI dalam 72 jam ke depan untuk stabilisasi harga.
                       </p>
                    </div>
                 </div>
               )}
            </div>

            {/* Legend Area (Integrated into Sidebar) */}
            <div className="bg-white/[0.02] p-6 rounded-[32px] border border-white/[0.05] backdrop-blur-xl">
               <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-6 text-center">Indeks Skala Risiko</p>
               <div className="flex justify-between px-4">
                  {[
                    { color: 'bg-rose-500', label: 'Kritis' },
                    { color: 'bg-orange-500', label: 'Tinggi' },
                    { color: 'bg-amber-400', label: 'Waspada' },
                    { color: 'bg-[#14b850]', label: 'Aman' },
                  ].map(l => (
                    <div key={l.label} className="text-center flex flex-col items-center">
                       <div className={`w-3 h-3 rounded-full ${l.color} shadow-[0_0_10px_${l.color.replace('bg-', '')}] mb-2`} />
                       <p className="text-[8px] font-bold text-white/70 uppercase tracking-widest">{l.label}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>

            {/* Right Side Bottom: Metrics & Strategy */}
            <div className="lg:col-span-2 flex flex-col gap-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.02] p-6 rounded-[32px] flex items-center space-x-5 border border-white/[0.05] border-l-4 border-l-[#0ea5e9] hover:bg-white/[0.05] transition-colors group">
                     <div className="w-14 h-14 bg-[#0ea5e9]/10 rounded-2xl flex items-center justify-center text-[#0ea5e9] border border-[#0ea5e9]/20 group-hover:scale-110 transition-transform">
                        <CloudRain size={28} weight="fill" />
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1.5">Anomali Iklim</p>
                        <p className="text-2xl font-semibold text-white tracking-tight leading-none">+42% Curah Hujan</p>
                     </div>
                  </div>
                  
                  <div className="bg-white/[0.02] p-6 rounded-[32px] flex items-center space-x-5 border border-white/[0.05] border-l-4 border-l-amber-500 hover:bg-white/[0.05] transition-colors group">
                     <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform">
                        <ChartLineUp size={28} weight="fill" />
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1.5">Divergensi Harga Pasar</p>
                        <p className="text-2xl font-semibold text-white tracking-tight leading-none">Rp 18.4K <span className="text-sm font-normal text-white/40">/kg Rata-rata</span></p>
                     </div>
                  </div>
               </div>

               <div className="bg-white/[0.02] p-10 rounded-[40px] border border-white/[0.05] relative overflow-hidden group flex-1 min-h-[300px]">
                  <div className="absolute top-0 right-0 opacity-[0.03] rotate-[15deg] group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
                     <Warning size={300} weight="fill" className="text-rose-500" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col">
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <p className="text-[9px] font-bold text-[#14b850] uppercase tracking-widest mb-3 flex items-center">
                             <ShieldCheck size={14} className="mr-1.5" />
                             Keamanan Pangan Terjamin
                           </p>
                           <h4 className="text-3xl font-semibold text-white tracking-tight">Mitigasi Risiko Otomatis</h4>
                        </div>
                        <div className="px-4 py-2 bg-rose-500/10 rounded-xl text-rose-500 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center space-x-2">
                           <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                           <span className="text-[10px] font-bold uppercase tracking-widest">Sistem Siaga</span>
                        </div>
                     </div>
                     <p className="text-sm font-light text-white/60 mb-10 max-w-2xl leading-relaxed">
                        Anomali curah hujan ekstrem terdeteksi di koordinat satelit Jawa Barat. 
                        Sistem merekomendasikan aktivasi penyaluran cadangan pangan pemerintah (CPP) sebesar 12% untuk wilayah Jabodetabek dalam 48 jam ke depan guna mencegah lonjakan harga.
                     </p>
                     <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05] flex flex-col justify-center">
                           <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Estimasi Penduduk Terdampak</p>
                           <p className="text-2xl font-semibold text-white tracking-tight">12,410,230 <span className="text-sm font-normal text-white/40">Jiwa</span></p>
                        </div>
                        <div className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/30 flex flex-col justify-center relative overflow-hidden">
                           <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-rose-500/20 to-transparent"></div>
                           <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-1.5 relative z-10">Tingkat Kewaspadaan</p>
                           <p className="text-2xl font-semibold text-rose-500 tracking-tight relative z-10">HIGH ALERT</p>
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
    <div className="fixed inset-0 bg-[#0A0D14]/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-[#0A0D14] w-full max-w-2xl rounded-[40px] border border-white/[0.1] shadow-[0_0_100px_rgba(20,184,80,0.15)] overflow-hidden relative animate-in zoom-in-95 duration-500 text-white">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/[0.05] rounded-full hover:bg-rose-500 hover:text-white transition-all z-20 border border-white/[0.1]">
          <X size={20} weight="bold" />
        </button>

        <div className="p-12">
          <div className="mb-10 text-center">
             <div className="w-16 h-16 mx-auto bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 mb-6">
                <Warning size={32} weight="fill" />
             </div>
             <h2 className="text-3xl font-semibold tracking-tight mb-2">
              {step === 'CONFIG' && "Sistem Peringatan Dini"}
              {step === 'SENDING' && "Menyebarkan Peringatan..."}
              {step === 'DONE' && "Peringatan Berhasil Terkirim"}
             </h2>
             <p className="text-[#14b850] font-bold uppercase tracking-widest text-[9px] flex items-center justify-center">
                <ShieldCheck size={12} className="mr-1.5" />
                Jalur Komunikasi Enkripsi Aktif
             </p>
          </div>

          {step === 'CONFIG' && (
            <div className="space-y-6">
               <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Pesan Siaran Nasional</span>
                     <span className="text-[9px] px-2 py-1 bg-rose-500/20 text-rose-500 rounded-md font-bold uppercase border border-rose-500/30">Darurat Level 1</span>
                  </div>
                  <textarea 
                    className="w-full bg-[#0A0D14] border border-white/[0.1] rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-rose-500/50 min-h-[100px] shadow-inner resize-none font-medium leading-relaxed"
                    defaultValue="WASPADA: Curah hujan ekstrem di Jawa Barat 48 jam ke depan. Potensi gagal panen tinggi. Segera aktivasi proteksi Modul 7."
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#14b850]/5 p-4 rounded-2xl border border-[#14b850]/20 flex items-center space-x-3">
                     <WhatsappLogo size={24} weight="fill" className="text-[#14b850]" />
                     <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Penerima Langsung</p>
                        <p className="text-sm font-semibold text-white">12.4K WhatsApp</p>
                     </div>
                  </div>
                  <div className="bg-[#0ea5e9]/5 p-4 rounded-2xl border border-[#0ea5e9]/20 flex items-center space-x-3">
                     <DeviceMobile size={24} weight="fill" className="text-[#0ea5e9]" />
                     <div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Notifikasi Aplikasi</p>
                        <p className="text-sm font-semibold text-white">Push & SMS Alert</p>
                     </div>
                  </div>
               </div>

               <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20 flex items-start space-x-3">
                  <ShieldCheck size={20} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-500/80 leading-relaxed">
                     <strong className="font-bold text-amber-500 block mb-1 uppercase tracking-widest">Integrasi Smart Contract:</strong>
                     Penyebaran peringatan ini akan secara otomatis memicu protokol validasi klaim asuransi parametrik untuk area yang berada dalam zona merah.
                  </p>
               </div>

               <button onClick={() => setStep('SENDING')} className="w-full bg-rose-500 text-[#0A0D14] py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all flex items-center justify-center space-x-3 mt-4 group">
                  <PaperPlaneTilt size={20} weight="fill" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>Kirim Peringatan Darurat</span>
               </button>
            </div>
          )}

          {step === 'SENDING' && (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-500 mb-6 border border-rose-500/30 relative">
                  <div className="absolute inset-0 bg-rose-500/30 rounded-full animate-ping"></div>
                  <BellRinging size={40} weight="fill" className="relative z-10" />
               </div>
               <p className="text-sm font-medium text-white/70 animate-pulse">Menghubungkan ke Gateway Nasional...</p>
               <button onClick={() => setStep('DONE')} className="mt-8 text-[9px] font-bold text-white/30 hover:text-rose-500 uppercase tracking-widest transition-colors border border-white/10 px-4 py-2 rounded-lg">Batalkan (Hanya Admin)</button>
            </div>
          )}

          {step === 'DONE' && (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 bg-[#14b850]/10 rounded-full flex items-center justify-center text-[#14b850] mb-6 border border-[#14b850]/30 shadow-[0_0_30px_rgba(20,184,80,0.2)]">
                  <CheckCircle size={48} weight="fill" />
               </div>
               <h3 className="text-xl font-semibold text-white mb-3">Distribusi Peringatan Selesai</h3>
               <p className="text-[11px] text-white/50 mb-8 max-w-sm leading-relaxed">
                  Seluruh pihak terkait telah menerima notifikasi. Pencairan dana asuransi Modul 7 telah dijadwalkan secara otomatis oleh smart contract.
               </p>
               <div className="w-full space-y-3 flex flex-col px-8">
                  <Link href="/dashboard/insurance" className="w-full bg-[#14b850] text-[#0A0D14] py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all flex items-center justify-center">
                     Lihat Klaim Asuransi
                  </Link>
                  <button onClick={onClose} className="w-full py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl font-bold text-[11px] text-white/60 hover:text-white hover:bg-white/[0.1] uppercase tracking-widest transition-all">
                     Kembali ke Dashboard
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
const _unused = { ChartLineUp, CloudRain, Globe, MapTrifold, CaretRight, ShieldCheck, FileText };

