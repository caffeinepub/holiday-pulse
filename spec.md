# Holiday Pulse — Weather Conditions Feature

## Current State
Holiday Pulse is a travel packages website with sections for Andaman & Nicobar, Lakshadweep, and North-East India. The main page includes Hero, Flash Sale, Trip Finder, Stats Bar, Packages, Gallery, Flicker Book, Clients, Why Choose, and Contact sections. The Header has nav links for destinations, Plan My Trip, Flash Sale, Gallery, Reviews, and Contact.

## Requested Changes (Diff)

### Add
- **WeatherSection** component (`src/frontend/src/components/WeatherSection.tsx`):
  - Live weather cards for all 3 destinations using the Open-Meteo API (free, no API key, CORS-friendly)
  - Destinations and coordinates:
    - Andaman & Nicobar → Port Blair (lat: 11.6234, lon: 92.7265)
    - Lakshadweep → Kavaratti (lat: 10.5669, lon: 72.6420)
    - North-East India → Guwahati (lat: 26.1445, lon: 91.7362)
  - Each card displays:
    - City name and destination label
    - Live temperature (°C)
    - Weather condition text + animated emoji icon (mapped from WMO weather code)
    - Relative humidity (%)
    - Wind speed (km/h)
    - UV Index
    - Static "Best Time to Visit" badge (seasonal recommendation)
    - A travel tip based on the current weather code
  - Loading skeleton while fetching
  - Error fallback (show static seasonal data if API fails)
  - Section heading: "Live Weather at Your Destination"
  - Section id: `weather` for nav anchor
- **"🌤 Weather" nav link** in Header.tsx pointing to `#weather`
- WeatherSection placed in App.tsx between PackagesSection and GallerySection

### Modify
- `src/frontend/src/App.tsx` — import and render `<WeatherSection />` between PackagesSection and GallerySection; add `id="weather"` anchor
- `src/frontend/src/components/Header.tsx` — add `{ label: "🌤 Weather", href: "#weather", dest: null }` nav link

### Remove
- Nothing removed

## Implementation Plan
1. Create `WeatherSection.tsx` with:
   - `useEffect` fetching Open-Meteo API for all 3 destinations in parallel
   - WMO weather code → emoji + condition label mapping function
   - Static seasonal best-time-to-visit data per destination
   - Weather-code-based travel tips
   - Responsive 3-column card grid with loading skeletons
   - Refresh button to re-fetch live data
2. Update `App.tsx` to include `<WeatherSection />` between PackagesSection and GallerySection
3. Update `Header.tsx` to add the Weather nav link
