"use client";

import { Hero } from "@/application/entities/hero";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SeeWalletProps {
  data: Hero;
  target?: string;
}
function SeeWallet({ data, ...props }: SeeWalletProps) {
  const t = useTranslations("component.seeWallet");

  return (
    <Link
      href={`/${data.network?.toLowerCase()}/wallet/${data.wallet?.toLowerCase()}`}
      className="text-12 font-light mt-1 text-center md:text-left cursor-pointer"
      {...props}
    >
      {t("title")}
    </Link>
  );
}

export default SeeWallet;
