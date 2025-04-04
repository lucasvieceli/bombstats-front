import Skeleton from "@/components/Skeleton";

interface HeroStatsSkeletonProps {
  bordered?: boolean;
}
function HeroStatsSkeleton({ bordered }: HeroStatsSkeletonProps) {
  const styleContainer =
    bordered && `px-3 py-2 border border-skeleton rounded-md `;

  return (
    <div className={`flex flex-col gap-1 ${styleContainer}`}>
      <Skeleton className="w-[50px]" fontSize={12} />
      <div className="flex flex-row gap-1 items-center">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-8" fontSize={16} />
      </div>
    </div>
  );
}

export default HeroStatsSkeleton;
