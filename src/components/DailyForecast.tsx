import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { WeatherMap } from "../WeatherMap";
import "./styles/DailyForecast.css";

const DailyForecast = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data?.daily.time.map((time, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-lg shadow"
        >
          <span className="w-1">
            {new Date(time).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </span>
          <span>{WeatherMap(data?.daily.weather_code[index])}</span>
          <p>{Math.round(data?.current.temperature_2m)}°C</p>
          <p className="text-gray-500/75">
            {Math.round(data?.daily.temperature_2m_min[index])}°C
          </p>
          <p className="text-gray-500/75">
            {Math.round(data?.daily.temperature_2m_max[index])}°C
          </p>
        </div>
      ))}
    </Card>
  );
};

export default DailyForecast;
