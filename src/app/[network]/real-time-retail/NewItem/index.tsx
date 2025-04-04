"use client";

import { HTMLMotionProps, motion, MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    borderColor: ["rgba(140, 103, 246, 1)", "rgba(0, 0, 255, 0)"],
    transition: {
      x: { type: "spring", stiffness: 100 }, // Velocidade padrão do motion para x
      borderColor: { duration: 5, ease: "easeOut" }, // Duração de 5 segundos para borderColor
    },
  },
};

function NewItem({
  children,
  ...props
}: PropsWithChildren<HTMLMotionProps<"div">>) {
  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{ border: "2px solid rgba(140, 103, 246, 1)" }} // Define a borda inicial
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default NewItem;
