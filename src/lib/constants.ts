export const ISS_POLL_INTERVAL = 5000;
export const SUN_MOON_STALE_TIME = 60 * 60 * 1000; // 1 hour
export const APOD_STALE_TIME = 60 * 60 * 1000;
export const NEO_STALE_TIME = 60 * 60 * 1000;
export const MARS_STALE_TIME = 60 * 60 * 1000;

export const DEFAULT_COORDS = { lat: 40.7128, lng: -74.006 }; // New York

export const MARS_ROVERS = ["curiosity", "perseverance"] as const;
export type MarsRover = (typeof MARS_ROVERS)[number];
