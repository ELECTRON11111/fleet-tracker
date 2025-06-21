"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path
delete L.Icon.Default.prototype._getIconUrl;

// Fix Leaflet's default icon path for Next.js
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function TruckMap({ position, route }) {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "50vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Truck is here</Popup>
      </Marker>
      {route && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
}