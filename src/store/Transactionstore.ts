"use client";

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

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

/* -------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------- */

export interface ApiTransaction {
  id: number;
  user_id: number;

  type: "deposit" | "withdrawal" | "gift" | "crypto" | "international";

  direction: "credit" | "debit";

  amount: string;
  currency: string;
  fee: string;

  status: "pending" | "approved" | "rejected" | "failed";

  reference: string;
  description: string | null;

  created_at: string;
  updated_at: string;

  deposit: any | null;
  withdrawal: any | null;
  giftcard: any | null;
  crypto: any | null;
  international: any | null;
  gift_card_order?: any | null;
  receipt?: string | null;
}

interface TransactionState {
  transactions: ApiTransaction[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  lastFetched: number | null;
  setSearchQuery: (q: string) => void;
  fetchTransactions: (force?: boolean, isBackground?: boolean) => Promise<void>;
  uploadTransactionReceipt: (txId: string | number, file: File) => Promise<any>;
}

/* -------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------- */

function authHeaders() {
  const token = useAuthStore.getState().token;

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/* -------------------------------------------------- */
/* NORMALIZER */
/* -------------------------------------------------- */

function normalizeTransaction(tx: any): ApiTransaction {
  if (tx.gift_card_product_id) {
    return {
      id: tx.id,
      user_id: tx.user_id ?? 0,

      type: "gift",
      direction: "credit",

      amount: tx.total_amount ?? "0",
      currency: "NGN",
      fee: "0",

      status: tx.status ?? "pending",

      reference: `GFT-${tx.id}`,
      description: "Giftcard Sale",

      created_at: tx.created_at,
      updated_at: tx.updated_at ?? tx.created_at,

      deposit: null,
      withdrawal: null,
      giftcard: tx,
      crypto: null,
      international: null,
      gift_card_order: null,
    };
  }

  return {
    id: tx.id,
    user_id: tx.user_id ?? 0,

    type: tx.type ?? "deposit",
    direction: tx.direction ?? "credit",

    amount: tx.amount ?? "0",
    currency: tx.currency ?? "NGN",
    fee: tx.fee ?? "0",

    status: tx.status ?? "pending",

    reference: tx.reference ?? `TX-${tx.id}`,
    description: tx.description ?? null,

    created_at: tx.created_at,
    updated_at: tx.updated_at ?? tx.created_at,

    deposit: tx.deposit ?? null,
    withdrawal: tx.withdrawal ?? null,
    giftcard: tx.giftcard ?? null,
    crypto: tx.crypto ?? null,
    international: tx.international ?? null,
    gift_card_order: tx.gift_card_order ?? tx.giftCardOrder ?? null,
  };
}

/* -------------------------------------------------- */
/* STORE */
/* -------------------------------------------------- */

export const useTransactionStore = create<TransactionState>()(
  (set: any, get: any) => ({
    transactions: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    lastFetched: null,
    setSearchQuery: (q: string) => set({ searchQuery: q }),

    fetchTransactions: async (force = false, isBackground = false) => {
      const lastFetched = get().lastFetched;
      if (!force && lastFetched && Date.now() - lastFetched < 5000) {
        console.log("⏭️ Skipping transaction fetch - fetched less than 5s ago");
        return;
      }

      if (!isBackground) {
        set({ isLoading: true, error: null });
      } else {
        set({ error: null });
      }

      try {
        const res = await fetch(`${BASE_URL}/transactions`, {
          method: "GET",
          headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch transactions");
        }

        const rawTransactions = data?.data?.data || data?.data || [];

        const transactions: ApiTransaction[] =
          rawTransactions.map(normalizeTransaction);

        transactions.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        set({
          transactions,
          isLoading: false,
          lastFetched: Date.now(),
        });
      } catch (error: any) {
        set({
          error: error.message || "Something went wrong",
          isLoading: false,
        });
      }
    },

    uploadTransactionReceipt: async (txId: string | number, file: File) => {
      set({ isLoading: true, error: null });

      try {
        const formData = new FormData();
        formData.append("receipt", file);

        const token = useAuthStore.getState().token;

        const res = await fetch(
          `${BASE_URL}/transactions/${txId}/notify-payment`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to upload receipt");
        }

        await get().fetchTransactions(true);
        return data;
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
        throw error;
      }
    },
  }),
);

