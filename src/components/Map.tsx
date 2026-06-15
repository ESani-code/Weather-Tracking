import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

//MapLibre GL + Leaflet Bridge Imports
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";

// Open-Meteo Imports & React-Leaflet Core API
import { omProtocol } from "@openmeteo/weather-map-layer";


// Register the Open-Meteo protocol globally so MapLibre can read "om://" URLs
try {
  maplibregl.addProtocol("om", omProtocol);
} catch (e) {
  // Catch errors
  console.log(e);
}

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

const mapTilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

const Map = ({ coords, onMapClick }: Props) => {
  const { lat, lon } = coords;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />

      <LayersControl>
        {/* <MapTileLayer /> */}
        <LayersControl.BaseLayer name="Online Map (Dark Mode)" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.maptiler.com/maps/basic-dark/256/{z}/{x}/{y}.png?key=${mapTilerApiKey}`}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Online Map (Light Mode)">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite (Esri)">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
}

export default Map;
