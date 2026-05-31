import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { getWeather, geoCoding } from "./api";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import CurrentWeather from "./components/CurrentWeather";
import AdditionalInfo from "./components/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 9, lon: 8.6 });
  const [location, setLocation] = useState<string>("Berlin");

  const { data } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => geoCoding(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: data?.latitude ?? 0, lon: data?.longitude ?? 0 };

  return (
    <div className="flex flex-col gap-8 shadow-md">
      <LocationDropdown location={location} setLocation={setLocation} />
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
}

export default App;
