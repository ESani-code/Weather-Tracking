import Card from "./Card";
// import { WeatherMap, WeatherDescriptionMap } from "../WeatherMap";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
};

const AdditionalInfo = ({ coords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  const row = [
    {
      label: "Visibility",
      value: `${data?.daily.visibility_mean[0]} km`,
      icon: "bi bi-eye",
    },
    {
      label: "Surface Pressure",
      value: `${data?.daily.surface_pressure_mean[0]} hPa`,
      icon: "bi bi-bar-chart",
    },
    {
      label: "Dew Point",
      value: `${data?.daily.dew_point_2m_mean[0]}°C`,
      icon: "bi bi-droplet",
    },
    {
      label: "Sunrise",
      value: `${data?.daily.sunrise[0].slice(-5)}`,
      icon: "bi bi-sunrise",
    },
    {
      label: "Sunset",
      value: `${data?.daily.sunset[0].slice(-5)}`,
      icon: "bi bi-sunset",
    },
  ];

  return (
    <Card
      title="Additional Weather Information"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between"
    >
      {row.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span className="font-medium">
            {`${item.label}`} <i className={`${item.icon}`}> :</i>
          </span>
          <span>{item.value}</span>
        </div>
      ))}
    </Card>
  );
};

export default AdditionalInfo;
