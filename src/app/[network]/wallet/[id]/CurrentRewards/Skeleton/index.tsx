import { CardContent } from "@/components/Card";
import CardSkeleton, { CardTitleSkeleton } from "@/components/Card/Skeleton";
import CardStatsSkeleton from "@/components/CardStats/Skeleton";
import ProgressBarSkeleton from "@/components/ProgressBar/Skeleton";
import Skeleton from "@/components/Skeleton";

function CurrentMapSkeleton() {
  return (
    <div>
      <CardSkeleton>
        <CardTitleSkeleton className="w-[50px]"></CardTitleSkeleton>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-3">
            <CardStatsSkeleton />
            <CardStatsSkeleton />
            <CardStatsSkeleton />
            <CardStatsSkeleton />
            <CardStatsSkeleton />
          </div>

          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row justify-between w-full gap-3 text-16">
              <Skeleton className="w-[40px]" fontSize={16} />
              <Skeleton className="w-[70px]" fontSize={16} />
            </div>
            <ProgressBarSkeleton />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row justify-between w-full gap-3 text-16">
              <Skeleton className="w-[40px]" fontSize={16} />
              <Skeleton className="w-[70px]" fontSize={16} />
            </div>
            <ProgressBarSkeleton />
          </div>
        </CardContent>
      </CardSkeleton>
    </div>
  );
}

export default CurrentMapSkeleton;
