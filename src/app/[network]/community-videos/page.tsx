import { videos } from "@/app/[network]/community-videos/videos";
import AdBanner from "@/components/AdsBanner";
import Menu from "@/components/Header/Menu";
import NetworkSelect from "@/components/NetworkSelect";
import Video, { IVideo } from "@/components/Video";
import { getTranslations } from "next-intl/server";
export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "communityVideos" });

  return {
    title: `BombStats - ${t("title")}`,
  };
}

async function CommunityVideos() {
  const t = await getTranslations("communityVideos");

  return (
    <main className="w-full flex flex-col gap-6">
      {/* <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div> */}
      <div className="flex flex-row w-full items-start gap-4 flex-wrap">
        <Menu />
        <div className="flex flex-row gap-4 flex-1 justify-end">
          <NetworkSelect />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-22 font-extrabold">{t("title")}</div>
      </div>
      <div className="gap-y-6 gap-x-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video, index) => (
          <Video key={index} data={video} />
        ))}
      </div>
    </main>
  );
}

export default CommunityVideos;
