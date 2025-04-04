"use client";

import Menu from "@/components/Header/Menu";
import NetworkSelect from "@/components/NetworkSelect";
import Select from "@/components/Select";
import { HERO_COLORS, HERO_RARITY_ARRAY } from "@/util/hero";
import { capitalizeFirstLetter } from "@/util/string";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const tokens = [
  { name: "bcoin", icon: "/images/bomb.webp" },
  { name: "sens", icon: "/images/sen.webp" },
];

function HeaderRankingStake() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tRarity = useTranslations("component.hero.rarity");

  function onSubmitSearch(value: string) {
    const paramsquery = new URLSearchParams(searchParams);

    const valueString = HERO_RARITY_ARRAY[parseInt(value)];
    router.push(
      `/${params.network}/ranking-global-stake/${valueString
        ?.toLocaleLowerCase()
        .replaceAll(" ", "-")}?${paramsquery.toString()}`
    );
  }
  const value = HERO_RARITY_ARRAY.findIndex(
    (name) =>
      name.toLowerCase() ===
      decodeURI(params.rarity as string).replaceAll("-", " ")
  )?.toString();

  const tokenSelected = searchParams.get("token") || "bcoin";

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

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col items-start md:flex-row gap-6">
      <div className="flex w-full flex-row justify-between md:hidden">
        <Menu />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[1fr,1fr,3fr] w-full items-start gap-4">
        <Select
          options={tokens.map((name, i) => ({
            value: name.name,
            render: (
              <div className="flex flex-row gap-4 items-center">
                <div className={`w-4 h-4 shrink-0 rounded-full relative`}>
                  <Image
                    src={name.icon}
                    fill
                    sizes="auto"
                    alt="nft"
                    className="object-contain object-center"
                  />
                </div>
                <div>{capitalizeFirstLetter(name.name)}</div>
              </div>
            ),
          }))}
          value={tokenSelected}
          placeholder="Select Token"
          onChange={(value) => onChangeParam(value, "token")}
        />
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
          value={value}
          placeholder="Select Rarity"
          onChange={onSubmitSearch}
        />
      </div>
    </div>
  );
}
export default HeaderRankingStake;
