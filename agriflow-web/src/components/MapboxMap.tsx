"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface MapboxMapProps {
  style?: string;
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMapLoad?: (map: mapboxgl.Map) => void;
}

export default function MapboxMap({
  style = "mapbox://styles/mapbox/light-v11",
  center = [118.0148634, -2.548926], // Indonesia center
  zoom = 4.5,
  className = "",
  onMapLoad,
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && style) {
      mapRef.current.setStyle(style);
      console.log("Mapbox: Style updated to", style);
    }
  }, [style]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style,
        center,
        zoom,
        attributionControl: false,
        logoPosition: "bottom-right",
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.addControl(new mapboxgl.ScaleControl(), "bottom-left");

      map.on("load", () => {
        console.log("Mapbox: Map loaded successfully");
        map.resize();
        if (onMapLoad) onMapLoad(map);
      });

      map.on("error", (e) => {
        console.error("Mapbox Error:", e);
      });

      mapRef.current = map;

      // Force a resize after a short delay to ensure the container has been measured
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.resize();
          console.log("Mapbox: Manual resize triggered");
        }
      }, 100);

    } catch (err) {
      console.error("Mapbox initialization failed:", err);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={`w-full h-full min-h-[300px] ${className}`} />;
}
