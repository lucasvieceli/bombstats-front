"use client";

import FiltersModal from "@/app/[network]/retail/[nft]/FiltersModal";
import { useGetHeroesFilters } from "@/app/[network]/retail/[nft]/hooks/useGetHeroesFIlters";
import Search from "@/components/icons/Search";
import { useState } from "react";
import { useTranslations } from "next-intl";

function FiltersHeroButton() {
  const t = useTranslations("market");
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useGetHeroesFilters();

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
      <FiltersModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default FiltersHeroButton;
