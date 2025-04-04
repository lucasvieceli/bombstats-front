"use client";

import CurrentMapHeroes from "@/app/[network]/wallet/[id]/CurrentRewards/CurrentMapHeroes";
import CurrentMapRewards from "@/app/[network]/wallet/[id]/CurrentRewards/CurrentMapRewards";
import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import Card, { CardContent, CardTitle } from "@/components/Card";
import { useSocket } from "@/providers/websocket";
import { useTranslations } from "next-intl";

interface CurrentRewardProps {
  data: IGetWalletResponse;
  network: string;
}

function CurrentReward({ data, network }: CurrentRewardProps) {
  const t = useTranslations("searchWallet.detail.currentReward");
  const { socket, connect, status } = useSocket();

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

    return (
      <>
        <CurrentMapRewards data={data} network={network} />
        <CurrentMapHeroes data={data} network={network} />
      </>
    );
  }

  return (
    <div>
      <Card>
        <CardTitle>{t("currentRewards")}</CardTitle>
        <CardContent>{getContent()}</CardContent>
      </Card>
    </div>
  );
}

export default CurrentReward;
