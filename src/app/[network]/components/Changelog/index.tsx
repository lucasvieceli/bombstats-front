import ChangelogItem from "@/app/[network]/components/Changelog/ChangelogItem";
import Card, { CardContent, CardTitle } from "@/components/Card";
import LinkNetwork from "@/components/LinkNetwork";
import { getFormatDateOptions } from "@/util/date";
import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";

async function Changelog() {
  const t = await getTranslations("home.changeLogs");
  const f = await getFormatter();
  const Divider = <div className=" h-[0.5px] bg-gray w-full shrink-0" />;

  return (
    <Card>
      <CardTitle>{t("announcements")}</CardTitle>
      <CardContent className="max-h-[1500px] overflow-y-auto gap-6">
        <ChangelogItem
          title={t("08_21_2024.title")}
          description={f.dateTime(
            new Date("2024-08-19T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("08_21_2024.content_1")}</p>
          <p>{t("08_21_2024.content_2")}</p>
          <p>
            <LinkNetwork href="/community-videos" className="text-blue">
              {t("08_21_2024.link")}
            </LinkNetwork>
          </p>

          <Image
            src="/images/changelogs/21.08.2024-1.webp"
            quality={100}
            height={300}
            width={600}
            className="object-contain object-left-top rounded-md"
            alt="Community Videos"
          />
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("10_08_2024.title")}
          description={f.dateTime(
            new Date("2024-08-10T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("10_08_2024.content_1")}</p>
          <p>{t("10_08_2024.content_2")}</p>
          <p>
            <LinkNetwork href="/investment-simulator" className="text-blue">
              {t("10_08_2024.link")}
            </LinkNetwork>
          </p>

          <Image
            src="/images/changelogs/10.08.2024-1.webp"
            quality={100}
            height={300}
            width={597}
            className="object-contain object-left-top rounded-md"
            alt="Languages"
          />
        </ChangelogItem>
        {Divider}

        <ChangelogItem
          title={t("08_06_2024_1.title")}
          description={f.dateTime(
            new Date("2024-08-06T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("08_06_2024_1.content_1")}</p>
          <p>
            <LinkNetwork
              href="/ranking-global-stake/common"
              className="text-blue"
            >
              {t("08_06_2024_1.link")}
            </LinkNetwork>
          </p>
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("08_06_2024.title")}
          description={f.dateTime(
            new Date("2024-08-06T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("08_06_2024.content_1")}</p>
          <p>
            <LinkNetwork href="/retail/houses" className="text-blue">
              {t("08_06_2024.link")}
            </LinkNetwork>
          </p>
        </ChangelogItem>

        {Divider}
        <ChangelogItem
          title={t("08_05_2024.title")}
          description={f.dateTime(
            new Date("2024-08-05T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("08_05_2024.content_1")}</p>
          <Image
            src="/images/changelogs/05.08.2024-1.webp"
            quality={100}
            height={191}
            width={283}
            className="object-contain object-left-top rounded-md"
            alt="Languages"
          />
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("07_30_2024.title")}
          description={f.dateTime(
            new Date("2024-07-30T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("07_30_2024.content_1")}</p>
          <p>{t("07_30_2024.content_2")}</p>
          <p>{t("07_30_2024.content_3")}</p>
          <p>{t("07_30_2024.content_4")}</p>
          <Image
            src="/images/changelogs/30.07.2024-1.webp"
            quality={100}
            height={300}
            width={597}
            className="object-contain object-left-top rounded-md"
            alt="Best Cost for Quartz"
          />
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("07_29_2024.title")}
          description={f.dateTime(
            new Date("2024-07-29T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("07_29_2024.content_1")}</p>
          <p>{t("07_29_2024.content_2")}</p>
          <p>{t("07_29_2024.content_3")}</p>
          <p>{t("07_29_2024.content_4")}</p>
          <Image
            src="/images/changelogs/29.07.2024-2.webp"
            quality={100}
            height={132}
            width={659}
            className="object-contain object-left-top rounded-md"
            alt="changelog"
          />
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("07_28_2024.title")}
          description={f.dateTime(
            new Date("2024-07-28T10:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("07_28_2024.content_1")}</p>
          <p>{t("07_28_2024.content_2")}</p>
          <p>{t("07_28_2024.content_3")}</p>
          <p>{t("07_28_2024.content_4")}</p>
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("07_26_2024.title")}
          description={f.dateTime(
            new Date("2024-07-26T13:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("07_26_2024.content_1")}</p>
          <p>{t("07_26_2024.content_2")}</p>
          <p>{t("07_26_2024.content_3")}</p>
          <p>{t("07_26_2024.content_4")}</p>
          <p>{t("07_26_2024.content_5")}</p>
          <p>{t("07_26_2024.content_6")}</p>
          <p>{t("07_26_2024.content_7")}</p>
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("07_24_2024.title")}
          description={t("07_24_2024.description")}
        >
          <p>{t("07_24_2024.content_1")}</p>
          <p>{t("07_24_2024.content_2")}</p>
        </ChangelogItem>
        {Divider}
        <ChangelogItem
          title={t("07_23_2024.title")}
          description={f.dateTime(
            new Date("2024-07-23T13:00:00"),
            getFormatDateOptions()
          )}
        >
          <p>{t("07_23_2024.content_1")}</p>
          <p>{t("07_23_2024.content_2")}</p>
          <p>{t("07_23_2024.content_3")}</p>
          <Image
            src="/images/changelogs/notifications.webp"
            quality={100}
            height={230}
            width={368}
            className="object-contain object-left-top rounded-md"
            alt="changelog"
          />
        </ChangelogItem>
      </CardContent>
    </Card>
  );
}

export default Changelog;
