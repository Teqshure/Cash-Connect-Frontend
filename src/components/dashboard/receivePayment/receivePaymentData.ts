// ─────────────────────────────────────────────────────────────────────────────
// Shared types & static data for the Receive Payment flow
// ─────────────────────────────────────────────────────────────────────────────

export type ReceivePaymentMethod = {
  id: string;
  name: string;
  logo: string; // place actual assets in /public/images/payments/
  eta: string;
  feeNote: string;
};

export type Currency = { code: string; label: string; flag: string };

export const RECEIVE_PAYMENT_METHODS: ReceivePaymentMethod[] = [
  {
    id: "paypal",
    name: "PayPal",
    logo: "/images/payments/paypal.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "zelle",
    name: "Zelle",
    logo: "/images/payments/zelle.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "westernunion",
    name: "Western Union",
    logo: "/images/payments/westernunion.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    logo: "/images/payments/moneygram.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "venmo",
    name: "Venmo",
    logo: "/images/payments/venmo.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "cashapp",
    name: "CashApp",
    logo: "/images/payments/cashapp.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "payoneer",
    name: "Payoneer",
    logo: "/images/payments/payoneer.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "skrill",
    name: "Skrill",
    logo: "/images/payments/skrill.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "neteller",
    name: "Neteller",
    logo: "/images/payments/neteller.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "wise",
    name: "Wise",
    logo: "/images/payments/wise.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "chime",
    name: "Chime",
    logo: "/images/payments/chime.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "remitly",
    name: "Remitly",
    logo: "/images/payments/remitly.png",
    eta: "Instant",
    feeNote: "2%",
  },
];

export const CURRENCIES: Currency[] = [
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "CAD", label: "CAD", flag: "🇨🇦" },
  { code: "EUR", label: "EUR", flag: "🇪🇺" },
];

export const AMOUNT_PRESETS = [5000, 25000, 50000, 100000, 500000, 900000];
export const RATE_PER_USDT = 1450;

/** Generates a unique transaction tag ID */
export function generateTagId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `TXN-${year}-${month}${day}-${rand}`;
}
