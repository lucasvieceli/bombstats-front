import { WalletNetwork } from "@/application/entities/wallet";
import { IDashboard } from "@/application/use-cases/getDashboard";
import Card, { CardContent, CardTitle } from "@/components/Card";
import CardStats from "@/components/CardStats";
import { getNumberFormatOptions } from "@/util/number";
import { getFormatter } from "next-intl/server";
import Image from "next/image";

interface TokensProps {
  network: WalletNetwork;
  data: IDashboard;
}

async function Tokens({ network, data }: TokensProps) {
  const f = await getFormatter();
  return (
    <Card>
      <CardTitle>Tokens</CardTitle>
      <CardContent>
        <div className="flex flex-row gap-3 flex-wrap">
          <CardStats
            title="Bcoin"
            icon={
              <Image
                src="/images/bomb.webp"
                height={20}
                width={20}
                alt="Bcoin"
              />
            }
            value={f.number(data.tokens.bcoin.price, getNumberFormatOptions(4))}
            description={`${f.number(
              data.tokens.bcoin.percentage,
              getNumberFormatOptions()
            )}%`}
          />
          <CardStats
            title="Sens"
            icon={
              <Image src="/images/sen.webp" height={20} width={20} alt="Sens" />
            }
            value={f.number(data.tokens.sens.price, getNumberFormatOptions(4))}
            description={f.number(
              data.tokens.sens.percentage,
              getNumberFormatOptions()
            )}
          />
          {network.toUpperCase() === WalletNetwork.POLYGON ? (
            <CardStats
              title="Matic"
              icon={
                <Image
                  src="/images/matic.webp"
                  height={20}
                  width={20}
                  alt="Matic"
                />
              }
              value={f.number(
                data.tokens.matic.price,
                getNumberFormatOptions(4)
              )}
              description={`${f.number(
                data.tokens.matic.percentage,
                getNumberFormatOptions()
              )}%`}
            />
          ) : (
            <CardStats
              title="BNB"
              icon={
                <Image
                  src="/images/bnb.webp"
                  height={20}
                  width={20}
                  alt="BNB"
                />
              }
              value={f.number(data.tokens.bnb.price, getNumberFormatOptions(4))}
              description={`${f.number(
                data.tokens.bnb.percentage,
                getNumberFormatOptions()
              )}%`}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Tokens;
