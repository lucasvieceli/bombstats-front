import RegisterServiceWorker from "@/app/RegisterServiceWorker";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const Menu = dynamic(() => import("@/components/Menu"), { ssr: false });

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BombStats",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9314462597630539" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9314462597630539"
        ></script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E7NY2W59JZ"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9314462597630539"
          //@ts-ignore
          crossorigin="anonymous"
        ></script>

        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V0WRP0FG2T');
          `}
        </Script>
      </head>

      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={`${montserrat.className} min-h-svh`}>
        <NextIntlClientProvider messages={messages}>
          {/* <FcmTokenComp /> */}
          <RegisterServiceWorker />
          <div className="bg-primary  flex flex-col items-center min-h-svh">
            <div className="max-w-[1536px] w-full flex flex-row">
              <Menu />
              <div className="py-4 pl-4 pr-4 md:py-8 md:pl-8 flex min-h-screen flex-col items-center w-full">
                {children}
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
