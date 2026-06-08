import { Skeleton } from "@/components/ui/skeleton";
import Card from "../Card";

const CurrentSkeleton = () => {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 justify-center"
    >
      <Skeleton className="w-40 h-12 rounded-full md:mt-8 md:h-18 md:w-24" />
      <Skeleton className="size-14 rounded-full md:size-15" />
      <Skeleton className="w-30 h-4" />
      <div className="flex flex-col gap-2 md:pt-2">
        <p className="text-xl font-semibold text-center">Local Time: </p>
        <Skeleton className="w-30 h-10 rounded-full" />
      </div>

      {/* Apparent Temperature, Humidity, Wind Speed */}

      <div className="w-full flex justify-between md:pt-9 pb-2">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap 2xl:text-sm">
            Feels Like:
          </p>
          <Skeleton className="w-25 h-10 rounded-full" />
        </div>

        <div className="flex flex-col gap-2 items-center w-full">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap 2xl:text-sm">
            Humidity:
          </p>
          <Skeleton className="w-25 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-md font-semibold text-center text-gray-500 text-nowrap 2xl:text-sm">
            Wind Speed:
          </p>
          <Skeleton className="w-25 h-10 rounded-full " />
        </div>
      </div>
    </Card>
  );
};

export default CurrentSkeleton;
