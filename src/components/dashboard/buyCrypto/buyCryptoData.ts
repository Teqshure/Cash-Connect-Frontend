// ─────────────────────────────────────────────────────────────────────────────
// Buy Crypto — shared types & transitional static data (API-ready)
// ─────────────────────────────────────────────────────────────────────────────

// ✅ TOKEN TYPE (will later match backend response)
export type CryptoToken = {
  id: string;
  name: string;
  symbol: string;
  color: string;

  // 🔥 NEW (for API compatibility)
  network?: string;
};

// ✅ PAYMENT ACCOUNT TYPE
export type PaymentAccountOption = {
  id: string;
  type: "bank" | "crypto" | "wallet";
  label: string;
  sublabel: string;
  logoText?: string;
  logoColor?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ TEMP STATIC DATA (TO BE REPLACED BY API)
// ─────────────────────────────────────────────────────────────────────────────

// 🔥 Will be replaced by: fetchCryptos()
export const CRYPTO_TOKENS: CryptoToken[] = [
  {
    id: "usdt",
    name: "USDT",
    symbol: "USDT",
    color: "bg-emerald-500",
    network: "TRC20",
  },
  {
    id: "btc",
    name: "BTC",
    symbol: "BTC",
    color: "bg-orange-500",
    network: "BTC",
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    color: "bg-blue-500",
    network: "ERC20",
  },
];

// 🔥 UI helper only (keep this)
export const BUY_AMOUNT_PRESETS = [500, 1000, 3000, 5000];

// ❌ REMOVE LATER → replace with useCryptoRate()
export const RATE_PER_USDT = 1450;

// ❌ REMOVE LATER → backend should return wallet address
export const WALLET_ADDRESS = "TJaBucewys2MkKcqCastDLvWvndYGQbgwg";

// ⚠️ Can stay OR come from API (user accounts)
export const PAYMENT_ACCOUNTS: PaymentAccountOption[] = [
  {
    id: "crypto",
    type: "crypto",
    label: "Pay via crypto",
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
