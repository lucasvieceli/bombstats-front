"use client";
import { House as HouseEntity } from "@/application/entities/house";
import Card, { CardContent } from "@/components/Card";
import ClipboardButton from "@/components/ClipboardButton";
import SeeWallet from "@/components/House/SeeWallet";
import LinkNetwork from "@/components/LinkNetwork";
import SaleButton from "@/components/SaleButton";
import SoldNft from "@/components/SoldNft";
import { HOUSE_TYPE_MAP } from "@/util/house";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface HouseProps {
  data: HouseEntity;
  openNewWindow?: boolean;
  sold?: {
    price: number;
    token: string;
    marketPlace: "opensea" | "market";
  };
  footer?: React.ReactNode;
  className?: string;
}

export default function House({
  data,
  sold,
  openNewWindow,
  footer,
  className,
}: HouseProps) {
  const t = useTranslations("component.house");
  const item = HOUSE_TYPE_MAP[data.rarity];

  return (
    <Card className={`!py-0 ${className}`}>
      <CardContent className="!p-0 !gap-0  !py-0">
        <div className="flex flex-col md:flex-row p-4 gap-4 items-center">
          <div className="h-16 min-w-16 w-auto relative shrink-0">
            <Image
              src={item.image}
              fill
              sizes="auto"
              alt={item.name}
              className="object-contain object-center md:object-left"
              quality={100}
            />
          </div>
          <div className="flex flex-col min-w-[116px] items-center md:items-start">
            <h3 className="text-16 font-semibold text-center md:text-left">
              {item.name}
            </h3>
            <div className="text-12 flex flex-row items-center text-center md:text-left">
              <LinkNetwork
                href={`/house/${data.id}`}
                target={openNewWindow ? "_blank" : undefined}
              >
                #{data.id}
              </LinkNetwork>
              <ClipboardButton className="w-3 h-3 ml-1" value={data.id} />
            </div>
            <SeeWallet
              data={data}
              target={openNewWindow ? "_blank" : undefined}
            />
          </div>
          <div className="flex flex-row gap-5 justify-center md:gap-4 md:justify-between">
            <div>
              <div className="text-12 text-white/60">{t("size")}</div>
              <div className="text-12">{item.size}</div>
            </div>
            <div>
              <div className="text-12 text-white/60">{t("charge")}</div>
              <div className="text-12">{item.charge}</div>
            </div>
            <div>
              <div className="text-12 text-white/60">{t("capacity")}</div>
              <div className="text-12">{item.capacity}</div>
            </div>
          </div>
          {!sold && (data.marketPrice || data.openSeaPrice) && (
            <div className="flex flex-row gap-1.5 flex-wrap justify-center">
              {data.openSeaPrice && (
                <SaleButton
                  typeSale="OPEN_SEA"
                  price={data.openSeaPrice}
                  typeNft="house"
                  id={data.id}
                />
              )}
              {data.marketPrice && (
                <SaleButton
                  typeSale="MARKET"
                  price={data.marketPrice}
                  token={data.marketToken}
                  id={data.id}
                  typeNft="house"
                />
              )}
            </div>
          )}
          {sold && (
            <SoldNft
              price={sold.price}
              token={sold.token}
              marketPlace={sold.marketPlace}
            />
          )}
        </div>
        {footer}
      </CardContent>
    </Card>
  );
}
