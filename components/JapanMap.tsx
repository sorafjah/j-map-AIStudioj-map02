
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { GEOJSON_URL, PREFECTURE_TOURIST_DATA } from '../constants';
import { PrefectureData } from '../types';

interface JapanMapProps {
  onPrefectureClick: (data: PrefectureData) => void;
}

const JapanMap: React.FC<JapanMapProps> = ({ onPrefectureClick }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current, {
      center: [36.2, 138.25], // Approximate center of Japan
      zoom: 5.5,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 10,
    });

    mapRef.current = map;

    // Optional: Add a light background tile
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   opacity: 0.3
    // }).addTo(map);

    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(GEOJSON_URL);
        const data = await response.json();

        const style = (feature: any) => ({
          fillColor: '#a6ce39',
          weight: 1.5,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.8,
        });

        const highlightFeature = (e: L.LeafletMouseEvent) => {
          const layer = e.target;
          layer.setStyle({
            fillColor: '#c1e16c',
            fillOpacity: 1,
            weight: 3,
          });
          layer.bringToFront();
        };

        const resetHighlight = (e: L.LeafletMouseEvent) => {
          geoJsonLayer.resetStyle(e.target);
        };

        const onEachFeature = (feature: any, layer: L.Layer) => {
          // Some GeoJSONs use different property names for prefecture names
          const prefName = feature.properties.nam_ja || feature.properties.name || feature.properties.name_local;

          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: (e) => {
              if (prefName && PREFECTURE_TOURIST_DATA[prefName]) {
                onPrefectureClick(PREFECTURE_TOURIST_DATA[prefName]);
              } else {
                console.warn(`Data not found for: ${prefName}`);
              }
              // Zoom to fit on click
              map.fitBounds(e.target.getBounds(), { padding: [50, 50], maxZoom: 7 });
            },
          });
        };

        const geoJsonLayer = L.geoJSON(data, {
          style,
          onEachFeature,
        }).addTo(map);

      } catch (error) {
        console.error('Error loading GeoJSON:', error);
      }
    };

    fetchGeoJSON();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onPrefectureClick]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default JapanMap;
