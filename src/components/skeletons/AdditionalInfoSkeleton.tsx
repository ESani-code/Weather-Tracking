import Card from "../Card";
import { Skeleton } from "@/components/ui/skeleton";

const AdditionalInfoSkeleton = () => {
  return (
    <Card
      title="Additional Weather Information"
      childrenClassName="flex flex-col gap-8"
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
