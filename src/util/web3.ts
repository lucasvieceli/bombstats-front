import { WalletNetwork } from "@/application/entities/wallet";
import Web3 from "web3";

interface RpcUrl {
  url: string;
  online: boolean;
  latency?: number;
}

const rpcUrlsPolygon: RpcUrl[] = [
  // { url: 'https://polygon-rpc.com', online: true },
  { url: "https://rpc.ankr.com/polygon", online: true },
  { url: "https://rpc-mainnet.maticvigil.com", online: true },
  { url: "https://rpc-mainnet.matic.quiknode.pro", online: true },
  { url: "https://rpc-mainnet.matic.network", online: true },
  { url: "https://matic-mainnet.chainstacklabs.com", online: true },
  { url: "https://polygon-bor-rpc.publicnode.com", online: true },
  { url: "https://matic-mainnet-full-rpc.bwarelabs.com", online: true },
  { url: "https://polygon.gateway.tenderly.co", online: true },
  { url: "https:///polygon.drpc.org", online: true },
];

const rpcUrlsBsc: RpcUrl[] = [
  { url: "https://bsc-dataseed.binance.org", online: true },
  { url: "https://bsc-dataseed1.bnbchain.org", online: true },
  { url: "https://bsc-dataseed2.bnbchain.org", online: true },
  { url: "https://bsc-dataseed3.bnbchain.org", online: true },
  { url: "https://bsc-dataseed4.bnbchain.org", online: true },
  { url: "https://bsc-dataseed1.defibit.io", online: true },
  { url: "https://bsc-dataseed2.defibit.io", online: true },
  { url: "https://bsc-dataseed3.defibit.io", online: true },
  { url: "https://bsc-dataseed4.defibit.io", online: true },
  { url: "https://bsc-dataseed1.ninicoin.io", online: true },
  { url: "https://bsc-dataseed2.ninicoin.io", online: true },
  { url: "https://bsc-dataseed3.ninicoin.io", online: true },
  { url: "https://bsc-dataseed4.ninicoin.io", online: true },
  { url: "https://bsc-rpc.publicnode.com", online: true },
];
export const ERRORS_RPC = [
  "reason: Unexpected token O in JSON at",
  "reason: getaddrinfo ENOTFOUND",
  "reason: connect ECONNREFUSED",
  "reason: read ECONNRESET",
  "Unexpected token < in JSON at position 0",
  "did it run Out of Gas?",
  "Invalid response",
  "reason: read ETIMEDOUT",
  "evm timeout",
  "rate limit exceeded",
  "nenhum rpc online",
  "invalid json response body",
  "Failed to fetch",
];

export function isErrorRPC(error: any) {
  if (error.message.includes("evm timeout")) {
    console.error("deu time out rpc", "RPC");
  }
  if (error.message.includes("rate limit exceeded")) {
    const totalOnlinePolygon = rpcUrlsPolygon.filter(
      (rpcUrl) => rpcUrl.online
    ).length;

    console.error(`rate limit exceeded ${totalOnlinePolygon} online`, "RPC");
  }

  return ERRORS_RPC.some((err) => error.message.includes(err));
}

export function getRpcWeb3(network: WalletNetwork) {
  const rpcUrls =
    network === WalletNetwork.POLYGON ? rpcUrlsPolygon : rpcUrlsBsc;
  const onlineRpcUrls = rpcUrls;

  let rpcUrl = onlineRpcUrls[Math.floor(Math.random() * onlineRpcUrls.length)];

  return new Web3(new Web3.providers.HttpProvider(rpcUrl.url));
}

export async function getStakeHero(
  heroId: string,
  token: string,
  network: WalletNetwork
) {
  try {
    const address =
      network === WalletNetwork.POLYGON
        ? "0x810570aa7e16cf14defd69d4c9796f3c1abe2d13"
        : "0x053282c295419e67655a5032a4da4e3f92d11f17";
    const fnInstance = getRpcWeb3(network);

    const contract = new fnInstance.eth.Contract(
      [
        {
          inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "id", type: "uint256" },
          ],
          name: "getCoinBalanceV2",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      address
    );

    const value = await contract.methods.getCoinBalanceV2(token, heroId).call();
    return Number(value) / 10 ** 18;
  } catch (error) {
    if (isErrorRPC(error)) {
      return getStakeHero(heroId, token, network);
    }
    console.log("error", error);
    throw error;
  }
}
