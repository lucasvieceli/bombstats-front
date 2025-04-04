import CardTotalsSkeleton from "@/components/CardTotals/Skeleton";
import HeaderSkeleton from "@/components/Header/Skeleton";
import Skeleton from "@/components/Skeleton";

async function HeroBestCostQuartz() {
  return (
    <main className="flex flex-col w-full gap-6">
      <HeaderSkeleton />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton fontSize={22} className="w-20"></Skeleton>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <CardTotalsSkeleton />
            <CardTotalsSkeleton />
            <CardTotalsSkeleton />
            <CardTotalsSkeleton />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton fontSize={22} className="w-20"></Skeleton>
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-20 !rounded-xl" />
            <Skeleton className="w-full h-20 !rounded-xl" />
            <Skeleton className="w-full h-20 !rounded-xl" />
            <Skeleton className="w-full h-20 !rounded-xl" />
            <Skeleton className="w-full h-20 !rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeroBestCostQuartz;
