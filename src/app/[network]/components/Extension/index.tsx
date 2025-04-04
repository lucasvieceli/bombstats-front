"use client";
import { IDashboard } from "@/application/use-cases/getDashboard";
import Card, { CardContent, CardTitle } from "@/components/Card";
import CardStats from "@/components/CardStats";
import Chrome from "@/components/icons/Chrome";
import { getNumberFormatOptions } from "@/util/number";
import { useFormatter, useTranslations } from "next-intl";
import Link from "next/link";
interface ExtensionProps {
  data: IDashboard;
}
function Extension({ data }: ExtensionProps) {
  const t = useTranslations("home.extension");
  const f = useFormatter();
  return (
    <Link
      href="https://chromewebstore.google.com/detail/aajnnmpfamcopimafdbfcgpmlgfffljg"
      target="_blank"
    >
      <Card className="cursor-pointer">
        <CardTitle>{t("Extension")}</CardTitle>
        <CardContent>
          <div className="flex flex-row gap-4">
            <Chrome className="w-14 h-14" />
            <CardStats
              title="Online"
              value={f.number(data.extension.online, getNumberFormatOptions(0))}
            />
            <CardStats
              title={t("Installed")}
              value={f.number(
                data.extension.installed,
                getNumberFormatOptions(0)
              )}
            />
          </div>
          <div>
            <div className="font-medium text-16">
              {t("Install the Chrome extension")}
            </div>
            <div className="font-light text-12 text-white/80">
              {t(
                "Install the BombStats extension for Chrome to get real-time reports"
              )}
              .
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Extension;
