/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../assets/icon-location.svg";

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [32, 40], // adjust as needed
  iconAnchor: [16, 40], // adjust as needed
  popupAnchor: [0, -40], // adjust as needed
});

function MapUpdater({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 11);
    }
  }, [lat, lng, map]);
  return null;
}

function MyMap({ lat, lng }) {
  // const map = L.map("map").setView([lat, lng], 13);
  const lt = lat || 31.2341;
  const lg = lng || 29.9683; // default location (Cairo, Egypt)
  // if (!lat || !lng) {
  //   return <div id="map">Map will be displayed here after search</div>;
  // }
  return (
    <MapContainer
      center={[lt, lg]}
      zoom={11}
      doubleClickZoom={false}
      scrollWheelZoom={false}
    >
      <MapUpdater lat={lat} lng={lng} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={customIcon} position={[lt, lg]}>
        <Popup>Default Location (Cairo, Egypt)</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
