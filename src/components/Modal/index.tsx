"use client";
import { getIsBreakPoint } from "@/util/getConfigTailwind";
import { motion } from "framer-motion";
import { FC, memo, MouseEvent, useEffect } from "react";
import Backdrop from "../Backdrop";
import { variantsMd, variantsSm } from "./styles";
import { IModalProps } from "./types";

const Modal: FC<IModalProps> = ({
  onClose,
  children,
  enableClose = true,
  className,
  ...rest
}) => {
  const isMd = getIsBreakPoint("md");

  const handleClickBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (enableClose && onClose) {
      onClose(e);
    }
  };
  useEffect(() => {
    const html = document.getElementsByTagName("body")[0];
    if (html) {
      html.style.overflow = "hidden";
      if (window.innerWidth > 1024) {
        html.style.paddingRight = "8px";
      }
    }
  }, []);

  return (
    <motion.div
      className="modal   md:fixed
        md:w-screen
        md:h-screen
        md:z-[100]
        md:flex
        md:justify-center
        md:items-center
        md:top-0"
      layout
    >
      <Backdrop onClick={handleClickBackdrop} className="z-[100]" />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={isMd ? variantsMd : variantsSm}
        transition={{ duration: 0.3, ease: "linear" }}
        className={`bg-white
        fixed
        rounded-tl-lg
        rounded-tr-lg
        z-[100]
        max-h-modalSm
        max-w-modalSm
        flex
        w-modalSm
        h-full
        shadow-md
        bottom-0
      
        md:max-w-modal
        md:h-modal
        md:w-modal
        md:max-h-modal
        md:bottom-auto
        md:rounded-lg
        overflow-hidden ${className}`}
        {...rest}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default memo(Modal);
