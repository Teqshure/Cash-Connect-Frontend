// store/rateStore.ts

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useEffect, useMemo, useRef } from "react";
import { useCallback } from "react";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

export interface Rate {
  id: number;
  rateable_type: string;
  rateable_id: number;
  buy_rate: string | null;
  sell_rate: string | null;
  min_amount: string | null;
  max_amount: string | null;
  currency: string;
  created_at?: string;
  updated_at?: string;
}

interface RateState {
  rates: Rate[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchRates: () => Promise<void>;
  fetchRateByTypeAndId: (type: string, id: number) => Promise<Rate | null>;
  getRateForItem: (itemId: number, type: string) => Rate | null;
  getBuyRate: (itemId: number, type: string) => number;
  getSellRate: (itemId: number, type: string) => number;
  getMinAmount: (itemId: number, type: string) => number;
  getMaxAmount: (itemId: number, type: string) => number;
  getCurrency: (itemId: number, type: string) => string;
  hasValidRate: (itemId: number, type: string) => boolean;
  getGiftCardBuyRate: (giftCardId: number) => number;
  getGiftCardSellRate: (giftCardId: number) => number;
  getCryptoBuyRate: (cryptoId: number) => number;
  getCryptoSellRate: (cryptoId: number) => number;
  clearError: () => void;
  retryFetch: () => Promise<void>;
}

function authHeaders() {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// Matches a rate from the store regardless of how rateable_type is cased/formatted
function rateMatchesItem(rate: Rate, itemId: number, type: string): boolean {
  if (rate.rateable_id !== itemId) return false;

  const rateType = (rate.rateable_type || "").toLowerCase();
  const searchType = type.toLowerCase();

  // Direct match
  if (rateType === searchType) return true;

  // gift_card variations
  if (searchType === "gift_card") {
    return (
      rateType.includes("gift") ||
      rateType === "gift_card" ||
      rateType === "giftcard" ||
      rateType === "gift-card"
    );
  }

  // crypto variations
  if (searchType === "crypto") {
    return rateType.includes("crypto") || rateType === "cryptocurrency";
  }

  // ✅ ADD THIS BLOCK (THIS IS YOUR FIX)
  if (searchType === "international") {
    return (
      rateType.includes("international") ||
      rateType.includes("internationalpaymentmethod") ||
      rateType.includes("app\\models\\internationalpaymentmethod")
    );
  }

  return false;
}

export const useRateStore = create<RateState>((set: any, get: any) => ({
  rates: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchRates: async () => {
    const lastFetched = get().lastFetched;
    if (lastFetched && Date.now() - lastFetched < 30000) {
      console.log("⏭️ Skipping rate fetch - fetched less than 30s ago");
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${BASE_URL}/rates`, {
        method: "GET",
        headers: authHeaders(),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch rates");

      const rates: Rate[] = (data.data || []).filter(
        (r: Rate) => r && r.rateable_type,
      );

      set({ rates, isLoading: false, lastFetched: Date.now() });
      console.log(`✅ Loaded ${rates.length} rates`);
      console.log("📊 All rate types:", [
        ...new Set(rates.map((r) => r.rateable_type)),
      ]);
    } catch (error: any) {
      console.error("❌ Rate fetch failed:", error);
      set({
        error: error.message || "Failed to fetch rates",
        isLoading: false,
      });
    }
  },

  retryFetch: async () => {
    console.log("🔄 Retrying rate fetch...");
    // Reset lastFetched so fetchRates doesn't skip
    set({ lastFetched: null });
    await get().fetchRates();
  },

  // ✅ Uses the dedicated endpoint: GET /api/v1/rates/{type}/{id}
  fetchRateByTypeAndId: async (type: string, id: number) => {
    try {
      console.log(`🔍 Fetching rate via /rates/${type}/${id}`);

      const response = await fetch(`${BASE_URL}/rates/${type}/${id}`, {
        method: "GET",
        headers: authHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ Failed to fetch rate for ${type}/${id}:`, data);
        return null;
      }

      const rate: Rate | null = data.data || null;

      if (rate) {
        console.log(`✅ Got rate for ${type}/${id}:`, rate);

        // Upsert into local rates cache
        const currentRates = get().rates;
        const existingIndex = currentRates.findIndex((r: Rate) =>
          rateMatchesItem(r, id, type),
        );

        if (existingIndex >= 0) {
          const newRates = [...currentRates];
          newRates[existingIndex] = rate;
          set({ rates: newRates });
        } else {
          set({ rates: [...currentRates, rate] });
        }
      }

      return rate;
    } catch (error: any) {
      console.error(`❌ Error fetching rate for ${type}/${id}:`, error);
      return null;
    }
  },

  getRateForItem: (itemId: number, type: string) => {
    const { rates } = get();
    return rates.find((r: any) => rateMatchesItem(r, itemId, type)) || null;
  },

  getBuyRate: (itemId: number, type: string) => {
    const rate = get().getRateForItem(itemId, type);
    if (!rate?.buy_rate) return 0;
    const value = Number(rate.buy_rate);
    return isNaN(value) ? 0 : value;
  },

  getSellRate: (itemId: number, type: string) => {
    const rate = get().getRateForItem(itemId, type);
    if (!rate?.sell_rate) return 0;
    const value = Number(rate.sell_rate);
    return isNaN(value) ? 0 : value;
  },

  getMinAmount: (itemId: number, type: string) => {
    const rate = get().getRateForItem(itemId, type);
    if (!rate?.min_amount) return 0;
    const value = Number(rate.min_amount);
    return isNaN(value) ? 0 : value;
  },

  getMaxAmount: (itemId: number, type: string) => {
    const rate = get().getRateForItem(itemId, type);
    if (!rate?.max_amount) return 0;
    const value = Number(rate.max_amount);
    return isNaN(value) ? 0 : value;
  },

  getCurrency: (itemId: number, type: string) => {
    const rate = get().getRateForItem(itemId, type);
    return rate?.currency || "NGN";
  },

  hasValidRate: (itemId: number, type: string) => {
    const rate = get().getRateForItem(itemId, type);
    if (!rate) return false;
    const sellRate = rate.sell_rate ? Number(rate.sell_rate) : 0;
    return !isNaN(sellRate) && sellRate > 0;
  },

  // ✅ Fetches directly from /rates/gift_card/{id} — no hardcoded fallback
  getGiftCardBuyRate: (giftCardId: number) => {
    return get().getBuyRate(giftCardId, "gift_card");
  },

  getGiftCardSellRate: (giftCardId: number) => {
    return get().getSellRate(giftCardId, "gift_card");
  },

  getCryptoBuyRate: (cryptoId: number) => get().getBuyRate(cryptoId, "crypto"),
  getCryptoSellRate: (cryptoId: number) =>
    get().getSellRate(cryptoId, "crypto"),

  clearError: () => set({ error: null }),
}));

