import { Hero } from "@/application/entities/hero";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetTopTwentyRarityHeroes {
  network: WalletNetwork;
  rarity: number;
  token: string;
}

export interface ITopTwentyRarityHeroes {
  heroes: {
    hero: Hero;
    heroId: string;
    stake: number;
    stakeSen: number;
    positionBcoin: number;
    positionSen: number;
  }[];
  amount: number;
  average: number;
  totalHeroes: number;
}

export async function getTopTwentyRarityHeroes({
  network,
  token,
  rarity,
}: IGetTopTwentyRarityHeroes): Promise<ITopTwentyRarityHeroes> {
  const response = await fetch(
    `${ENV_API_URL}/${network}/stake/top-twenty-heroes-by-rarity/${rarity}?token=${token}`,
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

  return (await response.json()) as ITopTwentyRarityHeroes;
}
