import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { geoCoding } from "./api";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import CurrentWeather from "./components/CurrentWeather";
import AdditionalInfo from "./components/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import DailyForecastSkeleton from "./components/skeletons/DailyForecastSkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import { ErrorBoundary } from "react-error-boundary";
import Sidebar from "./components/Sidebar";

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
    <>
      <div className="flex flex-col gap-8 shadow-md">
        <Map coords={coords} onMapClick={onMapClick} />
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Location: </h1>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo coords={coords} />
        </Suspense>
        {/* <p>{JSON.stringify(data)}</p> */}
      </div>

      <ErrorBoundary fallback={<p>Error!!!!!</p>}>
        <Sidebar coords={coords} />
      </ErrorBoundary>
    </>
  );
}

export default App;
