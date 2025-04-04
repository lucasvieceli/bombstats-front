// export interface IHero {
//   id: number;
//   index: number;
//   rarity: string;
//   raritySimbol: string;
//   rarityIndex: number;
//   level: number;
//   variant: number;
//   skin: number;
//   skinValue: number;
//   stamina: number;
//   speed: number;
//   bombSkin: number;
//   skillCount: number;
//   capacity: number;
//   strength: number;
//   range: number;
//   blockNumber: number;
//   randomizeAbilityCounter: number;
//   numUpgradeShieldLevel: number;
//   numResetShield: number;
//   abilities: string[];
//   abilityHeroS: number[];
//   maxShield: number;
//   stake: number;
//   wallet?: string;
// }

export const STATE_ARRAY = ["Work", "Sleep", "Home"] as const;
export type EHeroState = (typeof STATE_ARRAY)[number] | "Unknown";

export function parseHeroState(stage: number): EHeroState {
  return STATE_ARRAY[stage] || "Unknown";
}
export function parseHeroStateImage(stage: number): string {
  if (stage === 0) return "/images/farming.webp";
  if (stage === 1) return "/images/hero.webp";
  if (stage === 2) return "/images/market.webp";

  return "/images/hero.webp";
}

export const HERO_SKIN_MAP_IMAGE: Record<number, Record<number, string>> = {
  1: {
    1: "/images/heroes/frog_blue.webp",
    2: "/images/heroes/frog_green.webp",
    3: "/images/heroes/frog_red.webp",
    4: "/images/heroes/frog_purple.webp",
    5: "/images/heroes/frog_yellow.webp",
    6: "/images/heroes/frog_red.webp",
  },
  2: {
    1: "/images/heroes/knight_blue.webp",
    2: "/images/heroes/knight_green.webp",
    3: "/images/heroes/knight_white.webp",
    4: "/images/heroes/knight_white.webp",
    5: "/images/heroes/knight_yellow.webp",
    6: "/images/heroes/knight_red.webp",
  },
  3: {
    1: "/images/heroes/man_blue.webp",
    2: "/images/heroes/man_green.webp",
    3: "/images/heroes/man_white.webp",
    4: "/images/heroes/man_white.webp",
    5: "/images/heroes/man_yellow.webp",
    6: "/images/heroes/man_red.webp",
  },
  4: {
    1: "/images/heroes/vampire_blue.webp",
    2: "/images/heroes/vampire_green.webp",
    3: "/images/heroes/vampire_red.webp",
    4: "/images/heroes/vampire_purple.webp",
    5: "/images/heroes/vampire_yellow.webp",
    6: "/images/heroes/vampire_red.webp",
  },
  5: {
    1: "/images/heroes/witch_blue.webp",
    2: "/images/heroes/witch_green.webp",
    3: "/images/heroes/witch_red.webp",
    4: "/images/heroes/witch_purple.webp",
    5: "/images/heroes/witch_yellow.webp",
    6: "/images/heroes/witch_red.webp",
  },
  6: {
    1: "/images/heroes/doge.webp",
    2: "/images/heroes/doge.webp",
    3: "/images/heroes/doge.webp",
    4: "/images/heroes/doge.webp",
    5: "/images/heroes/doge.webp",
  },
  7: {
    1: "/images/heroes/pepe.webp",
    2: "/images/heroes/pepe.webp",
    3: "/images/heroes/pepe.webp",
    4: "/images/heroes/pepe.webp",
    5: "/images/heroes/pepe.webp",
  },
  8: {
    1: "/images/heroes/ninja.webp",
    2: "/images/heroes/ninja.webp",
    3: "/images/heroes/ninja.webp",
    4: "/images/heroes/ninja.webp",
    5: "/images/heroes/ninja.webp",
  },
  9: {
    1: "/images/heroes/king.webp",
    2: "/images/heroes/king.webp",
    3: "/images/heroes/king.webp",
    4: "/images/heroes/king.webp",
    5: "/images/heroes/king.webp",
  },
  10: {
    1: "/images/heroes/rabbit.webp",
    2: "/images/heroes/rabbit.webp",
    3: "/images/heroes/rabbit.webp",
    4: "/images/heroes/rabbit.webp",
    5: "/images/heroes/rabbit.webp",
  },
  14: {
    1: "/images/heroes/cat.webp",
    2: "/images/heroes/cat.webp",
    3: "/images/heroes/cat.webp",
    4: "/images/heroes/cat.webp",
    5: "/images/heroes/cat.webp",
  },
  15: {
    1: "/images/heroes/tiger.webp",
    2: "/images/heroes/tiger.webp",
    3: "/images/heroes/tiger.webp",
    4: "/images/heroes/tiger.webp",
    5: "/images/heroes/tiger.webp",
  },
  16: {
    1: "/images/heroes/pug.webp",
    2: "/images/heroes/pug.webp",
    3: "/images/heroes/pug.webp",
    4: "/images/heroes/pug.webp",
    5: "/images/heroes/pug.webp",
  },
};

export function parseHeroSkinImage(
  skin: number,
  variant: number,
  burned?: boolean
) {
  if (burned) {
    return "/images/heroes/burned.webp";
  }
  return skin in HERO_SKIN_MAP_IMAGE && variant in HERO_SKIN_MAP_IMAGE[skin]
    ? HERO_SKIN_MAP_IMAGE[skin][variant]
    : "/images/heroes/man_white.webp";
}

export function parseHeroAbilityImage(ability: string) {
  return ability in HERO_SKILL_IMAGE_MAP
    ? HERO_SKILL_IMAGE_MAP[ability]
    : "Unknown";
}

export const HERO_SKILL_IMAGE_MAP: Record<string, string> = {
  ADOnChestExplosion: "/images/skills/treasure-hunter.webp",
  ADOnCageExplosion: "/images/skills/jail-breaker.webp",
  BlockPiercing: "/images/skills/pierce-block.webp",
  EnergyShield: "/images/skills/save-battery.webp",
  Battery: "/images/skills/fast-charge.webp",
  WalkThroughBomb: "/images/skills/bomb-pass.webp",
  WalkThroughBlock: "/images/skills/block-pass.webp",
};
export const HERO_SKILL_DESCRIPTION_MAP: Record<string, string> = {
  ADOnChestExplosion: "+ 02 DMG when The Chest explodes",
  ADOnCageExplosion: "+ 05 DMG when The Prison explodes",
  BlockPiercing: "+ Explode through The Block",
  EnergyShield: "+ 20 % Rate not lost Mana when placing Bomb",
  Battery: "+ 0,5 Stamina/Min while Resting",
  WalkThroughBomb: "Go through The Bomb",
  WalkThroughBlock: "Go through The Block",
};

export const HERO_RARITY_ARRAY: string[] = [
  "Common",
  "Rare",
  "Super Rare",
  "Epic",
  "Legend",
  "Super Legend",
];

export const HERO_COLORS: string[] = [
  "#d5d5d5",
  "#3bca22",
  "#a507ff",
  "#ff00ee",
  "#ffc107",
  "#ff0759",
];

export const HERO_MINIMUM_STAKE = {
  sens: [300, 971, 1942, 3884, 9709, 19417],
  bcoin: [80, 194, 388, 777, 1942, 3883],
};
