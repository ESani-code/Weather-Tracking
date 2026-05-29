import { useQuery } from "@tanstack/react-query";

import Card from "./components/Card";
import "./App.css";
import { getWeather } from "./api";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <div className="flex flex-col gap-8 shadow-md">
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
}

export default App;
