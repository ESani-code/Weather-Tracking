import Card from "./Card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { WeatherMap } from "../WeatherMap";
import "./styles/DailyForecast.css";

const DailyForecast = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-4">
        {data?.daily.time.map((time, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg shadow"
          >
            <span>
              {time} <span>{WeatherMap(data?.daily.weather_code[index])}</span>
            </span>
            <span>{data?.daily.temperature_2m_max[index]}°C</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;