// ------------------------------------------------------
// HOOKS
// ------------------------------------------------------

export const useLoadRates = () => {
  const { fetchRates, rates, isLoading, error, retryFetch } = useRateStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!rates.length && !isLoading && !hasFetched.current) {
      hasFetched.current = true;
      fetchRates();
    }
  }, [rates.length, isLoading, fetchRates]);

  return { rates, isLoading, error, retryFetch };
};

export const useRateForItem = (itemId: number, type: string) => {
  const rate = useRateStore((state: RateState) =>
    state.getRateForItem(itemId, type),
  );
  const buyRate = useRateStore((state: RateState) =>
    state.getBuyRate(itemId, type),
  );
  const sellRate = useRateStore((state: RateState) =>
    state.getSellRate(itemId, type),
  );
  const minAmount = useRateStore((state: RateState) =>
    state.getMinAmount(itemId, type),
  );
  const maxAmount = useRateStore((state: RateState) =>
    state.getMaxAmount(itemId, type),
  );
  const currency = useRateStore((state: RateState) =>
    state.getCurrency(itemId, type),
  );
  const hasValid = useRateStore((state: RateState) =>
    state.hasValidRate(itemId, type),
  );
  const fetchRate = useRateStore(
    (state: RateState) => state.fetchRateByTypeAndId,
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    // ✅ Always fetch directly from the dedicated endpoint on mount
    if (itemId > 0 && type && !hasFetched.current) {
      hasFetched.current = true;
      fetchRate(type, itemId);
    }
  }, [itemId, type, fetchRate]);

  return useMemo(
    () => ({
      rate,
      buyRate,
      sellRate,
      minAmount,
      maxAmount,
      currency,
      hasValidRate: hasValid,
    }),
    [rate, buyRate, sellRate, minAmount, maxAmount, currency, hasValid],
  );
};

