import AverageFarmSkeleton from "@/app/[network]/wallet/[id]/AverageFarm/Skeleton";
import CurrentMapSkeleton from "@/app/[network]/wallet/[id]/CurrentMap/Skeleton";
import HeroesSkeleton from "@/app/[network]/wallet/[id]/Heroes/Skeleton";
import HousesSkeleton from "@/app/[network]/wallet/[id]/Houses/Skeleton";
import RealTimeFarmSkeleton from "@/app/[network]/wallet/[id]/RealTimeFarm/Skeleton";
import StakeHistorySkeleton from "@/components/StakeHistory/Skeleton";
import BadgeSkeleton from "@/components/Badge/Skeleton";
import { CardContent } from "@/components/Card";
import CardSkeleton from "@/components/Card/Skeleton";
import CardStatsSkeleton from "@/components/CardStats/Skeleton";
import CardTotalsSkeleton from "@/components/CardTotals/Skeleton";
import Skeleton from "@/components/Skeleton";

export default async function Home() {
  return (
    <main className="flex flex-col w-full gap-6">
      {/* <HeaderSkeleton /> */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <CardSkeleton>
            <CardContent>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4">
                  <div className="text-22 xl:text-30 text-white flex flex-1 font-bold">
                    <Skeleton className="h-[30px] w-32" />
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <Skeleton className="w-6 h-6 !rounded-full" />
                    <BadgeSkeleton></BadgeSkeleton>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Skeleton className="w-4/6 h-[22px] my-[5.5px]" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-16" fontSize={18} />
                    <div className="flex flex-row gap-3 flex-wrap">
                      <CardStatsSkeleton />
                      <CardStatsSkeleton />
                      <CardStatsSkeleton />
                      <CardStatsSkeleton />
                      <CardStatsSkeleton />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardSkeleton>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:max-w-[313px] w-full">
            <CardTotalsSkeleton />
            <CardTotalsSkeleton />
            <CardTotalsSkeleton />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StakeHistorySkeleton />
          <AverageFarmSkeleton />
          <CurrentMapSkeleton />
          <RealTimeFarmSkeleton />
        </div>
        <HousesSkeleton />
        <HeroesSkeleton />
      </div>
    </main>
  );
}
