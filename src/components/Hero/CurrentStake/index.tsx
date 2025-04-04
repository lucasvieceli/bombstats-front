"use client";

import { WalletNetwork } from "@/application/entities/wallet";
import HeroStats, { HeroStatsType } from "@/components/Hero/HeroStats";
import HeroStatsSkeleton from "@/components/Hero/HeroStats/Skeleton";
import { getNumberFormatOptions } from "@/util/number";
import { NAMES_TOKENS_IDS_MAP } from "@/util/reward";
import { getStakeHero } from "@/util/web3";
import { useFormatter } from "next-intl";
import { useEffect, useState } from "react";

interface ICurrentStake {
  id: string;
  network: WalletNetwork;
  stake: number;
  bordered?: boolean;
}

function CurrentStake({ bordered, id, network, stake }: ICurrentStake) {
  const [current, setCurrent] = useState<number>(stake);
  const [isLoading, setIsLoading] = useState(false);
  const f = useFormatter();

  useEffect(() => {
    setCurrent(stake);
  }, [stake]);

  const update = async () => {
    try {
      setIsLoading(true);
      const token =
        network === WalletNetwork.BSC
          ? NAMES_TOKENS_IDS_MAP.BCOIN_BSC
          : NAMES_TOKENS_IDS_MAP.BCOIN_POLYGON;
      const result = await getStakeHero(id, token, network);
      setCurrent(result);
      setIsLoading(false);
    } catch (e) {
      alert("Error updating stake");
      setIsLoading(false);
    }
  };

  if (isLoading) return <HeroStatsSkeleton bordered={bordered} />;
  return (
    <HeroStats
      onClick={update}
      title="Click to update"
      className="cursor-pointer"
      bordered={bordered}
      type={HeroStatsType.STAKE}
      value={f.number(current, getNumberFormatOptions(0))}
    />
  );
}

export default CurrentStake;
