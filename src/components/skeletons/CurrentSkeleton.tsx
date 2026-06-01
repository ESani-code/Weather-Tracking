import { Skeleton } from "@/components/ui/skeleton";
import Card from "../Card";

const CurrentSkeleton = () => {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 justify-center"
    >
      <Skeleton className="w-40 h-12 rounded-full" />
      <Skeleton className="size-14 rounded-full" />
      <Skeleton className="w-30 h-4" />
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold text-center rounded-full">
          Local Time:{" "}
        </p>
        <Skeleton className="w-30 h-10 rounded-full" />
      </div>

      {/* Apparent Temperature, Humidity, Wind Speed */}

      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap">
            Feels Like:
          </p>
          <Skeleton className="w-25 h-10 rounded-full" />
        </div>

        <div className="flex flex-col gap-2 items-center w-full">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap">
            Humidity:
          </p>
          <Skeleton className="w-25 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap">
            Wind Speed:
          </p>
          <Skeleton className="w-25 h-10 rounded-full " />
        </div>
      </div>
    </Card>
  );
};

export default CurrentSkeleton;
