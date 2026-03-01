# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

astro-today — Astronomy dashboard built with Next.js (App Router), TypeScript, TailwindCSS v4, React Query, and Leaflet.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

## Architecture

- **Next.js App Router** with `src/` directory
- All external API calls go through **Route Handlers** (`src/app/api/...`) to keep NASA API key server-side
- **React Query** manages client-side data fetching, caching, and polling
- **LocationProvider** context supplies browser geolocation to dependent features
- ISS map uses `next/dynamic` with `ssr: false` (Leaflet needs `window`)

## Environment Variables

Copy `.env.example` to `.env.local` and set:
- `NASA_API_KEY` — free key from https://api.nasa.gov (defaults to DEMO_KEY)
