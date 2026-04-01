"use client";

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

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
  giftcard: any | null; // ✅ fixed: was gift_card, API returns giftcard
  crypto: any | null;
  international: any | null;
}

interface TransactionState {
  transactions: ApiTransaction[];
  isLoading: boolean;
  error: string | null;

  fetchTransactions: (force?: boolean) => Promise<void>;
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
/* Converts API responses to unified transaction model */
/* -------------------------------------------------- */

function normalizeTransaction(tx: any): ApiTransaction {
  // Giftcard transaction
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
      giftcard: tx, // ✅ fixed: was gift_card
      crypto: null,
      international: null,
    };
  }

  // Default transaction
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
    giftcard: tx.giftcard ?? null, // ✅ fixed: was tx.gift_card
    crypto: tx.crypto ?? null,
    international: tx.international ?? null,
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

    fetchTransactions: async (force = false) => {
      // Prevent unnecessary duplicate fetch
      if (!force && get().transactions.length > 0) return;

      set({ isLoading: true, error: null });

      try {
        const res = await fetch(`${BASE_URL}/transactions`, {
          method: "GET",
          headers: authHeaders(),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch transactions");
        }

        /* -------------------------------------------- */
        /* Handle Laravel paginated API structure */
        /* -------------------------------------------- */

        const rawTransactions =
          data?.data?.data || // paginated
          data?.data || // standard
          [];

        /* -------------------------------------------- */
        /* Normalize all transactions */
        /* -------------------------------------------- */

        const transactions: ApiTransaction[] =
          rawTransactions.map(normalizeTransaction);

        /* -------------------------------------------- */
        /* Sort newest first */
        /* -------------------------------------------- */

        transactions.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        set({
          transactions,
          isLoading: false,
        });
      } catch (error: any) {
        set({
          error: error.message || "Something went wrong",
          isLoading: false,
        });
      }
    },
  }),
);
