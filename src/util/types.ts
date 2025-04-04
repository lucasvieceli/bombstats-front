import { WalletNetwork } from "@/application/entities/wallet";

export interface PageParams {
  params?: { [key: string]: string | undefined };
  searchParams?: { [key: string]: string | undefined };
}

export interface ErrorRequest {
  message: string;
  error: string;
  statusCode: number;
}

export const MARKETPLACES = [
  {
    id: "opensea",
    name: "OpenSea",
    image: "/images/opensea.webp",
    network: [WalletNetwork.POLYGON],
  },
  {
    id: "market",
    name: "Market",
    image: "/images/market.webp",
    network: [WalletNetwork.POLYGON, WalletNetwork.BSC],
  },
];
