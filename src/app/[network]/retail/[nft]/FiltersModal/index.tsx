"use client";

import { useGetHeroesFilters } from "@/app/[network]/retail/[nft]/hooks/useGetHeroesFIlters";
import { WalletNetwork } from "@/application/entities/wallet";
import Close from "@/components/icons/Close";
import Input, { InputColor } from "@/components/Input";
import Modal from "@/components/Modal";
import ModalPortal from "@/components/Modal-portal";
import Select from "@/components/Select";
import SelectCollapse, {
  SelectCollapseColor,
} from "@/components/SelectCollapse";
import {
  HERO_COLORS,
  HERO_RARITY_ARRAY,
  HERO_SKILL_DESCRIPTION_MAP,
  HERO_SKILL_IMAGE_MAP,
} from "@/util/hero";
import {
  TOKENS_BSC,
  TOKENS_IDS_MAP_IMAGE,
  TOKENS_POLYGON,
} from "@/util/reward";
import { MARKETPLACES } from "@/util/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface IFiltersModal {
  isOpen: boolean;
  onClose: () => void;
}

function FiltersModal({ isOpen, onClose }: IFiltersModal) {
  const t = useTranslations("market.heroes.filtersModal");
  const tRarity = useTranslations("component.hero.rarity");
  const tAbilities = useTranslations("component.hero.abilities");
  const params = useParams();
  const [menuOpen, setMenuOpen] = useState("");

  const network = (params.network as String).toUpperCase() as WalletNetwork;

  const tokens =
    network === WalletNetwork.POLYGON ? TOKENS_POLYGON : TOKENS_BSC;

  const filterContext = useGetHeroesFilters();

  const [filters, setFilters] = useState(filterContext.filters);

  useEffect(() => {
    setFilters(filterContext.filters);
  }, [filterContext.filters]);

  function handleClose() {
    filterContext.setAllFilters(filters);
    onClose();
    setMenuOpen("");
  }

  return (
    <ModalPortal>
      {isOpen && (
        <Modal
          onClose={handleClose}
          className="md:!max-w-[414px] w-full !h-auto p-4 !bg-secondary shadow-xl gap-6 flex flex-col overflow-y-auto"
        >
          <div className="flex flex-row justify-between text-white text-18 font-extrabold">
            <div>{t("filters")}</div>

            <Close className="w-6 h-6 cursor-pointer" onClick={handleClose} />
          </div>
          <SelectCollapse
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
            placeholder={t("selectRarity")}
            value={filters.rarity}
            onChange={(value) => setFilters({ ...filters, rarity: value })}
            color={SelectCollapseColor.PRIMARY}
            multiple
            isOpen={menuOpen === "rarity"}
            onOpen={() => setMenuOpen("rarity")}
          />
          <SelectCollapse
            options={Object.keys(HERO_SKILL_IMAGE_MAP).map((key) => ({
              value: key,
              render: (
                <div
                  className="flex flex-row gap-4 items-center"
                  title={tAbilities(key)}
                >
                  <div className={`w-6 h-6 shrink-0 rounded-full relative`}>
                    <Image
                      src={HERO_SKILL_IMAGE_MAP[key] as any}
                      width={32}
                      height={32}
                      quality={100}
                      alt="nft"
                    />
                  </div>
                  <div className="line-clamp-1 break-all">
                    {tAbilities(key)}
                  </div>
                </div>
              ),
            }))}
            placeholder={t("selectAbility")}
            value={filters.ability}
            onChange={(value) => setFilters({ ...filters, ability: value })}
            color={SelectCollapseColor.PRIMARY}
            multiple
            isOpen={menuOpen === "ability"}
            onOpen={() => setMenuOpen("ability")}
          />
          {network === WalletNetwork.POLYGON && (
            <SelectCollapse
              options={MARKETPLACES.map((value) => ({
                value: value.id,
                render: (
                  <div className="flex flex-row gap-4 ">
                    <div className={`w-6 h-6 shrink-0 rounded-full relative`}>
                      <Image
                        src={value.image}
                        quality={100}
                        fill
                        sizes="32px"
                        className="object-contain object-center"
                        alt="nft"
                      />
                    </div>
                    <div>{value.name}</div>
                  </div>
                ),
              }))}
              placeholder={t("selectMarketplace")}
              color={SelectCollapseColor.PRIMARY}
              multiple
              isOpen={menuOpen === "marketplace"}
              onOpen={() => setMenuOpen("marketplace")}
              value={filters.marketplace}
              onChange={(value) =>
                setFilters({ ...filters, marketplace: value })
              }
            />
          )}
          <SelectCollapse
            options={new Array(18).fill(null).map((_, value) => ({
              value: (value + 1).toString(),
              render: <div>{t("greaterThan", { value: value + 1 })}</div>,
            }))}
            placeholder={t("selectPower")}
            color={SelectCollapseColor.PRIMARY}
            isOpen={menuOpen === "strength"}
            onOpen={() => setMenuOpen("strength")}
            value={filters.strength}
            onChange={(value) => setFilters({ ...filters, strength: value })}
          />
          <SelectCollapse
            options={new Array(18).fill(null).map((_, value) => ({
              value: (value + 1).toString(),
              render: <div>{t("greaterThan", { value: value + 1 })}</div>,
            }))}
            placeholder={t("selectSpeed")}
            color={SelectCollapseColor.PRIMARY}
            isOpen={menuOpen === "speed"}
            onOpen={() => setMenuOpen("speed")}
            value={filters.speed}
            onChange={(value) => setFilters({ ...filters, speed: value })}
          />
          <SelectCollapse
            options={new Array(18).fill(null).map((_, value) => ({
              value: (value + 1).toString(),
              render: <div>{t("greaterThan", { value: value + 1 })}</div>,
            }))}
            placeholder={t("selectStamina")}
            color={SelectCollapseColor.PRIMARY}
            isOpen={menuOpen === "stamina"}
            onOpen={() => setMenuOpen("stamina")}
            value={filters.stamina}
            onChange={(value) => setFilters({ ...filters, stamina: value })}
          />
          <div className="flex flex-row gap-4">
            <Select
              options={Object.keys(tokens).map((key) => ({
                value: tokens[key],
                render: (
                  <div className="relative w-6 h-6">
                    <Image
                      src={TOKENS_IDS_MAP_IMAGE[tokens[key]]}
                      fill
                      sizes="100px"
                      className="object-contain object-center"
                      alt="bcoin"
                    />
                  </div>
                ),
              }))}
              placeholder=""
              color={SelectCollapseColor.PRIMARY}
              value={filters.token}
              onChange={(value) => setFilters({ ...filters, token: value })}
            />
            <Input
              placeholder={t("minimumPrice")}
              color={InputColor.PRIMARY}
              type="number"
              className="max-w-[200px]"
              value={filters.amount}
              onChange={({ target: { value } }: any) =>
                setFilters({ ...filters, amount: value })
              }
              onClick={() => {
                if (filters.token === "") {
                  alert(t("selectTokenFirst"));
                }
              }}
            />
          </div>
          <Input
            iconLeft={
              <div className="relative w-6 h-6">
                <Image
                  src="/images/bomb.webp"
                  fill
                  sizes="100px"
                  className="object-contain object-center"
                  alt="bcoin"
                />
              </div>
            }
            placeholder={t("minimumStakeBcoin")}
            color={InputColor.PRIMARY}
            type="number"
            value={filters.stake}
            onChange={({ target: { value } }: any) =>
              setFilters({ ...filters, stake: value })
            }
          />
          <Input
            iconLeft={
              <div className="relative w-6 h-6">
                <Image
                  src="/images/sen.webp"
                  fill
                  sizes="100px"
                  className="object-contain object-center"
                  alt="bcoin"
                />
              </div>
            }
            placeholder={t("minimumStakeSen")}
            color={InputColor.PRIMARY}
            type="number"
            value={filters.stakeSen}
            onChange={({ target: { value } }: any) =>
              setFilters({ ...filters, stakeSen: value })
            }
          />
          {network === WalletNetwork.BSC && (
            <SelectCollapse
              options={[
                {
                  value: "1",
                  render: t("heroS"),
                },
                {
                  value: "0",
                  render: t("heroLegacy"),
                },
              ]}
              placeholder={t("heroType")}
              color={SelectCollapseColor.PRIMARY}
              isOpen={menuOpen === "abilityHeroS"}
              onOpen={() => setMenuOpen("abilityHeroS")}
              value={filters.abilityHeroS}
              multiple
              onChange={(value) =>
                setFilters({ ...filters, abilityHeroS: value })
              }
            />
          )}
          <SelectCollapse
            options={[
              {
                value: "amount_DESC",
                render: t("highPrice"),
              },
              {
                value: "amount_ASC",
                render: t("lowPrice"),
              },
              {
                value: "rarityIndex_DESC",
                render: t("rarity"),
              },
              {
                value: "marketPlace_ASC",
                render: t("marketPlace"),
              },
              {
                value: "stake_DESC",
                render: t("highStakeBcoin"),
              },
              {
                value: "stake_ASC",
                render: t("lowStakeBcoin"),
              },
              {
                value: "stakeSen_DESC",
                render: t("highStakeSen"),
              },
              {
                value: "stakeSen_ASC",
                render: t("lowStakeSen"),
              },
            ]}
            placeholder={t("orderBy")}
            color={SelectCollapseColor.PRIMARY}
            isOpen={menuOpen === "order"}
            onOpen={() => setMenuOpen("order")}
            value={filters.order}
            onChange={(value) => setFilters({ ...filters, order: value })}
          />
        </Modal>
      )}
    </ModalPortal>
  );
}

export default FiltersModal;
