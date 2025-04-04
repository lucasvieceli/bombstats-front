import RealTimeRetailContent from "@/app/[network]/real-time-retail/pageContent";
import { IRetailData } from "@/providers/websocket";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "realTimeRetail",
  });
  return {
    title: `BombStats - ${t("title")}`,
    description: t("description"),
  };
}

export interface IValue extends IRetailData {
  id: number;
  date: Date;
}

function RealTimeRetail(props: any) {
  return <RealTimeRetailContent {...props} />;
}

export default RealTimeRetail;
