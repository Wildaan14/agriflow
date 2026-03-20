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
      <div className="min-h-screen p-10 max-w-7xl mx-auto space-y-12">
        {/* Top Header Special for Gov */}
        <div className="bg-[#635BFF] p-10 rounded-[48px] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25)] relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="gov-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#gov-grid)" />
             </svg>
          </div>
          <div className="flex items-center space-x-6 text-white relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform duration-500">
               <span className="text-[#635BFF] font-black text-3xl">G</span>
            </div>
            <div>
              <h1 className="font-black text-3xl md:text-4xl leading-none tracking-tight mb-2">National Food Security</h1>
              <p className="text-[11px] uppercase tracking-[0.3em] opacity-80 font-black">Department of Agriculture • Republic of Indonesia</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-white relative z-10">
             <div className="text-right">
                <div className="flex items-center justify-end space-x-2">
                   <div className="w-2 h-2 bg-[#00D924] rounded-full animate-pulse shadow-[0_0_15px_#00D924]"></div>
                   <p className="text-xs font-black uppercase tracking-wider">Early Warning Aktif</p>
                </div>
                <p className="text-[10px] opacity-60 font-bold">Terakhir Update: {riskData?.lastUpdate || 'Syncing...'}</p>
             </div>
             <button onClick={() => window.location.reload()} className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10 group/btn">
                <ArrowClockwise size={26} weight="bold" className={`group-hover/btn:rotate-180 transition-transform duration-700 ${(alertsLoading || riskLoading) ? 'animate-spin' : ''}`} />
             </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <RiskIndicator label="National Risk" status={riskData?.risk || "..."} color="bg-[#facc15]" icon={Warning} />
          <RiskIndicator label="Food Inflation" status={riskData?.inflation || "..."} color="bg-[#be185d]" icon={ChartLineUp} />
          <RiskIndicator label="Subsidy Realization" status={riskData?.subsidy || "..."} color="bg-[#00D924]" icon={ShieldCheck} />
          <RiskIndicator label="Grain Stocks" status={riskData?.stocks || "..."} color="bg-[#635BFF]" icon={MapTrifold} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card-premium p-8">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-[#0a2540] tracking-tight">Proyeksi Inflasi Komoditas Strategis</h2>
                  <div className="flex space-x-2">
                     <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase border-2 border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/10 transition-all">30 Hari</button>
                     <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase border-2 border-transparent text-[#425466] hover:bg-white/50 transition-all">90 Hari</button>
                  </div>
               </div>
               <div className="h-[400px]">
                  <InflationChart />
               </div>
            </div>
            
            <div className="glass-card-premium p-10 group">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl font-black text-[#0a2540] tracking-tight">Subsidy Gap Analysis (Regional)</h2>
                 <ArrowUpRight size={28} className="text-[#425466] opacity-20 group-hover:opacity-100 group-hover:text-[#635BFF] transition-all" />
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
            <div className="glass-card-premium p-8">
              <div className="flex items-center space-x-3 mb-8">
                <SealWarning size={32} className="text-red-600" weight="fill" />
                <h2 className="text-xl font-black text-[#0a2540] tracking-tight">Early Warning</h2>
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
                  <p className="text-center py-10 text-stripe-slate font-bold opacity-30 italic">No active warnings</p>
                )}
                {alertsLoading && (
                  <div className="flex justify-center p-10 animate-pulse">
                     <CircleNotch size={32} className="animate-spin text-stripe-violet" />
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={handleExport}
              className="w-full bg-stripe-indigo text-white py-6 rounded-[32px] font-black text-lg shadow-2xl shadow-stripe-indigo/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 btn-premium"
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
  icon: React.ElementType;
}

function RiskIndicator({ label, status, color, icon: Icon }: RiskIndicatorProps) {
  return (
    <div className="glass-card p-8 rounded-[40px] border border-white/40 flex items-center space-x-6 shadow-xl shadow-primary/5 hover:shadow-2xl hover:border-[#635BFF]/20 transition-all cursor-default group transform hover:-translate-y-2 duration-500">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
        <Icon size={32} weight="fill" />
      </div>
      <div>
        <p className="text-[11px] font-black text-[#425466] uppercase tracking-[0.2em] mb-2 opacity-60">{label}</p>
        <p className={`text-3xl font-black ${color.replace('bg-', 'text-')} tracking-tight`}>{status}</p>
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
  return (
    <div className="flex items-center justify-between p-6 bg-white/40 rounded-3xl border border-white/20 hover:border-primary/40 hover:bg-white/60 transition-all group cursor-pointer shadow-sm">
      <div className="w-1/3">
        <p className="font-black text-text-primary text-lg group-hover:text-primary transition-colors">{region}</p>
      </div>
      <div className="flex-1 flex space-x-12">
        <div>
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-tighter opacity-60 mb-1">Realisasi</p>
          <p className="font-black text-text-primary">{actual}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-tighter opacity-60 mb-1">Kebutuhan</p>
          <p className="font-black text-text-primary">{need}</p>
        </div>
      </div>
      <div className={`px-5 py-2 rounded-full ${isBad ? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'} text-[10px] font-black uppercase tracking-wider`}>
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
  const color = severity === 'danger' ? 'bg-danger' : 'bg-warning';
  return (
    <div className={`p-6 rounded-[32px] border border-white/40 relative overflow-hidden bg-white/60 hover:bg-white/80 hover:shadow-lg transition-all group cursor-pointer`}>
      <div className={`absolute left-0 top-0 bottom-0 w-2.5 ${color}`}></div>
      <div className="flex justify-between items-start mb-2">
         <h4 className="font-black text-text-primary tracking-tight">{title}</h4>
         <CheckCircle size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-xs text-text-secondary leading-relaxed opacity-80">{desc}</p>
      <button className="mt-4 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
         Tandai Ditangani
      </button>
    </div>
  );
}
