import CardTotalsSkeleton from "@/components/CardTotals/Skeleton";
import HeroSkeleton from "@/components/Hero/Skeleton";
import Skeleton from "@/components/Skeleton";

async function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="font-extrabold text-22">
          <Skeleton className="w-[60%]" fontSize={22} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <CardTotalsSkeleton />
          <CardTotalsSkeleton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {new Array(20).fill(null).map((_, index) => (
          <HeroSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default Loading;
