import AverageFarm from "@/app/[network]/wallet/[id]/AverageFarm";
import CurrentMap from "@/app/[network]/wallet/[id]/CurrentMap";
import CurrentReward from "@/app/[network]/wallet/[id]/CurrentRewards";
import Heroes from "@/app/[network]/wallet/[id]/Heroes";
import Houses from "@/app/[network]/wallet/[id]/Houses";
import RealTimeFarm from "@/app/[network]/wallet/[id]/RealTimeFarm";
import { WalletNetwork } from "@/application/entities/wallet";
import {
  IGetWalletResponse,
  getWallet,
} from "@/application/use-cases/getWallet";
import Badge from "@/components/Badge";
import Card, { CardContent } from "@/components/Card";
import CardStats from "@/components/CardStats";
import ClipboardButton from "@/components/ClipboardButton";
import HistoryItem from "@/components/HistoryItem";
import StakeHistory from "@/components/StakeHistory";
import Tooltip from "@/components/Tooltip";
import Chrome from "@/components/icons/Chrome";
import Trophy from "@/components/icons/Trophy";
import { getNumberFormatOptions, getOrdinalSuffix } from "@/util/number";
import { getFormatter, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "searchWallet.detail",
  });

  return {
    title: `BombStats - ${t("title", { wallet: params.id })}`,
    description: `${t("description", { wallet: params.id })}`,
  };
}

