import InformationModal from "@/app/[network]/wallet/[id]/AverageFarm/InformationModal";
import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import Card, { CardContent, CardTitle } from "@/components/Card";
import CardStats from "@/components/CardStats";
import { getNumberFormatOptions } from "@/util/number";
import { parseRewardImage, parseRewardName } from "@/util/reward";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";

interface AverageFarmProps {
  data: IGetWalletResponse;
}

export default async function AverageFarm({ data }: AverageFarmProps) {
  const t = await getTranslations("searchWallet.detail.averageFarm");
  const f = await getFormatter();

  function getContent() {
    return (
      <div className="w-full py-4 flex justify-center items-center text-center text-16">
        {t("alert")}
      </div>
    );

    // if (
    //   !data?.wallet?.farmAverage ||
    //   data?.wallet?.farmAverage?.totalSeconds == 0
    // )
    //   return (
    //     <div className="w-full py-4 flex justify-center text-center items-center text-16">
    //       {t("noAverageFarmData")}
    //     </div>
    //   );

    // return (
    //   <>
    //     <div className="flex flex-col gap-2">
    //       <div className="font-bold text-16">{t("average")}</div>
    //       <div className="flex flex-row flex-wrap gap-3">
    //         {data?.wallet?.farmAverage?.tokensAverage?.map((token) => (
    //           <CardStats
    //             title={parseRewardName(token.type)}
    //             icon={
    //               <Image
    //                 src={parseRewardImage(token.type.toString())}
    //                 height={20}
    //                 width={20}
    //                 alt={parseRewardName(token.type)}
    //               />
    //             }
    //             value={f.number(token.value, getNumberFormatOptions())}
    //             key={token.type}
    //           />
    //         ))}
    //         {data?.wallet.farmAverage && (
    //           <CardStats
    //             title={t("map")}
    //             icon={
    //               <Image
    //                 src="/images/map.webp"
    //                 height={20}
    //                 width={20}
    //                 alt={t("map")}
    //                 className="rounded-sm"
    //               />
    //             }
    //             value={f.number(
    //               data.wallet?.farmAverage?.mapsAverage,
    //               getNumberFormatOptions(2)
    //             )}
    //           />
    //         )}
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <div className="font-bold text-16">{t("total")}</div>
    //       <div className="flex flex-row flex-wrap gap-3">
    //         {data?.wallet?.farmAverage?.tokensList?.map((token) => (
    //           <CardStats
    //             title={parseRewardName(token.type)}
    //             icon={
    //               <Image
    //                 src={parseRewardImage(token.type.toString())}
    //                 height={20}
    //                 width={20}
    //                 alt={parseRewardName(token.type)}
    //               />
    //             }
    //             value={f.number(token.total, getNumberFormatOptions())}
    //             key={token.type}
    //           />
    //         ))}
    //         {data?.wallet.farmAverage && (
    //           <CardStats
    //             title={t("map")}
    //             icon={
    //               <Image
    //                 src="/images/map.webp"
    //                 height={20}
    //                 width={20}
    //                 alt={t("map")}
    //                 className="rounded-sm"
    //               />
    //             }
    //             value={f.number(
    //               data?.wallet.farmAverage.mapsTotal,
    //               getNumberFormatOptions(0)
    //             )}
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </>
    // );
  }

  return (
    <div>
      <Card>
        <CardTitle>
          <div className="flex flex-row justify-between gap-4">
            <div>{t("averageFarmPerHour")}</div>
            {data?.wallet?.farmAverage && <InformationModal data={data} />}
          </div>
        </CardTitle>
        <CardContent>{getContent()}</CardContent>
      </Card>
    </div>
  );
}
