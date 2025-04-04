"use client";

import { videos } from "@/app/[network]/community-videos/videos";
import Card, { CardContent, CardTitle } from "@/components/Card";
import Video from "@/components/Video";
import { useFormatter, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LastCommunityVideoProps {}

function LastCommunityVideo({}: LastCommunityVideoProps) {
  const t = useTranslations("home.lastCommunityVideo");
  const f = useFormatter();

  // return <Video data={videos[0]} />;
  const data = videos[0];
  function onClickChannel(event: React.MouseEvent) {
    event.preventDefault();
    window.open(data.channelUrl, "_blank");
  }

  return (
    <Card className="lg:max-w-[350px]">
      <CardTitle>
        <div>
          <div>{t("title")}</div>
          <div className="text-white/60 text-12 font-normal">
            {t("subtitle")}
          </div>
        </div>
      </CardTitle>
      <CardContent>
        <Link href={data.url} target="_blank">
          <motion.div
            whileHover="hover"
            className="bg-secondary flex flex-col overflow-hidden"
          >
            <div className="   relative">
              <motion.div className="overflow-hidden rounded-md h-[210px]">
                <motion.div
                  variants={{
                    hover: {
                      scale: 1.1,
                    },
                  }}
                  className="relative w-full h-[210px]"
                >
                  <Image
                    src={data.previewImage}
                    layout="fill"
                    className="object-cover object-center"
                    sizes="auto"
                    alt={data.title}
                  />
                </motion.div>
              </motion.div>
              <div
                onClick={onClickChannel}
                className="cursor-pointer absolute bottom-[-25px] left-3 border-secondary border-[3px] rounded-full w-[50px] h-[50px] overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={data.channelImage}
                  className="object-cover object-center"
                  alt={data.title}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="py-4 pt-9 flex flex-col gap-6">
              <div className="text-16 font-bold text-white line-clamp-2">
                {data.title}
              </div>
              <div className="flex flex-row gap-4 justify-between">
                <div
                  className="text-12 font-normal text-white line-clamp-1"
                  onClick={onClickChannel}
                >
                  {data.channel}
                </div>
                <div className="text-12 font-normal text-white line-clamp-1">
                  {f.dateTime(data.date)}
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </CardContent>
    </Card>
  );
}

export default LastCommunityVideo;
