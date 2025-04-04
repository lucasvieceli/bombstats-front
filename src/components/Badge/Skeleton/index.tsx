function BadgeSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border border-skeleton animate-pulse rounded-md py-2 px-3 w-[70px] ${className}`}
    >
      <div className="w-full h-[12px] my-[3px] bg-skeleton rounded-md"></div>
    </div>
  );
}

export default BadgeSkeleton;
