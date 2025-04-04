import { CardContent } from "@/components/Card";
import CardSkeleton, { CardTitleSkeleton } from "@/components/Card/Skeleton";
import HistoryItemSkeleton from "@/components/HistoryItem/Skeleton";

function RealTimeFarmSkeleton() {
  return (
    <div>
      <CardSkeleton>
        <CardTitleSkeleton className="w-[150px]"></CardTitleSkeleton>
        <CardContent className="!px-0">
          <div className="flex flex-col px-4 gap-4 max-h-[350px] overflow-auto">
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
            <HistoryItemSkeleton />
          </div>
        </CardContent>
      </CardSkeleton>
    </div>
  );
}

export default RealTimeFarmSkeleton;
