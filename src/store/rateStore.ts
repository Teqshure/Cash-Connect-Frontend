import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

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
}

interface RateState {
  rates: Rate[];
  isLoading: boolean;
  error: string | null;

  fetchRates: () => Promise<void>;
  getBuyRate: (giftCardId: number) => number;
  getSellRate: (giftCardId: number) => number;
}

function authHeaders() {
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const useRateStore = create<RateState>((set: any, get: any) => ({
  rates: [],
  isLoading: false,
  error: null,

  fetchRates: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(`${BASE_URL}/rates`, {
        method: "GET",
        headers: authHeaders(),
      });

      const data = await response.json();

      const rates = data.data || [];

      set({
        rates,
        isLoading: false,
      });

      console.log("Rates Loaded:", rates);
    } catch (error: any) {
      console.error("Rate fetch failed:", error);

      set({
        error: error.message || "Failed to fetch rates",
        isLoading: false,
      });
    }
  },

  getBuyRate: (giftCardId: number) => {
    const rate = get().rates.find(
      (r: any) =>
        r.rateable_id === giftCardId &&
        r.rateable_type?.toLowerCase().includes("gift"),
    );

    const parsed = Number(rate?.buy_rate);

    console.log("Buy Rate Lookup:", {
      giftCardId,
      rate,
      parsed,
    });

    // fallback for development if API returns invalid value
    if (isNaN(parsed)) {
      return 1700;
    }

    return parsed;
  },

  getSellRate: (giftCardId: number) => {
    const rate = get().rates.find(
      (r: any) =>
        r.rateable_id === giftCardId &&
        r.rateable_type?.toLowerCase().includes("gift"),
    );

    const parsed = Number(rate?.sell_rate);

    console.log("Sell Rate Lookup:", {
      giftCardId,
      rate,
      parsed,
    });

    if (isNaN(parsed)) {
      return 1500;
    }

    return parsed;
  },
}));
