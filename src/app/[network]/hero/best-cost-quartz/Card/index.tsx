import { WalletNetwork } from "@/application/entities/wallet";
import { IBestCostQuartz } from "@/application/use-cases/getBestCostQuartz";
import CardSmallStats from "@/components/CardSmallStats";
import LinkNetwork from "@/components/LinkNetwork";
import { HERO_COLORS, HERO_RARITY_ARRAY } from "@/util/hero";
import { getNumberFormatOptions } from "@/util/number";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";

interface CardRarityProps {
  data: IBestCostQuartz["items"][0];
  network: WalletNetwork;
}

export default async function CardRarity({ data, network }: CardRarityProps) {
  const t = await getTranslations("bestCostQuartz.cardRarity");
  const tRarity = await getTranslations("component.hero.rarity");
  const f = await getFormatter();

  const iconMainToken =
    network === WalletNetwork.BSC ? "/images/bnb.webp" : "/images/matic.webp";
  const textMainToken = network === WalletNetwork.BSC ? "BNB" : "Matic";
  const format = network === WalletNetwork.BSC ? 5 : 2;

  return (
    <div className="flex flex-row rounded-2xl overflow-hidden bg-secondary">
      <div
        className={`w-[15px] shrink-0`}
        style={{ background: HERO_COLORS[data.rarityIndex] }}
      ></div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row items-center w-full gap-2 py-4 px-4 flex-wrap shrink-0">
          <h3 className="text-16 font-semibold min-w-[116px]">
            {tRarity(HERO_RARITY_ARRAY[data.rarityIndex])}
          </h3>
          <div className="flex flex-col gap-1 px-3 py-2 bg-primary rounded-md shrink-0">
            <div className="text-12 text-white font-semibold">Quartz</div>
            <div className=" flex flex-row gap-4">
              <CardSmallStats
                value={data.quartz}
                title={t("quantity")}
                image={
                  <Image
                    src="/images/quartz.webp"
                    fill
                    sizes="32"
                    alt={"Bcoin"}
                  />
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-3 py-2 bg-primary rounded-md shrink-0">
            <div className="text-12 text-white font-semibold">
              {t("buyQuartzBcoin")}
            </div>
            <div className=" flex flex-row gap-4 flex-wrap">
              <CardSmallStats
                value={f.number(
                  data.quartzBcoin.price,
                  getNumberFormatOptions(format)
                )}
                title="Bcoin"
                image={
                  <Image
                    src="/images/bomb.webp"
                    fill
                    sizes="32"
                    alt={"Bcoin"}
                  />
                }
              />
              <CardSmallStats
                value={f.number(
                  data.quartzBcoin.priceInMainToken,
                  getNumberFormatOptions(format)
                )}
                title={textMainToken}
                image={
                  <Image src={iconMainToken} fill sizes="32" alt={"Bcoin"} />
                }
              />
              <CardSmallStats
                value={f.number(
                  data.quartzBcoin.priceEveryFiveQuartz,
                  getNumberFormatOptions(format)
                )}
                title={t("priceForFiveQuartz")}
                image={
                  <Image src={iconMainToken} fill sizes="32" alt={"Bcoin"} />
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-3 py-2 bg-primary rounded-md shrink-0">
            <div className="text-12 text-white font-semibold">
              {t("buyQuartzSens")}
            </div>
            <div className=" flex flex-row gap-4 flex-wrap">
              <CardSmallStats
                value={data.quartzSen.price}
                title="Sens"
                image={
                  <Image src="/images/sen.webp" fill sizes="32" alt={"Bcoin"} />
                }
              />
              <CardSmallStats
                value={f.number(
                  data.quartzSen.priceInMainToken,
                  getNumberFormatOptions(format)
                )}
                title={textMainToken}
                image={
                  <Image src={iconMainToken} fill sizes="32" alt={"Bcoin"} />
                }
              />
              <CardSmallStats
                value={f.number(
                  data.quartzSen.priceEveryFiveQuartz,
                  getNumberFormatOptions(format)
                )}
                title={t("priceForFiveQuartz")}
                image={
                  <Image src={iconMainToken} fill sizes="32" alt={"Bcoin"} />
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-3 py-2 bg-primary rounded-md">
            <div className="text-12 text-white font-semibold">
              {t("buyOnMarket")}
            </div>
            <div className=" flex flex-row gap-4 flex-wrap">
              <CardSmallStats
                value={f.number(
                  data.marketBcoin.price,
                  getNumberFormatOptions(format)
                )}
                title="Bcoin"
                image={
                  <Image
                    src="/images/bomb.webp"
                    fill
                    sizes="32"
                    alt={"Bcoin"}
                  />
                }
              />
              <CardSmallStats
                value={f.number(
                  data.marketBcoin.priceInMainToken,
                  getNumberFormatOptions(format)
                )}
                title={textMainToken}
                image={
                  <Image src={iconMainToken} fill sizes="32" alt={"Bcoin"} />
                }
              />
              <CardSmallStats
                value={f.number(
                  data.marketBcoin.priceEveryFiveQuartz,
                  getNumberFormatOptions(format)
                )}
                title={t("priceForFiveQuartz")}
                image={
                  <Image src={iconMainToken} fill sizes="32" alt={"Bcoin"} />
                }
              />
              <CardSmallStats
                value={
                  <LinkNetwork href={`/hero/${data.marketBcoin.id}`}>
                    #{data.marketBcoin.id}
                  </LinkNetwork>
                }
                title="Hero ID"
                image={
                  <Image
                    src="/images/hero.webp"
                    fill
                    sizes="32"
                    alt={"Bcoin"}
                  />
                }
              />
            </div>
          </div>
          {network === WalletNetwork.POLYGON && (
            <div className="flex flex-col gap-1 px-3 py-2 bg-primary rounded-md">
              <div className="text-12 text-white font-semibold">
                {t("buyOnOpenSea")}
              </div>
              <div className=" flex flex-row gap-4 flex-wrap">
                <CardSmallStats
                  value={f.number(
                    data.openSea.price,
                    getNumberFormatOptions(format)
                  )}
                  title="Matic"
                  image={
                    <Image
                      src="/images/matic.webp"
                      fill
                      sizes="32"
                      alt={"Bcoin"}
                    />
                  }
                />
                <CardSmallStats
                  value={f.number(
                    data.openSea.priceEveryFiveQuartz,
                    getNumberFormatOptions(format)
                  )}
                  title={t("priceForFiveQuartz")}
                  image={
                    <Image
                      src="/images/matic.webp"
                      fill
                      sizes="32"
                      alt={"Bcoin"}
                    />
                  }
                />
                <CardSmallStats
                  value={
                    <LinkNetwork href={`/hero/${data.openSea.id}`}>
                      #{data.openSea.id}
                    </LinkNetwork>
                  }
                  title="Hero ID"
                  image={
                    <Image
                      src="/images/hero.webp"
                      fill
                      sizes="32"
                      alt={"Bcoin"}
                    />
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
