import { getWeather } from "../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { WeatherDescriptionMap, WeatherMap } from "../WeatherMap";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
};

const CurrentWeather = ({ coords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone:
      data?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone, // Use the timezone from the weather data
  });

  const additionalInfoStyling = `text-4xl font-bold text-center text-nowrap 2xl:text-3xl`;

  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 justify-center"
    >
      <h2 className="text-5xl font-bold text-center md:pt-8 md:text-7xl">
        {Math.round(data?.current.temperature_2m ?? 90)}°C
      </h2>
      <p className="text-5xl text-center md:text-6xl">
        {WeatherMap(data?.current?.weather_code ?? 0)}
      </p>
      <p className="text-xl capitalize font-extrabold text-center">
        {WeatherDescriptionMap(data?.current?.weather_code ?? 0)}
      </p>
      <div className="flex flex-col gap-2 md:pt-2">
        <p className="text-xl font-semibold text-center">Local Time: </p>
        <h3 className="text-4xl font-bold text-center">
          {time.format(new Date())}
        </h3>
      </div>

      {/* Apparent Temperature, Humidity, Wind Speed */}

      <div className="w-full flex justify-center md:pt-9 pb-2">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap 2xl:text-sm">
            Feels Like:
          </p>
          <h3 className={additionalInfoStyling}>
            {Math.round(data?.current.apparent_temperature ?? 90)}°C
          </h3>
        </div>

        <div className="flex flex-col gap-2 items-center w-full">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap 2xl:text-sm">
            Humidity:
          </p>
          <h3 className={additionalInfoStyling}>
            {Math.round(data?.current.relative_humidity_2m ?? 90)}%
          </h3>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap 2xl:text-sm">
            Wind Speed:
          </p>
          <h3 className={additionalInfoStyling}>
            {Math.round(data?.current.wind_speed_10m ?? 90)} km/h
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
