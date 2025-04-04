export const BLOCK_TYPE_MAP: Record<number, string> = {
  0: "Green",
  1: "Rock",
  2: "Cage",
  3: "Wood",
  4: "Silver",
  5: "Gold",
  6: "Diamond",
  8: "Key",
  14: "Pig",
} as const;

const BLOCK_IMAGE_MAP: Record<number, string> = {
  0: "green.webp",
  1: "/images/blocks/rock.webp",
  2: "/images/blocks/jail.webp",
  3: "/images/blocks/wood.webp",
  4: "/images/blocks/silver.webp",
  5: "/images/blocks/gold.webp",
  6: "/images/blocks/diamond.webp",
  8: "key.webp",
  14: "pig.webp",
} as const;

export function parseBlockImage(block: number) {
  return block in BLOCK_IMAGE_MAP ? BLOCK_IMAGE_MAP[block] : "Unknown";
}

export function parseBlockName(block: number) {
  return block in BLOCK_TYPE_MAP ? BLOCK_TYPE_MAP[block] : "Unknown";
}
