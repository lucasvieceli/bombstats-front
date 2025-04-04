import Skeleton from "@/components/Skeleton";

function HistoryItemSkeleton() {
  return (
    <div className="flex flex-row gap-4">
      <Skeleton className="w-[43px] h-[43px] shrink-0" />
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-1 justify-between">
          <Skeleton className="w-[40px]" fontSize={16} />
          <Skeleton className="w-[55px]" fontSize={12} />
        </div>
        <Skeleton className="w-[110px]" fontSize={12} />
      </div>
    </div>
  );
}

export default HistoryItemSkeleton;
