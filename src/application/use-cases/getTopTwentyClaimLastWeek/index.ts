import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetTopTwentyClaimLastWeek {
  network: WalletNetwork;
}

export interface ITopTwentyClaimLastWeek {
  wallets: {
    wallet: string;
    amount: number;
    average: number;
    position: number;
  }[];
  amount: number;
  average: number;
  totalWallets: number;
}

export async function getTopTwentyClaimLastWeek({
  network,
}: IGetTopTwentyClaimLastWeek): Promise<ITopTwentyClaimLastWeek> {
  const response = await fetch(
    `${ENV_API_URL}/${network}/claim/top-twenty-wallets`,
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

  return (await response.json()) as ITopTwentyClaimLastWeek;
}
