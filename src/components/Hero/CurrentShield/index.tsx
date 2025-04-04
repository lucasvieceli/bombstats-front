"use client";

import { WalletNetwork } from "@/application/entities/wallet";
import { getCurrentShieldHero } from "@/application/use-cases/getCurrentShieldHero";
import HeroStats, { HeroStatsType } from "@/components/Hero/HeroStats";
import HeroStatsSkeleton from "@/components/Hero/HeroStats/Skeleton";
import { useEffect, useState } from "react";

interface ICurrentShieldHero {
  id: string;
  network: WalletNetwork;
  maxShield?: number;
  bordered?: boolean;
}

function CurrentShieldHero({ bordered, ...data }: ICurrentShieldHero) {
  const [current, setCurrent] = useState<undefined | string>(
    data.maxShield?.toString()
  );

  useEffect(() => {
    async function fetchData() {
      const result = await getCurrentShieldHero(data);
      setCurrent(result);
    }
    fetchData();
  }, [data]);

  if (current === "") return <HeroStatsSkeleton bordered={bordered} />;

  const update = async () => {
    const result = await getCurrentShieldHero(data);
    setCurrent(result);
  };

  return (
    <HeroStats
      onClick={update}
      title="Click to update"
      className="hover:bg-secondaryHover cursor-pointer"
      bordered={bordered}
      type={HeroStatsType.MAX_SHIELD}
      value={current || data.maxShield || 0}
    />
  );
}

export default CurrentShieldHero;
