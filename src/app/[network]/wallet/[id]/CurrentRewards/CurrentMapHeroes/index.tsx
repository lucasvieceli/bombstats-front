import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import CardStats from "@/components/CardStats";
import {
  IChangeBbmStage,
  IGetActiveBombers,
  IGoWork,
  IStartExplodeV4,
  isWalletSocket,
  ISyncBomberman,
  useSocket,
} from "@/providers/websocket";
import { parseHeroState } from "@/util/hero";
import { memo, useEffect, useState } from "react";

interface CurrentMapHeroesProps {
  data: IGetWalletResponse;
  network: string;
}
function CurrentMapHeroes({ data, network }: CurrentMapHeroesProps) {
  const { socket, status } = useSocket();
  const [activeHeroes, setActiveHeroes] = useState<
    IGetActiveBombers["data"]["bombers"]
  >([]);

  useEffect(() => {
    if (status == "connected") {
      const onGetActiveBombers = (dataSocket: IGetActiveBombers) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setActiveHeroes(dataSocket.data?.bombers);
      };

      const onSyncBomber = (dataSocket: ISyncBomberman) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setActiveHeroes(dataSocket.data?.bombers?.filter((h) => h.active));
      };

      const onGoWork = (dataSocket: IGoWork) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setActiveHeroes((old) => {
          const index = old.findIndex((h) => h.id === dataSocket.data.id);

          if (index !== -1) {
            old[index].stage = 0;
          }
          return [...old];
        });
      };
      const onGoSleep = (dataSocket: IGoWork) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setActiveHeroes((old) => {
          const index = old.findIndex((h) => h.id === dataSocket.data.id);

          if (index !== -1) {
            old[index].stage = 1;
          }
          return [...old];
        });
      };
      const onGoHome = (dataSocket: IGoWork) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setActiveHeroes((old) => {
          const index = old.findIndex((h) => h.id === dataSocket.data.id);

          if (index !== -1) {
            old[index].stage = 2;
          }
          return [...old];
        });
      };
      const onChangeStage = (dataSocket: IChangeBbmStage) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        setActiveHeroes((old) => {
          dataSocket.data.datas.map((hdata) => {
            const index = old.findIndex((h) => h.id === hdata.id);
            if (index !== -1) {
              old[index].stage = dataSocket.data.datas[0].stage;
            }
          });

          return [...old];
        });
      };

      const handleMapUpdate = (dataSocket: IStartExplodeV4) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        if (dataSocket.data.energy <= 0) {
          setActiveHeroes((old) => {
            const index = old.findIndex((h) => h.id === dataSocket.data.id);
            if (index !== -1) {
              old[index].stage = 1;
            }
            return [...old];
          });
        }
      };

      socket.on("GET_ACTIVE_BOMBER", onGetActiveBombers);
      socket.on("SYNC_BOMBERMAN", onSyncBomber);
      socket.on("GO_WORK", onGoWork);
      socket.on("GO_SLEEP", onGoSleep);
      socket.on("GO_HOME", onGoHome);
      socket.on("CHANGE_BBM_STAGE", onChangeStage);
      socket.on("START_EXPLODE_V4", handleMapUpdate);

      return () => {
        socket.off("GET_ACTIVE_BOMBER", onGetActiveBombers);
        socket.off("SYNC_BOMBERMAN", onSyncBomber);
        socket.off("GO_WORK", onGoWork);
        socket.off("GO_SLEEP", onGoSleep);
        socket.off("GO_HOME", onGoHome);
        socket.off("CHANGE_BBM_STAGE", onChangeStage);
        socket.on("START_EXPLODE_V4", handleMapUpdate);
      };
    }
  }, [socket, network, data.walletId, status]);

  if (!activeHeroes.length) return null;

  const stages = activeHeroes.reduce((acc, bomber) => {
    if (!acc[bomber.stage]) {
      acc[bomber.stage] = 0;
    }
    acc[bomber.stage] += 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-16">Heroes</div>
      <div className="flex flex-row flex-wrap gap-3">
        {Object.entries(stages).map(([stage, count]) => (
          <CardStats
            title={parseHeroState(Number(stage))}
            // icon={
            //   <Image
            //     src={parseHeroStateImage(Number(stage))}
            //     height={20}
            //     width={20}
            //     alt="Hero"
            //   />
            // }
            value={count}
            key={stage}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(CurrentMapHeroes);
