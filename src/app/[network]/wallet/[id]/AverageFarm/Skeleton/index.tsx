import { CardContent } from "@/components/Card";
import CardSkeleton, { CardTitleSkeleton } from "@/components/Card/Skeleton";
import CardStatsSkeleton from "@/components/CardStats/Skeleton";
import Skeleton from "@/components/Skeleton";

function AverageFarmSkeleton() {
  return (
    <div>
      <CardSkeleton>
        <CardTitleSkeleton className="w-4/5"></CardTitleSkeleton>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[50px]" fontSize={16} />
            <div className="flex flex-row flex-wrap gap-3">
              <CardStatsSkeleton />
              <CardStatsSkeleton />
              <CardStatsSkeleton />
              <CardStatsSkeleton />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[50px]" fontSize={16} />
            <div className="flex flex-row flex-wrap gap-3">
              <CardStatsSkeleton />
              <CardStatsSkeleton />
              <CardStatsSkeleton />
              <CardStatsSkeleton />
            </div>
          </div>
        </CardContent>
      </CardSkeleton>
    </div>
  );
}

export default AverageFarmSkeleton;
