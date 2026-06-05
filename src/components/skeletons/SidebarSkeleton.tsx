import Card from "../Card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Slider } from "../ui/slider";
import type { Dispatch, SetStateAction } from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarSkeleton = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-md font-medium text-center">Air Pollution</h1>
          <Skeleton className="w-12 h-14" />
        </div>

        <h1 className="text-md font-medium text-center">
          <span>AQI </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <i className="bi bi-info-circle size-4" />
              </TooltipTrigger>
              <TooltipContent className="z-2000">
                <p className="max-w-xs">
                  European Air Quality Index (AQI) ranges from 0-20 (good),
                  20-40 (fair), 40-60 (moderate), 60-80 (poor), 80-100 (very
                  poor) and exceeds 100 for extremely poor conditions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>

        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <Card
              key={index}
              childrenClassName="flex flex-col gap-2"
              className="hover:scale-104 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0! "
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold capitalize">
                    {pollutantFullName[Object.keys(pollutantFullName)[index]]}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <i className="bi bi-info-circle size-4" />
                      </TooltipTrigger>
                      <TooltipContent className="z-2000">
                        {/* <Skeleton className="max-w-xs h-4" /> */}
                        <p className="max-w-xs">uuioi</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Skeleton className="w-16 h-7" />
              </div>
              <Slider min={0} max={100} value={[50]} disabled />
              <div className="flex justify-between text-sm">
                <p>0</p>
                <p>ppopp</p>
              </div>

              <div className="flex items-center justify-center">
                <Skeleton className="w-9 h-5 " />
              </div>

              {/* <div className="flex justify-center text-sm font-bold">ppopo</div> */}
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default SidebarSkeleton;

export const pollutantFullName: Record<string, string> = {
  pm10: "Pm10",
  carbon_monoxide: "Carbon Monoxide",
  pm2_5: "Pm2 5",
  nitrogen_dioxide: "Nitrogen Dioxide",
  sulphur_dioxide: "Sulphur Dioxide",
  ozone: "Ozone",
};
