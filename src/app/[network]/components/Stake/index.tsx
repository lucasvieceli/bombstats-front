import { IDashboard } from "@/application/use-cases/getDashboard";
import Card, { CardContent, CardTitle } from "@/components/Card";
import CardStats from "@/components/CardStats";
import Average from "@/components/icons/Average";
import { getNumberFormatOptions } from "@/util/number";
import { capitalizeFirstLetter } from "@/util/string";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";

interface StakeProps {
  data: IDashboard;
}
async function Stake({ data }: StakeProps) {
  const t = await getTranslations('home.stake');
  const f = await getFormatter();

  return (
    <Card>
      <CardTitle>Stake</CardTitle>
      <CardContent>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-16">Bcoin</h3>
          <div className="flex flex-row flex-wrap gap-3">
            <CardStats
              title={capitalizeFirstLetter(t("amount"))}
              icon={
                <Image
                  src="/images/bomb.webp"
                  height={20}
                  width={20}
                  alt="stake"
                />
              }
              value={f.number(data.stake.amount, getNumberFormatOptions())}
            />
            <CardStats
              title={capitalizeFirstLetter(t("heroes"))}
              icon={
                <Image
                  src="/images/hero-stake.webp"
                  height={20}
                  width={20}
                  alt={t("heroes")}
                />
              }
              value={f.number(data.stake.heroes, getNumberFormatOptions(0))}
            />
            <CardStats
              title={capitalizeFirstLetter(t("average"))}
              icon={<Average className="w-5 h-5" />}
              value={f.number(data.stake.average, getNumberFormatOptions(0))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-16">Sens</h3>
          <div className="flex flex-row flex-wrap gap-3">
            <CardStats
              title={capitalizeFirstLetter(t("amount"))}
              icon={
                <Image
                  src="/images/sen.webp"
                  height={20}
                  width={20}
                  alt="stake"
                />
              }
              value={f.number(data.stakeSen.amount, getNumberFormatOptions(0))}
            />
            <CardStats
              title={capitalizeFirstLetter(t("heroes"))}
              icon={
                <Image
                  src="/images/hero-stake.webp"
                  height={20}
                  width={20}
                  alt={t("heroes")}
                />
              }
              value={f.number(data.stakeSen.heroes, getNumberFormatOptions(0))}
            />
            <CardStats
              title={capitalizeFirstLetter(t("average"))}
              icon={<Average className="w-5 h-5" />}
              value={f.number(data.stakeSen.average, getNumberFormatOptions(0))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Stake;
