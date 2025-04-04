"use client";
import NewItem from "@/app/[network]/real-time-retail/NewItem";
import { IValue } from "@/app/[network]/real-time-retail/page";
import { Hero as HeroEntity } from "@/application/entities/hero";
import Card, { CardContent } from "@/components/Card";
import Hero from "@/components/Hero";
import { formatDate } from "@/util/date";
import { capitalizeFirstLetter } from "@/util/string";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { memo } from "react";

function Heroes({ heroes }: { heroes: IValue[] }) {
  const t = useTranslations("realTimeRetail.heroesComponent");
  const query = useSearchParams();

  function getItems() {
    const type = query.get("type");
    const rarity = query.getAll("heroRarity") as string[];

    return heroes.filter((item) => {
      if (
        !item.hero ||
        (type && type !== item.type) ||
        (rarity &&
          rarity.length > 0 &&
          !rarity.includes(item.hero?.rarityIndex?.toString()))
      ) {
        return false;
      }

      return true;
    });
  }

  const itemsFiltered = getItems();

  return (
    <motion.div className="flex flex-col gap-4 flex-1 ">
      <AnimatePresence mode="wait">
        {itemsFiltered.length > 0 ? (
          itemsFiltered.map((item) => (
            <NewItem key={item.id} className="rounded-[16px] overflow-hidden">
              <Hero
                data={item.hero as HeroEntity}
                openNewWindow
                sold={
                  item.soldPrice
                    ? {
                        price: item.soldPrice as number,
                        token: item.tokenAddress as string,
                        marketPlace: item.marketPlace,
                      }
                    : undefined
                }
                footer={
                  <div className="px-4 pb-2 text-14 text-center md:text-left ">
                    {capitalizeFirstLetter(item.type)} {t("at")}{" "}
                    {formatDate(item.date)}
                  </div>
                }
              />
            </NewItem>
          ))
        ) : (
          <motion.div layout exit={{ opacity: 0, x: 50 }} className="w-full">
            <Card>
              <CardContent>{t("monitoringHeroActivities")}</CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(Heroes);
