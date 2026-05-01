'use client';

import React, { useEffect, useRef } from 'react';

interface Rider {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  location: string;
}

interface RiderMapProps {
  riders: Rider[];
  activeRider: number;
  onSelectRider: (idx: number) => void;
}

type OLView = {
  animate: (opts: { center: number[]; zoom: number; duration: number }) => void;
};
type OLFeature = {
  setId: (id: number) => void;
  getId: () => number;
  setStyle: (s: unknown) => void;
};
type OLSource = {
  getFeatures: () => OLFeature[];
};

// Cached OL style factory after first load
let olCache: {
  fromLonLat: (coord: number[]) => number[];
  makeStyle: (initials: string, isActive: boolean) => unknown;
} | null = null;

export const RiderMap = ({ riders, activeRider, onSelectRider }: RiderMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<OLView | null>(null);
  const sourceRef = useRef<OLSource | null>(null);

  // ── Init map once ─────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    let destroyed = false;
    let mapInstance: { setTarget: (t: undefined) => void } | null = null;

    const init = async () => {
      const ol = await import('ol');
      const TileLayer = (await import('ol/layer/Tile')).default;
      const OSM = (await import('ol/source/OSM')).default;
      const VectorLayer = (await import('ol/layer/Vector')).default;
      const VectorSource = (await import('ol/source/Vector')).default;
      const Feature = (await import('ol/Feature')).default;
      const Point = (await import('ol/geom/Point')).default;
      const { fromLonLat } = await import('ol/proj');
      const Style = (await import('ol/style/Style')).default;
      const CircleStyle = (await import('ol/style/Circle')).default;
      const Fill = (await import('ol/style/Fill')).default;
      const Stroke = (await import('ol/style/Stroke')).default;
      const Text = (await import('ol/style/Text')).default;
      const { defaults: defaultControls } = await import('ol/control');

      if (destroyed) return;

      const makeStyle = (initials: string, isActive: boolean) =>
        new Style({
          image: new CircleStyle({
            radius: isActive ? 22 : 18,
            fill: new Fill({ color: isActive ? '#16a34a' : '#60a5fa' }),
            stroke: new Stroke({ color: isActive ? '#15803d' : '#3b82f6', width: 2 }),
          }),
          text: new Text({
            text: initials,
            fill: new Fill({ color: '#fff' }),
            font: `bold ${isActive ? '13px' : '11px'} sans-serif`,
          }),
        });

      olCache = { fromLonLat, makeStyle };

      const features: OLFeature[] = riders.map((rider, idx) => {
        const initials = rider.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
        const f = new Feature({ geometry: new Point(fromLonLat([rider.longitude, rider.latitude])) });
        f.setId(idx);
        f.setStyle(makeStyle(initials, idx === activeRider));
        return f as unknown as OLFeature;
      });

      const vectorSource = new VectorSource({ features: features as any[] });
      sourceRef.current = vectorSource as unknown as OLSource;

      const view = new ol.View({
        center: fromLonLat([riders[activeRider].longitude, riders[activeRider].latitude]),
        zoom: 14,
      });
      viewRef.current = view as unknown as OLView;

      const map = new ol.Map({
        target: mapRef.current!,
        layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source: vectorSource })],
        view,
        controls: defaultControls({ attribution: false }),
      });
      mapInstance = map as unknown as { setTarget: (t: undefined) => void };

      map.on('click', (evt) => {
        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          const idx = (feature as unknown as OLFeature).getId();
          if (typeof idx === 'number') onSelectRider(idx);
        });
      });

      map.on('pointermove', (evt) => {
        const hit = map.hasFeatureAtPixel(evt.pixel);
        (map.getTargetElement() as HTMLElement).style.cursor = hit ? 'pointer' : '';
      });
    };

    init();

    return () => {
      destroyed = true;
      if (mapInstance) mapInstance.setTarget(undefined);
      viewRef.current = null;
      sourceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── On activeRider change: restyle markers + fly ───────────
  useEffect(() => {
    if (!viewRef.current || !sourceRef.current || !olCache) return;

    const { fromLonLat, makeStyle } = olCache;
    const features = sourceRef.current.getFeatures();

    features.forEach((f, idx) => {
      const rider = riders[idx];
      const initials = rider.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
      f.setStyle(makeStyle(initials, idx === activeRider));
    });

    viewRef.current.animate({
      center: fromLonLat([riders[activeRider].longitude, riders[activeRider].latitude]),
      zoom: 16,
      duration: 800,
    });
  }, [activeRider]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mapRef} className="w-full h-full" />;
};
