import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { WeatherMap } from "../WeatherMap";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
};

const HourlyForecast = ({ coords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Hourly Forecast"
      childrenClassName="flex flex-row gap-4 overflow-x-scroll "
    >
      {data?.hourly.time.slice(0, 25).map((time, index) => (
        <div
          key={index}
          className="h-full flex flex-col 2xl:justify-between gap-2 items-center p-4 rounded-lg shadow 2xl:pt-6 2xl:p-3"
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
