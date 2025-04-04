import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export enum HeroStatsType {
  POWER = "power",
  SPEED = "speed",
  STAMINA = "stamina",
  BOMB = "bomb",
  RANGE = "range",
  STAKE = "stake bcoin",
  STAKE_SENS = "stake sens",
  MAX_SHIELD = "shield",
  NUM_RESET_SHIELD = "shield reset",
}

const IMAGES: Record<HeroStatsType, string> = {
  [HeroStatsType.POWER]: "/images/stats/power.webp",
  [HeroStatsType.SPEED]: "/images/stats/speed.webp",
  [HeroStatsType.STAMINA]: "/images/stats/stamina.webp",
  [HeroStatsType.BOMB]: "/images/stats/bomb.webp",
  [HeroStatsType.RANGE]: "/images/stats/range.webp",
  [HeroStatsType.STAKE]: "/images/bomb.webp",
  [HeroStatsType.STAKE_SENS]: "/images/sen.webp",
  [HeroStatsType.MAX_SHIELD]: "/images/stats/shield.png",
  [HeroStatsType.NUM_RESET_SHIELD]: "/images/stats/shield.png",
};

interface HeroStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  type: HeroStatsType;
  value: string | number;
  bordered?: boolean;
}
function HeroStats({
  type,
  value,
  bordered = false,
  className,
  ...props
}: HeroStatsProps) {
  const t = useTranslations("component.hero");

  const styleContainer = bordered && `px-3 py-2 bg-primary rounded-md `;
  return (
    <div
      className={`flex flex-col gap-1 shrink-0 ${styleContainer} ${className}`}
      {...props}
    >
      <div className="text-12 text-white/60">{t(type)}</div>
      <div className="flex flex-row gap-1 items-center">
        <div className="relative h-5 w-5">
          <Image
            src={IMAGES[type]}
            fill
            alt={type}
            sizes="32px"
            className="object-contain object-left"
          />
        </div>
        <div className="text-16 font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default HeroStats;
