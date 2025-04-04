"use client";

import Card, { CardContent, CardTitle } from "@/components/Card";
import ClipboardButton from "@/components/ClipboardButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function Team() {
  const t = useTranslations("home.team");

  return (
    <Card className="">
      <CardTitle>{t("Team")}</CardTitle>
      <CardContent className="!items-start">
        <div className="text-12 text-white">{t("site_description")}</div>
        <div className="text-12 text-white">
          {t("extension_recommendation")}
        </div>
        <div className="text-12 text-white">{t("extension_install")}</div>
        <div className="text-12 text-white flex">
          <span>{t("donation_prompt")} &nbsp;</span>
          <span className="whitespace-pre flex flex-row gap-1">
            0xA20c127F6f94613408c9083fDdCBE817546F4B94
            <ClipboardButton
              value={"0xA20c127F6f94613408c9083fDdCBE817546F4B94"}
            />
          </span>
        </div>
        <Link href="https://discord.gg/FcrKrY3sTy" target="_blank">
          <div className="text-12 text-blue">{t("join_discord")}</div>
        </Link>
        <div className="flex flex-row gap-3 flex-wrap">
          <Link
            href="https://discord.com/users/641376728601722900"
            target="_blank"
            className="flex-1 md:flex-none"
          >
            <div className="flex flex-row gap-4 col px-3 py-2 bg-primary rounded-md shrink-0 hover:bg-secondaryHover">
              <div className="w-[43px] h-[43px] overflow-hidden shrink-0 relative rounded-xl">
                <Image
                  src="/images/team/lucasvieceli.webp"
                  fill
                  sizes="auto"
                  className="object-cover object-center"
                  alt="a"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-1 justify-between">
                  <div className="font-medium line-clamp-1 text-16 break-all">
                    Lucas Vieceli
                  </div>
                </div>
                <div className="font-light text-white/80 text-12">
                  {t("developer")}
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="https://discord.com/users/723863591849295872"
            target="_blank"
            className="flex-1 md:flex-none"
          >
            <div className="flex flex-row gap-4 col px-3 py-2 bg-primary rounded-md shrink-0 hover:bg-secondaryHover">
              <div className="w-[43px] h-[43px] overflow-hidden shrink-0 relative rounded-xl">
                <Image
                  src="/images/team/lizi.webp"
                  fill
                  sizes="auto"
                  className="object-cover object-center"
                  alt="a"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-1 justify-between">
                  <div className="font-medium line-clamp-1 text-16 break-all">
                    Lizi
                  </div>
                </div>
                <div className="font-light text-white/80 text-12">
                  {t("consultant")}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Team;
