"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react"; // Use a village-friendly icon
import { createRoot } from "react-dom/client";

const GoogleMapSection = ({ listing, coordinates }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [satelliteView, setSatelliteView] = useState(false);

  const center = coordinates
    ? [coordinates.lon, coordinates.lat]
    : [77.5340719, 23.8143419];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: satelliteView
        ? "https://api.maptiler.com/maps/hybrid/style.json?key=X8chXEtN8gGlWO2Km6HQ"
        : "https://api.maptiler.com/maps/streets-v2/style.json?key=X8chXEtN8gGlWO2Km6HQ",
      center,
      zoom: coordinates ? 10 : 5,
    });

    listing?.forEach((village) => {
      if (!village.latitude || !village.longitude) return;
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.cursor = "pointer";

      const root = createRoot(el);
      root.render(<MapPin size={30} color="#28a745" />);

      const popup = new maplibregl.Popup({
        offset: 0,
        closeButton: false,
        maxWidth: "none",
      }).setDOMContent(createPopupDOM(village));

      function createPopupDOM(village) {
        const container = document.createElement("div");
        container.className =
          "rounded-lg overflow-hidden shadow-lg text-gray-700 text-sm";
        container.style.width = "240px";
        container.style.background = "#ffffff";
        container.style.border = "1px solid #e5e7eb"; // subtle border
        container.style.padding = "12px";

        container.innerHTML = `
    <div class="space-y-2">
      <h2 style="font-size: 1rem; font-weight: 700; color: var(--primary); margin: 0;">
        ${village.gram_panchayat}
      </h2>
      <p style="font-size: 13px; color: #4b5563; margin: 0;">
        ${village.block_tehsil}, ${village.district}, ${village.state}
      </p>
      <div style="border-top: 1px solid #e5e7eb; margin: 8px 0;"></div>
      <p style="font-size: 13px; margin: 0;">
        <strong>Population:</strong> ${village.population_2011 || "N/A"}
      </p>
      <p style="font-size: 13px; margin: 0;">
        <strong>Nearby:</strong> ${village.nearest_town || "N/A"}
      </p>
    </div>
  `;

        return container;
      }

      new maplibregl.Marker(el)
        .setLngLat([
          parseFloat(village.longitude),
          parseFloat(village.latitude),
        ])
        .setPopup(popup)
        .addTo(mapRef.current);
    });
  }, [coordinates, satelliteView, listing]);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-5">
        <Switch
          id="view-toggle"
          checked={satelliteView}
          onCheckedChange={setSatelliteView}
        />
        <Label htmlFor="view-toggle" className="text-md text-muted-foreground">
          {satelliteView ? "Satellite View" : "Street View"}
        </Label>
      </div>
      <div
        ref={mapContainerRef}
        className="w-full h-[500px] rounded-xl overflow-hidden"
      />
    </div>
  );
};

export default GoogleMapSection;
