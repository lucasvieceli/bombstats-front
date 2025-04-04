import { Hero } from "@/application/entities/hero";
import { parseHeroAbilityImage } from "@/util/hero";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface SkillsProps {
  data: Hero;
}

export default function Skills({ data }: SkillsProps) {
  const t = useTranslations("heroDetail.skills");
  const tAbilities = useTranslations("component.hero.abilities");

  return (
    <div className="flex flex-col gap-2 items-center md:items-start">
      <div className="font-bold text-white text-18">{t("title")}</div>
      <div className="flex flex-row gap-3 flex-wrap justify-center md:justify-start">
        {data.abilities.map((ability) => (
          <Image
            src={parseHeroAbilityImage(ability)}
            width={32}
            height={32}
            alt={ability}
            title={tAbilities(ability)}
            key={ability}
          />
        ))}
      </div>
    </div>
  );
}
