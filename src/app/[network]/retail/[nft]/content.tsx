"use client";

import HeaderRetail from "@/app/[network]/retail/[nft]/Header";
import Heroes from "@/app/[network]/retail/[nft]/Heroes";
import { RetailHeroesFiltersContextProvider } from "@/app/[network]/retail/[nft]/hooks/useGetHeroesFIlters";
import { RetailHousesFiltersContextProvider } from "@/app/[network]/retail/[nft]/hooks/useGetHousesFilters";
import Houses from "@/app/[network]/retail/[nft]/Houses";
import AdBanner from "@/components/AdsBanner";
import { useParams } from "next/navigation";
export enum RetailType {
  hero = "heroes",
  house = "houses",
}
function Content() {
  const { nft } = useParams();
  const typeString = decodeURI(nft as string).toLocaleLowerCase() as RetailType;

  if (typeString == RetailType.hero) {
    return (
      <RetailHeroesFiltersContextProvider>
        <main className="flex flex-col w-full gap-6">
          {/* <div className="flex justify-center">
            <AdBanner
              dataAdFormat=""
              dataAdSlot="1113269798"
              dataFullWidthResponsive={false}
              style={{ width: "728px", height: "90px" }}
            />
          </div> */}
          <HeaderRetail nft={typeString} />
          <div className="flex flex-col gap-6">
            <Heroes />
          </div>
        </main>
      </RetailHeroesFiltersContextProvider>
    );
  } else if (typeString == RetailType.house) {
    return (
      <RetailHousesFiltersContextProvider>
        <main className="flex flex-col w-full gap-6">
          {/* <AdBanner
            dataAdFormat="auto"
            dataAdSlot="5812563135"
            dataFullWidthResponsive={true}
          /> */}
          <HeaderRetail nft={typeString} />
          <div className="flex flex-col gap-6">
            <Houses />
          </div>
        </main>
      </RetailHousesFiltersContextProvider>
    );
  }

  return null;
}
export default Content;
