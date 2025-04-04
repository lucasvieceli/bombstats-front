import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "searchHouse" });

  return {
    title: `BombStats - ${t("title")}`,
    description: t("description"),
  };
}

export default async function SearchHero({ params: { network } }: any) {
  const t = await getTranslations("searchHouse");

  return (
    <div className="flex flex-col text-22 font-bold items-center mt-6">
      <div>{t("searchTitle")}</div>
      <div className="text-18">{t("searchDescription")}</div>
    </div>
  );
}
