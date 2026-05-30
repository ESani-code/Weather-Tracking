import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { getWeather } from "./api";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import CurrentWeather from "./components/CurrentWeather";
import AdditionalInfo from "./components/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 9, lon: 8.6 });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  };

  return (
    <div className="flex flex-col gap-8 shadow-md">
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
