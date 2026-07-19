'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import 'ol/ol.css';

interface Vendor {
  id: number;
  name: string;
  company: string;
  latitude: number;
  longitude: number;
  address?: string;
  collectors?: number;
  rating?: number;
  active?: boolean;
}

interface VendorMapProps {
  vendors: Vendor[];
  onSelectVendor?: (vendor: Vendor) => void;
  activeVendor?: number;
  showClusters?: boolean;
}

export function VendorMap({ vendors, onSelectVendor, activeVendor, showClusters = false }: VendorMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Dynamic import of OpenLayers
        const {
          Map,
          View,
          Feature,
        } = await import('ol');
        const { Point } = await import('ol/geom');
        const { Tile, Vector } = await import('ol/layer');
        const { OSM, Vector: VectorSource } = await import('ol/source');
        const { fromLonLat, toLonLat } = await import('ol/proj');
        const { Style, Circle, Fill, Stroke, Text } = await import('ol/style');
        const { getVectorContext } = await import('ol/render');

        if (!mapContainerRef.current) return;

        // Create vector source with vendor markers
        const features = vendors.map((vendor) => {
          const feature = new Feature(new Point(fromLonLat([vendor.longitude, vendor.latitude])));
          feature.set('vendor', vendor);
          return feature;
        });

        const vectorSource = new VectorSource({ features });

        // Style function for markers
        const makeVendorStyle = (vendor: Vendor, isActive: boolean) => {
          const color = isActive ? '#10b981' : '#3b82f6'; // green active, blue inactive
          const radius = isActive ? 24 : 18;
          const initials = vendor.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

          return new Style({
            image: new Circle({
              radius: radius,
              fill: new Fill({ color: color }),
              stroke: new Stroke({ color: 'white', width: 2 }),
            }),
            text: new Text({
              text: initials,
              fill: new Fill({ color: 'white' }),
              font: 'bold 12px sans-serif',
              offsetY: -1,
            }),
          });
        };

        const vectorLayer = new Vector({
          source: vectorSource,
          style: (feature) => {
            const vendor = feature.get('vendor');
            return makeVendorStyle(vendor, vendor.id === activeVendor);
          },
        });

        // Create map
        const map = new Map({
          target: mapContainerRef.current,
          layers: [new Tile({ source: new OSM() }), vectorLayer],
          view: new View({
            center: fromLonLat([55.2708, 25.2048]), // Dubai center
            zoom: 11,
          }),
        });

        // Click to select vendor
        map.on('click', (evt) => {
          const features = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
          if (features) {
            const vendor = (features as any).get('vendor');
            onSelectVendor?.(vendor);
          }
        });

        // Hover interaction
        const pointerMove = (evt: any) => {
          const isHovering = map.hasFeatureAtPixel(evt.pixel, { hitTolerance: 5 });
          const target = map.getTarget();
          if (target && typeof target !== 'string') {
            (target as HTMLElement).style.cursor = isHovering ? 'pointer' : '';
          }
        };
        map.on('pointermove', pointerMove);

        // Animate to active vendor
        if (activeVendor && mapContainerRef.current) {
          const activeVendorData = vendors.find((v) => v.id === activeVendor);
          if (activeVendorData) {
            const view = map.getView();
            view.animate({
              center: fromLonLat([activeVendorData.longitude, activeVendorData.latitude]),
              zoom: 13,
              duration: 800,
            });
          }
        }

        setMapLoaded(true);

        return () => {
          map.dispose();
        };
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, [vendors, activeVendor, onSelectVendor]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-emerald-500/30"
    >
      <div ref={mapContainerRef} className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4" />
            <p className="text-emerald-400 font-semibold">Loading vendor locations...</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-emerald-500/30">
        <h3 className="text-white font-semibold mb-3">Legend</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border border-white" />
            <span className="text-white/70">Inactive Vendors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border border-white" />
            <span className="text-white/70">Active Vendors</span>
          </div>
        </div>
      </div>

      {/* Vendor Count Badge */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-500/30">
        <p className="text-white font-semibold">{vendors.length} Vendors</p>
      </div>
    </motion.div>
  );
}
