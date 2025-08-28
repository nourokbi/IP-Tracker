/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../assets/icon-location.svg";

// Custom Marker Icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

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

function MyMap({ lat, lng }) {
  // Default Location to render the Map
  const lt = lat || 30.0131;
  const lg = lng || 31.2089;

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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Marker for the current location */}
      <Marker icon={customIcon} position={[lt, lg]}>
        <Popup>Default Location (Cairo, Egypt)</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
