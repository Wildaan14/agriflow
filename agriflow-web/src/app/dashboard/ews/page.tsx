"use client";

import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import ewsData from '@/data/modul10_early_warning.json';
import { 
  Warning, 
  BellRinging,
  CloudRain, 
  ChartLineUp, 
  X,
  Globe,
  MapTrifold,
  Images,
  Plant,
  Thermometer,
  Drop,
  Scan,
  WarningOctagon,
  Leaf
} from '@phosphor-icons/react';

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic(() => import('@/components/maps/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center rounded-3xl border border-white/5">
      <div className="text-center">
        <Globe size={48} className="text-rose-500 opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Initialising Risk Intelligence…</p>
      </div>
    </div>
  ),
});

const REGION_COORDS: Record<string, [number, number]> = {
  'Purbalingga':          [-7.3966, 109.3641],
  'Brebes':               [-6.8726, 109.0317],
  'Banyumas':             [-7.5090, 109.2300],
  'Cilacap':              [-7.7199, 109.0000],
  'Sragen':               [-7.4250, 111.0280],
  'Deli Serdang':         [3.5270, 98.7600],
  'Langkat':              [3.7833, 98.2167],
  'Kutai Kartanegara':    [-0.4167, 116.9833],
  'Penajam Paser Utara':  [-1.2500, 116.5000],
  'Bojonegoro':           [-7.1500, 111.8833],
  'Lamongan':             [-7.1167, 112.4167],
};

