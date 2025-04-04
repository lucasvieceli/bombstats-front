"use client";

import { Hero } from "@/application/entities/hero";
import { House } from "@/application/entities/house";
import { WalletNetwork } from "@/application/entities/wallet";
import { ENV_API_URL } from "@/util/env";
import { RewardType } from "@/util/reward";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Socket } from "socket.io";
import io from "socket.io-client";

export interface IGoHome extends IGoWork {}
export interface IGoSleep extends IGoWork {}

const SocketContext = createContext({} as ISocketProvider);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  query?: any;
}

export const SocketProvider = ({
  children,
  query,
}: PropsWithChildren<SocketProviderProps>) => {
  const [socket, setSocket] = useState<any>(null);
  const [status, setIsConnected] =
    useState<ISocketProvider["status"]>("disconnected");
  const fns = useRef<{ name: string; fn: any }[]>([]);

  const connect = useCallback(() => {
    const socketIo = io(ENV_API_URL, {
      query,
      reconnectionDelay: 1000,
      forceNew: false,
    }) as unknown as any;

    setSocket(socketIo);
    setIsConnected("connecting");

    socketIo.on("connect", () => {
      setIsConnected("connected");
      fns.current.forEach(({ name, fn }) => {
        socketIo.on(name, fn);
      });
    });

    socketIo.on("disconnect", () => {
      setIsConnected("disconnected");
      // setSocket(null);
    });

    return socketIo;
  }, [query]);

  return (
    <SocketContext.Provider
      value={{
        connect,
        socket,
        status,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export interface ISocketProvider {
  socket: Socket;
  connect: () => Socket;
  status: "connected" | "disconnected" | "connecting";
}
export interface IBlock {
  hp: number;
  maxHp: number;
  type: number;
  i: number;
  j: number;
}

export interface IStartExplodeV4Reward {
  type: RewardType;
  value: number;
}

export interface IStartExplodeV4 {
  data: {
    blocks?: {
      i: number;
      j: number;
      hp: number;
      maxHp: number;
      rewards: IStartExplodeV4Reward[];
    }[];
    id: number;
    energy: number;
  };
  network: WalletNetwork;
  wallet: string;
}

export interface IGetMapBlock {
  data: {
    blocks?: {
      type: number;
      i: number;
      j: number;
      hp: number;
      maxHp: number;
    }[];
    reset?: boolean;
  };
  network: WalletNetwork;
  wallet: string;
}

export interface IGetActiveBombers {
  wallet: string;
  network: WalletNetwork;
  data: {
    bombers: {
      shields: {
        current: number;
        total: number;
        ability: number;
      }[];
      stage: number;
      id: number;
      gen_id: string;
      energy: number;
      active: number;
      heroType: number;
      stakeAmount: number;
      skills: number[];
      restore_hp: number;
    }[];
  };
}

export interface ISyncBomberman {
  wallet: string;
  network: WalletNetwork;
  data: {
    bombers: {
      shields: {
        current: number;
        total: number;
        ability: number;
      }[];
      stage: number;
      id: number;
      gen_id: string;
      energy: number;
      active: number;
      heroType: number;
      stakeAmount: number;
      skills: number[];
      restore_hp: number;
    }[];
  };
}
export interface IGoWork {
  wallet: string;
  network: WalletNetwork;
  data: {
    id: number;
    energy: number;
  };
}
export interface IChangeBbmStage {
  wallet: string;
  network: WalletNetwork;
  data: {
    datas: {
      id: number;
      energy: number;
      stage: number;
    }[];
  };
}

export function isWalletSocket(
  dataSocket: any,
  walletId: string,
  network: string
) {
  return (
    dataSocket.wallet.toUpperCase() === walletId.toUpperCase() &&
    dataSocket.network.toUpperCase() === network.toUpperCase()
  );
}
export interface IRetailData {
  hero?: Hero;
  house?: House;
  type: "sold" | "listed";
  soldPrice?: number;
  tokenAddress?: string;
  marketPlace: "opensea" | "market";
}
