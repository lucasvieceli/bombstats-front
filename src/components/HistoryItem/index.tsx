import Timer from "@/components/Timer";
import { ReactNode } from "react";

interface HistoryItemProps {
  icon: ReactNode;
  iconImage?: boolean;
  title: string;
  description: React.ReactNode;
  time?: Date;
}

function HistoryItem({
  icon,
  title,
  description,
  time,
  iconImage = true,
}: HistoryItemProps) {
  return (
    <li className="flex flex-row gap-4">
      {iconImage ? (
        <div className="relative w-[43px] h-[43px] shrink-0">{icon}</div>
      ) : (
        <div className="flex items-center justify-center w-[43px] h-[43px] shrink-0 bg-white/5 rounded-xl">
          {icon}
        </div>
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-1 justify-between">
          <div
            className="font-medium line-clamp-1 text-16 break-all"
            title={title}
          >
            {title}
          </div>
          {time && (
            <div className="font-medium text-12 shrink-0">
              <Timer date={time} />
            </div>
          )}
        </div>
        <div className="font-light text-white/80 text-12">{description}</div>
      </div>
    </li>
  );
}

export default HistoryItem;
