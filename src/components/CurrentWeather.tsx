import { getWeather } from "../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";

const CurrentWeather = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return <Card title="Current Weather">{JSON.stringify(data?.current)}</Card>;
};

export default CurrentWeather;
