import { getIsBreakPoint } from "@/util/getConfigTailwind";
import { useEffect, useState } from "react";

export const useBreakpointTailwind = (breakpoint: string) => {
  const [isBreakpoint, setisBreakpoint] = useState(getIsBreakPoint(breakpoint));

  useEffect(() => {
    const resize_ob = new ResizeObserver(function (entries) {
      let rect = entries[0].contentRect;
      let width = rect.width;
      setisBreakpoint(getIsBreakPoint(breakpoint));
    });
    resize_ob.observe(document.body);

    return () => {
      resize_ob.disconnect();
    };
  }, [breakpoint]);

  return isBreakpoint;
};
