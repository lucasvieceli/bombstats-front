"use client";

import Portal from "@/components/Portal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

function NetworkSelect() {
  const [isOpen, setIsOpen] = useState<undefined | { x: number; y: number }>(
    undefined
  );
  const refRoot = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLDivElement>(null);
  const refItems = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  useOutsideClick([refButton, refItems], () => {
    setIsOpen(undefined);
  });

  const onClickRoot = () => {
    if (!refButton.current) return;

    setIsOpen((old) => {
      if (!refButton.current) return undefined;

      if (old) {
        return undefined;
      }
      return {
        x: refButton.current?.getBoundingClientRect().x,
        y:
          refButton.current.getBoundingClientRect().y +
          refButton.current.getBoundingClientRect().height +
          10,
      };
    });
  };

  const onClickItem = (path: string) => {
    const params = new URLSearchParams(searchParams);

    const pathSegments = pathname.split("/").slice(1);

    pathSegments[0] = path;

    const newPathname = `/${pathSegments.join("/")}?${params.toString()}`;

    router.push(newPathname);
  };

  return (
    <div ref={refRoot} className="relative">
      <div
        className="bg-secondary rounded-3xl overflow-hidden "
        onClick={onClickRoot}
        ref={refButton}
      >
        <div className="px-5 flex flex-row items-center h-14 gap-2.5 hover:bg-secondaryHover cursor-pointer">
          {pathname.split("/")?.[1].toUpperCase()}
          <motion.div
            initial={{ rotate: 0 }}
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 8.625L12 15.375L18.75 8.625"
                stroke="white"
                strokeWidth="1.125"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refItems}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                top: isOpen.y as unknown as number,
                left: isOpen.x as unknown as number,
              }}
              className="z-50 absolute "
            >
              <div className="bg-secondary  shadow-xl flex flex-col py-2 rounded-3xl overflow-hidden">
                <div
                  className="flex flex-row items-center px-4 py-3 hover:bg-secondaryHover cursor-pointer"
                  onClick={() => onClickItem("polygon")}
                >
                  POLYGON
                </div>

                <div
                  className="flex flex-row items-center px-4 py-3 hover:bg-secondaryHover cursor-pointer"
                  onClick={() => onClickItem("bsc")}
                >
                  BSC
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}

export default NetworkSelect;
