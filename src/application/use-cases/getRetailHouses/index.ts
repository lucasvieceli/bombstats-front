import { House } from "@/application/entities/house";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";
import { IPaginate, IPaginateOptions } from "@/util/paginate";
import qs from "qs";

type IParams = {
  rarity: string[];
  marketplace: string[];
  token: string;
  amount: string;
} & IPaginateOptions;

interface IGetRetailHouses {
  network: WalletNetwork;
  params: IParams;
}

export async function getRetailHouses({
  network,
  params,
}: IGetRetailHouses): Promise<IPaginate<House>> {
  const queryParams = qs.stringify(params);

  const response = await fetch(
    `${ENV_API_URL}/${network}/house/retail?${queryParams}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IPaginate<House>;
}
