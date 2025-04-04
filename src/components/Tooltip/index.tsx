import { PropsWithChildren } from "react";

interface TooltipProps {
  title: string;
}

export default function Tooltip({
  title,
  children,
}: PropsWithChildren<TooltipProps>) {
  return (
    <div className="group relative flex max-w-max flex-col items-center justify-center">
      {children}
      <div className="absolute z-30 left-1/2 top-5 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all group-hover:scale-100">
        <div className="flex max-w-xs flex-col items-center shadow-lg ">
          <div className="clip-bottom h-2 w-4 bg-gray"></div>
          <div className="rounded bg-gray p-2 text-center text-xs text-white">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
