"use client";
import AddRarityModal from "@/app/[network]/investment-simulator/AddRarityModal";
import {
  getInvestmentSimulator,
  IGetInvestmentSimulator,
} from "@/application/use-cases/getInvestmentSimulator";
import AdBanner from "@/components/AdsBanner";
import Button from "@/components/Button";
import Card, { CardContent, CardTitle } from "@/components/Card";
import CardStats from "@/components/CardStats";
import CardTotals from "@/components/CardTotals";
import Hero from "@/components/Hero";
import House from "@/components/House";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import ModalPortal from "@/components/Modal-portal";
import Select, { SelectCollapseColor } from "@/components/Select";
import { HERO_COLORS, HERO_RARITY_ARRAY } from "@/util/hero";
import { HOUSE_NAMES_ARRAY, HOUSE_TYPE_MAP } from "@/util/house";
import { getNumberFormatOptions } from "@/util/number";
import { TOKENS_IDS_MAP, TOKENS_IDS_MAP_IMAGE } from "@/util/reward";
import { capitalizeFirstLetter } from "@/util/string";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const MARKETPLACE: any = {
  opensea: {
    image: "/images/opensea.webp",
    name: "OpenSea",
  },
  market: {
    image: "/images/market.webp",
    name: "Market",
  },
};

export interface IFilter {
  heroes: {
    rarity: number;
    quantity: number;
    stakeBcoin: number;
    stakeSen: number;
  }[];
  house: string | undefined;
  stake: string[];
}

