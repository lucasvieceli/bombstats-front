"use client";

import { House } from "@/application/entities/house";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

function SeeWallet({ data, target }: { data: House; target?: string }) {
  const params = useParams();
  const t = useTranslations("component.seeWallet");

  return (
    <Link
      href={`/${params.network}/wallet/${data.wallet?.toLowerCase()}`}
      target={target}
      className="text-12 font-light mt-1 text-center md:text-left cursor-pointer"
    >
      {t("title")}
    </Link>
  );
}

export default SeeWallet;
