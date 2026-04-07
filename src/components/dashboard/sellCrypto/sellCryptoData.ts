// components/dashboard/sellCrypto/sellCryptoData.ts

export type CryptoToken = {
  id: string;
  name: string;
  symbol: string;
  color: string;
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
  logoText?: string;
  logoColor?: string;
  bankAccountId?: number; // ✅ Add bank account ID for bank accounts
};

export const SELL_AMOUNT_PRESETS = [500, 1000, 3000, 5000];

// Payment accounts with proper bank account IDs
export const PAYMENT_ACCOUNTS: PaymentAccountOption[] = [
  {
    id: "uba",
    type: "bank",
    label: "2141536385 - Emmanuel Nwaezeoma Chijioke",
    sublabel: "United Bank of Africa",
    logoText: "UB",
    logoColor: "bg-red-600",
    bankAccountId: 1, // ✅ Actual bank account ID from backend
  },
  {
    id: "gtb",
    type: "bank",
    label: "0123456789 - John Doe",
    sublabel: "Guaranty Trust Bank",
    logoText: "GT",
    logoColor: "bg-orange-500",
    bankAccountId: 2, // ✅ Actual bank account ID from backend
  },
  {
    id: "cashconnect",
    type: "wallet",
    label: "My Cash Connect Wallet",
    sublabel: "Fast and reliable",
    logoText: "CC",
    logoColor: "bg-emerald-500",
    // ✅ No bankAccountId for wallet type
  },
];
