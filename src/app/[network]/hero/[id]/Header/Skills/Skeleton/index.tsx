import Skeleton from "@/components/Skeleton";

function SkillsSkeleton() {
  return (
    <div className="flex flex-col gap-2  items-center md:items-start">
      <Skeleton fontSize={18} className="w-24" />
      <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </div>
    </div>
  );
}

export default SkillsSkeleton;
