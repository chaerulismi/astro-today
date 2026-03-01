"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Coordinates } from "@/lib/types";

interface LocationState {
  coords: Coordinates | null;
  error: string | null;
  loading: boolean;
  setManualCoords: (coords: Coordinates) => void;
}

const LocationContext = createContext<LocationState>({
  coords: null,
  error: null,
  loading: true,
  setManualCoords: () => {},
});

export function useLocation() {
  return useContext(LocationContext);
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

  const setManualCoords = useCallback((c: Coordinates) => {
    setCoords(c);
    setError(null);
  }, []);

  return (
    <LocationContext.Provider value={{ coords, error, loading, setManualCoords }}>
      {children}
    </LocationContext.Provider>
  );
}
