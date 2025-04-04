import { CardContent } from "@/components/Card";
import CardSkeleton, { CardTitleSkeleton } from "@/components/Card/Skeleton";
import CardStatsSkeleton from "@/components/CardStats/Skeleton";

function TokensSkeleton() {
  return (
    <CardSkeleton>
      <CardTitleSkeleton className="w-[80px]"></CardTitleSkeleton>
      <CardContent>
        <div className="flex flex-row gap-3 flex-wrap">
          <CardStatsSkeleton />
          <CardStatsSkeleton />
          <CardStatsSkeleton />
        </div>
      </CardContent>
    </CardSkeleton>
  );
}

export default TokensSkeleton;
