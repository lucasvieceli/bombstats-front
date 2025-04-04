import { Hero } from "@/application/entities/hero";
import { House } from "@/application/entities/house";
import { Stake } from "@/application/entities/stake";
import { Wallet, WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetWallet {
  wallet: string;
  network: WalletNetwork;
}

export interface IGetWalletResponse {
  walletId: string;
  online: boolean;
  heroes: Hero[];
  houses: House[];
  tokens: {
    bomb: number;
    sen: number;
    rock: number;
  };
  wallet?: Wallet;
  stakes: Stake[];
}

export async function getWallet({
  network,
  wallet,
}: IGetWallet): Promise<IGetWalletResponse> {
  const response = await fetch(`${ENV_API_URL}/${network}/wallet/${wallet}`, {
    // next: {
    //   revalidate: 60,
    // },
    cache: "no-cache",
  });
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IGetWalletResponse;
}
