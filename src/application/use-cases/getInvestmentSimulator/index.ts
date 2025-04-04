import { Hero } from "@/application/entities/hero";
import { House } from "@/application/entities/house";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetHero {
  network: WalletNetwork;
  houseRarity?: number;
  quantityHeroes: {
    rarity: number;
    quantity: number;
    stakeBcoin: number;
    stakeSen: number;
  }[];
  stake: string[];
}

export interface IGetInvestmentSimulator {
  heroes: Array<{
    hero: Hero;
    tokens: Record<string, number>;
    valueUSD: number;
    marketplace: string;
    stakeSen: number;
    stakeBcoin: number;
  }>;
  house: {
    house: House;
    token: string;
    valueUSD: number;
    marketplace: string;
    value: number;
  };
  tokens: Record<string, number>;
}

export async function getInvestmentSimulator({
  network,
  houseRarity,
  quantityHeroes,
  stake,
}: IGetHero): Promise<IGetInvestmentSimulator> {
  const response = await fetch(`${ENV_API_URL}/${network}/wallet/simulator`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      houseRarity,
      quantityHeroes,
      stake,
    }),
  });
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IGetInvestmentSimulator;
}
