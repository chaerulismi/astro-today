"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const issIcon = new L.Icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/32px-International_Space_Station.svg.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      map.setView([lat, lng], 3);
      initialRef.current = false;
    } else {
      map.panTo([lat, lng]);
    }
  }, [map, lat, lng]);

  return null;
}

interface IssMapProps {
  latitude: number;
  longitude: number;
}

export default function IssMap({ latitude, longitude }: IssMapProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={3}
      className="h-[300px] w-full rounded-xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater lat={latitude} lng={longitude} />
      <Marker position={[latitude, longitude]} icon={issIcon}>
        <Popup>
          ISS Position: {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
