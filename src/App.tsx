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
import MobileHeader from "./components/MobileHeader";

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 9, lon: 8.6 });
  const [location, setLocation] = useState<string>("Berlin");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
      <MobileHeader setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-col gap-8 shadow-md w-full lg:w-[calc(100dvw-var(--sidebar-width))] p-4 ">
        <div className="flex gap-4">
          <h1 className="text-lg font-semibold md:text-2xl">Location: </h1>
          <LocationDropdown location={location} setLocation={setLocation} />
          <button
            className="ml-auto pr-3 max-sm:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <i className="bi bi-list text-4xl lg:hidden" />
          </button>
        </div>

        <div className="grid gap-5 grid-cols-1 2xl:flex-1 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 2xl:min-h-[1000px]">
          <div className="h-120 2xl:h-auto col-span-1 order-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 2xl:max-h-[80vh]">
            <Map coords={coords} onMapClick={onMapClick} />
          </div>
          <div className="col-span-1 order-2 md:col-span-1 2xl:row-span-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 md:col-span-1 2xl:row-span-2 2xl:order-5">
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-4 md:col-span-2 2xl:row-span-1">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 order-5 md:col-span-2 2xl:col-span-2 2xl:row-span-1">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>

      <ErrorBoundary fallback={<p>Error!!!!!</p>}>
        <Sidebar
          coords={coords}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </ErrorBoundary>
    </>
  );
}

export default App;
