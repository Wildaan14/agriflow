"use client";

import React from 'react';
import { 
  ShieldCheck, 
  Warning, 
  MapTrifold, 
  ChartLineUp, 
  ArrowClockwise,
  SealWarning,
  FilePdf,
  CheckCircle,
  ArrowUpRight,
  CircleNotch
} from '@phosphor-icons/react';
import DashboardLayout from '@/components/DashboardLayout';
import InflationChart from '@/components/charts/InflationChart';

import { useQuery } from '@tanstack/react-query';
import { getAlerts, getNationalRisk, Alert } from '@/lib/api';

export default function GovDashboard() {
  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
    refetchInterval: 30000
  });

  const { data: riskData, isLoading: riskLoading } = useQuery({
    queryKey: ['nationalRisk'],
    queryFn: getNationalRisk,
    refetchInterval: 60000
  });

  const handleExport = () => {
    alert("Mengekspor laporan PDF... Harap tunggu sebentar.");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-10 max-w-7xl mx-auto space-y-12 selection:bg-[#14b850]/30 selection:text-white">
        {/* Top Header Special for Gov */}
        <div className="bg-[#14b850]/10 p-10 rounded-[48px] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-[0_0_50px_rgba(20,184,80,0.1)] border border-[#14b850]/20 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="gov-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14b850" strokeWidth="1"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#gov-grid)" />
             </svg>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#14b850]/20 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex items-center space-x-6 text-white relative z-10">
            <div className="w-16 h-16 bg-[#14b850] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(20,184,80,0.4)] transform group-hover:rotate-6 transition-transform duration-500">
               <span className="text-[#0A0D14] font-black text-3xl">G</span>
            </div>
            <div>
              <h1 className="font-black text-3xl md:text-4xl leading-none tracking-tight mb-2 text-white">National Food Security</h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#14b850] font-black">Department of Agriculture • Republic of Indonesia</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-white relative z-10">
             <div className="text-right">
                <div className="flex items-center justify-end space-x-2">
                   <div className="w-2 h-2 bg-[#14b850] rounded-full animate-pulse shadow-[0_0_15px_#14b850]"></div>
                   <p className="text-xs font-black uppercase tracking-wider text-[#14b850]">Early Warning Aktif</p>
                </div>
                <p className="text-[10px] text-white/60 font-bold">Terakhir Update: {riskData?.lastUpdate || 'Syncing...'}</p>
             </div>
             <button onClick={() => window.location.reload()} className="bg-white/[0.05] p-4 rounded-2xl hover:bg-white/[0.1] transition-all border border-white/[0.1] group/btn">
                <ArrowClockwise size={26} weight="bold" className={`text-[#14b850] group-hover/btn:rotate-180 transition-transform duration-700 ${(alertsLoading || riskLoading) ? 'animate-spin' : ''}`} />
             </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <RiskIndicator label="National Risk" status={riskData?.risk || "..."} color="text-amber-400" bgColor="bg-amber-400/20" borderColor="border-amber-400/30" icon={Warning} />
          <RiskIndicator label="Food Inflation" status={riskData?.inflation || "..."} color="text-rose-400" bgColor="bg-rose-400/20" borderColor="border-rose-400/30" icon={ChartLineUp} />
          <RiskIndicator label="Subsidy Realization" status={riskData?.subsidy || "..."} color="text-[#14b850]" bgColor="bg-[#14b850]/20" borderColor="border-[#14b850]/30" icon={ShieldCheck} />
          <RiskIndicator label="Grain Stocks" status={riskData?.stocks || "..."} color="text-sky-400" bgColor="bg-sky-400/20" borderColor="border-sky-400/30" icon={MapTrifold} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[40px] border border-white/[0.05]">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-white tracking-tight">Proyeksi Inflasi Komoditas Strategis</h2>
                  <div className="flex space-x-2">
                     <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase border border-[#14b850]/50 bg-[#14b850]/10 text-[#14b850] hover:bg-[#14b850]/20 transition-all">30 Hari</button>
                     <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase border border-transparent text-white/50 hover:bg-white/[0.05] hover:text-white transition-all">90 Hari</button>
                  </div>
               </div>
               <div className="h-[400px]">
                  <InflationChart />
               </div>
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[40px] border border-white/[0.05] group">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl font-black text-white tracking-tight">Subsidy Gap Analysis (Regional)</h2>
                 <ArrowUpRight size={28} className="text-white/20 group-hover:text-[#14b850] transition-all" />
              </div>
              <div className="grid gap-4">
                <SubsidyRow region="Jawa Timur" actual="102%" need="95%" status="Over-subsidi" />
                <SubsidyRow region="Jawa Tengah" actual="85%" need="98%" status="Under-subsidi" />
                <SubsidyRow region="Sulawesi Selatan" actual="90%" need="90%" status="Ideal" />
              </div>
            </div>
          </div>

          {/* Right Panel: Early Warning Feed */}
          <div className="space-y-10">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[40px] border border-white/[0.05]">
              <div className="flex items-center space-x-3 mb-8">
                <SealWarning size={32} className="text-rose-500" weight="fill" />
                <h2 className="text-xl font-black text-white tracking-tight">Early Warning</h2>
              </div>
              
              <div className="space-y-6">
                {alerts?.map((alert: Alert) => (
                  <AlertItem 
                    key={alert.id}
                    severity={alert.severity} 
                    title={alert.title} 
                    desc={alert.desc} 
                  />
                ))}
                {!alertsLoading && alerts?.length === 0 && (
                  <p className="text-center py-10 text-white/30 font-bold italic">No active warnings</p>
                )}
                {alertsLoading && (
                  <div className="flex justify-center p-10 animate-pulse">
                     <CircleNotch size={32} className="animate-spin text-[#14b850]" />
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={handleExport}
              className="w-full bg-[#14b850] text-[#0A0D14] py-6 rounded-[32px] font-black text-lg shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:bg-[#14b850]/90 transition-all flex items-center justify-center space-x-3 btn-premium"
            >
              <FilePdf size={28} weight="fill" />
              <span>Export Laporan (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface RiskIndicatorProps {
  label: string;
  status: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ElementType;
}

function RiskIndicator({ label, status, color, bgColor, borderColor, icon: Icon }: RiskIndicatorProps) {
  return (
    <div className={`bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[40px] border border-white/[0.05] flex items-center space-x-6 shadow-sm hover:border-white/[0.2] transition-all cursor-default group transform hover:-translate-y-1 duration-500`}>
      <div className={`w-16 h-16 ${bgColor} ${borderColor} border rounded-2xl flex items-center justify-center ${color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
        <Icon size={32} weight="fill" />
      </div>
      <div>
        <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">{label}</p>
        <p className={`text-3xl font-black ${color} tracking-tight`}>{status}</p>
      </div>
    </div>
  );
}

interface SubsidyRowProps {
  region: string;
  actual: string;
  need: string;
  status: string;
}

function SubsidyRow({ region, actual, need, status }: SubsidyRowProps) {
  const isBad = status.includes('Under') || status.includes('Over');
  const badgeColors = isBad ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-[#14b850]/20 text-[#14b850] border border-[#14b850]/30';

  return (
    <div className="flex items-center justify-between p-6 bg-white/[0.01] rounded-3xl border border-white/[0.05] hover:border-[#14b850]/50 hover:bg-white/[0.05] transition-all group cursor-pointer shadow-sm">
      <div className="w-1/3">
        <p className="font-black text-white text-lg group-hover:text-[#14b850] transition-colors">{region}</p>
      </div>
      <div className="flex-1 flex space-x-12">
        <div>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-tighter mb-1">Realisasi</p>
          <p className="font-black text-white">{actual}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-tighter mb-1">Kebutuhan</p>
          <p className="font-black text-white">{need}</p>
        </div>
      </div>
      <div className={`px-5 py-2 rounded-full ${badgeColors} text-[10px] font-black uppercase tracking-wider`}>
        {status}
      </div>
    </div>
  );
}

interface AlertItemProps {
  severity: 'danger' | 'warning';
  title: string;
  desc: string;
}

function AlertItem({ severity, title, desc }: AlertItemProps) {
  const color = severity === 'danger' ? 'bg-rose-500' : 'bg-amber-500';
  const glowColor = severity === 'danger' ? 'shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'shadow-[0_0_15px_rgba(245,158,11,0.5)]';

  return (
    <div className={`p-6 rounded-[32px] border border-white/[0.05] relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] transition-all group cursor-pointer`}>
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${color} ${glowColor}`}></div>
      <div className="flex justify-between items-start mb-2 pl-4">
         <h4 className="font-black text-white tracking-tight">{title}</h4>
         <CheckCircle size={20} className="text-[#14b850] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-xs text-white/60 leading-relaxed pl-4">{desc}</p>
      <button className="mt-4 ml-4 text-[10px] font-black text-[#14b850] uppercase tracking-widest hover:underline">
         Tandai Ditangani
      </button>
    </div>
  );
}
