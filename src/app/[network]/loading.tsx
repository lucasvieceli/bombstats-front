import ExtensionSkeleton from "@/app/[network]/components/Extension/Skeleton";
import TokensSkeleton from "@/app/[network]/components/Tokens/Skeleton";
import HeaderSkeleton from "@/components/Header/Skeleton";

async function Loading() {
  return (
    <main className="flex flex-col w-full gap-6">
      <HeaderSkeleton />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <TokensSkeleton />
          <TokensSkeleton />
          <ExtensionSkeleton />
        </div>
      </div>
    </main>
  );
}

export default Loading;
