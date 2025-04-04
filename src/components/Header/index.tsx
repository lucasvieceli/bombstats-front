"use client";

import Menu from "@/components/Header/Menu";
import NetworkSelect from "@/components/NetworkSelect";
import { PropsWithChildren } from "react";

interface HeaderProps {}

function Header({ children }: PropsWithChildren<HeaderProps>) {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-row flex-1 items-start gap-4">
        <Menu />
        {children}
      </div>
      <div>
        <NetworkSelect />
      </div>
    </div>
  );
}

export default Header;
