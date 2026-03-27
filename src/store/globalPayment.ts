// @store/globalPayment.ts

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

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

// UI-specific payment method type with additional fields for display
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

// Send payment form data
export interface SendPaymentFormData {
  currency: string;
  country: string;
  email: string;
  gender: string;
  tagId: string;
  amount: number | "";
}

// Send payment payload
export interface SendPaymentPayload {
  method: string;
  email: string;
  crypto_amount: number;
  currency: string;
  country: string;
  gender: string;
}

// Receive payment payload
export interface ReceivePaymentPayload {
  method: string;
  crypto_amount: number;
  currency: string;
  sender_email: string;
}

interface GlobalPaymentState {
  // Data
  methods: PaymentMethod[];
  transactions: InternationalTransaction[];
  transaction: InternationalTransaction | null;
  paypalEmail: string | null;

  // UI state
  loading: boolean;
  error: string | null;
  submitting: boolean;

  // Actions
  fetchMethods: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchTransaction: (id: string) => Promise<void>;
  fetchPaypalEmail: () => Promise<void>;

  sendPayment: (data: SendPaymentPayload) => Promise<any>;
  receivePayment: (data: ReceivePaymentPayload) => Promise<any>;

  // Helper functions for UI conversion
  convertToUIMethods: (apiMethods: PaymentMethod[]) => UIPaymentMethod[];
}

// ------------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------------

// Logo mapping for different payment methods
const getLogoForMethod = (methodName: string): string => {
  const logoMap: Record<string, string> = {
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
  return logoMap[methodName] || "/images/payments/default.png";
};

// Convert API methods to UI format
const convertAPIToUIMethods = (
  apiMethods: PaymentMethod[],
): UIPaymentMethod[] => {
  return apiMethods.map((method, index) => ({
    id: method.code || method.name.toLowerCase().replace(/\s+/g, "-"),
    name: method.name,
    code: method.code,
    logo: getLogoForMethod(method.name),
    eta: method.rates ? "Instant" : "2-3 days",
    feeNote: method.rates ? `${method.rates.sell_rate} NGN/USDT` : "2%",
    rates: method.rates,
  }));
};

// ------------------------------------------------------
// STORE
// ------------------------------------------------------

export const useGlobalPaymentStore = create<GlobalPaymentState>((set, get) => ({
  methods: [],
  transactions: [],
  transaction: null,
  paypalEmail: null,
  loading: false,
  error: null,
  submitting: false,

  // ------------------------------------------------------
  // GET AVAILABLE METHODS
  // ------------------------------------------------------

  fetchMethods: async () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "No authentication token found" });
      return;
    }

    try {
      set({ loading: true, error: null });

      const res = await fetch(
        `${BASE_URL}/v1/international/available-methods`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();

      console.log("AVAILABLE METHODS RESPONSE:", data);

      if (data.status) {
        set({ methods: data.data });
      } else {
        throw new Error(data.message || "Failed to load methods");
      }
    } catch (err: any) {
      console.error("FETCH METHODS ERROR:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ------------------------------------------------------
  // GET USER TRANSACTIONS
  // ------------------------------------------------------

  fetchTransactions: async () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "No authentication token found" });
      return;
    }

    try {
      set({ loading: true, error: null });

      const res = await fetch(`${BASE_URL}/v1/international/my-transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      console.log("TRANSACTIONS RESPONSE:", data);

      if (data.status) {
        set({ transactions: data.data });
      } else {
        throw new Error(data.message || "Failed to load transactions");
      }
    } catch (err: any) {
      console.error("FETCH TRANSACTIONS ERROR:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ------------------------------------------------------
  // GET SINGLE TRANSACTION
  // ------------------------------------------------------

  fetchTransaction: async (id: string) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "No authentication token found" });
      return;
    }

    try {
      set({ loading: true, error: null });

      const res = await fetch(
        `${BASE_URL}/v1/international/my-transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();

      console.log("SINGLE TRANSACTION:", data);

      if (data.status) {
        set({ transaction: data.data });
      } else {
        throw new Error(data.message || "Failed to load transaction");
      }
    } catch (err: any) {
      console.error("FETCH TRANSACTION ERROR:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ------------------------------------------------------
  // GET PAYPAL EMAIL
  // ------------------------------------------------------

  fetchPaypalEmail: async () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "No authentication token found" });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/v1/international/paypal-email`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      console.log("PAYPAL EMAIL:", data);

      if (data.email) {
        set({ paypalEmail: data.email });
      }
    } catch (err: any) {
      console.error("PAYPAL EMAIL ERROR:", err);
      set({ error: err.message });
    }
  },

  // ------------------------------------------------------
  // SEND INTERNATIONAL PAYMENT
  // ------------------------------------------------------

  sendPayment: async (payload: SendPaymentPayload) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "No authentication token found" });
      throw new Error("No authentication token found");
    }

    try {
      set({ submitting: true, error: null });

      console.log("SEND PAYMENT PAYLOAD:", payload);

      const res = await fetch(`${BASE_URL}/v1/international/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("SEND PAYMENT RESPONSE:", data);

      if (data.status) {
        // Refresh transactions after successful payment
        await get().fetchTransactions();
      }

      return data;
    } catch (err: any) {
      console.error("SEND PAYMENT ERROR:", err);
      set({ error: err.message });
      throw err;
    } finally {
      set({ submitting: false });
    }
  },

  // ------------------------------------------------------
  // RECEIVE INTERNATIONAL PAYMENT
  // ------------------------------------------------------

  receivePayment: async (payload: ReceivePaymentPayload) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "No authentication token found" });
      throw new Error("No authentication token found");
    }

    try {
      set({ submitting: true, error: null });

      console.log("RECEIVE PAYMENT PAYLOAD:", payload);

      const res = await fetch(`${BASE_URL}/v1/international/receive`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("RECEIVE PAYMENT RESPONSE:", data);

      if (data.status) {
        // Refresh transactions after successful receive
        await get().fetchTransactions();
      }

      return data;
    } catch (err: any) {
      console.error("RECEIVE PAYMENT ERROR:", err);
      set({ error: err.message });
      throw err;
    } finally {
      set({ submitting: false });
    }
  },

  // ------------------------------------------------------
  // CONVERT API METHODS TO UI FORMAT
  // ------------------------------------------------------

  convertToUIMethods: (apiMethods: PaymentMethod[]) => {
    return convertAPIToUIMethods(apiMethods);
  },
}));

