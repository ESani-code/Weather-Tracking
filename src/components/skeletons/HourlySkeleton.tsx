import { Skeleton } from "@/components/ui/skeleton";
import Card from "../Card";

const HourlySkeleton = () => {
  return (
    <Card
      title="Hourly Forecast"
      childrenClassName="flex flex-row gap-4 overflow-x"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 items-center p-4 rounded-lg shadow"
        >
          <Skeleton className="w-10 h-7 " />
          <Skeleton className="w-6 h-6 " />
          <Skeleton className="w-10 h-6 " />
        </div>
      ))}
    </Card>
  );
};

export default HourlySkeleton;
