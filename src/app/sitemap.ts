import { MetadataRoute } from "next";

const rotas = [
  {
    url: "/",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.5,
  },
  {
    url: "/wallet",
    lastModified: new Date(),
    changeFrequency: "never",
    priority: 0.5,
  },
  {
    url: "/hero",
    lastModified: new Date(),
    changeFrequency: "never",
    priority: 0.5,
  },
  {
    url: "/hero/best-cost-quartz",
    lastModified: new Date(),
    changeFrequency: "never",
    priority: 0.5,
  },
  {
    url: "/house",
    lastModified: new Date(),
    changeFrequency: "never",
    priority: 0.5,
  },
  {
    url: "/ranking-stake/common",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-global-stake/common",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-stake/rare",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-stake/super-rare",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-stake/epic",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-stake/legend",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-stake/super-legend",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-stake-wallet",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-global-stake-wallet",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/ranking-claim",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/real-time-retail",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
  {
    url: "/retail/heroes",
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.5,
  },
];

function generateRoute(network: string) {
  return rotas.map((rota) => {
    return {
      ...rota,
      url: `${network}${rota.url}`,
    };
  }) as MetadataRoute.Sitemap;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...generateRoute("bsc"), ...generateRoute("polygon")];
}
