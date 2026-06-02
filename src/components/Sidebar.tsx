import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { Coords } from "../types";
import { airQuality } from "@/api";
import Card from "./Card";

type Props = {
  coords: Coords;
};

export default function Sidebar(props: Props) {
  return (
    <div className="fixed top-0 right-0 h-screen w-80 shadow-md bg-sidebar z-1002">
      <Suspense>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

// Secondary Component to render Sidebar Details.
function AirPollution({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coords],
    queryFn: () => airQuality(coords),
  });

  const airQualityArray = data?.hourly?.european_aqi?.slice(0, 24) ?? [];
  const airQualityAvg = airQualityArray.length
    ? airQualityArray.reduce<number>((sum, num) => sum + (num ?? 0), 0) /
      airQualityArray.length
    : 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        {airQualityAvg.toFixed(1) ?? "No Data"}
      </h1>
      {Object.entries(data?.hourly).map(([key, entry]) => {
        return (
          <Card key={key}>
            <p className="capitalize">{key.split("_").join(" ")}</p>
            <p>
              {typeof entry[0] === "string"
                ? entry[0]
                : (
                    entry
                      .slice(0, 24)
                      .reduce<number>(
                        (sum, num) => sum + (typeof num === "number" ? num : 0),
                        0,
                      ) / 24
                  ).toFixed(1)}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
