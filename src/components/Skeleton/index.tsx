const TEXTS = {
  22: "h-[22px] my-[5.5px]",
  18: "h-[18px] my-[4.5px]",
  16: "h-[16px] my-[4px]",
  14: "h-[14px] my-[3.5px]",
  12: "h-[12px] my-[3px]",
};

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: keyof typeof TEXTS;
}

function Skeleton({ className, fontSize, ...props }: SkeletonProps) {
  const cssFont = fontSize && fontSize in TEXTS ? TEXTS[fontSize] : "";
  return (
    <div
      className={`animate-pulse rounded-md bg-skeleton ${cssFont} ${className}`}
      {...props}
    ></div>
  );
}

export default Skeleton;
