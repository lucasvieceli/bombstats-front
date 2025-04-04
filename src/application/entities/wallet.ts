import { ClaimRankingWallet } from "@/application/entities/claimRankingWallet";
import { FarmAverage } from "@/application/entities/farmAverage";
import { StakeRankingWallet } from "@/application/entities/stakeRankingWallet";
import { StakeRankingWalletGlobal } from "@/application/entities/stakeRankingWalletGlobal";

export enum WalletNetwork {
  BSC = "BSC",
  POLYGON = "POLYGON",
}

export enum WalletStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface Wallet {
  id: string;
  walletId: string;
  createdAt: Date;
  updatedAt: Date;
  extensionInstalled: boolean;
  network: WalletNetwork | null;
  stakeRankingWallet?: StakeRankingWallet;
  stakeSenRankingWallet?: StakeRankingWallet;
  claimRankingWallet?: ClaimRankingWallet;
  stakeRankingWalletGlobal?: StakeRankingWalletGlobal;
  farmAverage?: FarmAverage;
  // farmSessions: FarmSession[];
  // maps: Map[];
  // mapBlocks: MapBlock[];
}