function InvestmentSimulator({ params: { network } }: any) {
  const [data, setData] = useState<IGetInvestmentSimulator>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [filters, setFilters] = useState<IFilter>({
    heroes: [],
    house: undefined,
    stake: [],
  });

  const f = useFormatter();
  const t = useTranslations("investmentSimulator");
  const tRarity = useTranslations("component.hero.rarity");

  async function generate() {
    const sumHeroes =
      Object.values(filters.heroes).reduce(
        (acc, value) => Number(acc) + (Number(value.quantity) || 0),
        0
      ) || 0;

    if (sumHeroes === 0) {
      alert(t("alertHeroQuantityZero"));
      return;
    }

    if (sumHeroes > 15) {
      alert(t("alertHeroQuantityExceeds"));
      return;
    }

    try {
      setIsLoading(true);
      const data = await getInvestmentSimulator({
        network,
        houseRarity:
          filters.house !== undefined && filters.house !== ""
            ? Number(filters.house)
            : undefined,
        quantityHeroes: filters.heroes,
        stake: filters.stake,
      });
      setData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const tokens: any = {};

  data?.heroes?.reduce((acc, hero) => {
    Object.entries(hero.tokens).forEach(([token, value]) => {
      tokens[token] = (tokens[token] || 0) + value;
    });

    return tokens;
  }, {});

  if (data?.house) {
    tokens[data.house.token] =
      (tokens[data.house.token] || 0) + data.house.value;
  }

  const sumDollar =
    data &&
    data?.heroes?.reduce((acc, hero) => acc + hero?.valueUSD, 0) +
      (data?.house?.valueUSD || 0);

  return (
    <main className="flex flex-col w-full gap-6">
      <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div>
      <Card>
        <CardTitle>{t("filters")}</CardTitle>
        <CardContent className="items-start">
          <div className="flex flex-row gap-4 flex-wrap">
            {filters.heroes.map((hero, i) => (
              <div className="flex flex-row bg-primary rounded-md" key={i}>
                <div className="flex items-center px-4">
                  <Trash
                    className="text-gray w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setFilters((old) => {
                        const newHeroes = [...old.heroes];
                        newHeroes.splice(i, 1);
                        return { ...old, heroes: newHeroes };
                      });
                    }}
                  />
                </div>
                <div className="flex flex-row flex-wrap">
                  <CardStats
                    title={t("rarity")}
                    value={tRarity(HERO_RARITY_ARRAY[hero.rarity])}
                    icon={
                      <div
                        className="w-5 h-5 shrink-0 rounded-full"
                        style={{ background: HERO_COLORS[hero.rarity] }}
                      ></div>
                    }
                  />
                  <CardStats title={t("quantity")} value={hero.quantity} />
                  <CardStats
                    title={t("stakeBcoin")}
                    icon={
                      <div className="w-5 h-5 shrink-0 relative">
                        <Image
                          src="/images/bomb.webp"
                          className="object-contain object-center"
                          fill
                          sizes="32px"
                          alt="stake"
                        />
                      </div>
                    }
                    value={f.number(hero.stakeBcoin, getNumberFormatOptions(0))}
                  />
                  <CardStats
                    title={t("stakeSen")}
                    icon={
                      <div className="w-5 h-5 shrink-0 relative">
                        <Image
                          src="/images/sen.webp"
                          className="object-contain object-center"
                          fill
                          sizes="32px"
                          alt="sens"
                        />
                      </div>
                    }
                    value={f.number(hero.stakeSen, getNumberFormatOptions(0))}
                  />
                </div>
              </div>
            ))}
          </div>

          <Select
            classNameRoot="min-w-[295.24px]"
            color={"bg-primary" as SelectCollapseColor.PRIMARY}
            options={[
              {
                value: "",
                render: t("none"),
              },
              ...HOUSE_NAMES_ARRAY.map((name, i) => ({
                value: i.toString(),
                render: (
                  <div className="flex flex-row gap-4 items-center">
                    <div className={`w-4 h-4 shrink-0 rounded-full relative`}>
                      <Image
                        src={HOUSE_TYPE_MAP[i].image}
                        fill
                        sizes="auto"
                        alt="nft"
                        className="object-contain object-center"
                      />
                    </div>
                    <div>{capitalizeFirstLetter(name)}</div>
                  </div>
                ),
              })),
            ]}
            onChange={(value) => setFilters({ ...filters, house: value })}
            value={filters.house}
            placeholder={t("selectHouse")}
          />
          <Button
            className="!bg-transparent border-[0.5px] border-gray flex flex-row items-center gap-2"
            onClick={() => setIsOpenModal(true)}
          >
            <Plus className="w-6 h-6" />
            {t("addRarity")}
          </Button>
          <div className="flex flex-row gap-4">
            <Button onClick={generate} disabled={isLoading}>
              {isLoading ? t("generating") : t("generate")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {data && (
        <>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <CardTotals
              title={t("dollars")}
              value={f.number(sumDollar || 0, getNumberFormatOptions(2))}
              icon={
                <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center relative">
                  <Image
                    src={"/images/dollar.webp"}
                    width="32"
                    height="32"
                    sizes="32px"
                    className="object-contain object-center "
                    alt="dollar"
                  />
                </div>
              }
            />
            {Object.entries(tokens).map(([token, value]: any) => (
              <CardTotals
                key={token}
                title={TOKENS_IDS_MAP[token]}
                value={f.number(value, getNumberFormatOptions(2))}
                icon={
                  <div className="bg-white/5 w-16 h-16 shrink-0 rounded-full flex justify-center items-center relative">
                    <Image
                      src={TOKENS_IDS_MAP_IMAGE[token]}
                      width="32"
                      height="32"
                      sizes="64px"
                      className="object-contain object-center "
                      alt="token"
                    />
                  </div>
                }
              />
            ))}
          </div>
          {data.house && (
            <div className="flex flex-row gap-4">
              <House
                data={data.house.house}
                footer={
                  <div className="flex flex-row gap-2 px-4 pb-2 items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="w-6 h-6 relative">
                        <Image
                          src={MARKETPLACE[data.house.marketplace].image}
                          sizes="32px"
                          fill
                          className="object-contain object-center"
                          alt="icon"
                        />
                      </div>
                      <div>
                        {t("buyOnMarketplace", {
                          marketplaceName:
                            MARKETPLACE[data.house.marketplace].name,
                        })}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          )}
          <div className="flex flex-col gap-4">
            {data.heroes?.map((dataHero) => (
              <Hero
                key={dataHero.hero.id}
                data={dataHero.hero}
                footer={
                  <div className="px-4 pb-2 text-14 justify-center flex flex-row items-center gap-4 md:justify-start ">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="w-6 h-6 relative">
                        <Image
                          src={MARKETPLACE[dataHero.marketplace].image}
                          sizes="32px"
                          fill
                          className="object-contain object-center"
                          alt="icon"
                        />
                      </div>
                      <div>
                        {t("buyOnMarketplace", {
                          marketplaceName:
                            MARKETPLACE[dataHero.marketplace].name,
                        })}
                      </div>
                    </div>
                    {dataHero.stakeBcoin > 0 && (
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 relative">
                          <Image
                            src={"/images/bomb.webp"}
                            sizes="32px"
                            fill
                            className="object-contain object-center"
                            alt="icon"
                          />
                        </div>
                        <div>
                          {t("stakeBcoinLabel", {
                            stake: f.number(
                              dataHero.stakeBcoin,
                              getNumberFormatOptions(0)
                            ),
                          })}
                        </div>
                      </div>
                    )}
                    {dataHero.stakeSen > 0 && (
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 relative">
                          <Image
                            src={"/images/sen.webp"}
                            sizes="32px"
                            fill
                            className="object-contain object-center"
                            alt="icon"
                          />
                        </div>
                        <div>
                          {t("stakeSenLabel", {
                            stake: f.number(
                              dataHero.stakeSen,
                              getNumberFormatOptions(0)
                            ),
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            ))}
          </div>
        </>
      )}
      <ModalPortal>
        {isOpenModal && (
          <AddRarityModal
            heroes={filters.heroes}
            onApply={(value) => {
              setFilters((old) => ({ ...old, heroes: [...old.heroes, value] }));
            }}
            onClose={() => setIsOpenModal(false)}
          />
        )}
      </ModalPortal>
    </main>
  );
}
export default InvestmentSimulator;
