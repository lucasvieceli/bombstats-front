import CardSmallStatsSkeleton from "@/components/CardSmallStats/Skeleton";
import Skeleton from "@/components/Skeleton";

function CardItemSkeleton() {
  return (
    <div className="flex flex-row gap-4 p-4 items-center border border-skeleton rounded-2xl">
      <Skeleton className="w-6 h-6 !rounded-full" />
      <Skeleton className="w-[300px]" fontSize={16} />
      <div className="flex flex-row gap-6 items-center">
        <CardSmallStatsSkeleton />
        <CardSmallStatsSkeleton />
      </div>
    </div>
  );
}

export default CardItemSkeleton;
