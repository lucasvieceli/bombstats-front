export const REWARD_MAP: Record<string, string> = {
  BOMBERMAN: "Bomberman",
  BCOIN: "BCoin",
  BCOIN_DEPOSITED: "BCoin Deposited",
  SENSPARK: "Senspark",
  MSPc: "MSPc",
  BOSS_TICKET: "BOSS TICKET",
  PVP_TICKET: "PVP TICKET",
  COIN: "Star Core",
  NFT_PVP: "NFT PVP",
  LUS: "Lus",
  WOFM: "WOFM",
  LUS_NFT: "Lus NFT",
  KEY: "Key",
  GEM: "Gem",
  GEM_LOCKED: "Gem Locked",
  GOLD: "Gold",
};

export const TOKENS_IDS_MAP: any = {
  "0xfe302b8666539d5046cd9aa0707bb327f5f94c22": "Sens", //plygon
  "0xb43ac9a81eda5a5b36839d5b6fc65606815361b0": "Sens", //BSC,
  "0xb2c63830d4478cb331142fac075a39671a5541dc": "Bcoin", //polygon
  "0x00e1656e45f18ec6747f5a8496fd39b50b38396d": "Bcoin", //BSC
  "0x0000000000000000000000000000000000001010": "Matic",
};
export const TOKENS_IDS_MAP_IMAGE: any = {
  "0xfe302b8666539d5046cd9aa0707bb327f5f94c22": "/images/sen.webp", //plygon
  "0xb43ac9a81eda5a5b36839d5b6fc65606815361b0": "/images/sen.webp", //BSC,
  "0xb2c63830d4478cb331142fac075a39671a5541dc": "/images/bomb.webp", //polygon
  "0x00e1656e45f18ec6747f5a8496fd39b50b38396d": "/images/bomb.webp", //BSC
  "0x0000000000000000000000000000000000001010": "/images/matic.webp",
};

export const NAMES_TOKENS_IDS_MAP = {
  SEN_POLYGON: "0xfe302b8666539d5046cd9aa0707bb327f5f94c22",
  SEN_BSC: "0xb43ac9a81eda5a5b36839d5b6fc65606815361b0",
  BCOIN_POLYGON: "0xb2c63830d4478cb331142fac075a39671a5541dc",
  BCOIN_BSC: "0x00e1656e45f18ec6747f5a8496fd39b50b38396d",
  MATIC: "0x0000000000000000000000000000000000001010",
};

export const TOKENS_POLYGON: Record<string, string> = {
  SEN: NAMES_TOKENS_IDS_MAP.SEN_POLYGON,
  BCOIN: NAMES_TOKENS_IDS_MAP.BCOIN_POLYGON,
  MATIC: NAMES_TOKENS_IDS_MAP.MATIC,
};

export const TOKENS_BSC: Record<string, string> = {
  SEN: NAMES_TOKENS_IDS_MAP.SEN_BSC,
  BCOIN: NAMES_TOKENS_IDS_MAP.BCOIN_BSC,
};

const REWARD_IMAGE_MAP: Record<string, string> = {
  BCOIN: "/images/bomb.webp",
  SENSPARK: "/images/sen.webp",
  COIN: "/images/star-core.webp",
  BOMBERMAN: "/images/blocks/jail.webp",
};
export type RewardType = keyof typeof REWARD_MAP;

export function parseRewardImage(type: string) {
  return type in REWARD_IMAGE_MAP ? REWARD_IMAGE_MAP[type] : "Unknown";
}

export function parseRewardName(type: number | RewardType) {
  return type in REWARD_MAP ? REWARD_MAP[type] : "Unknown";
}
