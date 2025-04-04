"use client";

import { motion } from "framer-motion";
import { HTMLAttributes, useEffect, useState } from "react";

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface CheckboxProps extends Omit<HTMLAttributes<"div">, "onChange"> {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  id: string;
  disabled?: boolean;
}

export default function Checkbox({
  children,
  id,
  className,
  onChange,
  checked,
  disabled,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  function onClick(e: any) {
    if (disabled) return;

    setIsChecked((old) => !old);
    onChange?.(!isChecked);
    props.onClick?.(e);
  }

  return (
    <div
      className={`flex items-center ${className} cursor-pointer`}
      onClick={onClick}
    >
      <button className="relative flex items-center">
        <input
          type="checkbox"
          className="border-blue-gray-200 relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-all duration-500 checked:border-gray checked:bg-gray"
          onChange={onClick}
          id={id}
          checked={isChecked}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3.5"
            stroke="currentColor"
            className="h-3.5 w-3.5"
            initial={false}
            animate={isChecked ? "checked" : "unchecked"}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
              variants={tickVariants}
            />
          </motion.svg>
        </div>
      </button>
      {children}
    </div>
  );
}
