import Content from "@/app/[network]/retail/[nft]/content";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "market",
  });
  return {
    title: `BombStats - ${t("market")} - ${params.nft}`,
    description: t("listOfHeroesAndHouses"),
  };
}

enum RetailType {
  hero = "heroes",
  house = "houses",
}

function Retail({ searchParams: {}, params: { nft = "heroes" } }) {
  return <Content />;
}

export default Retail;
