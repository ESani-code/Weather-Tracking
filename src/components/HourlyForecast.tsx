import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { WeatherMap } from "../WeatherMap";

const HourlyForecast = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <Card
      title="Hourly Forecast"
      childrenClassName="flex flex-row gap-4 overflow-x-scroll"
    >
      {data?.hourly.time.map((time, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 items-center p-4 rounded-lg shadow"
        >
          <span className="text-lg font-bold whitespace-nowrap">
            {new Date(time).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            })}
          </span>
          <span>{WeatherMap(data?.hourly.weather_code[index])}</span>
          <p>{Math.round(data?.hourly.temperature_2m[index])}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default HourlyForecast;
