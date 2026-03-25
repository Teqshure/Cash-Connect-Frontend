import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

export interface ApiTransaction {
  id: number;
  type: "deposit" | "withdrawal" | "gift" | "crypto";
  direction: "credit" | "debit";
  amount: string;
  currency: string;
  fee: string;
  status: "pending" | "approved" | "rejected" | "failed";
  reference: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  deposit: { payment_method: string } | null;
  withdrawal: object | null;
  gift_card: object | null;
  crypto: object | null;
}

interface TransactionState {
  transactions: ApiTransaction[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTransactions: () => Promise<void>;
}

// ----------------------------------------------------------------
// Helper
// ----------------------------------------------------------------

function authHeaders() {
  const token = useAuthStore.getState().token;
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ----------------------------------------------------------------
// Store
// ----------------------------------------------------------------

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: "GET",
        headers: authHeaders(),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to fetch transactions");

      set({
        transactions: data.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Something went wrong",
        isLoading: false,
      });
    }
  },
}));
