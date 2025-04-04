"use client";

import { RetailType } from "@/app/[network]/retail/[nft]/content";
import FiltersHeroButton from "@/app/[network]/retail/[nft]/FiltersHeroButton";
import FiltersHouseButton from "@/app/[network]/retail/[nft]/FiltersHouseButton";
import Menu from "@/components/Header/Menu";
import NetworkSelect from "@/components/NetworkSelect";

interface HeaderRetailProps {
  nft: RetailType;
}
function HeaderRetail({ nft }: HeaderRetailProps) {
  return (
    <div className="flex flex-col items-start md:flex-row gap-6">
      <div className="flex flex-row w-full items-start gap-4 flex-wrap">
        <Menu />
        <div className="flex flex-row gap-4 flex-1 justify-between">
          {nft === RetailType.hero ? (
            <FiltersHeroButton />
          ) : (
            <FiltersHouseButton />
          )}
          <NetworkSelect />
        </div>
      </div>
    </div>
  );
}
export default HeaderRetail;
