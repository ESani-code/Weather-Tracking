import { useQuery } from "@tanstack/react-query";

import Card from "./components/Card";
import "./App.css";
import { getWeather } from "./api";
import DailyForecast from "./components/DailyForecast";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <div className="flex flex-col gap-8 shadow-md">
      <Card title="Current Weather">{JSON.stringify(data?.latitude)}</Card>
      <Card title="Hourly Forecast">{JSON.stringify(data?.longitude)}</Card>
      <DailyForecast />
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
}

export default App;
