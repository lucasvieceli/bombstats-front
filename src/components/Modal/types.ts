import { MotionProps } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

export interface IModalProps extends Partial<MotionProps> {
  onClose?: (e?: MouseEvent<HTMLDivElement>) => void;
  enableClose?: boolean;
  children: ReactNode;
  exit?: string;
  initial?: string;
  animate?: string;
  className?: string;
}
