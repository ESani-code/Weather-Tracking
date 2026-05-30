import { getWeather } from "../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { WeatherDescriptionMap, WeatherMap } from "../WeatherMap";

const CurrentWeather = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col item-center gap-3 justify-center"
    >
      <h2 className="text-5xl font-bold text-center">
        {Math.round(data?.current.temperature_2m ?? 90)}°C
      </h2>
      <p className="text-5xl text-center">
        {WeatherMap(data?.current?.weather_code ?? 0)}
      </p>
      <p className="text-xl capitalize font-extrabold text-center">
        {WeatherDescriptionMap(data?.current?.weather_code ?? 0)}
      </p>
    </Card>
  );
};

export default CurrentWeather;
