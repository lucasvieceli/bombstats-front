import { Hero } from "@/application/entities/hero";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";
import { IPaginate, IPaginateOptions } from "@/util/paginate";
import qs from "qs";

type IParams = {
  rarity: string[];
  ability: string[];
  marketplace: string[];
  strength: string;
  speed: string;
  stamina: string;
  token: string;
  amount: string;
  stake: string;
  stakeSen: string;
} & IPaginateOptions;

interface IGetRetailHeroes {
  network: WalletNetwork;
  params: IParams;
}

export async function getRetailHeroes({
  network,
  params,
}: IGetRetailHeroes): Promise<IPaginate<Hero>> {
  const queryParams = qs.stringify(params);

  const response = await fetch(
    `${ENV_API_URL}/${network}/hero/retail?${queryParams}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IPaginate<Hero>;
}
