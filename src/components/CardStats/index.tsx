import { ReactNode } from "react";

interface CardStatsProps {
  title: string;
  icon?: ReactNode;
  value: string | number;
  description?: string;
}
function CardStats({ title, icon, value, description }: CardStatsProps) {
  return (
    <div className="flex flex-col gap-1 px-3 py-2 bg-primary rounded-md shrink-0">
      <div className="text-12 text-[#D8C9C9]">{title}</div>
      <div className="flex flex-row items-center gap-2">
        {icon}
        <div className="text-16 font-semibold text-white">{value}</div>
        {description && (
          <div className="text-12 font-regular text-white/80">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardStats;