export default function EWSPage() {
  const [activeTab, setActiveTab] = useState<'MAP' | 'PHENOLOGY'>('MAP');
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [selectedEWS, setSelectedEWS] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.5, 110.0]); // Indonesia center
  const [mapZoom, setMapZoom] = useState(5);

  const markers = useMemo(() => {
    return ewsData.regions.map(region => {
      const coords = REGION_COORDS[region.region];
      if (!coords) return null;
      
      const color = region.status === 'Kritis' ? '#ef4444' : region.status === 'Tinggi' ? '#f59e0b' : region.status === 'Sedang' ? '#eab308' : '#22c55e';
      
      return {
        id: region.region_id,
        position: coords,
        title: region.region,
        status: region.status,
        color: color,
        content: (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-500">Risk Score</span>
              <span className="text-[10px] font-bold text-gray-900">{region.risk_score}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
               <div 
                 className="h-full" 
                 style={{ width: `${region.risk_score}%`, backgroundColor: color }}
               ></div>
            </div>
          </div>
        )
      };
    }).filter(Boolean) as any[];
  }, []);

  const handleRegionSelect = (region: any) => {
    setSelectedEWS(region);
    const coords = REGION_COORDS[region.region];
    if (coords) {
      setMapCenter(coords);
      setMapZoom(9);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">National EWS</h1>
           <p className="text-gray-500 text-sm font-medium mt-1">Sistem peringatan dini ketersediaan pangan & kesehatan lahan.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex bg-white shadow-sm border border-gray-100 p-1.5 rounded-xl">
             <button 
               onClick={() => setActiveTab('MAP')}
               className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'MAP' ? 'bg-[#1B4D1B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <MapTrifold size={16} /> Risk Map
             </button>
             <button 
               onClick={() => setActiveTab('PHENOLOGY')}
               className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'PHENOLOGY' ? 'bg-[#1B4D1B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <Images size={16} /> Phenology
             </button>
           </div>
           
           <button 
             onClick={() => setIsBroadcastOpen(true)}
             className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
           >
              <BellRinging size={18} weight="bold" /> Broadcast
           </button>
        </div>
      </div>

      {activeTab === 'MAP' ? (
        <div className="flex flex-col lg:flex-row gap-6">
           {/* Risk Panel */}
           <div className="lg:w-1/3 xl:w-1/4 space-y-6 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-[600px] flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Critical Regions</h3>
                   <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 text-rose-600 rounded-md">
                     {ewsData.statistik.Kritis} Kritis
                   </span>
                 </div>
                 
                 <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pr-1">
                    {ewsData.regions.map((r) => (
                      <div 
                        key={r.region_id} 
                        onClick={() => handleRegionSelect(r)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-start gap-3 ${selectedEWS?.region_id === r.region_id ? 'bg-[#1B4D1B] border-[#1B4D1B] text-white shadow-md' : 'bg-white border-gray-100 hover:border-[#1B4D1B]/30 hover:shadow-sm'}`}
                      >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${r.status === 'Kritis' ? 'bg-rose-50 text-rose-600' : r.status === 'Tinggi' ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500'}`}>
                            {r.status === 'Kritis' ? <Warning size={16} weight="bold" /> : <ChartLineUp size={16} weight="bold" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                               <h4 className={`text-sm font-bold truncate ${selectedEWS?.region_id === r.region_id ? 'text-white' : 'text-gray-900'}`}>{r.region}</h4>
                            </div>
                            <p className={`text-[11px] font-medium ${selectedEWS?.region_id === r.region_id ? 'text-white/80' : 'text-gray-500'}`}>{r.risk_type.join(', ')}</p>
                            <p className={`text-[11px] font-bold mt-1 ${selectedEWS?.region_id === r.region_id ? 'text-white' : 'text-rose-600'}`}>Risk: {r.risk_score}%</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 {selectedEWS && (
                   <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in">
                      <button className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors">
                        Mitigasi Segera
                      </button>
                   </div>
                 )}
              </div>
           </div>

           {/* Map Viewport */}
           <div className="lg:w-2/3 xl:w-3/4 space-y-6">
              <div className="h-[480px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative group bg-gray-100">
                 <LeafletMap
                   center={mapCenter}
                   zoom={mapZoom}
                   markers={markers}
                   onMarkerClick={(m) => {
                     const region = ewsData.regions.find(r => r.region_id === m.id);
                     if (region) handleRegionSelect(region);
                   }}
                 />
                 
                 <div className="absolute top-6 left-6 z-[400] bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white shadow-lg pointer-events-none">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Analisis EWS</p>
                    <p className="text-sm font-bold text-[#1B4D1B]">Ketahanan Pangan Wilayah</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center space-x-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                       <CloudRain size={28} weight="duotone" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weather Anomaly</p>
                       <p className="text-xl font-bold text-gray-900">+42% Rainfall <span className="text-xs text-rose-500 font-bold ml-1">(Extreme)</span></p>
                    </div>
                 </div>
                 <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center space-x-5 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                       <WarningOctagon size={28} weight="duotone" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Lahan Berisiko</p>
                       <p className="text-xl font-bold text-gray-900">{ewsData.statistik.total_lahan_berisiko_ha.toLocaleString('id-ID')} <span className="text-sm text-gray-500 font-medium ml-1">Ha</span></p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        /* Phenology Imagery Tab */
        <div className="animate-in slide-in-from-right-4 duration-500 flex flex-col lg:flex-row gap-6">
           <div className="lg:w-2/3 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h3 className="text-lg font-bold text-gray-900">Pemantauan Fenologi Padi</h3>
                       <p className="text-xs text-gray-500 mt-1">Citra Satelit Multispektral (NDVI) - Resolusi 10m</p>
                    </div>
                    <div className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold flex items-center gap-2">
                       <Scan size={16} /> Live Feed
                    </div>
                 </div>
                 
                 <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 group">
                    <img 
                      src="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&q=80" 
                      alt="Paddy Field Aerial"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Simulated Analysis Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-[#14b850]/10 mix-blend-overlay"></div>
                    
                    {/* Bounding Box Mock */}
                    <div className="absolute top-[30%] left-[20%] w-[25%] h-[40%] border-2 border-amber-400 rounded-lg bg-amber-400/20 backdrop-blur-[2px] animate-pulse"></div>
                    <div className="absolute top-[25%] left-[20%] bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-t-lg">Stress Air Deteksi</div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                       <div>
                          <p className="text-white font-bold text-lg drop-shadow-md">Blok A-12, Purbalingga</p>
                          <p className="text-white/80 text-xs drop-shadow-md flex items-center gap-1 mt-1"><Images size={14} /> Sentinel-2A L2A</p>
                       </div>
                       <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex gap-4">
                          <div className="text-center">
                             <p className="text-[10px] text-white/60 uppercase tracking-widest">Avg NDVI</p>
                             <p className="text-white font-bold text-lg">0.68</p>
                          </div>
                          <div className="w-px bg-white/20"></div>
                          <div className="text-center">
                             <p className="text-[10px] text-white/60 uppercase tracking-widest">Fase</p>
                             <p className="text-white font-bold text-lg">Vegetatif</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:w-1/3 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-gray-900 mb-6">Health Metrics & AI Insights</h3>
                 
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-500 flex items-center gap-2"><Leaf size={16} /> Indeks Kerapatan Tajuk</span>
                          <span className="text-xs font-bold text-[#1B4D1B]">Normal</span>
                       </div>
                       <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1B4D1B] w-[75%]"></div>
                       </div>
                    </div>
                    
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-500 flex items-center gap-2"><Thermometer size={16} /> Suhu Permukaan (LST)</span>
                          <span className="text-xs font-bold text-amber-500">Tinggi</span>
                       </div>
                       <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[85%]"></div>
                       </div>
                    </div>
                    
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-500 flex items-center gap-2"><Drop size={16} /> Kelembapan Tanah</span>
                          <span className="text-xs font-bold text-rose-500">Kritis</span>
                       </div>
                       <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 w-[30%]"></div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 bg-amber-50 rounded-2xl p-4 border border-amber-100">
                    <h4 className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-2"><Warning size={16} /> Prediksi AI (14 Hari Kedepan)</h4>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                       Deteksi penurunan nilai NDVI sebesar 12% di kuadran barat. Pola spektral mengindikasikan awal mula kekeringan ringan. Direkomendasikan irigasi suplesi dalam 3 hari ke depan untuk mencegah penurunan hasil panen.
                    </p>
                 </div>
                 
                 <button className="w-full mt-6 py-3 rounded-xl bg-[#1B4D1B] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#1B4D1B]/20 hover:bg-[#133813] transition-colors">
                    Unduh Laporan Analisis
                 </button>
              </div>
           </div>
        </div>
      )}

      {isBroadcastOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[9999] flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-white w-full max-w-md rounded-[48px] p-12 relative shadow-2xl border border-white">
              <button onClick={() => setIsBroadcastOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors">
                 <X size={24} />
              </button>
              <div className="text-center">
                 <div className="w-20 h-20 bg-rose-50 rounded-[32px] flex items-center justify-center text-rose-500 mx-auto mb-8 shadow-sm">
                    <Warning size={40} weight="fill" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-3">Darurat Pangan</h2>
                 <p className="text-sm text-gray-500 mb-10 leading-relaxed px-4">Mengirim peringatan prioritas tinggi ke <strong className="text-gray-900">12.4k node</strong> petani dan logistik di wilayah terdampak.</p>
                 <button onClick={() => setIsBroadcastOpen(false)} className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-rose-600/30 hover:bg-rose-700 transition-colors">Kirim Peringatan</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
