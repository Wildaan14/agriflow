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
      <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 selection:bg-[#14b850]/30 selection:text-white">
        {/* Top Header Special for Gov */}
        <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl border border-white/[0.05] relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="gov-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14b850" strokeWidth="1"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#gov-grid)" />
             </svg>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#14b850]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex items-center space-x-6 text-white relative z-10">
            <div className="w-16 h-16 bg-[#14b850] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(20,184,80,0.4)] transform group-hover:rotate-6 transition-transform duration-500">
               <span className="text-[#0A0D14] font-black text-3xl tracking-tighter">G</span>
            </div>
            <div>
              <h1 className="font-semibold text-3xl md:text-4xl leading-none tracking-tight mb-2 text-white">National Food <span className="text-[#14b850]">Security</span></h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#14b850] font-bold">Dept of Agriculture • Republic of Indonesia</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-white relative z-10">
             <div className="text-right hidden sm:block">
                <div className="flex items-center justify-end space-x-2 mb-1">
                   <div className="w-2 h-2 bg-[#14b850] rounded-full animate-pulse"></div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-[#14b850]">Early Warning Active</p>
                </div>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-tighter">Live Sync: {riskData?.lastUpdate || '---'}</p>
             </div>
             <button onClick={() => window.location.reload()} className="bg-white/[0.05] p-4 rounded-2xl hover:bg-white/[0.1] transition-all border border-white/[0.1] group/btn">
                <ArrowClockwise size={24} weight="bold" className={`text-[#14b850] group-hover/btn:rotate-180 transition-transform duration-700 ${(alertsLoading || riskLoading) ? 'animate-spin' : ''}`} />
             </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <RiskIndicator label="National Risk" status={riskData?.risk || "..."} color="text-[#f59e0b]" bgColor="bg-[#f59e0b]/10" borderColor="border-[#f59e0b]/20" icon={Warning} />
          <RiskIndicator label="Food Inflation" status={riskData?.inflation || "..."} color="text-[#f43f5e]" bgColor="bg-[#f43f5e]/10" borderColor="border-[#f43f5e]/20" icon={ChartLineUp} />
          <RiskIndicator label="Subsidy Realization" status={riskData?.subsidy || "..."} color="text-[#14b850]" bgColor="bg-[#14b850]/10" borderColor="border-[#14b850]/20" icon={ShieldCheck} />
          <RiskIndicator label="Grain Stocks" status={riskData?.stocks || "..."} color="text-[#0ea5e9]" bgColor="bg-[#0ea5e9]/10" borderColor="border-[#0ea5e9]/20" icon={MapTrifold} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05] shadow-xl">
               <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-semibold text-white tracking-tight">Proyeksi Inflasi Komoditas Strategis</h2>
                  <div className="flex bg-[#0A0D14] p-1 rounded-xl border border-white/[0.05]">
                     <button className="px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest bg-[#14b850] text-[#0A0D14] shadow-sm transition-all">30 Hari</button>
                     <button className="px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">90 Hari</button>
                  </div>
               </div>
               <div className="h-[400px]">
                  <InflationChart />
               </div>
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05] group shadow-xl">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-xl font-semibold text-white tracking-tight">Subsidy Gap Analysis (Regional)</h2>
                 <ArrowUpRight size={24} className="text-white/20 group-hover:text-[#14b850] transition-all" />
              </div>
              <div className="space-y-4">
                <SubsidyRow region="Jawa Timur" actual="102%" need="95%" status="Over-subsidi" />
                <SubsidyRow region="Jawa Tengah" actual="85%" need="98%" status="Under-subsidi" />
                <SubsidyRow region="Sulawesi Selatan" actual="90%" need="90%" status="Ideal" />
              </div>
            </div>
          </div>

          {/* Right Panel: Early Warning Feed */}
          <div className="space-y-10">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[32px] border border-white/[0.05] shadow-xl">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 bg-[#f43f5e]/10 border border-[#f43f5e]/20 rounded-xl flex items-center justify-center text-[#f43f5e] shadow-sm">
                   <SealWarning size={24} weight="fill" />
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Early Warning</h2>
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
                  <p className="text-center py-10 text-white/30 font-bold italic text-xs uppercase tracking-widest">No active warnings</p>
                )}
                {alertsLoading && (
                  <div className="flex justify-center p-10">
                     <CircleNotch size={32} className="animate-spin text-[#14b850] opacity-50" />
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={handleExport}
              className="w-full bg-[#14b850] text-[#0A0D14] py-5 rounded-[24px] font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(20,184,80,0.3)] hover:shadow-[0_0_30px_rgba(20,184,80,0.5)] transition-all flex items-center justify-center space-x-3 group"
            >
              <FilePdf size={24} weight="fill" className="group-hover:scale-110 transition-transform" />
              <span>Export Laporan Lanjut (PDF)</span>
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
    <div className={`bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[32px] border border-white/[0.05] flex items-center space-x-6 shadow-xl hover:border-white/[0.1] transition-all cursor-default group transform hover:-translate-y-1 duration-500`}>
      <div className={`w-14 h-14 ${bgColor} ${borderColor} border rounded-2xl flex items-center justify-center ${color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
        <Icon size={28} weight="fill" />
      </div>
      <div>
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">{label}</p>
        <p className={`text-2xl font-semibold ${color} tracking-tight`}>{status}</p>
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
  const badgeColors = isBad ? 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20' : 'bg-[#14b850]/10 text-[#14b850] border border-[#14b850]/20';

  return (
    <div className="flex items-center justify-between p-6 bg-[#0A0D14] rounded-2xl border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group cursor-pointer shadow-sm">
      <div className="w-1/3">
        <p className="font-semibold text-white text-lg group-hover:text-[#14b850] transition-colors">{region}</p>
      </div>
      <div className="flex-1 flex space-x-12">
        <div>
          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Realisasi</p>
          <p className="font-bold text-white">{actual}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Kebutuhan</p>
          <p className="font-bold text-white">{need}</p>
        </div>
      </div>
      <div className={`px-4 py-1.5 rounded-lg ${badgeColors} text-[9px] font-bold uppercase tracking-widest`}>
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
  const color = severity === 'danger' ? 'bg-[#f43f5e]' : 'bg-[#f59e0b]';
  const glowColor = severity === 'danger' ? 'shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'shadow-[0_0_15px_rgba(245,158,11,0.3)]';

  return (
    <div className={`p-6 rounded-2xl border border-white/[0.05] relative overflow-hidden bg-[#0A0D14] hover:bg-white/[0.02] hover:border-white/[0.15] transition-all group cursor-pointer`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${color} ${glowColor}`}></div>
      <div className="flex justify-between items-start mb-2 pl-4">
         <h4 className="font-semibold text-white tracking-tight text-sm group-hover:text-[#14b850] transition-colors">{title}</h4>
         <CheckCircle size={18} className="text-[#14b850] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[11px] text-white/40 leading-relaxed pl-4 font-light">{desc}</p>
      <button className="mt-4 ml-4 text-[9px] font-bold text-[#14b850] uppercase tracking-[0.2em] hover:underline opacity-60 hover:opacity-100 transition-all">
         Tandai Ditangani
      </button>
    </div>
  );
}
