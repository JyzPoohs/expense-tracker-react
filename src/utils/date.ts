import { format } from "date-fns";

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("sv-SE");
}

export function formatDateToYYYYMMDD(date: Date): string {
  return format(date, "yyyy-MM-dd'T'00:00:00");
}
