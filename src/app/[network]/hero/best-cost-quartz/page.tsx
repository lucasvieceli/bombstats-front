import CardRarity from "@/app/[network]/hero/best-cost-quartz/Card";
import { WalletNetwork } from "@/application/entities/wallet";
import {
  getBestCostQuartz,
  IBestCostQuartz,
} from "@/application/use-cases/getBestCostQuartz";
import AdBanner from "@/components/AdsBanner";
import CardTotals from "@/components/CardTotals";
import Header from "@/components/Header";
import LinkNetwork from "@/components/LinkNetwork";
import { HERO_COLORS, HERO_RARITY_ARRAY } from "@/util/hero";
import { getNumberFormatOptions } from "@/util/number";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "bestCostQuartz" });
  return {
    title: `BombStats - ${t("title")}`,
    description: t("description"),
  };
}

const methods: any = {
  quartzBcoin: {
    name: "Quartz Bcoin",
    image: "/images/quartz.webp",
  },
  quartzSen: {
    name: "Quartz Sen",
    image: "/images/quartz.webp",
  },
  openSea: {
    name: "Open Sea",
    image: "/images/opensea.webp",
  },
  marketBcoin: {
    name: "Market Bcoin",
    image: "/images/market.webp",
  },
};

export default async function HeroBestCostQuartz({
  params: { network: networkProps },
  props,
}: any) {
  const t = await getTranslations("bestCostQuartz");
  const f = await getFormatter();
  const tRarity = await getTranslations("component.hero.rarity");

  let data: IBestCostQuartz;
  const network = networkProps.toUpperCase() as WalletNetwork;
  try {
    data = await getBestCostQuartz({
      network,
    });
  } catch (e) {
    console.log("error", e);

    return (
      <div className="text-22 font-extrabold text-center">
        {t("internalError")}
      </div>
    );
  }

  const iconMainToken =
    network === WalletNetwork.BSC ? "/images/bnb.webp" : "/images/matic.webp";
  const format = network === WalletNetwork.BSC ? 5 : 2;

  return (
    <main className="flex flex-col w-full gap-6">
      {/* <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div> */}
      <Header />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="text-22 font-extrabold">{t("theBest")}</div>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <CardTotals
              title={t("method")}
              value={methods[data.bestRarity.source].name}
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center relative">
                  <Image
                    src={methods[data.bestRarity.source].image}
                    width="32"
                    height="32"
                    sizes="32px"
                    className="object-contain object-center "
                    alt="market"
                  />
                </div>
              }
            />
            <CardTotals
              title={t("rarity")}
              value={tRarity(HERO_RARITY_ARRAY[data.bestRarity.rarityIndex])}
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center relative">
                  <div
                    className={`object-contain object-center w-8 h-8 rounded-full`}
                    style={{
                      background: HERO_COLORS[data.bestRarity.rarityIndex],
                    }}
                  />
                </div>
              }
            />
            <CardTotals
              title={t("pricePer5Quartz")}
              value={f.number(
                data.bestRarity.price,
                getNumberFormatOptions(format)
              )}
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center relative">
                  <Image
                    src={iconMainToken}
                    width="32"
                    height="32"
                    sizes="32px"
                    className="object-contain object-center "
                    alt="market"
                  />
                </div>
              }
            />
            <CardTotals
              title={t("heroId")}
              value={
                <LinkNetwork href={`/hero/${data.bestRarity.heroId}`}>
                  #{data.bestRarity.heroId}
                </LinkNetwork>
              }
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center relative">
                  <Image
                    src="/images/hero.webp"
                    width="32"
                    height="32"
                    sizes="32px"
                    className="object-contain object-center "
                    alt="market"
                  />
                </div>
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-22 font-extrabold">{t("rarityTitle")}</div>
          <div className="flex flex-col gap-4">
            {data.items.map((data) => (
              <CardRarity
                key={data.rarityIndex}
                data={data}
                network={network}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
