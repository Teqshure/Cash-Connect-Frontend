// store/globalPayment.ts

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useEffect } from "react";

// ✅ Correct base URL — no double v1
const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1/v1";

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------

export interface InternationalRate {
  buy_rate: string;
  sell_rate: string;
  min_amount: string;
  max_amount: string;
  currency: string;
}

export interface PaymentMethod {
  name: string;
  code: string;
  description: string | null;
  rates: InternationalRate | null;
}

export interface UIPaymentMethod {
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
}

export interface InternationalTransaction {
  id: number;
  user_id: number;
  type: string;
  direction: string;
  amount: string;
  currency: string;
  fee: string;
  status: string;
  reference: string;
  description: string | null;
  metadata: string | null;
  approved_by: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SendPaymentFormData {
  currency: string;
  country: string;
  email: string;
  gender: string;
  tagId: string;
  amount: number | "";
}

export interface SendPaymentPayload {
  method: string;
  email: string;
  crypto_amount: number;
  currency: string;
  country: string;
  gender: string;
}

export interface ReceivePaymentPayload {
  method: string;
  crypto_amount: number;
  currency: string;
  sender_email: string;
}

interface GlobalPaymentState {
  methods: PaymentMethod[];
  transactions: InternationalTransaction[];
  transaction: InternationalTransaction | null;
  paypalEmail: string | null;

  loading: boolean;
  error: string | null;
  submitting: boolean;

