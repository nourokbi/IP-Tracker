import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../assets/icon-location.svg";

// Create custom marker icon with bright colors for dark mode
const createCustomIcon = (isDark) => {
  // Create an SVG string for a bright marker
  const brightMarkerSvg = `
    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.163 24.837 0 16 0z" 
            fill="#48bb78" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
      <circle cx="16" cy="16" r="6" fill="#ffffff"/>
    </svg>
  `;

  const svgUrl = isDark
    ? `data:image/svg+xml;base64,${btoa(brightMarkerSvg)}`
    : markerIcon;

  return L.icon({
    iconUrl: svgUrl,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
};

// Updating map zoom and location when changes happens
function MapUpdater({ lat, lng }) {
  // useMap hook to access the map instance
  const map = useMap();
  // Update the map view when the lat or lng changes
  useEffect(() => {
    if (lat && lng) {
      // Set the map view to the new location
      map.setView([lat, lng], 12);
    }
  }, [lat, lng, map]);
  return null;
}

function MyMap({ lat, lng, locationData, darkMode }) {
  // Default Location to render the Map
  const lt = lat || 30.0131;
  const lg = lng || 31.2089;
  const markerRef = useRef(null);

  // Light mode tile layer (default OpenStreetMap)
  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Dark mode tile layer (CartoDB Dark Matter)
  const darkTileUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  // Create marker icon based on theme
  const customIcon = createCustomIcon(darkMode);

  // Generate location text for tooltip
  const getLocationText = () => {
    if (locationData) {
      const { city, region, country } = locationData.location || {};
      return `${city || "Unknown"}, ${region || ""} ${country || ""}`.trim();
    }
    return "Default Location (Cairo, Egypt)";
  };

  return (
    // Basic Map Container
    <MapContainer
      center={[lt, lg]}
      zoom={12}
      doubleClickZoom={false}
      scrollWheelZoom={false}
    >
      {/* Map Updater to handle location changes */}
      <MapUpdater lat={lat} lng={lng} />

      {/* Tile Layer - switches based on dark mode */}
      <TileLayer
        url={darkMode ? darkTileUrl : lightTileUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker for the current location */}
      <Marker
        icon={customIcon}
        position={[lt, lg]}
        ref={markerRef}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openTooltip();
          },
        }}
      >
        <Tooltip permanent={false} direction="top" offset={[0, -40]}>
          <div style={{ textAlign: "center", fontWeight: "500" }}>
            <div>{getLocationText()}</div>
            {locationData?.ip && (
              <div
                style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}
              >
                IP: {locationData.ip}
              </div>
            )}
          </div>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
