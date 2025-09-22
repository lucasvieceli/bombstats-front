"use client";
import HeaderWallet from "@/app/[network]/wallet/[id]/Header";
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
      <HeaderWallet />
      <SocketProvider>{children}</SocketProvider>
      {/* <AdBanner
        dataAdFormat="auto"
        dataAdSlot="4706229555"
        dataFullWidthResponsive={true}
      /> */}
    </main>
  );
}

export default LayoutWallet;
