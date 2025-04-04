import HeroStatsSkeleton from "@/components/Hero/HeroStats/Skeleton";
import Skeleton from "@/components/Skeleton";

function HeroSkeleton() {
  return (
    <div className="flex flex-row rounded-2xl flex-1 overflow-hidden border border-skeleton">
      <div className="flex flex-col md:flex-row items-center w-full gap-4 py-4 px-4">
        <Skeleton className="h-16 w-16" />
        <div className="flex flex-col justify-center">
          <Skeleton className="w-[115px]" fontSize={16} />
          <div className="flex flex-row  justify-center md:justify-start">
            <Skeleton className="w-[70px]" fontSize={12} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center ">
          <div className="flex flex-row gap-1.5 flex-wrap justify-center md:justify-start">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
            <HeroStatsSkeleton />
            <HeroStatsSkeleton />
            <HeroStatsSkeleton />
            <HeroStatsSkeleton />
            <HeroStatsSkeleton />
            <HeroStatsSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSkeleton;
