"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface IBackdropProps extends HTMLMotionProps<"div"> {}
const variants = {
  closing: {
    opacity: 0,
  },
  hide: {
    display: "none",
    transition: {
      duration: 0.01,
      delay: 0.35,
    },
  },
  show: {
    opacity: 1,
    display: "flex",
  },
};

const Backdrop = ({
  children,
  className,
  ...props
}: PropsWithChildren<IBackdropProps>) => {
  return (
    <motion.div
      className={`fixed inset-0 bg-black/30 opacity-0 flex items-center justify-center ${className}`}
      animate="show"
      variants={variants}
      exit={["closing", "hide"]}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
