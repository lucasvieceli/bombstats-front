"use client";
import HeaderHouse from "@/app/[network]/house/[id]/Header";
import AdBanner from "@/components/AdsBanner";

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
      <HeaderHouse />
      {children}
    </main>
  );
}

export default LayoutWallet;
