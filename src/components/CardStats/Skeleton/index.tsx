import Skeleton from "@/components/Skeleton";

function CardStatsSkeleton() {
  return (
    <div className="flex flex-col gap-1 px-3 py-2 border border-skeleton rounded-md">
      <Skeleton className="w-10" fontSize={12}></Skeleton>
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="w-5 h-5 !rounded-full" />
        <Skeleton className="w-7" fontSize={16} />
      </div>
    </div>
  );
}

export default CardStatsSkeleton;
