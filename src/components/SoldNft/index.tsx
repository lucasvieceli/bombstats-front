"use client";

import { getNumberFormatOptions } from "@/util/number";
import { TOKENS_IDS_MAP } from "@/util/reward";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

interface SoldNftProps {
  price: number;
  token?: string;
  marketPlace: "opensea" | "market";
}

const TYPES: Record<
  SoldNftProps["marketPlace"],
  { name: string; img: string }
> = {
  opensea: {
    name: "Open Sea",
    img: "/images/opensea.webp",
  },
  market: {
    name: "Market",
    img: "/images/market.webp",
  },
};

function SoldNft({ price, token, marketPlace }: SoldNftProps) {
  const button = TYPES[marketPlace];
  const f = useFormatter();
  const t = useTranslations("component.soldNft");
  return (
    <div className="flex flex-row gap-2 border-blue p-1 px-2 border rounded-md items-center  shrink-0">
      <div className="flex items-center justify-center w-[24px] relative h-[24px] shrink-0 rounded-xs">
        <Image
          src={button.img}
          sizes="auto"
          fill
          className="object-contain"
          alt={button.name}
        />
      </div>
      <div className="flex flex-col w-full items-start">
        <div className="flex flex-row gap-1 justify-between  shrink-0">
          <div
            className="font-medium line-clamp-1 text-14 shrink-0 break-all"
            title={`${f.number(price, getNumberFormatOptions(2))} ${
              token &&
              TOKENS_IDS_MAP[token.toLowerCase() as keyof typeof TOKENS_IDS_MAP]
            }`}
          >
            {f.number(price, getNumberFormatOptions(2))}{" "}
            {token &&
              TOKENS_IDS_MAP[
                token.toLowerCase() as keyof typeof TOKENS_IDS_MAP
              ]}
          </div>
        </div>
        <div className="font-light text-white/80 text-12 flex-left text-nowrap">
          {t("title")} {button.name}
        </div>
      </div>
    </div>
  );
}

export default SoldNft;
