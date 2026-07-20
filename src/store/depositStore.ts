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

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

export interface DepositAccount {
  bank_name: string;
  account_number: string;
  account_name: string;
}

interface DepositState {
  depositAccount: DepositAccount | null;
  transactionRef: string;
  transactionId: number | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createDeposit: (amount: number) => Promise<void>;
  uploadReceipt: (transactionId: number, file: File) => Promise<any>;
  reset: () => void;
}

// ----------------------------------------------------------------
// Helper — reads token from auth store
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

export const useDepositStore = create<DepositState>()((set: any) => ({
  depositAccount: null,
  transactionRef: "",
  transactionId: null,
  isLoading: false,
  error: null,

  createDeposit: async (amount: any) => {
    set({ isLoading: true, error: null });

    try {
      // Run both requests in parallel
      const [depositRes, accountRes] = await Promise.all([
        fetch(`${BASE_URL}/deposit`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ amount }),
        }),
        fetch(`${BASE_URL}/deposit/account`, {
          method: "GET",
          headers: authHeaders(),
        }),
      ]);

      const depositData = await depositRes.json();
      const accountData = await accountRes.json();

      if (!depositRes.ok)
        throw new Error(depositData.message || "Deposit failed");
      if (!accountRes.ok)
        throw new Error(accountData.message || "Failed to get deposit account");

      set({
        transactionRef: depositData.transaction.reference,
        transactionId: depositData.transaction.id,
        depositAccount: {
          bank_name: depositData.bank_account?.bank_name || accountData.bank_name,
          account_number: depositData.bank_account?.account_number || accountData.account_number,
          account_name: depositData.bank_account?.account_name || accountData.account_name,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },

  uploadReceipt: async (transactionId: number, file: File) => {
    const token = useAuthStore.getState().token;
    const formData = new FormData();
    formData.append("receipt", file);

    const res = await fetch(`${BASE_URL}/transactions/${transactionId}/notify-payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to upload receipt");
    return data;
  },

  reset: () => set({ depositAccount: null, transactionRef: "", transactionId: null, error: null }),
}));
