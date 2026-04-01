// sendPaymentData.ts

export type PaymentMethod = {
  id: string;
  name: string;
  logo: string;
  eta: string;
  feeNote: string;
  code?: string;
  rates?: {
    buy_rate: string;
    sell_rate: string;
    min_amount: string;
    max_amount: string;
  } | null;
};

export type Currency = { code: string; label: string; flag: string };
export type AmountPreset = number;

// Export the store's hooks for use in components
export {
  useGlobalPaymentStore,
  useUIPaymentMethods,
  useSendPayment,
  usePaymentMethodRate,
  useAmountValidation,
} from "@/store/globalPayment";

// Static data
export const CURRENCIES: Currency[] = [
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "CAD", label: "CAD", flag: "🇨🇦" },
  { code: "EUR", label: "EUR", flag: "🇪🇺" },
];

export const AMOUNT_PRESETS: AmountPreset[] = [500, 1000, 3000, 5000];

// ✅ Added — was missing and causing the build error
export const RATE_PER_USDT = 1450;

export let PAYMENT_METHODS: PaymentMethod[] = [];
