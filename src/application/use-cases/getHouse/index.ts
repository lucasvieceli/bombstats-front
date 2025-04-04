import { House } from "@/application/entities/house";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetHouse {
  id: string | number;
  network: WalletNetwork;
}

export async function getHouse({ network, id }: IGetHouse): Promise<House> {
  const response = await fetch(`${ENV_API_URL}/${network}/house/${id}`, {
    // next: {
    //   revalidate: 60,
    // },
    cache: "no-cache",
  });
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as House;
}
