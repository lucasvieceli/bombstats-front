import Badge from "@/components/Badge";
import { ISocketProvider } from "@/providers/websocket";
import { capitalizeFirstLetter } from "@/util/string";
import { useTranslations } from "next-intl";

interface StatusProps {
  status: ISocketProvider["status"];
}

function Status({ status }: StatusProps) {
  const t = useTranslations("realTimeRetail");

  let statusParam: "error" | "success" = "error";
  let colorText = "text-[#FF0759]";
  let colorBg = "bg-[#FF0759]";
  if (status === "connected" || status === "connecting") {
    statusParam = "success";
    colorText = "text-[#00C853]";
    colorBg = "bg-[#00C853]";
  }

  return (
    <div
      className={`flex flex-row flex-nowrap gap-2 items-center text-12 font-semibold ${colorText}`}
    >
      <span className="relative flex h-3 w-3">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorBg} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${colorBg}`}
        ></span>
      </span>
      {capitalizeFirstLetter(t(status))}
    </div>
  );
}

export default Status;
