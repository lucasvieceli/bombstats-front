import Skeleton from "@/components/Skeleton";

function HeaderSkeleton() {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col flex-1 items-start">
        <div className="hidden max-w-[526px] w-full flex-col md:flex">
          <Skeleton className=" !rounded-3xl h-14 w-[156px]" />
        </div>
        <Skeleton className="md:hidden h-14 w-14 !rounded-full" />
      </div>
      <div>
        <Skeleton className=" !rounded-3xl h-14 w-[156px]" />
      </div>
    </div>
  );
}

export default HeaderSkeleton;
