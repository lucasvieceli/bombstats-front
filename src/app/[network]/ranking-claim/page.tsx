import { getTopTwentyClaimLastWeek } from "@/application/use-cases/getTopTwentyClaimLastWeek";
import CardItem from "./CardItem";
import CardTotals from "@/components/CardTotals";
import Average from "@/components/icons/Average";
import Image from "next/image";
import Wallet from "@/components/icons/Wallet";
import { getFormatter, getTranslations } from "next-intl/server";
import { getNumberFormatOptions } from "@/util/number";

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "rankingClaim",
  });
  return {
    title: `BombStats - ${t("topWalletsTitle")}`,
    description: t("topWalletsDescription"),
  };
}

async function RankingClaim({ params: { network } }: any) {
  const t = await getTranslations("rankingClaim");
  const f = await getFormatter();
  const data = await getTopTwentyClaimLastWeek({ network });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <div className="font-extrabold text-22">{t("topWalletsHeader")}</div>
          <h3 className="text-white/60 text-14">
            <strong>{t("note")}:</strong> {t("rankingUpdateNote")}
          </h3>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <CardTotals
            icon={
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src="/images/bomb.webp"
                  alt="bomb"
                  fill
                  sizes="auto"
                  className="object-contain"
                />
              </div>
            }
            title={t("amount")}
            value={f.number(data.amount, getNumberFormatOptions(0))}
          />
          <CardTotals
            icon={
              <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                <Average width={32} height={32} />
              </div>
            }
            title={t("averagePerDay")}
            value={f.number(data.average, getNumberFormatOptions(0))}
          />
          <CardTotals
            icon={
              <div className="bg-white/5  w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                <Wallet width={32} height={32} className="fill-gray" />
              </div>
            }
            title={t("totalWallets")}
            value={f.number(data.totalWallets, getNumberFormatOptions(0))}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data.wallets.map((wallet) => (
          <CardItem key={wallet.wallet} data={wallet} />
        ))}
      </div>
    </div>
  );
}

export default RankingClaim;
