import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { getWeather } from "./api";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <>
      <h1 className="text-amber-950 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ab fugiat
        veniam incidunt.
      </h1>

      {JSON.stringify(data)}
    </>
  );
}

export default App;
