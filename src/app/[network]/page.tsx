import Changelog from "@/app/[network]/components/Changelog";
import Extension from "@/app/[network]/components/Extension";
import LastCommunityVideo from "@/app/[network]/components/LastCommunityVideo";
import OnlineAccounts from "@/app/[network]/components/OnlineAccounts";
import Stake from "@/app/[network]/components/Stake";
import Team from "@/app/[network]/components/Team";
import Tokens from "@/app/[network]/components/Tokens";
import { getDashboard } from "@/application/use-cases/getDashboard";
import AdBanner from "@/components/AdsBanner";
import Header from "@/components/Header";

export async function generateMetadata({ params }: any) {
  return {
    title: `BombStats`,
    description: `BombStats - Dashboard`,
  };
}

async function Index({ params: { network } }: any) {
  let data;
  try {
    data = await getDashboard({
      network,
    });
  } catch (e) {
    console.log("error", e);

    return (
      <div className="text-22 font-extrabold text-center">Invalid rarity</div>
    );
  }
  return (
    <main className="flex flex-col w-full gap-6">
      <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div>
      <Header />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Tokens network={network} data={data} />
          <Stake data={data} />
          <Extension data={data} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <Team />
            <LastCommunityVideo />
            <OnlineAccounts data={data} />
          </div>
          <Changelog />
        </div>
      </div>
    </main>
  );
}

export default Index;
