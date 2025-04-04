import CardItem from "@/app/[network]/ranking-stake-wallet/CardItem";
import { getTopTwentyWalletStakes } from "@/application/use-cases/getTopTwentyWalletStakes";
import CardTotals from "@/components/CardTotals";
import Average from "@/components/icons/Average";
import Trophy from "@/components/icons/Trophy";
import Wallet from "@/components/icons/Wallet";
import { capitalizeFirstLetter } from "@/util/string";
import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { getNumberFormatOptions } from "@/util/number";

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "rankingStakeWallet",
  });
  return {
    title: `BombStats - ${t("rankingStakeWalletTitle")}`,
    description: t("rankingStakeWalletDescription"),
  };
}

export default async function RankingStakeWallet({
  params: { network },
  searchParams: { token = "bcoin" },
}: any) {
  const t = await getTranslations("rankingStakeWallet");
  const f = await getFormatter();

  let data;
  try {
    data = await getTopTwentyWalletStakes({
      network,
      token,
    });
  } catch (e) {
    console.log("error", e);

    return (
      <div className="text-22 font-extrabold text-center">
        {t("internalError")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-extrabold text-22">
            {t("topStakingWallets", {
              network: capitalizeFirstLetter(network),
            })}
          </h1>
          <h3 className="text-white/60 text-14">
            <strong>{t("note")}:</strong> {t("rankingUpdateNote")}
          </h3>
        </div>
        <div className="flex flex-col gap-4 md:flex-row flex-wrap">
          <CardTotals
            icon={
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={
                    token === "bcoin" ? "/images/bomb.webp" : "/images/sen.webp"
                  }
                  alt="token"
                  fill
                  sizes="auto"
                  className="object-contain"
                />
              </div>
            }
            title={<h2>{t("amountStake")}</h2>}
            value={f.number(data.amount, getNumberFormatOptions(0))}
          />
          <CardTotals
            icon={
              <div className="bg-white/5  w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                <Wallet width={32} height={32} className="fill-gray" />
              </div>
            }
            title={<h2>{t("wallets")}</h2>}
            value={f.number(data.totalWallets, getNumberFormatOptions(0))}
          />
          <CardTotals
            icon={
              <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                <Trophy width={32} height={32} />
              </div>
            }
            title={<h2>{t("biggestStake")}</h2>}
            value={f.number(
              token === "bcoin"
                ? data.wallets?.[0].stake
                : data.wallets?.[0].stakeSen,
              getNumberFormatOptions(0)
            )}
          />

          <CardTotals
            icon={
              <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                <Average width={32} height={32} />
              </div>
            }
            title={<h2>{t("averageStake")}</h2>}
            value={f.number(data.average, getNumberFormatOptions(0))}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data.wallets.map((wallet) => (
          <CardItem data={wallet} key={wallet.wallet} />
        ))}
      </div>
    </div>
  );
}
