"use client";

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = "https://cashconnect.beamaxtech.com.ng/api/v1";

/* -------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------- */

export interface GiftCard {
  id: number;
  name: string;
  country: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface GiftCardProduct {
  id: number;
  gift_card_id: number;
  amount: string;
  currency: string;
  quantity: number;
  card_code: string | null;
  card_pin: string | null;
  card_details: any | null;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface GiftCardOrder {
  id: number;
  user_id: number;
  gift_card_product_id: number;
  quantity: number;
  total_amount: string;
  total_amount_amt: string;
  status?: string;
  approved_by: number | null;
  approved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateOrderPayload {
  gift_card_product_id: number;
  quantity: number;
}

export interface SellGiftCardPayload {
  gift_card_id: number;
  card_type: "physical" | "code";
  card_value: number;
  card_code: string | null;
  card_pin: string;
  card_images: string[];
}

export interface SellGiftCardResponse {
  status: boolean;
  message: string;
  data: any;
}

/* -------------------------------------------------- */
/* STATE */
/* -------------------------------------------------- */

interface GiftCardState {
  giftCards: GiftCard[];
  products: GiftCardProduct[];
  orders: GiftCardOrder[];

  isLoading: boolean;
  isSubmitting: boolean;

  error: string | null;

  sellResponse: SellGiftCardResponse | null;

  fetchGiftCards: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchUserOrders: () => Promise<void>;

  createOrder: (payload: CreateOrderPayload) => Promise<GiftCardOrder>;
  sellGiftCard: (payload: SellGiftCardPayload) => Promise<SellGiftCardResponse>;

  clearError: () => void;
  clearSellResponse: () => void;
  reset: () => void;
}

/* -------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------- */

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

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok || data.status === false) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

/* -------------------------------------------------- */
/* STORE */
/* -------------------------------------------------- */

export const useGiftCardStore = create<GiftCardState>()((set, get) => ({
  giftCards: [],
  products: [],
  orders: [],

  isLoading: false,
  isSubmitting: false,
  error: null,

  sellResponse: null,

  /* ---------------- FETCH GIFTCARDS ---------------- */

  fetchGiftCards: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${BASE_URL}/giftcards`, {
        headers: authHeaders(),
      });

      const data = await handleResponse(response);

      set({
        giftCards: data.data || [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  /* ---------------- FETCH PRODUCTS ---------------- */

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${BASE_URL}/giftcard-products`, {
        headers: authHeaders(),
      });

      const data = await handleResponse(response);

      set({
        products: data.data || [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  /* ---------------- FETCH ORDERS ---------------- */

  fetchUserOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${BASE_URL}/user-giftcard-orders`, {
        headers: authHeaders(),
      });

      const data = await handleResponse(response);

      set({
        orders: data.data || [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  /* ---------------- CREATE BUY ORDER ---------------- */

  createOrder: async (payload: CreateOrderPayload) => {
    set({ isSubmitting: true, error: null });

    try {
      console.log("BUY ORDER:", payload);

      const response = await fetch(`${BASE_URL}/giftcard-orders`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await handleResponse(response);

      const order = result.data;

      await get().fetchUserOrders();

      set({ isSubmitting: false });

      return order;
    } catch (error: any) {
      set({
        error: error.message || "Failed to create order",
        isSubmitting: false,
      });

      throw error;
    }
  },

  /* ---------------- SELL GIFTCARD ---------------- */

  sellGiftCard: async (payload: SellGiftCardPayload) => {
    set({ isSubmitting: true, error: null });

    try {
      console.log("SELL PAYLOAD:", payload);

      const response = await fetch(`${BASE_URL}/giftcards/sell`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await handleResponse(response);

      set({
        sellResponse: result,
        isSubmitting: false,
      });

      return result;
    } catch (error: any) {
      set({
        error: error.message || "Failed to sell gift card",
        isSubmitting: false,
      });

      throw error;
    }
  },

  clearError: () => set({ error: null }),

  clearSellResponse: () => set({ sellResponse: null }),

  reset: () =>
    set({
      giftCards: [],
      products: [],
      orders: [],
      isLoading: false,
      isSubmitting: false,
      error: null,
      sellResponse: null,
    }),
}));
