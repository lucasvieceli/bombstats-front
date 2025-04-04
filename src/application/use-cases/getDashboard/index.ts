import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";

interface IGetDashboard {
  network: WalletNetwork;
}

export interface IDashboard {
  stake: {
    heroes: number;
    average: number;
    amount: number;
  };
  stakeSen: {
    heroes: number;
    average: number;
    amount: number;
  };
  tokens: {
    sens: {
      price: number;
      percentage: number;
    };
    matic: {
      price: number;
      percentage: number;
    };
    bnb: {
      price: any;
      percentage: any;
    };
    bcoin: {
      price: number;
      percentage: number;
    };
  };
  extension: {
    online: number;
    installed: number;
    total: {
      connectedRetail: number;
      connectionsClients: number;
      connectionsExtension: number;
    };
    accounts: string[];
  };
}

export async function getDashboard({
  network,
}: IGetDashboard): Promise<IDashboard> {
  const response = await fetch(
    `${ENV_API_URL}/extension/dashboard/${network}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    console.log(response.statusText, await response.json());
    throw new Error(response.statusText);
  }

  return (await response.json()) as IDashboard;
}
