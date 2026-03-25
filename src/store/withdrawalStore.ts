import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

export interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  account_number: string;
  account_name?: string; // optional — not always returned by API
}

interface WithdrawalState {
  bankAccounts: BankAccount[];
  isLoadingAccounts: boolean;
  isSubmitting: boolean;
  isAdding: boolean;
  isDeleting: boolean;
  error: string | null;

  // Actions
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

// ----------------------------------------------------------------
// Helper
// ----------------------------------------------------------------

function authHeaders() {
  const token = useAuthStore.getState().token;

  // Log token for debugging (remove in production)
  console.log("Token present:", !!token);
  if (token) {
    console.log("Token preview:", token.substring(0, 20) + "...");
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Helper to handle API responses and check for HTML
async function handleResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  // Check if we got HTML instead of JSON (bot protection)
  if (contentType && contentType.includes("text/html")) {
    const htmlText = await response.text();
    console.error(
      "Received HTML instead of JSON. Possible bot protection triggered.",
    );
    console.error("HTML preview:", htmlText.substring(0, 200));
    throw new Error("Security verification required. Please try again later.");
  }

  // Try to parse JSON
  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    throw new Error("Invalid response from server");
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`,
    );
  }

  return data;
}

// ----------------------------------------------------------------
// Store
// ----------------------------------------------------------------

export const useWithdrawalStore = create<WithdrawalState>()((set, get) => ({
  bankAccounts: [],
  isLoadingAccounts: false,
  isSubmitting: false,
  isAdding: false,
  isDeleting: false,
  error: null,

  // Fetch saved bank accounts
  fetchBankAccounts: async () => {
    set({ isLoadingAccounts: true, error: null });
    try {
      const headers = authHeaders();
      console.log("Fetching bank accounts from:", `${BASE_URL}/bank-accounts`);

      const res = await fetch(`${BASE_URL}/bank-accounts`, {
        method: "GET",
        headers: headers,
      });

      const data = await handleResponse(res);
      console.log("Bank accounts fetched:", data);

      set({ bankAccounts: data.data ?? [], isLoadingAccounts: false });
    } catch (error: any) {
      console.error("Fetch bank accounts error:", error);
      set({
        error: error.message || "Something went wrong",
        isLoadingAccounts: false,
      });
    }
  },

  // Add a new bank account
  addBankAccount: async (bank_name, account_number, bvn) => {
    set({ isAdding: true, error: null });
    try {
      const headers = authHeaders();
      const body = JSON.stringify({ bank_name, account_number, bvn });
      console.log("Adding bank account:", {
        bank_name,
        account_number,
        bvn: "***",
      });

      const res = await fetch(`${BASE_URL}/add-bank-account`, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await handleResponse(res);
      console.log("Add account response:", data);

      // Refresh the list after adding
      const listRes = await fetch(`${BASE_URL}/bank-accounts`, {
        method: "GET",
        headers: authHeaders(),
      });
      const listData = await handleResponse(listRes);

      set({ bankAccounts: listData.data ?? [], isAdding: false });
    } catch (error: any) {
      console.error("Add bank account error:", error);
      set({ error: error.message || "Something went wrong", isAdding: false });
      throw error;
    }
  },

  // Submit withdrawal request
  createWithdrawal: async (amount, bank_account_id) => {
    set({ isSubmitting: true, error: null });
    try {
      const headers = authHeaders();
      const body = JSON.stringify({ amount, bank_account_id });
      console.log("Creating withdrawal:", { amount, bank_account_id });

      const res = await fetch(`${BASE_URL}/withdrawals`, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await handleResponse(res);
      console.log("Withdrawal response:", data);

      set({ isSubmitting: false });
    } catch (error: any) {
      console.error("Create withdrawal error:", error);
      set({
        error: error.message || "Something went wrong",
        isSubmitting: false,
      });
      throw error;
    }
  },

  // Delete a bank account
  deleteBankAccount: async (account_id: number) => {
    set({ isDeleting: true, error: null });
    try {
      const headers = authHeaders();
      console.log("Deleting bank account:", account_id);

      const res = await fetch(`${BASE_URL}/delete-bank-account/${account_id}`, {
        method: "DELETE",
        headers: headers,
      });

      const data = await handleResponse(res);
      console.log("Delete account response:", data);

      // Remove the deleted account from the local state
      const currentAccounts = get().bankAccounts;
      const updatedAccounts = currentAccounts.filter(
        (account) => account.id !== account_id,
      );

      set({
        bankAccounts: updatedAccounts,
        isDeleting: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Delete bank account error:", error);
      set({
        error: error.message || "Something went wrong",
        isDeleting: false,
      });
      throw error;
    }
  },

  reset: () => set({ bankAccounts: [], error: null, isDeleting: false }),
}));
