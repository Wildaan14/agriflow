"use client";

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

interface MapMarker {
  id: string | number;
  position: [number, number];
  title: string;
  content?: React.ReactNode;
  color?: string;
  status?: 'SURPLUS' | 'DEFICIT' | 'Kritis' | 'Tinggi' | 'Normal' | string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  className?: string;
  onMarkerClick?: (marker: MapMarker) => void;
}

// Map Event Handler Component
function MapEvents({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function LeafletMap({ center, zoom, markers = [], className = "h-full w-full", onMarkerClick }: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className={`${className} bg-slate-900 animate-pulse flex items-center justify-center text-white/20 uppercase text-[10px] tracking-widest`}>Initialising Map Intelligence...</div>;

  const createCustomIcon = (color: string, status: string) => {
    const isRed = status === 'DEFICIT' || status === 'Kritis';
    const isGreen = status === 'SURPLUS' || status === 'Normal';
    const isAmber = status === 'Tinggi';
    
    const baseColor = isRed ? '#ef4444' : isGreen ? '#14b850' : isAmber ? '#f59e0b' : color || '#14b850';
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${baseColor};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 15px ${baseColor}80;
          animation: pulse-ring 2s infinite;
        "></div>
        <style>
          @keyframes pulse-ring {
            0% { transform: scale(0.9); opacity: 1; }
            50% { transform: scale(1.4); opacity: 0.5; }
            100% { transform: scale(0.9); opacity: 1; }
          }
        </style>
      `,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  };

  return (
    <div className={`${className} relative overflow-hidden`}>
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="h-full w-full bg-[#0A0D14]"
        style={{ background: '#0A0D14' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapEvents center={center} zoom={zoom} />
        <ZoomControl position="bottomright" />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={createCustomIcon(marker.color || '#14b850', marker.status || '')}
            eventHandlers={{
              click: () => onMarkerClick?.(marker),
            }}
          >
            {marker.content && (
              <Popup className="premium-popup">
                <div className="p-2 min-w-[120px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target</p>
                  <p className="text-sm font-bold text-slate-900">{marker.title}</p>
                  {marker.content}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>

      {/* Glassmorphism Overlays can be added by parent */}
      <style jsx global>{`
        .premium-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .premium-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