  fetchMethods: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchTransaction: (id: string) => Promise<void>;
  fetchPaypalEmail: () => Promise<void>;
  sendPayment: (data: SendPaymentPayload) => Promise<any>;
  receivePayment: (data: ReceivePaymentPayload) => Promise<any>;
  convertToUIMethods: (apiMethods: PaymentMethod[]) => UIPaymentMethod[];
  clearError: () => void;
}

// ------------------------------------------------------
// HELPERS
// ------------------------------------------------------

function authHeaders() {
  const token = useAuthStore.getState().token;

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ✅ safer crypto calculation helper
function calculateCrypto(amount: number, rate: number) {
  if (!rate || rate <= 0) return 0;
  return Number((amount / rate).toFixed(6));
}

const LOGO_MAP: Record<string, string> = {
  PayPal: "/images/payments/paypal.png",
  Zelle: "/images/payments/zelle.png",
  "Western Union": "/images/payments/western-union.png",
  MoneyGram: "/images/payments/money-gram.png",
  Venmo: "/images/payments/venmo.png",
  CashApp: "/images/payments/cashapp.png",
  Payoneer: "/images/payments/payoneer.png",
  Skrill: "/images/payments/skrill.png",
  Neteller: "/images/payments/neteller.png",
  Wise: "/images/payments/wise.png",
  Chime: "/images/payments/chime.png",
  Remitly: "/images/payments/remitly.png",
};

function convertAPIToUIMethods(apiMethods: PaymentMethod[]): UIPaymentMethod[] {
  return apiMethods.map((method) => ({
    id: method.code || method.name.toLowerCase().replace(/\s+/g, "-"),
    name: method.name,
    code: method.code,
    logo: LOGO_MAP[method.name] || "/images/payments/default.png",
    eta: method.rates ? "Instant" : "2-3 days",
    feeNote: method.rates ? `${method.rates.sell_rate} NGN/USDT` : "2%",
    rates: method.rates,
  }));
}

// ------------------------------------------------------
// STORE
// ------------------------------------------------------

export const useGlobalPaymentStore = create<GlobalPaymentState>(
  (set: any, get: any) => ({
    methods: [],
    transactions: [],
    transaction: null,
    paypalEmail: null,
    loading: false,
    error: null,
    submitting: false,

    // ✅ GET /international/available-methods
    fetchMethods: async () => {
      set({ loading: true, error: null });

      try {
        const res = await fetch(`${BASE_URL}/international/available-methods`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load methods");

        set({ methods: data.data || [], loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    // ✅ GET /international/my-transactions
    fetchTransactions: async () => {
      set({ loading: true, error: null });

      try {
        const res = await fetch(`${BASE_URL}/international/my-transactions`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to load transactions");

        set({ transactions: data.data || [], loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    // ✅ GET /international/my-transactions/{id}
    fetchTransaction: async (id: string) => {
      set({ loading: true, error: null });

      try {
        const res = await fetch(
          `${BASE_URL}/international/my-transactions/${id}`,
          {
            headers: authHeaders(),
          },
        );

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to load transaction");

        set({ transaction: data.data, loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    // ✅ GET /international/paypal-email
    fetchPaypalEmail: async () => {
      try {
        const res = await fetch(`${BASE_URL}/international/paypal-email`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        if (data.email) set({ paypalEmail: data.email });
      } catch (err: any) {
        console.error("PayPal email fetch failed:", err.message);
      }
    },

    // ✅ POST /international/send
    sendPayment: async (payload: SendPaymentPayload) => {
      set({ submitting: true, error: null });

      try {
        const res = await fetch(`${BASE_URL}/international/send`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Payment failed");

        await get().fetchTransactions();

        set({ submitting: false });

        return data;
      } catch (err: any) {
        set({ error: err.message, submitting: false });
        throw err;
      }
    },

    // ✅ POST /international/receive
    receivePayment: async (payload: ReceivePaymentPayload) => {
      set({ submitting: true, error: null });

      try {
        console.log("========== RECEIVE PAYMENT DEBUG ==========");
        console.log("Payload:", payload);

        const res = await fetch(`${BASE_URL}/international/receive`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Receive failed");

        await get().fetchTransactions();

        set({ submitting: false });

        return data;
      } catch (err: any) {
        set({ error: err.message, submitting: false });
        throw err;
      }
    },

    convertToUIMethods: (apiMethods: any) => convertAPIToUIMethods(apiMethods),

    clearError: () => set({ error: null }),
  }),
);

// ------------------------------------------------------
// CUSTOM HOOKS
// ------------------------------------------------------

export const useUIPaymentMethods = () => {
  const { methods, convertToUIMethods, loading } = useGlobalPaymentStore();
  return { uiMethods: convertToUIMethods(methods), loading };
};

// ✅ auto-load methods hook
export const useLoadPaymentMethods = () => {
  const fetchMethods = useGlobalPaymentStore((s: any) => s.fetchMethods);
  const methods = useGlobalPaymentStore((s: any) => s.methods);

  useEffect(() => {
    if (!methods.length) fetchMethods();
  }, [methods.length, fetchMethods]);
};

export const useSendPayment = () => {
  const { sendPayment, submitting, error } = useGlobalPaymentStore();

  const submitPayment = async (
    formData: SendPaymentFormData,
    method: UIPaymentMethod,
  ) => {
    const rate = method.rates?.sell_rate
      ? parseFloat(method.rates.sell_rate)
      : 1450;

    const amount = typeof formData.amount === "number" ? formData.amount : 0;

    const cryptoAmount = calculateCrypto(amount, rate);

    const payload: SendPaymentPayload = {
      method: method.code || method.id,
      email: formData.email,
      crypto_amount: cryptoAmount,
      currency: formData.currency,
      country: formData.country,
      gender: formData.gender,
    };

    return await sendPayment(payload);
  };

  return { submitPayment, submitting, error };
};

export const usePaymentMethodRate = (method: UIPaymentMethod | null) => {
  if (!method?.rates?.sell_rate) return 1450;
  return parseFloat(method.rates.sell_rate);
};

export const useAmountValidation = (method: UIPaymentMethod | null) => {
  const validate = (amount: number) => {
    if (!method?.rates) return { isValid: true, message: "" };

    const min = parseFloat(method.rates.min_amount);
    const max = parseFloat(method.rates.max_amount);

    if (amount < min)
      return {
        isValid: false,
        message: `Minimum amount is ₦${min.toLocaleString()}`,
      };

    if (amount > max)
      return {
        isValid: false,
        message: `Maximum amount is ₦${max.toLocaleString()}`,
      };

    return { isValid: true, message: "" };
  };

  return { validate };
};

export const usePaymentTransactions = () => {
  const transactions = useGlobalPaymentStore((s: any) => s.transactions);
  const fetchTransactions = useGlobalPaymentStore(
    (s: any) => s.fetchTransactions,
  );
  const loading = useGlobalPaymentStore((s: any) => s.loading);

  return { transactions, fetchTransactions, loading };
};
