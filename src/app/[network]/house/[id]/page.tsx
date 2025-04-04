import Stats from "@/app/[network]/house/[id]/Stats";
import StatsText from "@/app/[network]/house/[id]/StatsText";
import { House as HouseEntity } from "@/application/entities/house";
import { WalletNetwork } from "@/application/entities/wallet";
import { getHouse } from "@/application/use-cases/getHouse";
import Card, { CardContent } from "@/components/Card";
import ClipboardButton from "@/components/ClipboardButton";
import SaleButton from "@/components/SaleButton";
import { HOUSE_TYPE_MAP } from "@/util/house";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale, id } }: any) {
  const t = await getTranslations({ locale, namespace: "houseDetail" });

  return {
    title: `BombStats - ${t("title", { id })}`,
    description: t("description", { id }),
  };
}

export default async function House({ params: { id, network }, props }: any) {
  const t = await getTranslations("houseDetail");
  let data: HouseEntity | undefined = undefined;
  let isError = false;

  try {
    if (id) {
      data = await getHouse({
        network: network?.toUpperCase() as WalletNetwork,
        id,
      });
    }
  } catch (e) {
    console.log(e, "error");
    isError = true;
  }
  const linkContract =
    data?.network === WalletNetwork.BSC
      ? `https://bscscan.com/address/${data?.contractAddress}`
      : `https://polygonscan.com/address/${data?.contractAddress}`;

  const getValidContent = () => {
    if (!data || isError) return null;

    const type = HOUSE_TYPE_MAP[data.rarity];
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6 ">
          <Card className="lg:min-h-[337px]">
            <CardContent>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4">
                  <h1 className="text-22 xl:text-30 text-white flex flex-1 font-bold">
                    {type.name}
                  </h1>
                </div>
                <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="relative w-[180px] h-[144px]">
                      <Image
                        fill
                        className="object-contain object-center"
                        sizes="auto"
                        src={type.image}
                        alt="House"
                      />
                    </div>

                    {(data.marketPrice || data.openSeaPrice) && (
                      <div className="flex flex-col gap-1.5 w-full justify-center">
                        {data.openSeaPrice && (
                          <SaleButton
                            typeSale="OPEN_SEA"
                            price={data.openSeaPrice}
                            id={data.id}
                            typeNft="house"
                          />
                        )}
                        {data.marketPrice && (
                          <SaleButton
                            typeSale="MARKET"
                            price={data.marketPrice}
                            token={data.marketToken}
                            id={data.id}
                            typeNft="house"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-semibold break-all text-22 text-white flex flex-row items-center justify-center md:justify-start">
                      #{data.id}
                      <ClipboardButton
                        value={data.id}
                        className="w-[22px] h-[22px] ml-1"
                      />
                    </h2>
                    <Stats data={data} />
                    <StatsText title={t("walletTitle")}>
                      <Link href={`/${network}/wallet/${data.wallet}`}>
                        {data.wallet}
                      </Link>
                    </StatsText>
                    <StatsText title={t("contractTitle")}>
                      <Link href={linkContract} target="_blank">
                        {data.contractAddress}
                      </Link>
                    </StatsText>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  function getErrorContent() {
    return (
      <div className="flex flex-col text-22 font-bold items-center mt-6">
        <span>{t("notFoundTitle")}</span>
        <span className="text-center">{t("notFoundDescription")}</span>
      </div>
    );
  }

  return (
    <>
      {data && getValidContent()}
      {isError && getErrorContent()}
    </>
  );
}
