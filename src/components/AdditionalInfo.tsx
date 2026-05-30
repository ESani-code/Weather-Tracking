import Card from "./Card";
// import { WeatherMap, WeatherDescriptionMap } from "../WeatherMap";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";

const AdditionalInfo = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
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
      childrenClassName="flex flex-col gap-8"
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
