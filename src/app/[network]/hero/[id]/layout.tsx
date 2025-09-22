"use client";
import HeaderHero from "@/app/[network]/hero/[id]/Header";
import AdBanner from "@/components/AdsBanner";
import { SocketProvider } from "@/providers/websocket";

function LayoutWallet({ children }: any) {
  return (
    <main className="flex flex-col w-full gap-6">
      {/* <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div> */}
      <HeaderHero />
      <SocketProvider>{children}</SocketProvider>
    </main>
  );
}

export default LayoutWallet;
