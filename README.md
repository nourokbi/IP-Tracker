# IP Address Tracker

Look up any IP address or domain and see where it is on a map, along with its city, timezone and internet provider. Built with React and Leaflet.

**Live demo:** [ip-tracker-two-theta.vercel.app](https://ip-tracker-two-theta.vercel.app/)

It started as the Frontend Mentor "IP Address Tracker" challenge, and I added extra features on top.

## Features

- Search by IP address or domain, with input validation and an error state for anything else
- Detects your own IP and location on first load
- Map marker with a tooltip showing the location and IP
- Recent searches saved in `localStorage`, with keyboard navigation (arrow keys, Enter, Esc)
- Copy any field to the clipboard, or export the details as CSV
- Light and dark themes, and the map tiles switch with the theme. Your choice is remembered
- `?search=<ip-or-domain>` in the URL runs a lookup on load, so you can share results
- Loading and error states for every API call

## Tech stack

- React (Vite)
- Leaflet and react-leaflet
- IP Geolocation API by ipify
- lucide-react icons
- CSS variables for theming

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm run dev
```

### API key

The app uses the [ipify Geolocation API](https://geo.ipify.org/), which needs a free key. Put yours in a `.env` file:

```env
VITE_IPIFY_KEY=your_key_here
```

and read it in `src/App.jsx`:

```js
const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IPIFY_KEY}&`;
```

This is a frontend-only app, so the key still ends up in the browser bundle. To fully hide it, you'd route requests through a small backend or serverless function.

## Project structure

```
src/
  App.jsx                 State, validation, API calls, theme
  components/
    Search.jsx            Input, recent searches, keyboard navigation
    ViewLocation.jsx      Info card, copy and CSV export
    MyMap.jsx             Map, themed tiles, marker tooltip
```

## Map credits

Map data © OpenStreetMap contributors. Dark tiles © CARTO.
