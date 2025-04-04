/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";
import nextPWA from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const withPWA = nextPWA({
  dest: "public",
  register: true,
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bcrypt.com.br",
        port: "",
      },
      {
        protocol: "https",
        hostname: "discordapp.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ytimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i3.ytimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
        port: "",
      },
    ],
  },
  // pwa: {
  //   dest: "public",
  //   disable: false,
  // },
};

const sentryConfig = {
  org: "lucas-45",
  project: "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false, // Can be used to suppress logs
};

export default withNextIntl(nextConfig);
