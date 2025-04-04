"use client";

import { IDashboard } from "@/application/use-cases/getDashboard";
import Card, { CardContent, CardTitle } from "@/components/Card";
import LinkNetwork from "@/components/LinkNetwork";
import { useTranslations } from "next-intl";

interface OnlineAccountsProps {
  data: IDashboard;
}

function OnlineAccounts({ data }: OnlineAccountsProps) {
  const t = useTranslations("home");

  return (
    <Card className="lg:max-w-[350px]">
      <CardTitle>
        <div>
          <div>{t("onlineAccounts.title")}</div>
          <div className="text-white/60 text-12 font-normal">
            {t("onlineAccounts.subtitle")}
          </div>
        </div>
      </CardTitle>
      <CardContent className="max-h-[300px] overflow-y-auto">
        {data.extension?.accounts?.map((account) => (
          <LinkNetwork key={account} href={`/wallet/${account}`}>
            <div
              title={account}
              className="flex flex-row gap-4 col px-3 py-2 bg-primary rounded-md shrink-0 hover:bg-secondaryHover"
            >
              <div className="line-clamp-1 text-16 break-all">{account}</div>
            </div>
          </LinkNetwork>
        ))}
      </CardContent>
    </Card>
  );
}

export default OnlineAccounts;
