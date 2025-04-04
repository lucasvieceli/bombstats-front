import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import House from "@/components/House";
import { getTranslations } from "next-intl/server";

interface HousesProps {
  data: IGetWalletResponse;
}

export default async function Houses({ data }: HousesProps) {
  const t = await getTranslations("searchWallet.detail.housesSection");

  if (data.houses?.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-22 font-extrabold">{t("title")}</div>
      <div className="flex flex-row gap-4 flex-1 flex-wrap">
        {data.houses?.map((house) => (
          <House data={house} key={house.id} />
        ))}
      </div>
    </div>
  );
}
