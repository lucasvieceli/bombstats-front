"use client";

import FiltersHouseModal from "@/app/[network]/retail/[nft]/FiltersHouseModal";
import { useGetHousesFilters } from "@/app/[network]/retail/[nft]/hooks/useGetHousesFilters";
import Search from "@/components/icons/Search";
import { useTranslations } from "next-intl";
import { useState } from "react";

function FiltersHouseButton() {
  const t = useTranslations("market");
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useGetHousesFilters();

  const qtyFilters = Object.keys(filters)
    .filter((v) => v !== "token" && v !== "order")
    .filter((key) => (filters as any)[key].length > 0);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-secondary rounded-3xl overflow-hidden px-5 flex flex-row items-center h-14 gap-2.5 hover:bg-secondaryHover cursor-pointer"
      >
        <Search className="w-6 h-6" />
        <div className="hidden md:block">
          {t("filters")} ({qtyFilters.length})
        </div>
      </div>
      <FiltersHouseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default FiltersHouseButton;
