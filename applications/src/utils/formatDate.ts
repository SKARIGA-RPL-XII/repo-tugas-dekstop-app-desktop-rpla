export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "id-ID"
): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    ...options,
  }).format(d);
}
