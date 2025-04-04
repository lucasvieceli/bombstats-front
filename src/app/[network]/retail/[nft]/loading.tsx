import HeaderSkeleton from "@/components/Header/Skeleton";
import Skeleton from "@/components/Skeleton";

function Loading() {
  return (
    <main className="flex flex-col w-full gap-6">
      <HeaderSkeleton />
      <div className="flex flex-col gap-6">
        <Skeleton fontSize={22} className="w-[100px]" />
      </div>
    </main>
  );
}

export default Loading;
