"use client";

import { useGetHousesFilters } from "@/app/[network]/retail/[nft]/hooks/useGetHousesFilters";
import { WalletNetwork } from "@/application/entities/wallet";
import Close from "@/components/icons/Close";
import Input, { InputColor } from "@/components/Input";
import Modal from "@/components/Modal";
import ModalPortal from "@/components/Modal-portal";
import Select from "@/components/Select";
import SelectCollapse, {
  SelectCollapseColor,
} from "@/components/SelectCollapse";
import { HOUSE_NAMES_ARRAY, HOUSE_TYPE_MAP } from "@/util/house";
import {
  TOKENS_BSC,
  TOKENS_IDS_MAP_IMAGE,
  TOKENS_POLYGON,
} from "@/util/reward";
import { MARKETPLACES } from "@/util/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IFiltersHouseModal {
  isOpen: boolean;
  onClose: () => void;
}

function FiltersHouseModal({ isOpen, onClose }: IFiltersHouseModal) {
  const t = useTranslations("market.houses.filtersHouseModal");
  const params = useParams();
  const [menuOpen, setMenuOpen] = useState("");

  const network = (params.network as String).toUpperCase() as WalletNetwork;

  const tokens =
    network === WalletNetwork.POLYGON ? TOKENS_POLYGON : TOKENS_BSC;

  const filterContext = useGetHousesFilters();

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
                  <div>{name}</div>
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
                value: "rarity_DESC",
                render: t("rarity"),
              },
              {
                value: "marketPlace_ASC",
                render: t("marketPlace"),
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

export default FiltersHouseModal;
