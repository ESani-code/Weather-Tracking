import { useQuery } from "@tanstack/react-query";

import Card from "./components/Card";
import "./App.css";
import { getWeather } from "./api";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <div className="flex flex-col gap-8 shadow-md">
      <Card title="Yoooo">{JSON.stringify(data?.latitude)}</Card>
      <Card title="Heyyyyyyyyyy">{JSON.stringify(data?.longitude)}</Card>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
