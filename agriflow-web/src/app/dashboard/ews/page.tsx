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
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-3xl border border-slate-200">
      <div className="text-center">
        <Globe size={48} className="text-[#14b850] opacity-20 mx-auto mb-4 animate-pulse" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initialising Risk Intelligence…</p>
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
      
      const color = region.status === 'Kritis' ? '#ef4444' : region.status === 'Tinggi' ? '#f59e0b' : region.status === 'Sedang' ? '#eab308' : '#14b850';
      
      return {
        id: region.region_id,
        position: coords,
        title: region.region,
        status: region.status,
        color: color,
        content: (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-slate-500 font-medium">Risk Score</span>
              <span className="text-[10px] font-bold text-slate-900">{region.risk_score}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
               <div 
                 className="h-full rounded-full transition-all duration-1000" 
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
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      {/* Mini Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-[#1B4D1B]">National EWS</h1>
           <p className="text-slate-500 text-sm font-medium mt-1">Sistem peringatan dini ketersediaan pangan & kesehatan lahan.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex bg-slate-50 shadow-sm border border-slate-200 p-1.5 rounded-2xl">
             <button 
               onClick={() => setActiveTab('MAP')}
               className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'MAP' ? 'bg-white text-[#1B4D1B] shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 border border-transparent'}`}
             >
                <MapTrifold size={18} weight={activeTab === 'MAP' ? 'fill' : 'regular'} /> Risk Map
             </button>
             <button 
               onClick={() => setActiveTab('PHENOLOGY')}
               className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'PHENOLOGY' ? 'bg-white text-[#1B4D1B] shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 border border-transparent'}`}
             >
                <Images size={18} weight={activeTab === 'PHENOLOGY' ? 'fill' : 'regular'} /> Phenology
             </button>
           </div>
           
           <button 
             onClick={() => setIsBroadcastOpen(true)}
             className="px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white transition-all shadow-sm flex items-center gap-2 group"
           >
              <BellRinging size={18} weight="bold" className="group-hover:animate-wiggle" /> Broadcast
           </button>
        </div>
      </div>

      {activeTab === 'MAP' ? (
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Risk Panel */}
           <div className="lg:w-1/3 xl:w-1/4 space-y-6 flex-shrink-0">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-[600px] flex flex-col hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Critical Regions</h3>
                   <span className="text-[10px] font-bold px-3 py-1 bg-rose-50 text-rose-600 rounded-lg border border-rose-100">
                     {ewsData.statistik.Kritis} Kritis
                   </span>
                 </div>
                 
                 <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pr-2">
                    {ewsData.regions.map((r) => (
                      <div 
                        key={r.region_id} 
                        onClick={() => handleRegionSelect(r)}
                        className={`p-5 rounded-[24px] border transition-all cursor-pointer group flex items-start gap-4 ${selectedEWS?.region_id === r.region_id ? 'bg-[#1B4D1B] border-[#1B4D1B] text-white shadow-md' : 'bg-slate-50 border-slate-200 hover:border-[#14b850]/40 hover:bg-white hover:shadow-sm'}`}
                      >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${r.status === 'Kritis' ? 'bg-rose-100 text-rose-600' : r.status === 'Tinggi' ? 'bg-amber-100 text-amber-600' : 'bg-[#14b850]/20 text-[#1B4D1B]'}`}>
                            {r.status === 'Kritis' ? <Warning size={20} weight="duotone" /> : <ChartLineUp size={20} weight="duotone" />}
                         </div>
                         <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-center mb-1.5">
                               <h4 className={`text-sm font-bold truncate ${selectedEWS?.region_id === r.region_id ? 'text-white' : 'text-slate-900 group-hover:text-[#1B4D1B]'}`}>{r.region}</h4>
                            </div>
                            <p className={`text-[11px] font-medium leading-relaxed ${selectedEWS?.region_id === r.region_id ? 'text-white/80' : 'text-slate-500'}`}>{r.risk_type.join(', ')}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                   <div className={`h-full rounded-full ${r.status === 'Kritis' ? 'bg-rose-500' : r.status === 'Tinggi' ? 'bg-amber-500' : 'bg-[#14b850]'}`} style={{ width: `${r.risk_score}%` }}></div>
                                </div>
                                <p className={`text-[10px] font-bold ${selectedEWS?.region_id === r.region_id ? 'text-white' : 'text-slate-900'}`}>{r.risk_score}%</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 {selectedEWS && (
                   <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in">
                      <button className="w-full py-4 rounded-2xl bg-rose-600 text-white font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                        <Warning size={18} weight="bold" />
                        Mitigasi Segera
                      </button>
                   </div>
                 )}
              </div>
           </div>
           
           {/* Map Viewport */}
           <div className="lg:w-2/3 xl:w-3/4 space-y-6">
              <div className="h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-100">
                 <LeafletMap
                   center={mapCenter}
                   zoom={mapZoom}
                   markers={markers}
                   onMarkerClick={(m) => {
                     const region = ewsData.regions.find(r => r.region_id === m.id);
                     if (region) handleRegionSelect(region);
                   }}
                 />
                 
                 <div className="absolute top-6 left-6 z-[400] bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm pointer-events-none">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Analisis EWS</p>
                    <p className="text-sm font-bold text-[#1B4D1B]">Ketahanan Pangan Wilayah</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white border border-slate-200 rounded-3xl p-8 flex items-center space-x-6 hover:border-[#14b850]/40 hover:shadow-md transition-all group">
                    <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-sm">
                       <CloudRain size={32} weight="duotone" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weather Anomaly</p>
                       <p className="text-2xl font-bold text-slate-900 tracking-tight">+42% Rainfall <span className="text-xs text-rose-500 font-bold ml-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">(Extreme)</span></p>
                    </div>
                 </div>
                 <div className="bg-white border border-slate-200 rounded-3xl p-8 flex items-center space-x-6 hover:border-[#14b850]/40 hover:shadow-md transition-all group">
                    <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-sm">
                       <WarningOctagon size={32} weight="duotone" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Lahan Berisiko</p>
                       <p className="text-2xl font-bold text-slate-900 tracking-tight">{ewsData.statistik.total_lahan_berisiko_ha.toLocaleString('id-ID')} <span className="text-sm text-slate-500 font-medium ml-1">Ha</span></p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        /* Phenology Imagery Tab */
        <div className="animate-in slide-in-from-right-4 duration-500 flex flex-col lg:flex-row gap-8">
           <div className="lg:w-2/3 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                 <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                    <div>
                       <h3 className="text-xl font-bold text-[#1B4D1B] tracking-tight">Pemantauan Fenologi Padi</h3>
                       <p className="text-sm font-medium text-slate-500 mt-1">Citra Satelit Multispektral (NDVI) - Resolusi 10m</p>
                    </div>
                    <div className="px-4 py-2 bg-[#14b850]/10 border border-[#14b850]/20 text-[#1B4D1B] rounded-xl text-[11px] font-bold flex items-center gap-2 shadow-sm">
                       <Scan size={18} className="text-[#14b850] animate-pulse" /> Live Feed
                    </div>
                 </div>
                 
                 <div className="relative rounded-[24px] overflow-hidden aspect-video bg-slate-900 group shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&q=80" 
                      alt="Paddy Field Aerial"
                      className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110 opacity-90 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    
                    {/* Simulated Analysis Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    
                    {/* False Color NDVI Overlay Simulation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#14b850]/30 via-transparent to-rose-500/20 mix-blend-overlay"></div>
                    
                    {/* Bounding Box Mock */}
                    <div className="absolute top-[30%] left-[20%] w-[25%] h-[40%] border-2 border-rose-500 rounded-xl bg-rose-500/10 backdrop-blur-[1px] animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]"></div>
                    <div className="absolute top-[25%] left-[20%] bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-t-xl shadow-lg flex items-center gap-1">
                       <Warning size={12} weight="bold" /> Stress Air Deteksi
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                       <div>
                          <p className="text-white font-bold text-2xl drop-shadow-lg tracking-tight mb-1">Blok A-12, Purbalingga</p>
                          <p className="text-white/70 font-medium text-xs drop-shadow-md flex items-center gap-1.5"><Images size={16} /> Sentinel-2A L2A • Multi-band Analysis</p>
                       </div>
                       <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10 flex gap-6 shadow-2xl">
                          <div className="text-center">
                             <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Avg NDVI</p>
                             <p className="text-white font-bold text-xl tracking-tight">0.68</p>
                          </div>
                          <div className="w-px bg-white/10"></div>
                          <div className="text-center">
                             <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Fase</p>
                             <p className="text-[#14b850] font-bold text-xl tracking-tight">Vegetatif</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:w-1/3 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full flex flex-col">
                 <h3 className="text-base font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Health Metrics & AI Insights</h3>
                 
                 <div className="space-y-8 flex-1">
                    <div className="group">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-[#1B4D1B] transition-colors"><Leaf size={16} weight="duotone" className="text-[#14b850]" /> Kerapatan Tajuk</span>
                          <span className="text-xs font-bold text-[#14b850] bg-[#14b850]/10 px-2 py-0.5 rounded border border-[#14b850]/20">Normal</span>
                       </div>
                       <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-[#14b850] to-[#20d863] w-[75%] rounded-full"></div>
                       </div>
                    </div>
                    
                    <div className="group">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-[#1B4D1B] transition-colors"><Thermometer size={16} weight="duotone" className="text-amber-500" /> Suhu Permukaan</span>
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Tinggi</span>
                       </div>
                       <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 w-[85%] rounded-full"></div>
                       </div>
                    </div>
                    
                    <div className="group">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-[#1B4D1B] transition-colors"><Drop size={16} weight="duotone" className="text-rose-500" /> Kelembapan Tanah</span>
                          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Kritis</span>
                       </div>
                       <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-rose-400 to-rose-500 w-[30%] rounded-full"></div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                       <Warning size={80} weight="fill" className="text-amber-500" />
                    </div>
                    <h4 className="text-xs font-bold text-amber-900 mb-3 flex items-center gap-2 relative z-10"><Warning size={16} weight="bold" /> Prediksi AI (14 Hari Kedepan)</h4>
                    <p className="text-[11px] text-amber-800 leading-relaxed font-medium relative z-10">
                       Deteksi penurunan nilai NDVI sebesar <strong className="text-amber-900">12%</strong> di kuadran barat. Pola spektral mengindikasikan awal mula kekeringan ringan. Direkomendasikan irigasi suplesi dalam 3 hari ke depan untuk mencegah penurunan hasil panen.
                    </p>
                 </div>
                 
                 <button className="w-full mt-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D1B] hover:border-[#1B4D1B]/30 hover:bg-slate-50 font-bold text-[10px] uppercase tracking-widest shadow-sm transition-all flex justify-center items-center gap-2">
                    <FileText size={16} weight="bold" />
                    Unduh Laporan Analisis
                 </button>
              </div>
           </div>
        </div>
      )}

      {isBroadcastOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[32px] p-10 relative shadow-2xl border border-slate-100">
              <button onClick={() => setIsBroadcastOpen(false)} className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                 <X size={20} weight="bold" />
              </button>
              <div className="text-center mt-4">
                 <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-8 shadow-inner border border-rose-100 relative">
                    <div className="absolute inset-0 rounded-full border border-rose-500 animate-ping opacity-20"></div>
                    <Warning size={48} weight="duotone" />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Darurat Pangan</h2>
                 <p className="text-sm font-medium text-slate-500 mb-10 leading-relaxed px-4">Mengirim peringatan prioritas tinggi ke <strong className="text-slate-900">12.4k node</strong> petani dan logistik di wilayah terdampak.</p>
                 <button onClick={() => setIsBroadcastOpen(false)} className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors flex justify-center items-center gap-2">
                   <BellRinging size={18} weight="fill" />
                   Kirim Peringatan
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
