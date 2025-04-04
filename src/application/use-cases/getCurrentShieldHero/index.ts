import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetCurrentShieldHero {
  network: WalletNetwork;
  id: string;
}

export async function getCurrentShieldHero({
  network,
  id,
}: IGetCurrentShieldHero): Promise<string | undefined> {
  const response = await fetch(
    `https://api.bombcrypto.io/shield/hero?heroId=${id}&network=${network.toLowerCase()}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    return undefined;
  }

  const result = await response.json();

  if (result.success) {
    return result.message.shieldAmount;
  }

  return undefined;
}
