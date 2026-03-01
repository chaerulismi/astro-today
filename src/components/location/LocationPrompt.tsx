"use client";

import { useState } from "react";
import { useLocation } from "./LocationProvider";

export function LocationPrompt() {
  const { error, loading, setManualCoords } = useLocation();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  if (loading || !error) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      setManualCoords({ lat: latNum, lng: lngNum });
    }
  };

  return (
    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
      <p className="mb-3 text-sm text-yellow-300">
        Location access denied. Enter coordinates manually:
      </p>
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div>
          <label className="mb-1 block text-xs text-white/60">Latitude</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="40.7128"
            className="w-28 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/60">Longitude</label>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="-74.006"
            className="w-28 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-yellow-500/20 px-4 py-1.5 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/30"
        >
          Set
        </button>
      </form>
    </div>
  );
}
