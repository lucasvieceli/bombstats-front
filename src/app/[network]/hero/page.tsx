import HeaderHero from "@/app/[network]/hero/[id]/Header";
import AdBanner from "@/components/AdsBanner";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "searchHero" });

  return {
    title: `BombStats - ${t("title")}`,
    description: t("description"),
  };
}

export default async function SearchHero({ params: { network } }: any) {
  const t = await getTranslations("searchHero");

  return (
    <main className="flex flex-col w-full gap-6">
      {/* <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div> */}
      <HeaderHero />
      <div className="flex flex-col text-22 font-bold items-center mt-6">
        <div>{t("searchTitle")}</div>
        <div className="text-18">{t("searchDescription")}</div>
      </div>
    </main>
  );
}
