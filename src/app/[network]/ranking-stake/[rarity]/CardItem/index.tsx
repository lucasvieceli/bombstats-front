"use client";
import CardSmallStats from "@/components/CardSmallStats";
import RankingPosition from "@/components/icons/RankingPosition";
import { getNumberFormatOptions } from "@/util/number";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface CardItemProps {
  data: {
    wallet: string;
    position: number;
    amount: number;
    average: number;
  };
}

function CardItem({ data }: CardItemProps) {
  const t = useTranslations("rankingStakeHero.cardItem");
  const f = useFormatter();
  const params = useParams();
  const router = useRouter();

  function onClick() {
    router.push(`/${params.network}/wallet/${data.wallet}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 items-center bg-secondary rounded-2xl">
      <RankingPosition position={data?.position} width={24} />
      <div
        className="font-semibold text-16 cursor-pointer break-all text-center md:text-left"
        onClick={onClick}
      >
        {data.wallet}
      </div>
      <div className="flex flex-row gap-6 items-center">
        <CardSmallStats
          title={t("amount")}
          value={f.number(data?.amount, getNumberFormatOptions(0))}
          image={
            <div className="w-5 h-5">
              <Image src="/images/bomb.webp" fill alt={"Bcoin"} sizes="auto" />
            </div>
          }
        />
        <CardSmallStats
          title={t("averagePerDay")}
          value={f.number(data?.average, getNumberFormatOptions(2))}
          image={
            <div className="w-5 h-5">
              <Image src="/images/bomb.webp" fill alt={"Bcoin"} sizes="auto" />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default CardItem;
