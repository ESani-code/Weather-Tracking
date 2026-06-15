# 🌤️ Weather Tracking App

A modern, responsive weather tracking web application built with React and TypeScript. It provides real-time weather data, air quality metrics, hourly and daily forecasts, and an interactive map — all powered by free, open-source APIs with no account required for core weather functionality.

---

## 🔗 Live Demo

> **[https://weather-tracking-demo.vercel.app/](https://weather-tracking-demo.vercel.app/)**

<!-- Add screenshots below once available -->
![Home Screen](./screenshots/home(Dark).png)

---
## 📖 How It Works

The application allows users to search for any city in the world and retrieve:

- **Current conditions** — temperature, humidity, wind speed/direction, precipitation, UV index, and apparent temperature
- **Hourly forecast** — a 24-hour rolling outlook including precipitation probability and weather codes
- **7-day daily forecast** — high/low temperatures, sunrise/sunset times, wind speed, dew point, surface pressure, and visibility
- **Air quality** — European AQI score alongside PM2.5, PM10, NO₂, SO₂, CO, and ozone readings
- **Interactive map** — powered by MapLibre GL and MapTiler with weather overlay layers using OpenMeteo's map layer library

### API Flow

1. The user types a location name into the search bar.
2. The app calls the **Open-Meteo Geocoding API** to resolve the city name into latitude/longitude coordinates.
3. With those coordinates, two parallel requests are fired:
   - The **Open-Meteo Forecast API** for weather data
   - The **Open-Meteo Air Quality API** for pollution metrics
4. All API responses are validated against **Zod schemas** before being consumed by the UI.
5. Data fetching and caching are managed by **TanStack React Query**, which handles loading/error states and prevents redundant network requests.
6. The interactive map uses a **MapTiler API key** to render base tiles and satellite layers.

> ⚡ The Open-Meteo weather and air quality APIs are **completely free** and require **no API key** for standard use. Only the MapTiler integration requires an API key.

---
## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 6](https://www.typescriptlang.org/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [React Bootstrap](https://react-bootstrap.netlify.app/) |
| Data Fetching | [TanStack React Query v5](https://tanstack.com/query/latest) |
| Schema Validation | [Zod v4](https://zod.dev/) |
| Mapping | [MapLibre GL](https://maplibre.org/), [React Leaflet](https://react-leaflet.js.org/), [MapTiler SDK](https://www.maptiler.com/maps/) |
| Icons | [Lucide React](https://lucide.dev/), [Bootstrap Icons](https://icons.getbootstrap.com/) |
| Fonts | [Geist Variable](https://vercel.com/font) |
| Weather APIs | [Open-Meteo](https://open-meteo.com/) (Forecast, Geocoding, Air Quality) |
| Map Tiles | [MapTiler](https://www.maptiler.com/) |

---
## 📦 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher (or your preferred package manager)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-tracking.git
cd weather-tracking
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
cp .env.example .env.local
```

Then fill in your API keys (see [Environment Variables](#-environment-variables) below).

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Open-Meteo Weather Map Layer API Key
# Used for rendering weather overlay tiles on the interactive map.
# Free tier available — obtain your key at:
# https://open-meteo.com/
VITE_API_KEY=your_open_meteo_api_key_here

# MapTiler API Key
# Used for rendering base map tiles and satellite layers via MapLibre GL.
# Free tier available (up to 100,000 map views/month) — obtain your key at:
# https://cloud.maptiler.com/account/keys/
VITE_MAPTILER_API_KEY=your_maptiler_api_key_here
```

> **Note:** All variables must be prefixed with `VITE_` to be exposed to the Vite client bundle. Never commit your `.env.local` file to version control — it is already included in `.gitignore` by default with Vite projects.

| Variable | Required | Where to Get It |
|---|---|---|
| `VITE_API_KEY` | Yes (for map weather layer) | [open-meteo.com](https://open-meteo.com/) |
| `VITE_MAPTILER_API_KEY` | Yes (for map tiles) | [cloud.maptiler.com/account/keys](https://cloud.maptiler.com/account/keys/) |

---
## 🧩 Weather Data Schemas

This project uses **[Zod](https://zod.dev/)** for runtime schema validation of all external API responses. Zod ensures that even if the API changes its response shape, the application will throw a clear, structured error rather than silently rendering incorrect data. All schemas live in `src/schema/weatherSchema.ts` and export both the Zod schema and the inferred TypeScript type.

### `WeatherSchema`

Validates the full response from the **Open-Meteo Forecast API**. It is structured into four logical sections:

- **`current_units`** — the unit strings for each current reading (e.g., `"°C"`, `"km/h"`, `"wmo code"`), allowing the UI to display the correct labels without hardcoding them.
- **`current`** — a single snapshot of current conditions: temperature, apparent temperature, humidity, wind speed and direction, precipitation, weather code, and a day/night flag (`is_day`).
- **`hourly_units` / `hourly`** — parallel unit and value arrays for a 168-hour (7-day) rolling outlook. Each index in the value arrays corresponds to the same index in the `time` array. Fields include temperature, humidity, precipitation probability, weather code, and wind speed.
- **`daily_units` / `daily`** — parallel unit and value arrays for 7 days of aggregated data, including daily high/low temperatures, apparent high/low, max UV index, total precipitation, max wind speed, mean visibility, mean surface pressure, mean dew point, and sunrise/sunset timestamps.

```ts
// Usage example
const data = WeatherSchema.parse(apiResponse);
// data is now fully typed as WeatherData
```

The exported TypeScript type `WeatherData` is derived directly from the schema via `z.infer<typeof WeatherSchema>`, keeping the type definition and runtime validation always in sync.

---
### `GeoCode`

Validates a single result from the **Open-Meteo Geocoding API**. The required fields are `id`, `name`, `latitude`, and `longitude`. All administrative boundary fields (`admin1` through `admin4` and their IDs) are marked **optional** because their presence varies significantly by country — for example, a city in the US will have a state and county, while a city in a smaller country may have none at all. This design prevents schema failures for valid geocoding responses that simply lack deeper administrative data.

```ts
const location = GeoCode.parse(apiResponse.results[0]);
// Safe to access location.latitude, location.longitude, etc.
```

---

### `AirQualitySchema`

Validates the response from the **Open-Meteo Air Quality API**. Like the weather schema, it uses a parallel `current_units` / `current` structure. The `current` block contains:

- `european_aqi` — the European Air Quality Index (0–500 scale)
- `pm2_5` — fine particulate matter (µg/m³)
- `pm10` — coarse particulate matter (µg/m³)
- `nitrogen_dioxide` — NO₂ concentration (µg/m³)
- `sulphur_dioxide` — SO₂ concentration (µg/m³)
- `carbon_monoxide` — CO concentration (µg/m³)
- `ozone` — O₃ concentration (µg/m³)

The exported `AirQualityData` type is used by the air quality display components to render colour-coded AQI indicators and individual pollutant readings.

---

### How Schemas Are Used in API Calls

Each of the three fetch functions in `src/api.ts` ends with a `.parse()` call against the appropriate schema. If the API returns an unexpected shape — a missing field, a wrong type, or a null where a number is expected — Zod throws a `ZodError` with a precise message identifying exactly which field failed and why. This error is caught and re-thrown, giving React Query a signal to display an error state.

```ts
// From api.ts
const data = await res.json();
return WeatherSchema.parse(data);  // Throws ZodError if shape is wrong
```

This pattern means TypeScript types downstream in the component tree are always trustworthy — if data reaches a component, it has already been validated.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](./LICENSE)
