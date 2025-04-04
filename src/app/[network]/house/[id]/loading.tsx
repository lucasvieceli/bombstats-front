import SkillsSkeleton from "@/app/[network]/hero/[id]/Header/Skills/Skeleton";
import StatsSkeleton from "@/app/[network]/hero/[id]/Header/Stats/Skeleton";
import StatsTextSkeleton from "@/app/[network]/hero/[id]/Header/StatsText/Skeleton";
import BadgeSkeleton from "@/components/Badge/Skeleton";
import { CardContent } from "@/components/Card";
import CardSkeleton from "@/components/Card/Skeleton";
import CardTotalsSkeleton from "@/components/CardTotals/Skeleton";
import Skeleton from "@/components/Skeleton";
import StakeHistorySkeleton from "@/components/StakeHistory/Skeleton";

export default async function HeroLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <CardSkeleton className="lg:min-h-[337px]">
          <CardContent>
            <div className="flex flex-col gap-8">
              <div className="flex flex-row gap-4">
                <Skeleton className="w-32" fontSize={22} />

                <div className="flex flex-row gap-2 items-center">
                  <BadgeSkeleton></BadgeSkeleton>
                </div>
              </div>
              <div className="flex flex-row gap-6">
                <div className="flex flex-col gap-4">
                  <Skeleton className="w-[180px] h-[144px]" />
                </div>
                <div className="flex flex-col gap-4">
                  <Skeleton className="w-32" fontSize={22} />
                  <SkillsSkeleton />
                  <StatsSkeleton />
                  <StatsTextSkeleton>
                    <Skeleton fontSize={14} className="w-2/3" />
                  </StatsTextSkeleton>
                </div>
              </div>
            </div>
          </CardContent>
        </CardSkeleton>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:max-w-[313px] w-full">
          <CardTotalsSkeleton />
          <CardTotalsSkeleton />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StakeHistorySkeleton />
      </div>
    </div>
  );
}
