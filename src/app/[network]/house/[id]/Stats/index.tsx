import { House } from "@/application/entities/house";
import CardStats from "@/components/CardStats";
import { HOUSE_TYPE_MAP } from "@/util/house";
import { useTranslations } from "next-intl";

interface StatsProps {
  data: House;
}

export default function Stats({ data }: StatsProps) {
  const t = useTranslations("houseDetail.stats");
  const type = HOUSE_TYPE_MAP[data.rarity];

  return (
    <div className="flex flex-col gap-2 items-center md:items-start">
      <div className="font-bold text-white text-18">{t("title")}</div>
      <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
        <CardStats title={t("size")} value={type.size} />
        <CardStats title={t("charge")} value={type.charge} />
        <CardStats title={t("capacity")} value={type.capacity} />
      </div>
    </div>
  );
}
