import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "searchWallet" });

  return {
    title: `BombStats - ${t("title")}`,
    description: t("description"),
  };
}
export default async function SearchWallet({ params: { network } }: any) {
  const t = await getTranslations("searchWallet");

  return (
    <div className="flex flex-col text-22 font-bold items-center mt-6">
      <div>{t("heading")}</div>
      <div className="text-18">{t("instruction")}</div>
    </div>
  );
}
