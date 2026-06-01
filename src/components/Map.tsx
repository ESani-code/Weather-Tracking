import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

const Map = ({ coords, onMapClick }: Props) => {
  const { lat, lon } = coords;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "1000px", height: "500px" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />

      <LayersControl>
        <LayersControl.BaseLayer name="OpenStreetMap">
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

export default Map;
