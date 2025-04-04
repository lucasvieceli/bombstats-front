export interface IHouse {
  id: number;
  index: number;
  rarity: number;
  recovery: number;
  capacity: number;
  blockNumber: number;
  name: string;
}

export const HOUSE_NAMES: Record<number, string> = {
  0: "Tiny",
  1: "Mini",
  2: "Lux",
  3: "Pent",
  4: "Villa",
  5: "Super Villa",
};

export const HOUSE_NAMES_ARRAY: string[] = [
  "Tiny",
  "Mini",
  "Lux",
  "Pent",
  "Villa",
  "Super Villa",
];

export const HOUSE_TYPE_MAP = [
  {
    name: "Tiny",
    size: "6x6",
    charge: 2,
    capacity: 4,
    image: "/images/houses/tiny.webp",
  },
  {
    name: "Mini",
    size: "6x10",
    charge: 5,
    capacity: 6,
    image: "/images/houses/mini.webp",
  },
  {
    name: "Lux",
    size: "6x15",
    charge: 8,
    capacity: 8,
    image: "/images/houses/lux.webp",
  },
  {
    name: "Pent",
    size: "6x20",
    charge: 11,
    capacity: 10,
    image: "/images/houses/pent.webp",
  },
  {
    name: "Villa",
    size: "6x25",
    charge: 14,
    capacity: 12,
    image: "/images/houses/villa.webp",
  },
  {
    name: "Super Villa",
    size: "6x30",
    charge: 17,
    capacity: 14,
    image: "/images/houses/super-villa.webp",
  },
];
