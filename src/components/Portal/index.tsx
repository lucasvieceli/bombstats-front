"use client";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
  children: any;
}

const Portal: FC<IPortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? createPortal(<>{children}</>, document.body) : null;
};

export default Portal;
