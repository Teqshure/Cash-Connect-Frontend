// ─────────────────────────────────────────────────────────────────────────────
// Shared types & data for the Send Payment flow
// ─────────────────────────────────────────────────────────────────────────────

export type PaymentMethod = {
  id: string;
  name: string;
  logo: string; // path to logo image — replace with actual assets
  eta: string;
  feeNote: string;
};

export type Currency = { code: string; label: string; flag: string };
export type AmountPreset = number;

export const PAYMENT_METHODS: PaymentMethod[] = [
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
    logo: "/images/payments/western-union.png",
    eta: "Instant",
    feeNote: "2%",
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    logo: "/images/payments/money-gram.png",
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

export const AMOUNT_PRESETS: AmountPreset[] = [500, 1000, 3000, 5000];

export const RATE_PER_USDT = 1450;
