import HeroStatsSkeleton from "@/components/Hero/HeroStats/Skeleton";
import Skeleton from "@/components/Skeleton";

function StatsSkeleton() {
  return (
    <div className="flex flex-col gap-2 items-center md:items-start">
      <Skeleton fontSize={18} className="w-24" />
      <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
        <HeroStatsSkeleton bordered />
        <HeroStatsSkeleton bordered />
        <HeroStatsSkeleton bordered />
        <HeroStatsSkeleton bordered />
        <HeroStatsSkeleton bordered />
      </div>
    </div>
  );
}

export default StatsSkeleton;
