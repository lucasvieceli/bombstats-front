"use client";
import { Stake } from "@/application/entities/stake";
import Card, { CardContent, CardTitle } from "@/components/Card";
import HistoryItem from "@/components/HistoryItem";
import ArrowDown from "@/components/icons/ArrowDown";
import ArrowUp from "@/components/icons/ArrowUp";
import LinkNetwork from "@/components/LinkNetwork";
import { getNumberFormatOptions } from "@/util/number";
import { TOKENS_IDS_MAP } from "@/util/reward";
import { useFormatter, useTranslations } from "next-intl";

interface StakeHistoryProps {
  stakes?: Stake[];
  maxWidth?: boolean;
}

function StakeHistory({ stakes, maxWidth }: StakeHistoryProps) {
  const t = useTranslations("searchWallet.detail.stakeHistory");
  const f = useFormatter();

  function getContent() {
    if (!stakes || stakes?.length === 0) {
      return (
        <div className="w-full py-4 flex justify-center items-center text-16">
          {t("noStakeHistory")}
        </div>
      );
    }

    return stakes.map((stake, index) => {
      const type = stake.withdraw > 0 ? t("withdrew") : t("staked");
      const token = TOKENS_IDS_MAP[stake.token] || "Bcoin";
      const icon =
        stake.withdraw > 0 ? (
          <ArrowDown width={24} height={24} className="stroke-white" />
        ) : (
          <ArrowUp width={24} height={24} className="stroke-white" />
        );
      return (
        <HistoryItem
          key={index}
          title={f.number(stake.amount, getNumberFormatOptions(0))}
          description={
            <span>
              {type} {token} {t("hero")}{" "}
              <LinkNetwork
                href={`/hero/${stake.heroId}`}
                className="hover:text-blue"
              >
                #{stake.heroId}
              </LinkNetwork>
            </span>
          }
          iconImage={false}
          icon={icon}
          time={new Date(stake.date)}
        />
      );
    });
  }

  const styleContainer = maxWidth && `max-w-[330px]`;
  return (
    <Card className={`${styleContainer}`}>
      <CardTitle>
        {t("title")}
        <span className="text-12 font-light ml-3">{t("lastStakes")}</span>
      </CardTitle>
      <CardContent className="!px-0">
        <ul className="flex flex-col px-4 gap-4 max-h-[260px] md:max-h-[400px] overflow-auto">
          {getContent()}
        </ul>
      </CardContent>
    </Card>
  );
}

export default StakeHistory;
