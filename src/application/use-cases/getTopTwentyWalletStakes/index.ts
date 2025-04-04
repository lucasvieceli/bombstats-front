import { Hero } from "@/application/entities/hero";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetTopTwentyWalletStakes {
  network: WalletNetwork;
  token: string;
}

export interface ITopTwentyWalletsStake {
  wallets: {
    stake: number;
    stakeSen: number;
    position: number;
    wallet: string;
  }[];
  amount: number;
  average: number;
  totalWallets: number;
}

export async function getTopTwentyWalletStakes({
  network,
  token,
}: IGetTopTwentyWalletStakes): Promise<ITopTwentyWalletsStake> {
  const response = await fetch(
    `${ENV_API_URL}/${network}/stake/top-twenty-wallets?token=${token}`,
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

  return (await response.json()) as ITopTwentyWalletsStake;
}
