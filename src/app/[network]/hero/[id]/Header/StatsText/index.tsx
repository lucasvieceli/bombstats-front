import { PropsWithChildren } from "react";

interface StatsTextProps {
  title: string;
}
function StatsText({ title, children }: PropsWithChildren<StatsTextProps>) {
  return (
    <div className="flex flex-col gap-1 items-center md:items-start">
      <div className="font-bold text-white text-18">{title}</div>
      <div className="flex flex-row gap-3 flex-wrap font-light text-14 text-white/80 break-all text-center md:text-left">
        {children}
      </div>
    </div>
  );
}

export default StatsText;
