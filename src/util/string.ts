export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeEveryLetter(string: string) {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}
