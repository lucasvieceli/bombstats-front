"use client";
import { Hero as HeroEntity } from "@/application/entities/hero";
import { WalletNetwork } from "@/application/entities/wallet";
import ClipboardButton from "@/components/ClipboardButton";
import CurrentStake from "@/components/Hero/CurrentStake";
import CurrentStakeSen from "@/components/Hero/CurrentStakeSen";
import HeroStats, { HeroStatsType } from "@/components/Hero/HeroStats";
import SeeWallet from "@/components/Hero/SeeWallet";
import RankingPosition from "@/components/icons/RankingPosition";
import SaleButton from "@/components/SaleButton";
import SoldNft from "@/components/SoldNft";
import {
  HERO_COLORS,
  parseHeroAbilityImage,
  parseHeroSkinImage,
} from "@/util/hero";
import { NAMES_TOKENS_IDS_MAP } from "@/util/reward";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  data: HeroEntity;
  positionRanking?: number;
  openNewWindow?: boolean;
  sold?: {
    price: number;
    token: string;
    marketPlace: "opensea" | "market";
  };
  footer?: React.ReactNode;
}

export default function Hero({
  data,
  sold,
  positionRanking,
  openNewWindow,
  footer,
}: HeroProps) {
  const t = useTranslations("component.hero");
  const tRarity = useTranslations("component.hero.rarity");

  return (
    <div className="flex flex-row rounded-2xl overflow-hidden bg-secondary">
      <div
        className={`w-[15px] shrink-0`}
        style={{ background: HERO_COLORS[data.rarityIndex] }}
      ></div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row items-center w-full gap-4 py-4 px-4">
          {positionRanking && (
            <RankingPosition position={positionRanking} width={24} />
          )}
          <div className="relative h-16 w-16 shrink-0">
            <Image
              src={parseHeroSkinImage(data.skinValue, data.variant)}
              fill
              sizes="64px"
              className="object-contain object-center"
              alt="Hero"
            />
            {data.abilityHeroS.includes(1) && (
              <div className="absolute bottom-0 right-0 h-8 w-8 shrink-0">
                <Image
                  src="/images/hero-s.webp"
                  fill
                  sizes="32px"
                  className="object-contain object-right-bottom"
                  alt="Hero"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-16 font-semibold min-w-[116px] text-center md:text-left">
              {tRarity(data.rarity)}
            </h3>
            <div className="text-12 flex flex-row justify-center md:justify-start">
              <div>
                <Link
                  href={`/${data.network?.toLowerCase()}/hero/${data.id}`}
                  target={openNewWindow ? "_blank" : undefined}
                >
                  #{data.id}
                </Link>
              </div>
              <ClipboardButton value={data.id} className="pl-1 h-4 w-4" />
            </div>
            <SeeWallet
              data={data}
              target={openNewWindow ? "_blank" : undefined}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex flex-row gap-3 flex-wrap items-center justify-center md:justify-start">
              <HeroStats
                type={HeroStatsType.POWER}
                value={data.strength + Math.max(data.level - 1, 0)}
              />
              <HeroStats type={HeroStatsType.SPEED} value={data.speed} />
              <HeroStats type={HeroStatsType.STAMINA} value={data.stamina} />
              <HeroStats type={HeroStatsType.BOMB} value={data.capacity} />
              <HeroStats type={HeroStatsType.RANGE} value={data.range} />
              <HeroStats
                type={HeroStatsType.MAX_SHIELD}
                value={data.maxShield}
              />
              <CurrentStake
                stake={data.stake}
                network={data.network as WalletNetwork}
                id={data.id}
              />
              <CurrentStakeSen
                stakeSen={data.stakeSen}
                network={data.network as WalletNetwork}
                id={data.id}
              />
            </div>
            <div className="flex flex-row gap-1.5 flex-wrap justify-center md:justify-start">
              {data.abilities.map((ability) => (
                <div className="w-8 h-8 relative shrink-0" key={ability}>
                  <Image
                    src={parseHeroAbilityImage(ability)}
                    alt={ability}
                    title={t(`abilities.${ability}`)}
                    fill
                    sizes="auto"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
            {!sold && (data.marketPrice || data.openSeaPrice) && (
              <div className="flex flex-col lg:flex-row gap-1.5 justify-center md:justify-start">
                {data.openSeaPrice && (
                  <SaleButton
                    typeSale="OPEN_SEA"
                    price={data.openSeaPrice}
                    token={NAMES_TOKENS_IDS_MAP.MATIC}
                    id={data.id}
                    typeNft="hero"
                  />
                )}
                {data.marketPrice && (
                  <SaleButton
                    typeSale="MARKET"
                    price={data.marketPrice}
                    token={data.marketToken}
                    id={data.id}
                    typeNft="hero"
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
        </div>
        {footer}
      </div>
    </div>
  );
}
