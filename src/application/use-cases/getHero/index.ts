import { Hero } from "@/application/entities/hero";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetHero {
  id: string | number;
  network: WalletNetwork;
}

export async function getHero({ network, id }: IGetHero): Promise<Hero> {
  const response = await fetch(`${ENV_API_URL}/${network}/hero/${id}`, {
    // next: {
    //   revalidate: 60,
    // },
    cache: "no-cache",
  });
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as Hero;
}
