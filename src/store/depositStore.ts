import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

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
  isLoading: boolean;
  error: string | null;

  // Actions
  createDeposit: (amount: number) => Promise<void>;
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

export const useDepositStore = create<DepositState>()((set) => ({
  depositAccount: null,
  transactionRef: "",
  isLoading: false,
  error: null,

  createDeposit: async (amount) => {
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

      // transaction is an object — use transaction.reference ✅
      set({
        transactionRef: depositData.transaction.reference,
        depositAccount: {
          bank_name: accountData.bank_name,
          account_number: accountData.account_number,
          account_name: accountData.account_name,
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

  reset: () => set({ depositAccount: null, transactionRef: "", error: null }),
}));
