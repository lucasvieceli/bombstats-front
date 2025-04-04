"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {}

function Button({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type="button"
      className={`bg-gray h-14 rounded-3xl flex items-center font-normal text-16 text-center px-6  justify-center ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
