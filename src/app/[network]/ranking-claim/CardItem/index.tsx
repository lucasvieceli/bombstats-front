"use client";
import CardSmallStats from "@/components/CardSmallStats";
import Average from "@/components/icons/Average";
import RankingPosition from "@/components/icons/RankingPosition";
import LinkNetwork from "@/components/LinkNetwork";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { getNumberFormatOptions } from "@/util/number";

interface CardItemProps {
  data: {
    wallet: string;
    position: number;
    amount: number;
    average: number;
  };
}

function CardItem({ data }: CardItemProps) {
  const t = useTranslations("rankingClaim.cardItem");
  const f = useFormatter();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 items-center bg-secondary rounded-2xl">
      <RankingPosition position={data.position} width={24} />
      <LinkNetwork
        className="font-semibold text-16 cursor-pointer break-all text-center md:text-left"
        href={`/wallet/${data.wallet}`}
      >
        {data.wallet}
      </LinkNetwork>
      <div className="flex flex-row gap-6 items-center">
        <CardSmallStats
          title={t("amount")}
          value={f.number(data.amount, getNumberFormatOptions(2))}
          image={
            <div className="w-5 h-5">
              <Image src="/images/bomb.webp" fill alt={"Bcoin"} sizes="auto" />
            </div>
          }
        />
        <CardSmallStats
          title={t("averagePerDay")}
          value={f.number(data.average, getNumberFormatOptions(2))}
          image={<Average width={20} height={20} />}
        />
      </div>
    </div>
  );
}

export default CardItem;
