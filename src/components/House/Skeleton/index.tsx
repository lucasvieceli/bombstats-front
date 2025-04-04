import { CardContent } from "@/components/Card";
import CardSkeleton from "@/components/Card/Skeleton";
import Skeleton from "@/components/Skeleton";
import classNames from "classnames";

interface HouseSkeletonProps {
  className?: string;
}
function HouseSkeleton({ className }: HouseSkeletonProps) {
  return (
    <CardSkeleton className={classNames("!flex-none", className)}>
      <CardContent>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <Skeleton className="h-16 w-16 shrink-0" />
          <div className="flex flex-col">
            <div className="w-full flex items-center md:flex-start">
              <Skeleton className="w-[50px]" fontSize={16} />
            </div>
            <div className="text-12 flex flex-row items-center">
              <Skeleton className="w-12" fontSize={12} />
            </div>
          </div>
          <div className="flex flex-row gap-5 md:gap-1 md:justify-between">
            <div>
              <Skeleton className="w-9" fontSize={12} />
              <Skeleton className="w-7" fontSize={12} />
            </div>
            <div>
              <Skeleton className="w-9" fontSize={12} />
              <Skeleton className="w-7" fontSize={12} />
            </div>
            <div>
              <Skeleton className="w-9" fontSize={12} />
              <Skeleton className="w-7" fontSize={12} />
            </div>
          </div>
        </div>
      </CardContent>
    </CardSkeleton>
  );
}

export default HouseSkeleton;
