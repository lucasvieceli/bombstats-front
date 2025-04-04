import Skeleton from "@/components/Skeleton";

function CardSmallStatsSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="w-[50px]" fontSize={12} />
      <div className="flex flex-row gap-1 items-center">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-8" fontSize={16} />
      </div>
    </div>
  );
}

export default CardSmallStatsSkeleton;
