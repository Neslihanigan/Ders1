export function formatDate(date: string): string {
  const parts = date.split("-");
  let y: number;
  let m: number;
  let d: number;
  if (parts[0].length === 4) {
    [y, m, d] = parts.map(Number);
  } else {
    [d, m, y] = parts.map(Number);
  }
  return new Date(y, m - 1, d).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

