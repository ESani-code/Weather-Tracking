import Card from "../Card";
import { Skeleton } from "@/components/ui/skeleton";

const DailyForecastSkeleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-lg shadow"
        >
          <span className="w-1">
            <Skeleton className="w-8 h-6" />
          </span>
          <Skeleton className="w-8 h-6" />
          <Skeleton className="w-8 h-6" />

          <p className="text-gray-500/75">
            <Skeleton className="w-8 h-6" />
          </p>
          <p className="text-gray-500/75">
            <Skeleton className="w-8 h-6" />
          </p>
        </div>
      ))}
    </Card>
  );
};

export default DailyForecastSkeleton;
