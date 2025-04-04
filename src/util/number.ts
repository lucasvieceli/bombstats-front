import { getCookie } from "@/util/cookie";

export function getNumberFormatOptions(decimals: number = 2) {
  return {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  } as any;
}

export function getOrdinalSuffix(position: number, locale: string = "en-US") {
  const j = position % 10;
  const k = position % 100;

  if (locale === "pt-BR") {
    return `${position}${"º"}`;
  }

  if (j === 1 && k !== 11) {
    return `${position}${"st"}`;
  }
  if (j === 2 && k !== 12) {
    return `${position}${"nd"}`;
  }
  if (j === 3 && k !== 13) {
    return `${position}${"rd"}`;
  }
  return `${position}${"th"}`;
}

export function randomId() {
  return Math.floor(Math.random() * 1000000);
}
