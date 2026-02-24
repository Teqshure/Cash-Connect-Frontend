export function formatMoney(amount: number, currency = "₦") {
  const safe = Number(amount ?? 0);
  return `${currency}${safe.toLocaleString("en-NG")}`;
}
