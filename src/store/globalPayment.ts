// store/globalPayment.ts

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useEffect, useMemo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

// ✅ Correct base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.cashconnectworld.com/api/v1";

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Currency {
  id: number;
  payment_method_id: number;
  currency: string;
  buy_rate: string;
  sell_rate: string;
  min_amount: string;
  max_amount: string;
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: number;
  payment_method_id: number;
  country: string;
  created_at: string;
  updated_at: string;
}

// ✅ NEW RATE TYPE
export interface Rate {
  id: number;
  rateable_type: string;
  rateable_id: number;
  buy_rate: string | null;
  sell_rate: string | null;
  min_amount: string;
  max_amount: string;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalAccount {
  id: number;
  payment_method: string;
  currency: string;
  country: string;
  gender: string;
  email?: string;
  account_details: any;
  created_at: string;
  updated_at: string;
}

export interface UIPaymentMethod {
  id: string;
  name: string;
  logo: string;
  eta: string;
  feeNote: string;
  code?: string;
  paymentMethodId?: number;
  currencies?: Currency[];
  countries?: Country[];
  accounts?: any[];
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

export interface FindAccountPayload {
  payment_method: string;
  currency?: string;
  country?: string;
  gender?: string;
  expected_amount: number;
}

export interface SubmitTransactionPayload {
  account_id: number;
  expected_amount: number;
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
  currencies: Record<number, Currency[]>;
  countries: Record<number, Country[]>;
  rates: Rate[]; // ✅ NEW
  transactions: InternationalTransaction[];
  transaction: InternationalTransaction | null;
  availableAccounts: InternationalAccount[];
  paypalEmail: string | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;

