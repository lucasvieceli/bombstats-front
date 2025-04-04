import Skills from "@/app/[network]/hero/[id]/Header/Skills";
import Stats from "@/app/[network]/hero/[id]/Header/Stats";
import StatsText from "@/app/[network]/hero/[id]/Header/StatsText";
import { Hero as HeroEntity } from "@/application/entities/hero";
import { WalletNetwork } from "@/application/entities/wallet";
import { getHero } from "@/application/use-cases/getHero";
import Badge from "@/components/Badge";
import Card, { CardContent } from "@/components/Card";
import CartTotals from "@/components/CardTotals";
import ClipboardButton from "@/components/ClipboardButton";
import Trophy from "@/components/icons/Trophy";
import LottieAnimation from "@/components/LottieAnimation";
import SaleButton from "@/components/SaleButton";
import StakeHistory from "@/components/StakeHistory";
import { parseHeroSkinImage } from "@/util/hero";
import { getNumberFormatOptions, getOrdinalSuffix } from "@/util/number";
import { getFormatter, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
const FireAnimation = require("@/..//public/animations/fire.json");

export async function generateMetadata({ params: { locale, id } }: any) {
  const t = await getTranslations({ locale, namespace: "heroDetail" });

  return {
    title: `BombStats - ${t("title", { id })}`,
    description: t("description", { id }),
  };
}

export default async function Hero({ params: { id, network }, props }: any) {
  const t = await getTranslations("heroDetail");
  const tRarity = await getTranslations("component.hero.rarity");
  const f = await getFormatter();

  let data: HeroEntity | undefined = undefined;
  let isError = false;

  try {
    if (id) {
      data = await getHero({
        network: network?.toUpperCase() as WalletNetwork,
        id,
      });
    }
  } catch (e) {
    console.log(e, "error");
    isError = true;
  }

  const linkContract =
    data?.network === WalletNetwork.BSC
      ? `https://bscscan.com/address/${data?.contractAddress}`
      : `https://polygonscan.com/address/${data?.contractAddress}`;

  const getValidContent = () => {
    if (!data || isError) return null;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="lg:min-h-[337px]">
            <CardContent>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4">
                  <h1 className="text-22 xl:text-30 text-white flex flex-1 font-bold">
                    {data.burned ? t("burned") : tRarity(data.rarity)}
                  </h1>
                  <div className="flex flex-row gap-2 items-center">
                    <Badge status={"success"}>
                      {t("level", { level: data.level })}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="relative w-[180px] h-[144px]">
                      {data.burned ? (
                        <LottieAnimation
                          animationData={FireAnimation}
                          style={{ width: "auto", height: 144 }}
                          loop={true}
                        />
                      ) : (
                        <Image
                          fill
                          className="object-contain object-center"
                          sizes="180px"
                          src={parseHeroSkinImage(
                            data.skinValue,
                            data.variant,
                            data.burned
                          )}
                          alt="Hero"
                        />
                      )}
                      {data.abilityHeroS.includes(1) && (
                        <div className="absolute bottom-0 right-5 h-10 w-10 shrink-0">
                          <Image
                            src="/images/hero-s.webp"
                            fill
                            sizes="32px"
                            className="object-contain object-right-bottom"
                            alt="Hero"
                          />
                        </div>
                      )}
                    </div>

                    {(data.marketPrice || data.openSeaPrice) && (
                      <div className="flex flex-col gap-1.5 w-full justify-center">
                        {data.openSeaPrice && (
                          <SaleButton
                            typeSale="OPEN_SEA"
                            price={data.openSeaPrice}
                            id={data.id}
                            typeNft="hero"
                          />
                        )}
                        {data.marketPrice && (
                          <SaleButton
                            typeSale="MARKET"
                            price={data.marketPrice}
                            token={data.marketToken}
                            id={data.id}
                            typeNft="hero"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-semibold break-all text-22 text-white flex flex-row items-center justify-center md:justify-start">
                      #{data.id}
                      <ClipboardButton
                        value={data.id}
                        className="w-[22px] h-[22px] ml-1"
                      />
                    </h2>
                    {!data.burned && <Skills data={data} />}
                    <Stats data={data} />
                    <StatsText title={t("walletTitle")}>
                      <Link href={`/${network}/wallet/${data.wallet}`}>
                        {data.wallet}
                      </Link>
                    </StatsText>
                    <StatsText title={t("contractTitle")}>
                      <Link href={linkContract} target="_blank">
                        {data.contractAddress}
                      </Link>
                    </StatsText>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:max-w-[313px] w-full">
            <CartTotals
              icon={
                <Image
                  src="/images/bomb.webp"
                  width={64}
                  height={64}
                  sizes="64px"
                  alt="bomb"
                />
              }
              title={t("stakeTitle")}
              value={f.number(data.stake, getNumberFormatOptions(0))}
            />
            <CartTotals
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                  <Trophy width={32} height={32} />
                </div>
              }
              title={t("rankingStakeTitle")}
              value={
                data?.stakeRankingHero
                  ? getOrdinalSuffix(
                      data?.stakeRankingHero?.positionBcoin,
                      cookies().get("NEXT_LOCALE")?.value as any
                    )
                  : "-"
              }
            />
            <CartTotals
              icon={
                <Image
                  src="/images/sen.webp"
                  width={64}
                  height={64}
                  sizes="64px"
                  alt="sens"
                />
              }
              title={t("stakeSensTitle")}
              value={f.number(data.stakeSen, getNumberFormatOptions(0))}
            />
            <CartTotals
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                  <Trophy width={32} height={32} />
                </div>
              }
              title={t("rankingStakeSensTitle")}
              value={
                data?.stakeRankingHero
                  ? getOrdinalSuffix(
                      data?.stakeRankingHero?.positionSen,
                      cookies().get("NEXT_LOCALE")?.value
                    )
                  : "-"
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StakeHistory stakes={data.stakes} />
        </div>
      </div>
    );
  };

  function getErrorContent() {
    return (
      <div className="flex flex-col text-22 font-bold items-center mt-6">
        <span>{t("notFoundTitle")}</span>
        <span className="text-center">{t("notFoundDescription")}</span>
      </div>
    );
  }

  return (
    <>
      {data && getValidContent()}
      {isError && getErrorContent()}
    </>
  );
}
