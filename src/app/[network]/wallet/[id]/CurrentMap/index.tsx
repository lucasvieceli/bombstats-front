"use client";

import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import Card, { CardContent, CardTitle } from "@/components/Card";
import CardStats from "@/components/CardStats";
import ProgressBar from "@/components/ProgressBar";
import {
  IGetMapBlock,
  IStartExplodeV4,
  isWalletSocket,
  useSocket,
} from "@/providers/websocket";
import { parseBlockImage, parseBlockName } from "@/util/block";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface CurrentMapProps {
  data: IGetWalletResponse;
  network: string;
}

function CurrentMap({ data, network }: CurrentMapProps) {
  const t = useTranslations("searchWallet.detail.currentMap");
  const { socket, status, connect } = useSocket();
  const [map, setCurrentMap] = useState<IGetMapBlock["data"]["blocks"]>([]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket, network, data.walletId]);

  useEffect(() => {
    if (status === "connected") {
      const handleMapUpdate = (dataSocket: IStartExplodeV4) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setCurrentMap((old) => {
          if (!old) {
            return old;
          }

          dataSocket.data.blocks?.map((block) => {
            const blockIndex = old?.findIndex(
              (oldBlock) => oldBlock.i == block.i && oldBlock.j == block.j
            );

            if (blockIndex === -1) {
              return block;
            }

            old[blockIndex].hp = block.hp;
          });

          return [...old];
        });
      };
      const handleCurrentMap = (dataSocket: IGetMapBlock) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setCurrentMap(dataSocket.data.blocks || []);
      };

      socket.on("START_EXPLODE_V4", handleMapUpdate);
      socket.on("GET_BLOCK_MAP", handleCurrentMap);
      socket.on("connect", () => {
        socket.emit("listen-wallet", {
          wallet: data.walletId,
          network,
        });
      });
      socket.emit("listen-wallet", {
        wallet: data.walletId,
        network,
      });

      return () => {
        socket.off("START_EXPLODE_V4", handleMapUpdate);
        socket.off("GET_BLOCK_MAP", handleCurrentMap);
      };
    }
  }, [status, socket]);

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

    if (!map || !map?.length) {
      return (
        <div className="w-full py-4 flex text-center justify-center items-center text-16">
          {t("noMapData")}
        </div>
      );
    }

    const currentHp = map?.reduce((acc, block) => acc + block.hp, 0);
    const maxHp = map?.reduce((acc, block) => acc + block.maxHp, 0);
    const percentage = maxHp > 0 ? (currentHp / maxHp) * 100 : 0;

    const blocksWithLife = map?.filter((block) => block.hp > 0);
    const totalBLocks = map?.length;
    const percentageBlocksWithLife =
      totalBLocks > 0 ? (blocksWithLife?.length / totalBLocks) * 100 : 0;

    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-16">{t("blocks")}</div>
          <div className="flex flex-row flex-wrap gap-3">
            {Object.entries(
              blocksWithLife?.reduce((acc, block) => {
                if (!acc[block.type]) {
                  acc[block.type] = 0;
                }

                acc[block.type] += 1;

                return acc;
              }, {} as Record<number, number>)
            ).map(([type, qty]) => (
              <CardStats
                title={parseBlockName(Number(type))}
                icon={
                  <Image
                    src={parseBlockImage(Number(type))}
                    height={20}
                    width={20}
                    alt={parseBlockName(Number(type))}
                  />
                }
                key={type}
                value={qty}
              />
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row justify-between w-full gap-3 text-16">
              <div>{t("life")}</div>
              <div>
                {currentHp} / {maxHp}
              </div>
            </div>
            <ProgressBar value={percentage} />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row justify-between w-full gap-3 text-16">
              <div>{t("blocks")}</div>
              <div>
                {blocksWithLife?.length} / {totalBLocks}
              </div>
            </div>
            <ProgressBar value={percentageBlocksWithLife} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Card>
        <CardTitle>{t("currentMap")}</CardTitle>
        <CardContent>{getContent()}</CardContent>
      </Card>
    </div>
  );
}

export default CurrentMap;
