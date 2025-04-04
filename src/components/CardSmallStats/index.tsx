import { ReactElement, ReactNode, cloneElement } from "react";

interface CardSmallStatsProps {
  title: string;
  value: string | number | ReactNode;
  image?: ReactElement;
}
function CardSmallStats({ title, image, value }: CardSmallStatsProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-12 text-white/60">{title}</div>
      <div className="flex flex-row gap-1 items-center">
        {image && (
          <div className="relative h-5 w-5">
            {cloneElement(image, {
              className: `${image.props.className} object-contain object-left`,
            })}
          </div>
        )}
        <div className="text-16 font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default CardSmallStats;
