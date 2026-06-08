import Card from "../Card";
import { Skeleton } from "@/components/ui/skeleton";

const AdditionalInfoSkeleton = () => {
  return (
    <Card
      title="Additional Weather Information"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <Skeleton className="w-35 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
      ))}
    </Card>
  );
};
export default AdditionalInfoSkeleton;
