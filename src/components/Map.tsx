import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { useEffect } from "react";
import type { Coords } from "../types";

//MapLibre GL + Leaflet Bridge Imports
// import L from "leaflet";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";

// Open-Meteo Imports & React-Leaflet Core API
import { omProtocol } from "@openmeteo/weather-map-layer";
// import { createLayerComponent } from "@react-leaflet/core";
// import { useEffect } from "react";

// import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

// Register the Open-Meteo protocol globally so MapLibre can read "om://" URLs
try {
  maplibregl.addProtocol("om", omProtocol);
} catch (e) {
  // Catch errors
}

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

// function OpenMeteoWeatherLayer() {
//   return();

// }
const mapTilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

// const OpenMeteoLayer = createLayerComponent<any, any>(
//   function create(props, context) {
//     // We can pass different variables like "temperature_2m" or "precipitation"
//     const { variable = "temperature_2m", opacity = 0.6 } = props;

//     // Using DWD ICON model for default weather map
//     const omUrl = `https://map-tiles.open-meteo.com/data_spatial/dwd_icon/latest.json?variable=${variable}`;

//     // Initialize MapLibre GL as a Leaflet layer
//     const instance = (L as any).maplibreGL({
//       style: {
//         version: 8,
//         sources: {
//           omFileSource: {
//             type: "raster",
//             url: "om://" + omUrl,
//             maxzoom: 12,
//           },
//         },
//         layers: [
//           {
//             id: "omFileLayer",
//             type: "raster",
//             source: "omFileSource",
//             paint: {
//               "raster-opacity": opacity,
//             },
//           },
//         ],
//       },
//     });

//     return { instance, context };
//   },
//   // function update(instance, props, prevProps) {
//   //   // If you plan to dynamically change opacity via props later,
//   //   // you would update the underlying Maplibre GL paint property here
//   // },
// );

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

        {/* Commented out the Buggy overlay in the component*/}
        {/* <LayersControl.Overlay name="Open-Meteo Weather Temperature Layer">
          <OpenMeteoLayer variable="temperature_2m" opacity={0.65} />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Open-Meteo Precipitation Layer">
          <OpenMeteoLayer variable="precipitation" opacity={0.65} />
        </LayersControl.Overlay> */}
      </LayersControl>

      {/* 
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
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

// function MapTileLayer() {
//   const map = useMap();

//   useEffect(() => {
//     const tileLayer = new MaptilerLayer({
//       style: "basic-dark",
//       apiKey: `${mapTilerApiKey}`,
//     });

//     tileLayer.addTo(map);
//     return () => {
//       map.removeLayer(tileLayer);
//     };
//   }, [map]);

//   return null;
// }

export default Map;
