export function formatMoney(amount: number, currency = "₦") {
  const safe = Number.isFinite(amount) ? amount : Number(amount || 0);
  return `${currency}${safe.toLocaleString("en-US")}`;
}
