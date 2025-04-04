import Skeleton from "@/components/Skeleton";
import { PropsWithChildren } from "react";

function StatsTextSkeleton({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-1 items-center md:items-start">
      <div className="font-bold text-white text-18">
        <Skeleton fontSize={18} className="w-24" />
      </div>
      <div className="flex flex-row gap-3 flex-wrap font-light text-14 text-white/80 break-all justify-center md:justify-start">
        {children}
      </div>
    </div>
  );
}

export default StatsTextSkeleton;