export const useGiftCardRate = (giftCardId: number) => {
  const buyRate = useRateStore((state: RateState) =>
    state.getGiftCardBuyRate(giftCardId),
  );
  const sellRate = useRateStore((state: RateState) =>
    state.getGiftCardSellRate(giftCardId),
  );
  const minAmount = useRateStore((state: RateState) =>
    state.getMinAmount(giftCardId, "gift_card"),
  );
  const maxAmount = useRateStore((state: RateState) =>
    state.getMaxAmount(giftCardId, "gift_card"),
  );
  const currency = useRateStore((state: RateState) =>
    state.getCurrency(giftCardId, "gift_card"),
  );
  const fetchRate = useRateStore(
    (state: RateState) => state.fetchRateByTypeAndId,
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    // ✅ Always fetch directly — don't wait for the bulk list to match
    if (giftCardId > 0 && !hasFetched.current) {
      hasFetched.current = true;
      fetchRate("gift_card", giftCardId);
    }
  }, [giftCardId, fetchRate]);

  return useMemo(
    () => ({
      buyRate,
      sellRate,
      minAmount,
      maxAmount,
      currency,
      hasRate: buyRate > 0,
    }),
    [buyRate, sellRate, minAmount, maxAmount, currency],
  );
};

export const useCryptoRate = (cryptoId: number) => {
  const buyRate = useRateStore((state: RateState) =>
    state.getCryptoBuyRate(cryptoId),
  );
  const sellRate = useRateStore((state: RateState) =>
    state.getCryptoSellRate(cryptoId),
  );
  const minAmount = useRateStore((state: RateState) =>
    state.getMinAmount(cryptoId, "crypto"),
  );
  const maxAmount = useRateStore((state: RateState) =>
    state.getMaxAmount(cryptoId, "crypto"),
  );
  const currency = useRateStore((state: RateState) =>
    state.getCurrency(cryptoId, "crypto"),
  );
  const hasValid = useRateStore((state: RateState) =>
    state.hasValidRate(cryptoId, "crypto"),
  );
  const fetchRate = useRateStore(
    (state: RateState) => state.fetchRateByTypeAndId,
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    if (cryptoId > 0 && !hasFetched.current) {
      hasFetched.current = true;
      fetchRate("crypto", cryptoId);
    }
  }, [cryptoId, fetchRate]);

  return useMemo(
    () => ({
      buyRate,
      sellRate,
      minAmount,
      maxAmount,
      currency,
      hasValidRate: hasValid,
    }),
    [buyRate, sellRate, minAmount, maxAmount, currency, hasValid],
  );
};

export const useFormatRate = () => {
  const formatRate = useCallback(
    (rate: number, currency: string = "NGN", decimals: number = 2) => {
      if (!rate || isNaN(rate) || rate <= 0) return `0.00 ${currency}`;
      return `${rate.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })} ${currency}`;
    },
    [],
  );
  return { formatRate };
};

export const useValidateAmount = (itemId: number, type: string) => {
  const getMinAmount = useRateStore((state: RateState) => state.getMinAmount);
  const getMaxAmount = useRateStore((state: RateState) => state.getMaxAmount);

  const validate = useCallback(
    (amount: number) => {
      if (!amount || amount <= 0) {
        return { isValid: false, message: "Please enter a valid amount" };
      }
      const minAmount = getMinAmount(itemId, type);
      const maxAmount = getMaxAmount(itemId, type);
      if (minAmount > 0 && amount < minAmount) {
        return {
          isValid: false,
          message: `Minimum amount is ${minAmount.toLocaleString()}`,
        };
      }
      if (maxAmount > 0 && amount > maxAmount) {
        return {
          isValid: false,
          message: `Maximum amount is ${maxAmount.toLocaleString()}`,
        };
      }
      return { isValid: true, message: "" };
    },
    [itemId, type, getMinAmount, getMaxAmount],
  );

  return { validate };
};
