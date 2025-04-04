"use client";
import NewItem from "@/app/[network]/real-time-retail/NewItem";
import { IValue } from "@/app/[network]/real-time-retail/page";
import { House as HouseEntity } from "@/application/entities/house";
import Card, { CardContent } from "@/components/Card";
import House from "@/components/House";
import { formatDate } from "@/util/date";
import { capitalizeFirstLetter } from "@/util/string";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

function Houses({ houses }: { houses: IValue[] }) {
  const t = useTranslations("realTimeRetail.houses");
  const query = useSearchParams();

  function getItems() {
    const type = query.get("type");
    const rarity = query.getAll("houseRarity") as string[];

    return houses.filter((item) => {
      if (
        !item.house ||
        (type && type !== item.type) ||
        (rarity &&
          rarity.length > 0 &&
          !rarity.includes(item.house?.rarity?.toString()))
      ) {
        return false;
      }

      return true;
    });
  }

  const itemsFiltered = getItems();

  return (
    <motion.div className="flex flex-row flex-wrap gap-4 flex-1 ">
      <AnimatePresence mode="wait">
        {itemsFiltered.length > 0 ? (
          itemsFiltered.map((item) => (
            <NewItem key={item.id} className="rounded-[16px] overflow-hidden">
              <House
                data={item.house as HouseEntity}
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
                  <div className="text-14 text-center md:text-left ">
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
              <CardContent>{t("monitoringHouseActivities")}</CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Houses;
