"use client";

import { getNumberFormatOptions } from "@/util/number";
import { TOKENS_IDS_MAP } from "@/util/reward";
import { useFormatter } from "next-intl";
import Image from "next/image";

interface SaleButtonProps {
  typeSale: "OPEN_SEA" | "MARKET";
  price: number;
  id: string;
  token?: string;
  typeNft: "house" | "hero";
}

const TYPES: Record<
  SaleButtonProps["typeSale"],
  { name: string; img: string }
> = {
  OPEN_SEA: {
    name: "Open Sea",
    img: "/images/opensea.webp",
  },
  MARKET: {
    name: "Market",
    img: "/images/market.webp",
  },
};

function SaleButton({ typeSale, price, token, id, typeNft }: SaleButtonProps) {
  const f = useFormatter();
  const button = TYPES[typeSale];
  if (!button) return null;

  function onClick() {
    if (typeSale === "OPEN_SEA") {
      const contract =
        typeNft == "hero"
          ? "0xd8a06936506379dbbe6e2d8ab1d8c96426320854"
          : "0x2d5f4ba3e4a2d991bd72edbf78f607c174636618";
      window.open(
        `https://opensea.io/assets/matic/${contract}/${id}`,
        "_blank"
      );
    } else {
      window.open(
        `https://market.bombcrypto.io/market/${
          typeNft == "hero" ? "bhero" : "bhouse"
        }/${id}`,
        "_blank"
      );
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row gap-2 border-blue p-1 px-2 border rounded-md items-center  hover:bg-secondaryHover"
    >
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
        <div className="flex flex-row gap-1 justify-between">
          <div
            className="font-medium line-clamp-1 text-14 break-all"
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
          {button.name}
        </div>
      </div>
    </button>
  );
}

export default SaleButton;
