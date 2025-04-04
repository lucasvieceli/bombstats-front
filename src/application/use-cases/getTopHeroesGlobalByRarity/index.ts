import { Hero } from "@/application/entities/hero";
import { StakeRankingHero } from "@/application/entities/stakeRankingHero";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetTopTwentyRarityHeroes {
  network: WalletNetwork;
  rarity: number;
  token: string;
}

export interface IGetTopHeroesGlobalByRarity {
  heroes: StakeRankingHero[];
  amount: number;
  average: number;
  totalHeroes: number;
}

export async function getTopHeroesGlobalByRarity({
  network,
  token,
  rarity,
}: IGetTopTwentyRarityHeroes): Promise<IGetTopHeroesGlobalByRarity> {
  const response = await fetch(
    `${ENV_API_URL}/${network}/stake/top-heroes-global-by-rarity/${rarity}?token=${token}`,
    {
      // next: {
      //   revalidate: 60,
      // },
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IGetTopHeroesGlobalByRarity;
}
