// ─────────────────────────────────────────────────────────────────────────────
// Sell Crypto — shared types & static data
// ─────────────────────────────────────────────────────────────────────────────

export type CryptoToken = {
  id: string;
  name: string;
  symbol: string;
  color: string; // tailwind bg color
  textColor: string;
};

export type CryptoNetwork = {
  id: string;
  label: string;
};

export type PaymentAccountOption = {
  id: string;
  type: "bank" | "crypto" | "wallet";
  label: string;
  sublabel: string;
  logoText?: string; // initials fallback
  logoColor?: string;
};

export type SellCryptoFormData = {
  token: CryptoToken;
  network: CryptoNetwork;
  amount: number;
  youGet: number;
  paymentAccount: PaymentAccountOption;
};

// ── Static data ───────────────────────────────────────────────────────────────

export const CRYPTO_TOKENS: CryptoToken[] = [
  {
    id: "usdt",
    name: "USDT",
    symbol: "USDT",
    color: "bg-emerald-500",
    textColor: "text-white",
  },
  {
    id: "btc",
    name: "BTC",
    symbol: "BTC",
    color: "bg-orange-500",
    textColor: "text-white",
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    color: "bg-blue-500",
    textColor: "text-white",
  },
];

export const CRYPTO_NETWORKS: CryptoNetwork[] = [
  { id: "erc20", label: "ERC20" },
  { id: "btc", label: "BTC" },
  { id: "usdc", label: "USDC" },
];

export const SELL_AMOUNT_PRESETS = [500, 1000, 3000, 5000];
export const BUY_AMOUNT_PRESETS = [5000, 25000, 50000, 100000, 200000];

export const RATE_PER_USDT = 1450;

export const WALLET_ADDRESS = "TJaBucewys2MkKcqCastDLvWvndYGQbgwg";
export const MOCK_QR_CODE = "/images/crypto/qr-placeholder.png"; // replace with real QR

export const PAYMENT_ACCOUNTS: PaymentAccountOption[] = [
  {
    id: "uba",
    type: "bank",
    label: "2141536385- Emmanuel Nwaezeoma Chijioke",
    sublabel: "United Bank of Africa",
    logoText: "BA",
    logoColor: "bg-red-600",
  },
  {
    id: "crypto",
    type: "crypto",
    label: "Pay with Crypto",
    sublabel: "Unlimited transfer",
    logoText: "₿",
    logoColor: "bg-orange-500",
  },
  {
    id: "cashconnect",
    type: "wallet",
    label: "My Cash Connect Wallet",
    sublabel: "Fast and reliable",
    logoText: "CC",
    logoColor: "bg-emerald-500",
  },
];
