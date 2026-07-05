// store/cryptoStore.ts

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useEffect } from "react";
import { useRateStore } from "./rateStore";

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return "http://localhost:8000/api/v1";
    }
  }
  return "https://api.cashconnectworld.com/api/v1";
};
const BASE_URL = getApiUrl();

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  network: string;
  wallet_address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CryptoWithRate {
  crypto: Crypto;
  rate: {
    buy_rate: string;
    sell_rate: string;
    min_amount: string;
    max_amount: string;
    currency: string;
  };
}

export interface CryptoTransaction {
  id: number;
  transaction_id: number;
  crypto_id: number;
  crypto_type: string;
  network: string;
  wallet_address: string;
  bank_name: string;
  account_number: string;
  admin_tx_hash: string;
  crypto_amount: string;
  fiat_amount: string;
  rate: string;
  created_at: string;
  updated_at: string;
}

// ✅ FIXED: Added selling_rate to payload
export interface BuyCryptoPayload {
  token: string;
  network: string;
  wallet_address: string;
  crypto_amount: number;
  selling_rate: number;
  payment_method?: string;
}

export interface SellCryptoPayload {
  token: string;
  network: string;
  crypto_amount: number;
  bank_account_id: number;
}

interface CryptoState {
  cryptos: Crypto[];
  cryptoWithRate: CryptoWithRate | null;
  transactions: CryptoTransaction[];
  transaction: CryptoTransaction | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;

