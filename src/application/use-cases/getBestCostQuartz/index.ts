import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetBestCostQuartz {
  network: WalletNetwork;
}

export interface IBestCostQuartz {
  bestRarity: {
    rarityIndex: number;
    source: string;
    price: number;
    heroId: string;
  };
  items: Array<{
    rarityIndex: number;
    quartz: number;
    quartzBcoin: {
      price: number;
      priceEveryFiveQuartz: number;
      priceInMainToken: number;
    };
    quartzSen: {
      price: number;
      priceEveryFiveQuartz: number;
      priceInMainToken: number;
    };
    openSea: {
      id: string;
      price: number;
      priceEveryFiveQuartz: number;
    };
    marketBcoin: {
      id: string;
      price: number;
      priceInMainToken: number;
      priceEveryFiveQuartz: number;
    };
  }>;
  senInMainToken: number;
  bcoinInMainToken: number;
  mainToken: number;
}

export async function getBestCostQuartz({
  network,
}: IGetBestCostQuartz): Promise<IBestCostQuartz> {
  const response = await fetch(
    `${ENV_API_URL}/${network}/hero/best-cost-quartz`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IBestCostQuartz;
}
