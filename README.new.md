# IP Address Tracker

Interactive IP/Domain tracker built with React + Vite and Leaflet. Search any IP address or domain to view its geolocation, see details, and visualize it on a map. Supports dark/light themes with persistent preference, keyboard-friendly search, recent searches, and CSV export.

Live features include:

- Search by IP address or domain
- Auto-detect your IP and location on first load
- Map view with marker and hover tooltip (city/region/country + IP)
- Dark/Light map tiles that follow the app theme (persisted in `localStorage`)
- Theme-aware marker (brighter in dark mode for visibility)
- Recent searches with suggestions (persisted in `localStorage`)
- Keyboard navigation for suggestions (↑ ↓ Enter Esc)
- Copy-to-clipboard for all info fields
- Export visible info as CSV
- Responsive layout and robust error/loading states

## Tech Stack

- React (Vite)
- Leaflet + react-leaflet
- lucide-react (icons)
- CSS with variables, responsive breakpoints, and dark mode

## Getting Started

Prerequisites:

- Node.js 18+ recommended

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build and preview production:

```bash
npm run build
npm run preview
```

## API Key (IP Geolocation)

This project uses the IP Geolocation API by ipify. An API key is required.

- Sign up for a free key: https://geo.ipify.org/
- In the current code, the key is referenced directly in `src/App.jsx` via `API_URL`.
- To use your own key, replace the value of `API_URL` in `src/App.jsx`.

Optional (recommended): move the key to an environment variable using Vite’s `VITE_` convention and import it from `import.meta.env`. Example:

```js
// .env
VITE_IPIFY_KEY = YOUR_KEY;

// src/App.jsx
const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${
  import.meta.env.VITE_IPIFY_KEY
}&`;
```

## Usage Tips

- Type an IP or domain and press Enter or click the search button.
- Use suggestions with keyboard: Up/Down to navigate, Enter to choose, Esc to close.
- Clear input with the “X” button inside the field.
- Toggle theme using the sun/moon button; preference persists across reloads.
- Hover over the map marker to see a tooltip with location and IP.
- Click the CSV export button on the location card to download current details.
- The app accepts a URL param `?search=<value>` to auto-run a lookup on load.

## Map & Theme Details

- Light tiles: OpenStreetMap standard (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
- Dark tiles: CartoDB Dark Matter (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`)
- Marker is theme-aware for visibility in dark mode.

Attribution:

- © OpenStreetMap contributors
- © CARTO for basemap tiles

## Project Structure

```
IP-Tracker/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ App.jsx
│  ├─ App.css
│  ├─ main.jsx
│  ├─ components/
│  │  ├─ Search.jsx          # Input, suggestions, keyboard navigation
│  │  ├─ ViewLocation.jsx    # Info panel, copy, CSV export
│  │  └─ MyMap.jsx           # Map, theme tiles, marker tooltip
│  └─ assets/                # Icons, images
└─ public/
```

## Accessibility & UX

- High contrast theme toggle and theme-aware controls
- Clear focus/hover states and keyboard navigation for suggestions
- Error and loading states for API calls

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Notes

- This project is based on the Frontend Mentor “IP Address Tracker” challenge and extended with additional UX features.
- If you fork this project, remember to configure your own ipify API key.
