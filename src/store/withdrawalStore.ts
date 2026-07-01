import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.cashconnectworld.com/api/v1";

export interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  account_number: string;
  account_name?: string;
}

interface WithdrawalState {
  bankAccounts: BankAccount[];
  isLoadingAccounts: boolean;
  isSubmitting: boolean;
  isAdding: boolean;
  isDeleting: boolean;
  error: string | null;

  fetchBankAccounts: () => Promise<void>;
  addBankAccount: (
    bank_name: string,
    account_number: string,
    bvn: string,
  ) => Promise<void>;
  createWithdrawal: (amount: number, bank_account_id: number) => Promise<void>;
  deleteBankAccount: (account_id: number) => Promise<void>;
  reset: () => void;
}

function authHeaders(): Record<string, string> {
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

export const useWithdrawalStore = create<WithdrawalState>(
  (set: any, get: any) => ({
    bankAccounts: [],
    isLoadingAccounts: false,
    isSubmitting: false,
    isAdding: false,
    isDeleting: false,
    error: null,

    fetchBankAccounts: async () => {
      set({ isLoadingAccounts: true });

      try {
        const res = await fetch(`${BASE_URL}/bank-accounts`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        set({
          bankAccounts: data.data || [],
          isLoadingAccounts: false,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        set({ error: message, isLoadingAccounts: false });
      }
    },

    addBankAccount: async (
      bank_name: string,
      account_number: string,
      bvn: string,
    ) => {
      set({ isAdding: true });

      try {
        await fetch(`${BASE_URL}/add-bank-account`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({
            bank_name,
            account_number,
            bvn,
          }),
        });

        const res = await fetch(`${BASE_URL}/bank-accounts`, {
          headers: authHeaders(),
        });

        const data = await res.json();

        set({
          bankAccounts: data.data || [],
          isAdding: false,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        set({ error: message, isAdding: false });
        throw error;
      }
    },

    createWithdrawal: async (amount: number, bank_account_id: number) => {
      set({ isSubmitting: true });

      try {
        await fetch(`${BASE_URL}/withdrawals`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({
            amount,
            bank_account_id,
          }),
        });

        set({ isSubmitting: false });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        set({ error: message, isSubmitting: false });
        throw error;
      }
    },

    deleteBankAccount: async (account_id: number) => {
      set({ isDeleting: true });

      try {
        await fetch(`${BASE_URL}/delete-bank-account/${account_id}`, {
          method: "DELETE",
          headers: authHeaders(),
        });

        const updated = get().bankAccounts.filter(
          (account: BankAccount) => account.id !== account_id,
        );

        set({
          bankAccounts: updated,
          isDeleting: false,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        set({ error: message, isDeleting: false });
        throw error;
      }
    },

    reset: () =>
      set({
        bankAccounts: [],
        error: null,
        isDeleting: false,
      }),
  }),
);

