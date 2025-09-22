"use client";

import HeaderRetail from "@/app/[network]/real-time-retail/Header";
import Heroes from "@/app/[network]/real-time-retail/Heroes";
import Houses from "@/app/[network]/real-time-retail/Houses";
import Status from "@/app/[network]/real-time-retail/Status";
import { IRetailData, useSocket } from "@/providers/websocket";
import { randomId } from "@/util/number";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import AdBanner from "@/components/AdsBanner";

enum RetailType {
  hero = "hero",
  house = "house",
}

export interface IValue extends IRetailData {
  id: number;
  date: Date;
}

function RealTimeRetailContent({ searchParams: { nft = "hero" } }: any) {
  const t = useTranslations("realTimeRetail");

  const typeString = decodeURI(nft).toLocaleLowerCase() as RetailType;
  const exists = Object.values(RetailType).includes(typeString);

  const [houses, setHouses] = useState<IValue[]>([]);
  const [heroes, setHeroes] = useState<IValue[]>([]);

  const { connect, status } = useSocket();

  useEffect(() => {
    const socket = connect();

    const onRetail = (data: IRetailData) => {
      if (data.hero) {
        setHeroes((prev) => {
          return [
            { ...(data as IValue), id: randomId(), date: new Date() },
            ...prev.filter((item) => item.hero?.id !== data.hero?.id),
          ];
        });
      } else if (data.house) {
        setHouses((prev) => {
          return [
            { ...(data as IValue), id: randomId(), date: new Date() },
            ...prev.filter((item) => item.house?.id !== data.house?.id),
          ];
        });
      }
    };
    socket.on("retail", onRetail);

    return () => {
      socket.off("retail", onRetail);
      socket.disconnect();
    };
  }, [connect]);

  if (!exists) {
    return (
      <div className="text-22 font-extrabold text-center">
        {t("invalidType")}
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full gap-6">
      {/* <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div> */}
      <HeaderRetail />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-22 font-extrabold flex flex-row justify-between gap-2">
            {t("heroes")} <Status status={status} />
          </h1>
          {typeString == "house" ? (
            <Houses houses={houses} />
          ) : (
            <Heroes heroes={heroes} />
          )}
        </div>
      </div>
    </main>
  );
}

export default RealTimeRetailContent;
