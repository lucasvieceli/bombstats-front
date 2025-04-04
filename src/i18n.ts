import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const locale = cookies().get("NEXT_LOCALE")?.value || "en-US";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: locale === "en-US" ? "UTC" : "America/Sao_Paulo",
  };
});
