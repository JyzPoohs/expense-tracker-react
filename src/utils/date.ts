import { format } from "date-fns";

export function formatDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0];
}

export function formatDateToYYYYMMDD(date: Date): string {
  return format(date, "yyyy-MM-dd'T'00:00:00");
}
