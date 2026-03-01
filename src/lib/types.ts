export interface SunMoonData {
  sunrise: string;
  sunset: string;
  dawn: string;
  dusk: string;
  golden_hour: string;
  day_length: string;
  solar_noon: string;
  timezone: string;
}

export interface ApodData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  copyright?: string;
}

export interface IssPosition {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  timestamp: number;
}

export interface NeoObject {
  id: string;
  name: string;
  estimated_diameter_min: number;
  estimated_diameter_max: number;
  is_potentially_hazardous: boolean;
  close_approach_date: string;
  relative_velocity_kmh: string;
  miss_distance_km: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}
