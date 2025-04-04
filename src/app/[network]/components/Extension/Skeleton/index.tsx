import { CardContent } from "@/components/Card";
import CardSkeleton, { CardTitleSkeleton } from "@/components/Card/Skeleton";
import CardStatsSkeleton from "@/components/CardStats/Skeleton";
import Skeleton from "@/components/Skeleton";

function ExtensionSkeleton() {
  return (
    <CardSkeleton>
      <CardTitleSkeleton className="w-[80px]"></CardTitleSkeleton>
      <CardContent>
        <div className="flex flex-row gap-4">
          <Skeleton className="w-14 h-14 !rounded-full" />
          <CardStatsSkeleton />
          <CardStatsSkeleton />
        </div>
        <div>
          <Skeleton className="w-32" fontSize={16} />
          <Skeleton className="w-full" fontSize={12} />
        </div>
      </CardContent>
    </CardSkeleton>
  );
}

export default ExtensionSkeleton;