  fetchMethods: () => Promise<PaymentMethod[]>;
  fetchCurrenciesForMethod: (
    methodId: number,
    methodCode: string,
  ) => Promise<Currency[]>;
  fetchCountriesForMethod: (
    methodId: number,
    methodCode: string,
  ) => Promise<Country[]>;
  fetchRates: () => Promise<void>; // ✅ NEW
  findAccounts: (
    payload: FindAccountPayload,
  ) => Promise<InternationalAccount[]>;
  submitTransaction: (payload: SubmitTransactionPayload) => Promise<any>;
  fetchTransactions: () => Promise<void>;
  fetchTransaction: (id: string) => Promise<void>;
  cancelTransaction: (id: string) => Promise<void>;
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

const LOGO_MAP: Record<string, string> = {
  PayPal: "/images/payments/paypal.png",
  Zelle: "/images/payments/zelle.png",
  "Western Union": "/images/payments/western-union.png",
  MoneyGram: "/images/payments/money-gram.png",
  Venmo: "/images/payments/venmo.png",
  CashApp: "/images/payments/cashapp.png",
  "Cash App": "/images/payments/cashapp.png",
  Payoneer: "/images/payments/payoneer.png",
  Skrill: "/images/payments/skrill.png",
  Neteller: "/images/payments/neteller.png",
  Wise: "/images/payments/wise.png",
  Chime: "/images/payments/chime.png",
  Remitly: "/images/payments/remitly.png",
  "Bank Wire": "/images/payments/wise.png",
  "Wire Transfer": "/images/payments/wise.png",
};

function convertAPIToUIMethods(apiMethods: any[]): UIPaymentMethod[] {
  return apiMethods.map((method) => ({
    id: method.code || method.name.toLowerCase().replace(/\s+/g, "-"),
    name: method.name,
    code: method.code || method.name.toLowerCase(),
    paymentMethodId: method.id,
    logo: LOGO_MAP[method.name] || "/images/payments/paypal.png",
    eta: "Instant",
    feeNote: "Check rates",
    accounts: method.accounts || [],
  }));
}

// ------------------------------------------------------
// STORE
// ------------------------------------------------------

export const useGlobalPaymentStore = create<GlobalPaymentState>(
  (set: any, get: any) => ({
    methods: [],
    currencies: {},
    countries: {},
    rates: [], // ✅ NEW
    transactions: [],
    transaction: null,
    availableAccounts: [],
    paypalEmail: null,
    loading: false,
    error: null,
    submitting: false,

    // ✅ FETCH RATES (NEW)
    fetchRates: async () => {
      try {
        const res = await fetch(`${BASE_URL}/rates`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch rates");

        console.log("📊 [RATES]:", data.data);

        set({ rates: data.data || [] });
      } catch (err: any) {
        console.error("❌ [FETCH RATES ERROR]:", err.message);
      }
    },

    fetchMethods: async () => {
      set({ loading: true, error: null });

      try {
        const res = await fetch(`${BASE_URL}/international/payment-methods`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load methods");

        const methods = data.data || [];
        set({ methods, loading: false });
        return methods;
      } catch (err: any) {
        set({ error: err.message, loading: false });
        throw err;
      }
    },

    fetchCurrenciesForMethod: async (methodId: number, methodCode: string) => {
      console.log(
        `🔍 [Store] Fetching currencies for method ${methodCode} (ID: ${methodId})`,
      );

      try {
        const res = await fetch(
          `${BASE_URL}/international/payment-methods/${methodId}/currencies-by-id`,
          {
            headers: authHeaders(),
          },
        );

        console.log(`📡 [Store] Currencies response status:`, res.status);

        const data = await res.json();
        console.log(`📦 [Store] Currencies response data:`, data);

        if (!res.ok) {
          console.error(`❌ [Store] Failed to fetch currencies:`, data);
          throw new Error(data.message || "Failed to load currencies");
        }

        let currencies = [];
        if (data.data && Array.isArray(data.data)) {
          if (data.data.length > 0 && typeof data.data[0] === "string") {
            currencies = data.data.map((currency: string, index: number) => ({
              id: index,
              payment_method_id: methodId,
              currency: currency,
              buy_rate: "0",
              sell_rate: "0",
              min_amount: "0",
              max_amount: "1000000",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }));
          } else if (data.data.length > 0 && typeof data.data[0] === "object") {
            currencies = data.data;
          }
        }

        console.log(
          `✅ [Store] Processed ${currencies.length} currencies for ${methodCode}`,
        );

        set((state: any) => ({
          currencies: {
            ...state.currencies,
            [methodId]: currencies,
          },
        }));

        return currencies;
      } catch (err: any) {
        console.error(
          `💥 [Store] Failed to fetch currencies for ${methodCode}:`,
          err.message,
        );
        return [];
      }
    },

    fetchCountriesForMethod: async (methodId: number, methodCode: string) => {
      console.log(
        `🔍 [Store] Fetching countries for method ${methodCode} (ID: ${methodId})`,
      );

      try {
        const res = await fetch(
          `${BASE_URL}/international/payment-methods/${methodId}/countries-by-id`,
          {
            headers: authHeaders(),
          },
        );

        console.log(`📡 [Store] Countries response status:`, res.status);

        const data = await res.json();
        console.log(`📦 [Store] Countries response data:`, data);

        if (!res.ok) {
          console.error(`❌ [Store] Failed to fetch countries:`, data);
          throw new Error(data.message || "Failed to load countries");
        }

        let countries = [];
        if (data.data && Array.isArray(data.data)) {
          if (data.data.length > 0 && typeof data.data[0] === "string") {
            countries = data.data.map((country: string, index: number) => ({
              id: index,
              payment_method_id: methodId,
              country: country,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }));
          } else if (data.data.length > 0 && typeof data.data[0] === "object") {
            countries = data.data;
          }
        }

        console.log(
          `✅ [Store] Processed ${countries.length} countries for ${methodCode}`,
        );

        set((state: any) => ({
          countries: {
            ...state.countries,
            [methodId]: countries,
          },
        }));

        return countries;
      } catch (err: any) {
        console.error(
          `💥 [Store] Failed to fetch countries for ${methodCode}:`,
          err.message,
        );
        return [];
      }
    },

    findAccounts: async (payload: FindAccountPayload) => {
      set({ loading: true, error: null });

      console.log("🚀 [FIND ACCOUNTS] REQUEST PAYLOAD:");
      console.table(payload);

      try {
        const res = await fetch(`${BASE_URL}/international/find`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });

        console.log("📡 [FIND ACCOUNTS] STATUS:", res.status);

        const data = await res.json();

        console.log("📦 [FIND ACCOUNTS] RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to find accounts");
        }

        // --------------------------------------------
        // ✅ 🔥 CLEAN THE RESPONSE HERE (MAIN FIX)
        // --------------------------------------------
        let cleanedAccounts: InternationalAccount[] = [];

        if (data.data) {
          // Case 1: array response
          if (Array.isArray(data.data)) {
            cleanedAccounts = data.data.flatMap((item: any) => {
              // nested array
              if (Array.isArray(item)) {
                return item.map((i: any) => i.account || i);
              }

              // wrapped object
              if (item?.account) {
                return [item.account]; // ✅ extract account
              }

              return [item];
            });
          }

          // Case 2: single object
          else if (typeof data.data === "object") {
            if (data.data.account) {
              cleanedAccounts = [data.data.account];
            } else {
              cleanedAccounts = [data.data];
            }
          }
        }

        console.log("✅ [CLEANED ACCOUNTS]:", cleanedAccounts);

        set({
          availableAccounts: cleanedAccounts, // ✅ NOW ALWAYS CLEAN
          loading: false,
        });

        return cleanedAccounts;
      } catch (err: any) {
        console.error("❌ [FIND ACCOUNTS ERROR]:", err.message);

        set({ error: err.message, loading: false });
        throw err;
      }
    },
    submitTransaction: async (payload: SubmitTransactionPayload) => {
      console.log("🚀 [SUBMIT TRANSACTION] PAYLOAD:", payload);

      set({ submitting: true, error: null });

      try {
        const res = await fetch(
          `${BASE_URL}/international/transactions/submit`,
          {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(payload),
          },
        );

        console.log("📡 [SUBMIT TRANSACTION] STATUS:", res.status);

        const data = await res.json();

        console.log("📦 [SUBMIT TRANSACTION] RESPONSE:", data);

        if (!res.ok) {
          console.error("❌ [SUBMIT TRANSACTION] FAILED:", data);
          throw new Error(data.message || "Transaction failed");
        }

        console.log("✅ [SUBMIT TRANSACTION] SUCCESS:", data);

        await get().fetchTransactions();

        set({ submitting: false });

        return data;
      } catch (err: any) {
        console.error("💥 [SUBMIT TRANSACTION] ERROR:", err.message);

        set({ error: err.message, submitting: false });
        throw err;
      }
    },
    fetchTransactions: async () => {
      set({ loading: true, error: null });

      try {
        const res = await fetch(`${BASE_URL}/international/transactions`, {
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

    fetchTransaction: async (id: string) => {
      set({ loading: true, error: null });

      try {
        const res = await fetch(
          `${BASE_URL}/international/transactions/${id}`,
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

    cancelTransaction: async (id: string) => {
      set({ submitting: true, error: null });

      try {
        const res = await fetch(
          `${BASE_URL}/international/transactions/${id}/cancel`,
          {
            method: "PATCH",
            headers: authHeaders(),
          },
        );

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to cancel transaction");

        await get().fetchTransactions();

        set({ submitting: false });

        return data;
      } catch (err: any) {
        set({ error: err.message, submitting: false });
        throw err;
      }
    },

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

    sendPayment: async (payload: SendPaymentPayload) => {
      console.warn(
        "⚠️ sendPayment is deprecated. Use findAccounts + submitTransaction instead.",
      );
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

    receivePayment: async (payload: ReceivePaymentPayload) => {
      console.warn(
        "⚠️ receivePayment is deprecated. Use findAccounts + submitTransaction instead.",
      );
      set({ submitting: true, error: null });

      try {
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
  const methods = useGlobalPaymentStore((s: any) => s.methods);
  const convertToUIMethods = useGlobalPaymentStore(
    (s: any) => s.convertToUIMethods,
  );
  const loading = useGlobalPaymentStore((s: any) => s.loading);

  const uiMethods = useMemo(() => {
    return convertToUIMethods(methods);
  }, [methods, convertToUIMethods]);

  return { uiMethods, loading };
};

export const useLoadPaymentMethods = () => {
  const fetchMethods = useGlobalPaymentStore((s: any) => s.fetchMethods);
  const methods = useGlobalPaymentStore((s: any) => s.methods);

  useEffect(() => {
    if (!methods.length) fetchMethods();
  }, [methods.length, fetchMethods]);
};

export const usePaymentMethodCurrencies = (methodId?: number) => {
  const fetchCurrenciesForMethod = useGlobalPaymentStore(
    (s: any) => s.fetchCurrenciesForMethod,
  );

  const loading = useGlobalPaymentStore((s: any) => s.loading);

  const currencies = useGlobalPaymentStore(
    useShallow((s: any) => {
      if (!methodId) return [];
      return s.currencies[methodId] || [];
    }),
  );

  return {
    currencies,
    fetchCurrenciesForMethod,
    loading,
  };
};

export const usePaymentMethodCountries = (methodId?: number) => {
  const fetchCountriesForMethod = useGlobalPaymentStore(
    (s: any) => s.fetchCountriesForMethod,
  );

  const loading = useGlobalPaymentStore((s: any) => s.loading);

  const countries = useGlobalPaymentStore(
    useShallow((s: any) => {
      if (!methodId) return [];
      return s.countries[methodId] || [];
    }),
  );

  return {
    countries,
    fetchCountriesForMethod,
    loading,
  };
};

export const useSendPayment = () => {
  const findAccounts = useGlobalPaymentStore((s: any) => s.findAccounts);
  const submitTransaction = useGlobalPaymentStore(
    (s: any) => s.submitTransaction,
  );
  const submitting = useGlobalPaymentStore((s: any) => s.submitting);
  const error = useGlobalPaymentStore((s: any) => s.error);
  const submitPayment = useCallback(
    async (formData: SendPaymentFormData, method: UIPaymentMethod) => {
      const findPayload: FindAccountPayload = {
        payment_method: method.name, // ✅ already fixed
        currency: formData.currency,
        country: formData.country,
        gender: formData.gender,
        expected_amount:
          typeof formData.amount === "number" ? formData.amount : 0,
      };

      console.log("🧠 [SUBMIT PAYMENT] METHOD:", method);
      console.log("🧾 [SUBMIT PAYMENT] FORM DATA:", formData);
      console.log("📤 [SUBMIT PAYMENT] FINAL PAYLOAD:", findPayload);

      const accounts = await findAccounts(findPayload);

      console.log("📥 [SUBMIT PAYMENT] ACCOUNTS RECEIVED:", accounts);

      if (!accounts || accounts.length === 0) {
        console.error("❌ No accounts found after request");
        throw new Error("No available accounts found for this transaction");
      }

      const submitPayload: SubmitTransactionPayload = {
        account_id: accounts[0].id,
        expected_amount:
          typeof formData.amount === "number" ? formData.amount : 0,
      };

      console.log("📤 [SUBMIT TRANSACTION PAYLOAD]:", submitPayload);

      return await submitTransaction(submitPayload);
    },
    [findAccounts, submitTransaction],
  );

  return { submitPayment, submitting, error };
};

export const usePaymentMethodRate = (
  method: UIPaymentMethod | null,
  currency?: string,
) => {
  const rates = useGlobalPaymentStore((s: any) => s.rates);
  const fetchRates = useGlobalPaymentStore((s: any) => s.fetchRates);

  useEffect(() => {
    if (!rates.length) {
      fetchRates();
    }
  }, [rates.length, fetchRates]);

  const rate = useMemo(() => {
    if (!method?.paymentMethodId || !rates.length) {
      return 1450;
    }

    // Strategy 1: Try to find rate with matching rateable_id AND currency
    let matched = rates.find((r: Rate) => {
      const typeMatch = r.rateable_type === "international";
      const idMatch = r.rateable_id === method.paymentMethodId;
      const currencyMatch = currency
        ? r.currency?.toUpperCase() === currency?.toUpperCase()
        : true;

      return typeMatch && idMatch && currencyMatch;
    });

    // Strategy 2: If no currency match found, try without currency (rate applies to all currencies)
    if (!matched && currency) {
      matched = rates.find((r: Rate) => {
        const typeMatch = r.rateable_type === "international";
        const idMatch = r.rateable_id === method.paymentMethodId;

        return typeMatch && idMatch;
      });
    }

    if (!matched) {
      return 1450;
    }

    // Extract the rate value - prefer sell_rate over buy_rate
    const sellRate = matched.sell_rate ? parseFloat(matched.sell_rate) : NaN;
    const buyRate = matched.buy_rate ? parseFloat(matched.buy_rate) : NaN;

    if (!isNaN(sellRate) && sellRate > 0) {
      return sellRate;
    }

    if (!isNaN(buyRate) && buyRate > 0) {
      return buyRate;
    }

    return 1450;
  }, [rates, currency, method]);

  return rate;
};

export const useAmountValidation = (
  method: UIPaymentMethod | null,
  currency?: string,
) => {
  const currencies = useGlobalPaymentStore(
    useShallow((s: any) => {
      if (!method?.paymentMethodId) return [];
      return s.currencies[method.paymentMethodId] || [];
    }),
  );

  const validate = useCallback(
    (amount: number) => {
      if (!currency || currencies.length === 0) {
        return { isValid: true, message: "" };
      }

      const currencyData = currencies.find(
        (c: Currency) => c.currency === currency,
      );

      if (!currencyData) {
        return { isValid: true, message: "" };
      }

      const min = parseFloat(currencyData.min_amount);
      const max = parseFloat(currencyData.max_amount);

      if (amount < min)
        return {
          isValid: false,
          message: `Minimum amount is ${min.toLocaleString()}`,
        };

      if (amount > max)
        return {
          isValid: false,
          message: `Maximum amount is ${max.toLocaleString()}`,
        };

      return { isValid: true, message: "" };
    },
    [currency, currencies],
  );

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

export const useCancelTransaction = () => {
  const cancelTransaction = useGlobalPaymentStore(
    (s: any) => s.cancelTransaction,
  );
  const submitting = useGlobalPaymentStore((s: any) => s.submitting);
  const error = useGlobalPaymentStore((s: any) => s.error);

  return { cancelTransaction, submitting, error };
};

