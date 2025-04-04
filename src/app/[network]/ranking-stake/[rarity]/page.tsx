import { getTopTwentyRarityHeroes } from "@/application/use-cases/getTopTwentyRarityHeroes";
import CardTotals from "@/components/CardTotals";
import Hero from "@/components/Hero";
import Average from "@/components/icons/Average";
import Trophy from "@/components/icons/Trophy";
import { HERO_RARITY_ARRAY } from "@/util/hero";
import { capitalizeEveryLetter, capitalizeFirstLetter } from "@/util/string";
import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { getNumberFormatOptions } from "@/util/number";

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "rankingStakeHero",
  });
  return {
    title: `BombStats - ${t("rankingStake", { rarity: params.rarity })}`,
    description: t("rankingStake", { rarity: params.rarity }),
  };
}

export default async function RankingStakeHero({
  params: { network, rarity = "Common" },
  searchParams: { token = "bcoin" },
}: any) {
  const t = await getTranslations("rankingStakeHero");
  const tRarity = await getTranslations("component.hero.rarity");
  const f = await getFormatter();

  const rarityString = decodeURI(rarity as string)
    .replaceAll("-", " ")
    .toLocaleLowerCase();

  const exists = HERO_RARITY_ARRAY.map((v) => v.toLowerCase()).includes(
    rarityString
  );
  const existsToken = ["sens", "bcoin"].includes(token);

  if (!exists) {
    return (
      <div className="text-22 font-extrabold text-center">
        {t("invalidRarity")}
      </div>
    );
  }
  if (!existsToken) {
    return (
      <div className="text-22 font-extrabold text-center">
        {t("invalidToken")}
      </div>
    );
  }
  let data;
  try {
    data = await getTopTwentyRarityHeroes({
      network,
      token,
      rarity: HERO_RARITY_ARRAY.findIndex(
        (v) => v.toLowerCase() === rarityString
      ),
    });
  } catch (e) {
    console.log("error", e);

    return (
      <div className="text-22 font-extrabold text-center">
        {t("fetchError")}
      </div>
    );
  }

  const columnPosition = token === "bcoin" ? "positionBcoin" : "positionSen";
  const columnStake = token === "bcoin" ? "stake" : "stakeSen";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-extrabold text-22">
            {tRarity(capitalizeEveryLetter(rarityString))}
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
                  src="/images/bomb.webp"
                  alt="bomb"
                  fill
                  sizes="auto"
                  className="object-contain"
                />
              </div>
            }
            title={<h2>{t("amountStake")}</h2>}
            value={f.number(data?.amount, getNumberFormatOptions(0))}
          />
          <CardTotals
            icon={
              <div className="w-16 h-16 relative shrink-0">
                <Image
                  src="/images/hero.webp"
                  fill
                  sizes="auto"
                  className="object-contain"
                  alt="heroes"
                />
              </div>
            }
            title={<h2>{t("heros")}</h2>}
            value={f.number(data?.totalHeroes, getNumberFormatOptions(0))}
          />
          <CardTotals
            icon={
              <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center">
                <Trophy width={32} height={32} />
              </div>
            }
            title={<h2>{t("biggestStake")}</h2>}
            value={f.number(
              data?.heroes?.[0]?.[columnStake],
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
            value={f.number(data?.average, getNumberFormatOptions(0))}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data?.heroes?.map((hero) => (
          <Hero
            key={hero.heroId}
            data={hero.hero}
            positionRanking={hero[columnPosition]}
          />
        ))}
      </div>
    </div>
  );
}
