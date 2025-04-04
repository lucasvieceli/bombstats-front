import { Hero } from "@/application/entities/hero";

export interface StakeRankingHero {
  id: string;
  stake: number;
  stakeSen: number;
  network: string;
  heroId: number;
  hero?: Hero;
  rarity: number;
  wallet: string;
  positionBcoin: number;
  positionBcoinGlobal: number;
  positionSen: number;
  positionSenGlobal: number;
  createdAt: string;
  updatedAt: string;
}
