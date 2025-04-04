"use client";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
}

function ProgressBar({ value = 0 }: ProgressBarProps) {
  return (
    <div className="h-3 w-full bg-[#493A65] rounded-[20px]">
      <motion.div
        className="h-3 bg-blue rounded-[20px]"
        animate={{ width: value + "%" }}
        initial={{ width: 0 }}
      ></motion.div>
    </div>
  );
}

export default ProgressBar;
