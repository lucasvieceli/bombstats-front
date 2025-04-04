export function getFormatDateOptions() {
  return {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  } as any;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", getFormatDateOptions()).format(date);
}
