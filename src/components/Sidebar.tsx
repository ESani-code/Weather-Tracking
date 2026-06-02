import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import type { Coords } from "../types";
import { airQuality } from "@/api";
import Card from "./Card";
import { Slider } from "./ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import clsx from "clsx";

type Props = {
  coords: Coords;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar(props: Props) {
  const { isSidebarOpen, setIsSidebarOpen } = props;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-90 py-4 px-3 shadow-md bg-sidebar z-1002 overflow-y-scroll transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button onClick={() => setIsSidebarOpen(false)}>
        <i className="bi bi-x text-4xl" />
      </button>
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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-md font-medium text-center">Air Pollution</h1>
      <h1 className="text-5xl font-bold text-center">
        {data?.current?.european_aqi}
      </h1>

      <h1 className="text-md font-medium text-center">
        <span>AQI </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <i className="bi bi-info-circle size-4" />
            </TooltipTrigger>
            <TooltipContent className="z-2000">
              <p className="max-w-xs">
                European Air Quality Index (AQI) ranges from 0-20 (good), 20-40
                (fair), 40-60 (moderate), 60-80 (poor), 80-100 (very poor) and
                exceeds 100 for extremely poor conditions.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h1>

      {Object.entries(data?.current).map(([key, entry]) => {
        if (key == "interval" || key == "time" || key == "european_aqi") {
          return null;
        }

        if (!POLLUTANT_MAPS[key]) {
          return null;
        }

        const numericEntry = Number(entry);
        // const config = POLLUTANT_MAPS[key];

        // 3. Use your helper function to get the actual status based on the measurement!
        const category = getPollutantCategory(key, numericEntry);

        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-2"
            className="hover:scale-104 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0! "
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <p className="text-lg font-semibold capitalize">
                  {key.split("_").join(" ")}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <i className="bi bi-info-circle size-4" />
                    </TooltipTrigger>
                    <TooltipContent className="z-2000">
                      <p className="max-w-xs">{pollutantFullName[key]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-lg font-semibold">{entry}</p>
            </div>
            <Slider
              min={0}
              max={POLLUTANT_MAPS[key].maxSliderValue}
              value={[Number(entry)]}
              disabled
            />
            <div className="flex justify-between text-sm">
              <p>0</p>
              <p>{POLLUTANT_MAPS[key].maxSliderValue}</p>
            </div>

            <div
              className="flex justify-center text-sm font-bold"
              style={{ color: category?.color }}
            >
              {category?.label ?? "Unknown"}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
export const pollutantFullName: Record<string, string> = {
  pm2_5: "Particulate Matter 2.5 (PM2.5)",
  pm10: "Particulate Matter 10 (PM10)",
  nitrogen_dioxide: "Nitrogen Dioxide (NO₂)",
  ozone: "Ozone (O₃)",
  sulphur_dioxide: "Sulphur Dioxide (SO₂)",
  european_aqi: "European Air Quality Index (AQI)",
  carbon_monoxide: "Carbon Monoxide (CO)",
};

export type PollutantCategory =
  | "Good"
  | "Fair"
  | "Moderate"
  | "Poor"
  | "Very poor"
  | "Extremely poor";

export interface ThresholdRange {
  label: PollutantCategory;
  min: number;
  max: number;
  color: string; // Tailored Hex/Tailwind colors matching the image
}

export interface PollutantConfig {
  displayName: string;
  unit: string;
  maxSliderValue: number; // The absolute maximum value for the slider scale
  ranges: ThresholdRange[];
}

export const POLLUTANT_MAPS: Record<string, PollutantConfig> = {
  pm2_5: {
    displayName: "PM2.5",
    unit: "μg/m³",
    maxSliderValue: 800,
    ranges: [
      { label: "Good", min: 0, max: 10, color: "#22d3ee" }, // Cyan
      { label: "Fair", min: 10, max: 20, color: "#34d399" }, // Green
      { label: "Moderate", min: 20, max: 25, color: "#facc15" }, // Yellow
      { label: "Poor", min: 25, max: 50, color: "#f87171" }, // Coral/Orange-Red
      { label: "Very poor", min: 50, max: 75, color: "#b91c1c" }, // Deep Red
      { label: "Extremely poor", min: 75, max: 800, color: "#7e22ce" }, // Purple
    ],
  },
  pm10: {
    displayName: "PM10",
    unit: "μg/m³",
    maxSliderValue: 1200,
    ranges: [
      { label: "Good", min: 0, max: 20, color: "#22d3ee" },
      { label: "Fair", min: 20, max: 40, color: "#34d399" },
      { label: "Moderate", min: 40, max: 50, color: "#facc15" },
      { label: "Poor", min: 50, max: 100, color: "#f87171" },
      { label: "Very poor", min: 100, max: 150, color: "#b91c1c" },
      { label: "Extremely poor", min: 150, max: 1200, color: "#7e22ce" },
    ],
  },
  nitrogen_dioxide: {
    displayName: "NO₂",
    unit: "μg/m³",
    maxSliderValue: 1000,
    ranges: [
      { label: "Good", min: 0, max: 40, color: "#22d3ee" },
      { label: "Fair", min: 40, max: 90, color: "#34d399" },
      { label: "Moderate", min: 90, max: 120, color: "#facc15" },
      { label: "Poor", min: 120, max: 230, color: "#f87171" },
      { label: "Very poor", min: 230, max: 340, color: "#b91c1c" },
      { label: "Extremely poor", min: 340, max: 1000, color: "#7e22ce" },
    ],
  },
  ozone: {
    displayName: "O₃",
    unit: "μg/m³",
    maxSliderValue: 800,
    ranges: [
      { label: "Good", min: 0, max: 50, color: "#22d3ee" },
      { label: "Fair", min: 50, max: 100, color: "#34d399" },
      { label: "Moderate", min: 100, max: 130, color: "#facc15" },
      { label: "Poor", min: 130, max: 240, color: "#f87171" },
      { label: "Very poor", min: 240, max: 380, color: "#b91c1c" },
      { label: "Extremely poor", min: 380, max: 800, color: "#7e22ce" },
    ],
  },
  sulphur_dioxide: {
    displayName: "SO₂",
    unit: "μg/m³",
    maxSliderValue: 1250,
    ranges: [
      { label: "Good", min: 0, max: 100, color: "#22d3ee" },
      { label: "Fair", min: 100, max: 200, color: "#34d399" },
      { label: "Moderate", min: 200, max: 350, color: "#facc15" },
      { label: "Poor", min: 350, max: 500, color: "#f87171" },
      { label: "Very poor", min: 500, max: 750, color: "#b91c1c" },
      { label: "Extremely poor", min: 750, max: 1250, color: "#7e22ce" },
    ],
  },
  european_aqi: {
    displayName: "European AQI",
    unit: "",
    maxSliderValue: 100, // Common default mapping max for index representations
    ranges: [
      { label: "Good", min: 0, max: 20, color: "#22d3ee" },
      { label: "Fair", min: 20, max: 40, color: "#34d399" },
      { label: "Moderate", min: 40, max: 50, color: "#facc15" },
      { label: "Poor", min: 50, max: 75, color: "#f87171" },
      { label: "Very poor", min: 75, max: 100, color: "#b91c1c" },
      { label: "Extremely poor", min: 100, max: 1000, color: "#7e22ce" },
    ],
  },
  carbon_monoxide: {
    displayName: "CO",
    unit: "μg/m³",
    maxSliderValue: 15000, // Carbon monoxide levels are typically significantly higher
    ranges: [
      { label: "Good", min: 0, max: 4000, color: "#22d3ee" },
      { label: "Fair", min: 4000, max: 7000, color: "#34d399" },
      { label: "Moderate", min: 7000, max: 10000, color: "#facc15" },
      { label: "Poor", min: 10000, max: 13000, color: "#f87171" },
      { label: "Very poor", min: 13000, max: 15000, color: "#b91c1c" },
      { label: "Extremely poor", min: 15000, max: 30000, color: "#7e22ce" },
    ],
  },
};

/**
 * Given a pollutant key (e.g. "pm2_5") and its value,
 * returns the corresponding range tier classification.
 */
export function getPollutantCategory(
  key: string,
  value: number,
): ThresholdRange | undefined {
  const config = POLLUTANT_MAPS[key];
  if (!config) return undefined;

  return (
    config.ranges.find((range) => value >= range.min && value <= range.max) ||
    config.ranges[config.ranges.length - 1]
  ); // Fallback to last category if exceeding
}
