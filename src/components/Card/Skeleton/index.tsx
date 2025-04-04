import Skeleton from "@/components/Skeleton";

function CardSkeleton({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`flex flex-col rounded-xl border-skeleton border animate-pulse gap-4 py-4 flex-1 ${props.className}`}
    >
      {children}
    </div>
  );
}

export function CardTitleSkeleton({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton fontSize={18} className={`mx-4 ${className}`} {...props}>
      {children}
    </Skeleton>
  );
}

export default CardSkeleton;
