// sendPaymentData.ts
import { useGlobalPaymentStore, UIPaymentMethod } from "@/store/globalPayment";

export type PaymentMethod = UIPaymentMethod;

export type Currency = { code: string; label: string; flag: string };
export type AmountPreset = number;

// Export the store's types and hooks for use in components
export {
  useGlobalPaymentStore,
  useUIPaymentMethods,
  useSendPayment,
  usePaymentMethodRate,
  useAmountValidation,
} from "@/store/globalPayment";

// Static data for currencies and presets
export const CURRENCIES: Currency[] = [
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "CAD", label: "CAD", flag: "🇨🇦" },
  { code: "EUR", label: "EUR", flag: "🇪🇺" },
];

export const AMOUNT_PRESETS: AmountPreset[] = [500, 1000, 3000, 5000];

// This will be populated from the store
export let PAYMENT_METHODS: PaymentMethod[] = [];
