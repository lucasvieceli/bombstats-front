import { CardContent } from "@/components/Card";
import CardSkeleton from "@/components/Card/Skeleton";
import Skeleton from "@/components/Skeleton";

function CardTotalsSkeleton() {
  return (
    <CardSkeleton>
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <Skeleton className="w-16 h-16 shrink-0 !rounded-full" />
          <div className="flex flex-col w-full">
            <Skeleton className="w-1/3" fontSize={18} />
            <Skeleton className="w-1/2" fontSize={16} />
          </div>
        </div>
      </CardContent>
    </CardSkeleton>
  );
}

export default CardTotalsSkeleton;
