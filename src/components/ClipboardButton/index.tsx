"use client";

import Clipboard from "@/components/icons/Clipboard";
import React, { SVGProps } from "react";

interface ClipboardButtonProps extends SVGProps<SVGSVGElement> {
  value: string | number;
}

function ClipboardButton({ value, ...props }: ClipboardButtonProps) {
  const copy = () => {
    navigator.clipboard.writeText(`${value}`);
  };

  return (
    <span className="cursor-pointer flex items-center" onClick={copy}>
      <Clipboard {...props}></Clipboard>
    </span>
  );
}

export default ClipboardButton;