// ------------------------------------------------------
// CUSTOM HOOKS FOR UI COMPONENTS
// ------------------------------------------------------

// Hook to get UI-formatted payment methods
export const useUIPaymentMethods = () => {
  const { methods, convertToUIMethods, loading } = useGlobalPaymentStore();

  if (loading) return { uiMethods: [], loading };

  return {
    uiMethods: convertToUIMethods(methods),
    loading,
  };
};

// Hook to send payment with form data
export const useSendPayment = () => {
  const { sendPayment, submitting, error } = useGlobalPaymentStore();

  const submitPayment = async (formData: SendPaymentFormData, method: any) => {
    // Calculate crypto amount based on rate
    const rate = method.rates?.sell_rate
      ? parseFloat(method.rates.sell_rate)
      : 1450;

    const amount = typeof formData.amount === "number" ? formData.amount : 0;
    const cryptoAmount = amount / rate;

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

  return {
    submitPayment,
    submitting,
    error,
  };
};

// Hook to get rate for a specific method
export const usePaymentMethodRate = (method: any) => {
  if (!method?.rates?.sell_rate) return 1450;
  return parseFloat(method.rates.sell_rate);
};

// Hook to validate amount against min/max
export const useAmountValidation = (method: any) => {
  const validate = (amount: number) => {
    if (!method?.rates) return { isValid: true, message: "" };

    const minAmount = parseFloat(method.rates.min_amount);
    const maxAmount = parseFloat(method.rates.max_amount);

    if (amount < minAmount) {
      return {
        isValid: false,
        message: `Minimum amount is ₦${minAmount.toLocaleString()}`,
      };
    }

    if (amount > maxAmount) {
      return {
        isValid: false,
        message: `Maximum amount is ₦${maxAmount.toLocaleString()}`,
      };
    }

    return { isValid: true, message: "" };
  };

  return { validate };
};
