export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }).slice(0, 3);
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
