import { WalletNetwork } from "@/application/entities/wallet";

export interface House {
  id: string;
  index: number;
  rarity: number;
  recovery: number;
  capacity: number;
  blockNumber: number;
  name: string;
  network: WalletNetwork;
  wallet: string;
  openSeaPrice?: number;
  marketPrice?: number;
  marketToken?: string;
  contractAddress?: string;
}
