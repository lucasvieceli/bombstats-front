import HeroSkeleton from "@/components/Hero/Skeleton";
import Skeleton from "@/components/Skeleton";

function HeroesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-[70px]" fontSize={22} />
      <div className="flex flex-col gap-4 flex-1 ">
        <HeroSkeleton />
        <HeroSkeleton />
        <HeroSkeleton />
        <HeroSkeleton />
      </div>
    </div>
  );
}

export default HeroesSkeleton;