export default async function Wallet({
  params: { id, network, locale },
  props,
}: any) {
  const t = await getTranslations({
    locale,
    namespace: "searchWallet.detail",
  });
  const f = await getFormatter();

  let data: IGetWalletResponse | undefined = undefined;
  let isError = false;
  try {
    if (id) {
      data = await getWallet({
        network: network?.toUpperCase() as WalletNetwork,
        wallet: id as string,
      });
    }
  } catch (e) {
    console.log(e, "error");
    isError = true;
  }
  const getValidContent = () => {
    if (isError) {
      return (
        <div className="flex flex-col text-22 font-bold items-center mt-6">
          <span>{t("internalError")}</span>
          <span className="text-center">{t("retryMessage")}</span>
        </div>
      );
    }
    if (!data) return null;

    const herosWithStake =
      data.heroes?.filter((hero) => hero.stake > 0).length || 0;
    const totalStake =
      data.heroes?.reduce((acc, hero) => acc + hero.stake, 0) || 0;
    const totalStakeSen =
      data.heroes?.reduce((acc, hero) => acc + hero.stakeSen, 0) || 0;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6 ">
          <Card className="">
            <CardContent>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4">
                  <h2 className="text-22 xl:text-30 text-white flex flex-1 font-bold">
                    {t("wallet")}
                  </h2>
                  <div className="flex flex-row gap-2 items-center">
                    {data.wallet?.extensionInstalled && (
                      <Tooltip title={t("chromeExtensionTooltip")}>
                        <Chrome width={24} height={24} />
                      </Tooltip>
                    )}
                    <Badge status={data.online ? "success" : "error"}>
                      {data.online ? t("online") : t("offline")}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="font-semibold break-all text-22 text-white flex flex-row">
                    {data.walletId}
                    <ClipboardButton
                      value={data.walletId}
                      className="w-[22px] h-[22px] ml-1"
                    />
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-white text-18">
                      {t("stats")}
                    </div>
                    <div className="flex flex-row gap-3 flex-wrap">
                      <CardStats
                        title={t("heroes")}
                        icon={
                          <Image
                            src="/images/hero.webp"
                            height={20}
                            width={15.2}
                            alt={t("heroes")}
                          />
                        }
                        value={f.number(
                          data.heroes?.length,
                          getNumberFormatOptions(0)
                        )}
                      />
                      <CardStats
                        title={t("houses")}
                        icon={
                          <Image
                            src="/images/house.webp"
                            height={20}
                            width={15.2}
                            alt={t("houses")}
                          />
                        }
                        value={data.houses?.length}
                      />
                      <CardStats
                        title={t("heroesStake")}
                        icon={
                          <Image
                            src="/images/hero-stake.webp"
                            height={20}
                            width={15.2}
                            alt={t("heroesStake")}
                          />
                        }
                        value={f.number(
                          herosWithStake,
                          getNumberFormatOptions(0)
                        )}
                      />
                      <CardStats
                        title={t("bcoin")}
                        icon={
                          <Image
                            src="/images/bomb.webp"
                            height={20}
                            width={20}
                            alt={t("bcoin")}
                          />
                        }
                        value={f.number(
                          data.tokens?.bomb,
                          getNumberFormatOptions()
                        )}
                      />
                      <CardStats
                        title={t("sen")}
                        icon={
                          <Image
                            src="/images/sen.webp"
                            height={20}
                            width={20}
                            alt={t("sen")}
                          />
                        }
                        value={f.number(
                          data.tokens?.sen,
                          getNumberFormatOptions()
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0px,_230px)_minmax(0px,_300px)] gap-6 lg:max-w-[800px]">
            <div className="grid grid-cols-1   xl:grid-cols-1 gap-6">
              <Card>
                <CardContent>
                  <HistoryItem
                    title={f.number(totalStake, getNumberFormatOptions(0))}
                    description={t("stakeBcoin")}
                    icon={
                      <Image
                        src="/images/bomb.webp"
                        alt={t("bcoin")}
                        fill
                        sizes="auto"
                        className="object-contain object-center"
                      />
                    }
                  />

                  <HistoryItem
                    title={
                      data?.wallet?.stakeRankingWallet
                        ? getOrdinalSuffix(
                            data?.wallet?.stakeRankingWallet?.position,
                            cookies().get("NEXT_LOCALE")?.value
                          )
                        : "-"
                    }
                    description={t("rankingStake")}
                    icon={<Trophy width={43} height={43} />}
                  />
                  <HistoryItem
                    title={
                      data?.wallet?.stakeRankingWalletGlobal
                        ? getOrdinalSuffix(
                            data?.wallet?.stakeRankingWalletGlobal
                              ?.positionBcoin,
                            cookies().get("NEXT_LOCALE")?.value
                          )
                        : "-"
                    }
                    description={t("rankingGlobalStake")}
                    icon={<Trophy width={43} height={43} />}
                  />

                  <HistoryItem
                    title={
                      data?.wallet?.claimRankingWallet
                        ? getOrdinalSuffix(
                            data?.wallet?.claimRankingWallet?.position,
                            cookies().get("NEXT_LOCALE")?.value
                          )
                        : "-"
                    }
                    description={t("rankingClaim")}
                    icon={<Trophy width={43} height={43} />}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <HistoryItem
                    title={f.number(totalStakeSen, getNumberFormatOptions(0))}
                    description={t("stakeSens")}
                    icon={
                      <Image
                        src="/images/sen.webp"
                        alt={t("sen")}
                        fill
                        sizes="auto"
                        className="object-contain object-center"
                      />
                    }
                  />

                  <HistoryItem
                    title={
                      data?.wallet?.stakeSenRankingWallet
                        ? getOrdinalSuffix(
                            data?.wallet?.stakeSenRankingWallet?.position,
                            cookies().get("NEXT_LOCALE")?.value
                          )
                        : "-"
                    }
                    description={t("rankingStake")}
                    icon={<Trophy width={43} height={43} />}
                  />
                  <HistoryItem
                    title={
                      data?.wallet?.stakeRankingWalletGlobal
                        ? getOrdinalSuffix(
                            data?.wallet?.stakeRankingWalletGlobal?.positionSen,
                            cookies().get("NEXT_LOCALE")?.value
                          )
                        : "-"
                    }
                    description={t("rankingGlobalStake")}
                    icon={<Trophy width={43} height={43} />}
                  />
                </CardContent>
              </Card>
            </div>
            <StakeHistory stakes={data.stakes} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AverageFarm data={data} />
          <CurrentMap data={data} network={network} />
          <CurrentReward data={data} network={network} />
          <RealTimeFarm data={data} network={network} />
        </div>

        <Houses data={data} />
        <Heroes data={data} />
      </div>
    );
  };

  function getErrorContent() {
    return (
      <div className="flex flex-col text-22 font-bold items-center mt-6">
        <span>{t("walletNotFound")}</span>
        <span className="text-center">{t("checkWalletAddress")}</span>
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
