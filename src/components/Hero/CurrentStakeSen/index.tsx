"use client";

import { WalletNetwork } from "@/application/entities/wallet";
import HeroStats, { HeroStatsType } from "@/components/Hero/HeroStats";
import HeroStatsSkeleton from "@/components/Hero/HeroStats/Skeleton";
import { getNumberFormatOptions } from "@/util/number";
import { NAMES_TOKENS_IDS_MAP } from "@/util/reward";
import { getStakeHero } from "@/util/web3";
import { useFormatter } from "next-intl";
import { useEffect, useState } from "react";

interface ICurrentStakeSen {
  id: string;
  network: WalletNetwork;
  stakeSen: number;
  bordered?: boolean;
}

function CurrentStakeSen({
  bordered,
  id,
  network,
  stakeSen,
}: ICurrentStakeSen) {
  const [current, setCurrent] = useState<number>(stakeSen);
  const [isLoading, setIsLoading] = useState(false);
  const f = useFormatter();
  useEffect(() => {
    setCurrent(stakeSen);
  }, [stakeSen]);

  const update = async () => {
    try {
      setIsLoading(true);
      const token =
        network === WalletNetwork.BSC
          ? NAMES_TOKENS_IDS_MAP.SEN_BSC
          : NAMES_TOKENS_IDS_MAP.SEN_POLYGON;
      const result = await getStakeHero(id, token, network);
      setCurrent(result);
      setIsLoading(false);
    } catch (e) {
      alert("Error updating stake sen");
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
      type={HeroStatsType.STAKE_SENS}
      value={f.number(current, getNumberFormatOptions(0))}
    />
  );
}

export default CurrentStakeSen;
