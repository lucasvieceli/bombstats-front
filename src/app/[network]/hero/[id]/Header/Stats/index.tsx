import { Hero } from "@/application/entities/hero";
import HeroStats, { HeroStatsType } from "@/components/Hero/HeroStats";
import { useTranslations } from "next-intl";

interface StatsProps {
  data: Hero;
}

export default function Stats({ data }: StatsProps) {
  const t = useTranslations("heroDetail.stats");

  return (
    <div className="flex flex-col gap-2 items-center md:items-start">
      <div className="font-bold text-white text-18">{t("title")}</div>
      <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
        <HeroStats
          bordered
          type={HeroStatsType.POWER}
          value={data.strength + Math.max(data.level - 1, 0)}
        />
        <HeroStats bordered type={HeroStatsType.SPEED} value={data.speed} />
        <HeroStats bordered type={HeroStatsType.STAMINA} value={data.stamina} />
        <HeroStats bordered type={HeroStatsType.BOMB} value={data.capacity} />
        <HeroStats bordered type={HeroStatsType.RANGE} value={data.range} />
        <HeroStats
          bordered
          type={HeroStatsType.MAX_SHIELD}
          value={data.maxShield}
        />
        <HeroStats
          bordered
          type={HeroStatsType.NUM_RESET_SHIELD}
          value={data.numResetShield}
        />
      </div>
    </div>
  );
}
