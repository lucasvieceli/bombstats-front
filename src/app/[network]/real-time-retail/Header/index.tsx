"use client";

import Menu from "@/components/Header/Menu";
import NetworkSelect from "@/components/NetworkSelect";
import Select from "@/components/Select";
import { HERO_COLORS, HERO_RARITY_ARRAY } from "@/util/hero";
import { HOUSE_NAMES_ARRAY, HOUSE_TYPE_MAP } from "@/util/house";
import { capitalizeFirstLetter } from "@/util/string";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import NotificationCheckbox from "../Notification";
import { WalletNetwork } from "@/application/entities/wallet";
import { useTranslations } from "next-intl";

const types = ["listed", "sold"];
const nft = ["hero", "house"];
const nftImg = ["/images/hero.webp", "/images/market.webp"];

function HeaderRetail() {
  const t = useTranslations("realTimeRetail.header");
  const tRarity = useTranslations("component.hero.rarity");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onChangeParam(value: any, param: string) {
    const params = new URLSearchParams(searchParams);

    if (Array.isArray(value)) {
      params.delete(param);
      value.forEach((val) => {
        params.append(param, val);
      });
    } else {
      if (value) {
        params.set(param, value);
      } else {
        params.delete(param);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const nftParam = searchParams.get("nft") || "hero";

  function onChangeType(value: string) {
    onChangeParam(value, "type");
  }

  function onChangeNft(value: string) {
    onChangeParam(value, "nft");
  }

  function onChangeRarity(value: string[]) {
    onChangeParam(value, "heroRarity");
  }
  function onChangeHouseRarity(value: string[]) {
    onChangeParam(value, "houseRarity");
  }

  function getHeroesFilters() {
    if (nftParam === "hero") {
      return (
        <Select
          options={HERO_RARITY_ARRAY.map((name, i) => ({
            value: i.toString(),
            render: (
              <div className="flex flex-row gap-4 items-center">
                <div
                  style={{ background: HERO_COLORS[i] }}
                  className={`w-4 h-4 shrink-0 rounded-full`}
                />
                <div>{tRarity(name)}</div>
              </div>
            ),
          }))}
          value={searchParams.getAll("heroRarity") as any}
          placeholder={t("selectRarity")}
          onChange={onChangeRarity}
          allOptions
          multiple
        />
      );
    }
  }

  function getHousesFilters() {
    if (nftParam === "house") {
      return (
        <Select
          options={HOUSE_NAMES_ARRAY.map((name, i) => ({
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
          }))}
          value={searchParams.getAll("houseRarity") as any}
          placeholder={t("selectRarity")}
          onChange={onChangeHouseRarity}
          allOptions
          multiple
        />
      );
    }
  }

  return (
    <div className="flex flex-col items-start md:flex-row gap-6">
      <div className="flex w-full flex-row justify-between md:hidden">
        <Menu />
        <NetworkSelect />
      </div>
      <div className="grid grid-cols-2 md:flex flex-row w-full items-start gap-4 flex-wrap">
        <Select
          options={nft.map((name, i) => ({
            value: name,
            render: (
              <div className="flex flex-row gap-4 items-center">
                <div className={`w-4 h-4 shrink-0 rounded-full relative`}>
                  <Image
                    src={nftImg[i]}
                    fill
                    sizes="auto"
                    alt="nft"
                    className="object-contain object-left-top"
                  />
                </div>
                <div>{capitalizeFirstLetter(name)}</div>
              </div>
            ),
          }))}
          value={nftParam as string}
          placeholder={t("selectNft")}
          onChange={onChangeNft}
        />

        <Select
          options={types.map((name, i) => ({
            value: name,
            render: capitalizeFirstLetter(t(name)),
          }))}
          value={searchParams.get("type") as string}
          allOptions
          placeholder={t("selectType")}
          onChange={onChangeType}
        />
        {getHeroesFilters()}
        {getHousesFilters()}
        <NotificationCheckbox network={params.network as WalletNetwork} />
        <div className="hidden md:flex flex-1 lg:justify-end">
          <NetworkSelect />
        </div>
      </div>
    </div>
  );
}
export default HeaderRetail;
