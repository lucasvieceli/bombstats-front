import { ENV_API_URL } from "@/util/env";

interface IGetTopWalletStakesGlobal {
  token: string;
}

export interface ITopTwentyWalletsStake {
  wallets: {
    stake: number;
    stakeSen: number;
    positionBcoin: number;
    positionSen: number;
    wallet: string;
  }[];
  amount: number;
  average: number;
  totalWallets: number;
}

export async function getTopWalletStakesGlobal({
  token,
}: IGetTopWalletStakesGlobal): Promise<ITopTwentyWalletsStake> {
  const response = await fetch(
    `${ENV_API_URL}/polygon/stake/top-wallets-global?token=${token}`,
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
