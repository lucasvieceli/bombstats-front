import { TOKENS_IDS_MAP } from "@/util/reward";

export interface Stake {
  amount: number;
  date: string;
  withdraw: number;
  token: keyof typeof TOKENS_IDS_MAP;
  heroId: number;
  rarity: number;
}
