import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import CardStats from "@/components/CardStats";
import {
  IStartExplodeV4,
  IStartExplodeV4Reward,
  isWalletSocket,
  useSocket,
} from "@/providers/websocket";
import { getNumberFormatOptions } from "@/util/number";
import { parseRewardImage, parseRewardName, RewardType } from "@/util/reward";
import { differenceInMinutes } from "date-fns";
import { useFormatter } from "next-intl";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

interface CurrentMapRewardsProps {
  data: IGetWalletResponse;
  network: string;
}
function CurrentMapRewards({ data, network }: CurrentMapRewardsProps) {
  const { socket, status } = useSocket();
  const f = useFormatter();
  const [rewards, setRewards] = useState<IStartExplodeV4Reward[]>([]);
  // const [totalRewards, setTotalRewards] = useState<
  //   { type: number; value: number }[]
  // >([]);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    if (status == "connected") {
      setTime(new Date());

      const onMapReward = (dataSocket: IStartExplodeV4) => {
        if (!isWalletSocket(dataSocket, data.walletId, network)) return;

        //group by type
        const rewardsObj = dataSocket.data?.blocks
          ?.filter((block) => block.rewards?.length)
          ?.flatMap((block) => block.rewards)
          ?.reduce((acc, reward) => {
            if (!acc[reward.type]) {
              acc[reward.type] = reward;
            }
            acc[reward.type].value += reward.value;
            return acc;
          }, {} as { [key: RewardType]: IStartExplodeV4Reward });

        const rewards = Object.values(
          rewardsObj as any
        ) as IStartExplodeV4Reward[];

        if (!rewards.length) return;

        setRewards((old) => {
          rewards.map((reward) => {
            const blockIndex = old.findIndex(
              (oldBlock) => oldBlock?.type === reward?.type
            );

            if (blockIndex !== -1) {
              old[blockIndex].value += reward.value || 0;
            } else {
              old.push(reward);
            }
          });

          return [...old];
        });
      };

      socket.on("START_EXPLODE_V4", onMapReward);

      return () => {
        socket.off("START_EXPLODE_V4", onMapReward);
      };
    }
  }, [socket, network, data.walletId, status]);

  const diffMinutes = differenceInMinutes(new Date(), time);
  const averagePerHour =
    diffMinutes > 0
      ? rewards.map((token) => {
          const valuePerMinute = token.value / diffMinutes;
          return {
            type: token.type,
            value: valuePerMinute * 60,
          };
        })
      : [];

  if (!rewards.length) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-16">Rewards</div>
      <div className="flex flex-row flex-wrap gap-3">
        {rewards.map((token) => (
          <CardStats
            title={parseRewardName(token.type)}
            icon={
              <Image
                src={parseRewardImage(token.type.toString())}
                height={20}
                width={20}
                alt="Bomb"
              />
            }
            value={f.number(token.value, getNumberFormatOptions())}
            key={token.type}
          />
        ))}
      </div>
      {averagePerHour.length > 0 && (
        <>
          <div className="font-bold text-16">Hourly estimate</div>
          <div className="flex flex-row flex-wrap gap-3">
            {averagePerHour.map((token) => (
              <CardStats
                title={parseRewardName(token.type)}
                icon={
                  <Image
                    src={parseRewardImage(token.type.toString())}
                    height={20}
                    width={20}
                    alt="Bomb"
                  />
                }
                value={f.number(token.value, getNumberFormatOptions())}
                key={token.type}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(CurrentMapRewards);