  fetchCryptos: () => Promise<Crypto[]>;
  fetchCryptoById: (id: number) => Promise<CryptoWithRate | null>;
  fetchCryptoByTokenNetwork: (
    token: string,
    network: string,
  ) => Promise<CryptoWithRate | null>;
  buyCrypto: (payload: BuyCryptoPayload) => Promise<string>;
  sellCrypto: (payload: SellCryptoPayload) => Promise<string>;
  fetchMyTransactions: () => Promise<CryptoTransaction[]>;
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

// ------------------------------------------------------
// STORE
// ------------------------------------------------------

export const useCryptoStore = create<CryptoState>((set: any, get: any) => ({
  cryptos: [],
  cryptoWithRate: null,
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
  submitting: false,

  fetchCryptos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/cryptos`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load cryptos");

      const cryptos = data.data || [];
      set({ cryptos, loading: false });

      const rateStore = useRateStore.getState();
      if (rateStore.rates.length === 0) {
        await rateStore.fetchRates();
      }
      return cryptos;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchCryptoById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/cryptos/${id}`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load crypto");

      const cryptoData = data.data || null;

      if (cryptoData?.crypto) {
        const rateStore = useRateStore.getState();
        const rate = rateStore.getRateForItem(cryptoData.crypto.id, "crypto");
        if (rate) {
          cryptoData.rate = {
            buy_rate: rate.buy_rate || "0",
            sell_rate: rate.sell_rate || "0",
            min_amount: rate.min_amount || "0",
            max_amount: rate.max_amount || "0",
            currency: rate.currency || "NGN",
          };
        }
      }

      set({ cryptoWithRate: cryptoData, loading: false });
      return cryptoData;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  fetchCryptoByTokenNetwork: async (token: string, network: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${BASE_URL}/cryptos/token/${token}/network/${network}`,
        { headers: authHeaders() },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load crypto");

      const cryptoData = data.data || null;

      if (cryptoData?.crypto) {
        const rateStore = useRateStore.getState();
        const rate = rateStore.getRateForItem(cryptoData.crypto.id, "crypto");
        if (rate) {
          cryptoData.rate = {
            buy_rate: rate.buy_rate || "0",
            sell_rate: rate.sell_rate || "0",
            min_amount: rate.min_amount || "0",
            max_amount: rate.max_amount || "0",
            currency: rate.currency || "NGN",
          };
        }
      }

      set({ cryptoWithRate: cryptoData, loading: false });
      return cryptoData;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // ✅ FIXED: Now sends selling_rate in the request body
  buyCrypto: async (payload: BuyCryptoPayload) => {
    set({ submitting: true, error: null });
    try {
      const requestPayload = {
        token: payload.token,
        network: payload.network,
        wallet_address: payload.wallet_address,
        crypto_amount: payload.crypto_amount,
        sell_rate: payload.selling_rate,
        payment_method: payload.payment_method || "wallet",
      };

      console.log("📤 buyCrypto payload:", JSON.stringify(requestPayload));

      const res = await fetch(`${BASE_URL}/crypto/buy`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(requestPayload),
      });

      const data = await res.json();
      console.log("📥 buyCrypto response:", JSON.stringify(data)); // ✅ log full response

      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to buy crypto");
      }

      set({ submitting: false });
      return data.data || "Crypto purchase successful";
    } catch (err: any) {
      set({ error: err.message, submitting: false });
      throw err;
    }
  },
  sellCrypto: async (payload: SellCryptoPayload) => {
    set({ submitting: true, error: null });
    try {
      const requestPayload = {
        token: payload.token,
        network: payload.network,
        crypto_amount: payload.crypto_amount,
        bank_account_id: payload.bank_account_id,
      };

      const res = await fetch(`${BASE_URL}/crypto/sell`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(requestPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Failed to sell crypto");
      }

      set({ submitting: false });
      return data.data || "Crypto sold successfully";
    } catch (err: any) {
      set({ error: err.message, submitting: false });
      throw err;
    }
  },

  fetchMyTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/crypto/my-transactions`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to load transactions");

      const transactions = data.data || [];
      set({ transactions, loading: false });
      return transactions;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

// ------------------------------------------------------
// CUSTOM HOOKS
// ------------------------------------------------------

export const useLoadCryptos = () => {
  const fetchCryptos = useCryptoStore((s: CryptoState) => s.fetchCryptos);
  const cryptos = useCryptoStore((s: CryptoState) => s.cryptos);
  const loadRates = useRateStore((s: any) => s.fetchRates);
  const rates = useRateStore((s: any) => s.rates);

  useEffect(() => {
    const loadData = async () => {
      if (!cryptos.length) await fetchCryptos();
      if (!rates.length) await loadRates();
    };
    loadData();
  }, [cryptos.length, rates.length, fetchCryptos, loadRates]);
};

export const useBuyCrypto = () => {
  const buyCrypto = useCryptoStore((s: CryptoState) => s.buyCrypto);
  const submitting = useCryptoStore((s: CryptoState) => s.submitting);
  const error = useCryptoStore((s: CryptoState) => s.error);
  return { buyCrypto, submitting, error };
};

export const useSellCrypto = () => {
  const sellCrypto = useCryptoStore((s: CryptoState) => s.sellCrypto);
  const submitting = useCryptoStore((s: CryptoState) => s.submitting);
  const error = useCryptoStore((s: CryptoState) => s.error);
  return { sellCrypto, submitting, error };
};

export const useCryptoTransactions = () => {
  const transactions = useCryptoStore((s: any) => s.transactions);
  const fetchMyTransactions = useCryptoStore((s: any) => s.fetchMyTransactions);
  const loading = useCryptoStore((s: any) => s.loading);
  return { transactions, fetchMyTransactions, loading };
};

export const useActiveCryptos = () => {
  const cryptos = useCryptoStore((s: CryptoState) => s.cryptos);
  const loading = useCryptoStore((s: CryptoState) => s.loading);
  const error = useCryptoStore((s: CryptoState) => s.error);
  const getRateForItem = useRateStore((s: any) => s.getRateForItem);

  const cryptosWithRates = cryptos.map((crypto: Crypto) => {
    const rate = getRateForItem(crypto.id, "crypto");
    return {
      ...crypto,
      rate: rate
        ? {
            buy_rate: rate.buy_rate,
            sell_rate: rate.sell_rate,
            min_amount: rate.min_amount,
            max_amount: rate.max_amount,
            currency: rate.currency,
          }
        : null,
    };
  });

  return { cryptos: cryptosWithRates, loading, error };
};

export const useCryptoRate = (cryptoId?: number) => {
  const fetchCryptoById = useCryptoStore((s: CryptoState) => s.fetchCryptoById);
  const cryptoWithRate = useCryptoStore((s: CryptoState) => s.cryptoWithRate);
  const loading = useCryptoStore((s: CryptoState) => s.loading);
  const error = useCryptoStore((s: CryptoState) => s.error);
  const getSellRateFromStore = useRateStore((s: any) => s.getSellRate);
  const getBuyRateFromStore = useRateStore((s: any) => s.getBuyRate);
  const getMinAmountFromStore = useRateStore((s: any) => s.getMinAmount);
  const getMaxAmountFromStore = useRateStore((s: any) => s.getMaxAmount);
  const getCurrencyFromStore = useRateStore((s: any) => s.getCurrency);

  useEffect(() => {
    if (cryptoId) fetchCryptoById(cryptoId);
  }, [cryptoId, fetchCryptoById]);

  const sellRate = cryptoId ? getSellRateFromStore(cryptoId, "crypto") : 0;
  const buyRate = cryptoId ? getBuyRateFromStore(cryptoId, "crypto") : 0;
  const minAmount = cryptoId ? getMinAmountFromStore(cryptoId, "crypto") : 0;
  const maxAmount = cryptoId ? getMaxAmountFromStore(cryptoId, "crypto") : 0;
  const currency = cryptoId ? getCurrencyFromStore(cryptoId, "crypto") : "NGN";

  return {
    crypto: cryptoWithRate?.crypto,
    rate: cryptoWithRate?.rate,
    sellRate,
    buyRate,
    minAmount,
    maxAmount,
    currency,
    loading,
    error,
  };
};

export const useCryptoById = (id?: number) => {
  const fetchCryptoById = useCryptoStore((s: CryptoState) => s.fetchCryptoById);
  const cryptoWithRate = useCryptoStore((s: CryptoState) => s.cryptoWithRate);
  const loading = useCryptoStore((s: CryptoState) => s.loading);
  const error = useCryptoStore((s: CryptoState) => s.error);
  const getSellRateFromStore = useRateStore((s: any) => s.getSellRate);
  const getBuyRateFromStore = useRateStore((s: any) => s.getBuyRate);
  const getMinAmountFromStore = useRateStore((s: any) => s.getMinAmount);
  const getMaxAmountFromStore = useRateStore((s: any) => s.getMaxAmount);
  const getCurrencyFromStore = useRateStore((s: any) => s.getCurrency);

  useEffect(() => {
    if (id) fetchCryptoById(id);
  }, [id, fetchCryptoById]);

  const sellRate = id ? getSellRateFromStore(id, "crypto") : 0;
  const buyRate = id ? getBuyRateFromStore(id, "crypto") : 0;
  const minAmount = id ? getMinAmountFromStore(id, "crypto") : 0;
  const maxAmount = id ? getMaxAmountFromStore(id, "crypto") : 0;
  const currency = id ? getCurrencyFromStore(id, "crypto") : "NGN";

  return {
    crypto: cryptoWithRate?.crypto,
    rate: cryptoWithRate?.rate,
    sellRate,
    buyRate,
    minAmount,
    maxAmount,
    currency,
    loading,
    error,
  };
};

export const useFormatCryptoAmount = () => {
  const formatAmount = (
    amount: string | number,
    decimals: number = 2,
  ): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) return "0.00";
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
  return { formatAmount };
};

export const useValidateCryptoAmount = (cryptoId?: number) => {
  const getMinAmount = useRateStore((s: any) => s.getMinAmount);
  const getMaxAmount = useRateStore((s: any) => s.getMaxAmount);

  const validate = (amount: number): { isValid: boolean; message: string } => {
    if (!amount || amount <= 0)
      return { isValid: false, message: "Please enter a valid amount" };
    if (!cryptoId) return { isValid: true, message: "" };

    const minAmount = getMinAmount(cryptoId, "crypto");
    const maxAmount = getMaxAmount(cryptoId, "crypto");

    if (minAmount > 0 && amount < minAmount)
      return {
        isValid: false,
        message: `Minimum amount is ${minAmount.toLocaleString()}`,
      };
    if (maxAmount > 0 && amount > maxAmount)
      return {
        isValid: false,
        message: `Maximum amount is ${maxAmount.toLocaleString()}`,
      };

    return { isValid: true, message: "" };
  };

  return { validate };
};

