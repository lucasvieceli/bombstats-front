"use client";
import CardSmallStats from "@/components/CardSmallStats";
import RankingPosition from "@/components/icons/RankingPosition";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { getNumberFormatOptions } from "@/util/number";

interface CardItemProps {
  data: {
    wallet: string;
    position: number;
    stake: number;
    stakeSen: number;
  };
}

function CardItem({ data }: CardItemProps) {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("rankingGlobalStakeWallet.cardItem");
  const f = useFormatter();

  function onClick() {
    router.push(`/${params.network}/wallet/${data.wallet}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 items-center bg-secondary rounded-2xl">
      <RankingPosition position={data.position} width={24} />
      <h3
        className="font-semibold text-16 cursor-pointer break-all text-center md:text-left"
        onClick={onClick}
      >
        {data.wallet}
      </h3>
      <div className="flex flex-row gap-6 items-center">
        <CardSmallStats
          title={t("stakeBcoin")}
          value={f.number(data.stake, getNumberFormatOptions(0))}
          image={
            <Image src="/images/bomb.webp" fill alt={"Bcoin"} sizes="auto" />
          }
        />
        <CardSmallStats
          title={t("stakeSens")}
          value={f.number(data.stakeSen, getNumberFormatOptions(0))}
          image={
            <Image src="/images/sen.webp" fill alt={"Sens"} sizes="auto" />
          }
        />
      </div>
    </div>
  );
}

export default CardItem;
