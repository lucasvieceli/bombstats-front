import HouseSkeleton from "@/components/House/Skeleton";
import Skeleton from "@/components/Skeleton";

function HousesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-[70px]" fontSize={22} />
      <div className="flex flex-row gap-4 flex-1 flex-wrap">
        <HouseSkeleton />
        <HouseSkeleton />
      </div>
    </div>
  );
}

export default HousesSkeleton;
