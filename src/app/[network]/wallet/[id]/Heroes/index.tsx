import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";

interface HeroesProps {
  data: IGetWalletResponse;
}

export default async function Heroes({ data }: HeroesProps) {
  const t = await getTranslations("searchWallet.detail.heroesSection");

  if (!data.heroes) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-22 font-extrabold">{t("title")}</div>
      <div className="flex flex-col gap-4 flex-1">
        {data.heroes
          .sort((a, b) => {
            if (b.stake !== a.stake) {
              return b.stake - a.stake;
            }
            return b.rarityIndex - a.rarityIndex;
          })
          .map((hero) => (
            <Hero data={hero} key={hero.id} />
          ))}
      </div>
    </div>
  );
}
