"use client";

import { WalletNetwork } from "@/application/entities/wallet";
import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import Card, { CardContent, CardTitle } from "@/components/Card";
import HistoryItem from "@/components/HistoryItem";
import {
  IGetMapBlock,
  IStartExplodeV4,
  isWalletSocket,
  useSocket,
} from "@/providers/websocket";
import { parseRewardImage, parseRewardName, RewardType } from "@/util/reward";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface IRewardUpdate {
  reward?: {
    type: RewardType;
    value: number;
  };
  resetMap?: boolean;
  network: WalletNetwork;
  wallet: string;
  createdAt: string;
  id: number;
}

//random id
function randomId() {
  return Math.floor(Math.random() * 1000000);
}

interface RealTimeFarmProps {
  data: IGetWalletResponse;
  network: string;
}

function RealTimeFarm({ data, network }: RealTimeFarmProps) {
  const t = useTranslations("searchWallet.detail.realTimeFarm");
  const { socket, connect, status } = useSocket();
  const [reward, setRewards] = useState<IRewardUpdate[]>([]);

  const messages = {
    cage: {
      title: t("cageTitle"),
      description: t("cageDescription"),
      image: "/images/jail.webp",
    },
    resetMap: {
      title: t("resetMapTitle"),
      description: t("resetMapDescription"),
      image: "/images/map.webp",
    },
  };

  useEffect(() => {
    if (status == "connected") {
      const onStartExplode = (dataSocket: IStartExplodeV4) => {
        if (isWalletSocket(dataSocket, data.walletId, network)) {
          let rewards =
            dataSocket.data?.blocks
              ?.filter((block) => block.rewards?.length)
              ?.flatMap((block) =>
                block.rewards.map((reward) => ({
                  reward,
                  network: dataSocket.network,
                  wallet: dataSocket.wallet,
                  createdAt: new Date().toISOString(),
                  id: randomId(),
                }))
              ) || [];

          if (rewards.length) {
            setRewards((old) => {
              if (old.length > 100) {
                return [...rewards, ...old.slice(0, 100)];
              }
              return [...rewards, ...old];
            });
          }
        }
      };

      const onMapBlock = (dataSocket: IGetMapBlock) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;
        if (dataSocket.data.reset) {
          setRewards((old) => {
            const newValue = {
              resetMap: true,
              network: dataSocket.network,
              wallet: dataSocket.wallet,
              createdAt: new Date().toISOString(),
              id: randomId(),
            };

            if (old.length > 100) {
              return [newValue, ...old.slice(0, 100)];
            }

            return [newValue, ...old];
          });
        }
      };

      socket.on("GET_BLOCK_MAP", onMapBlock);
      socket.on("START_EXPLODE_V4", onStartExplode);

      return () => {
        socket.off("GET_BLOCK_MAP", onMapBlock);
        socket.off("START_EXPLODE_V4", onStartExplode);
      };
    }
  }, [socket, network, data.walletId, status]);

  function getContent() {
    if (status === "disconnected") {
      return (
        <div
          className="w-full py-4 flex cursor-pointer justify-center items-center text-16 text-center"
          onClick={connect}
        >
          {t("clickToSee")}
        </div>
      );
    }

    if (status === "connecting") {
      return (
        <div className="w-full py-4 flex justify-center items-center text-16">
          {t("loading")}
        </div>
      );
    }

    if (!reward?.length) {
      return (
        <div className="w-full py-4 flex justify-center text-center items-center text-16">
          {t("noData")}
        </div>
      );
    }
    return reward.map((item) => {
      let image = "";
      let title = "";
      let description = "";

      if (item.resetMap) {
        title = messages.resetMap.title;
        description = messages.resetMap.description;
        image = messages.resetMap.image;
      } else if (item.reward) {
        title = item?.reward?.value?.toString();
        description = `${t("received")} ${parseRewardName(item.reward.type)}`;
        image = parseRewardImage(item.reward.type.toString());
      }

      return (
        <motion.div
          key={item.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          layout
        >
          <HistoryItem
            title={title}
            description={description}
            icon={
              <Image
                src={image}
                width={43}
                height={43}
                alt={title}
                className="rounded-lg shrink-0"
              />
            }
            time={new Date(item.createdAt)}
          />
        </motion.div>
      );
    });
  }

  return (
    <div>
      <Card>
        <CardTitle>{t("realTimeFarm")}</CardTitle>
        <CardContent className="!px-0">
          <motion.div className="flex flex-col px-4 gap-4 max-h-[350px] overflow-auto scroll-smooth">
            <AnimatePresence mode="popLayout">{getContent()}</AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RealTimeFarm;
