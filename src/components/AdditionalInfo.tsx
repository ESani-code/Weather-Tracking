import Card from "./Card";
// import { WeatherMap, WeatherDescriptionMap } from "../WeatherMap";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api";

const AdditionalInfo = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  const row = [{}];

  return (
    <Card
      title="Additional Weather Information"
      childrenClassName="flex flex-col gap-8"
    >
      <p>Additional info will be displayed here.</p>
    </Card>
  );
};

export default AdditionalInfo;
