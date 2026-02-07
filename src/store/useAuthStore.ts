import { create } from "zustand";
import { persist } from "zustand/middleware";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

export interface User {
  id: number;
  fullname: string;
  email: string;
  username?: string | null;
  country?: string | null;
  phone?: string | null;
  role?: string;
  status?: string;
  // Add other user fields as returned by your API
}

interface AuthResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: User | null;
  data?: User | null; // Some endpoints might return 'data' instead of 'user'
  errors?: Record<string, string[]>; // For 422 validation errors
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullname: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (
    token: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<string>;

  // ✅ New actions (for Topbar + persistence)
  fetchMe: () => Promise<void>;
  setUser: (user: User | null) => void;

  setError: (error: string | null) => void;
}

// ------------------------------------------------------------------
// Configuration
// ------------------------------------------------------------------

const API_URL = "https://cashconnect.beamaxtech.com.ng/api";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function extractFirstError(errors?: Record<string, string[]>) {
  return (errors && Object.values(errors)[0]?.[0]) || "Validation failed";
}

function messageToString(message: unknown, fallback: string) {
  if (Array.isArray(message)) return message[0] || fallback;
  if (typeof message === "string") return message || fallback;
  return fallback;
}

// NOTE: Update this to your real "me" endpoint if different
const ME_ENDPOINT = "/v1/me";

// ------------------------------------------------------------------
// Store Implementation
// ------------------------------------------------------------------

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),

      fetchMe: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const response = await fetch(`${API_URL}${ME_ENDPOINT}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data: AuthResponse = await response.json();

          if (response.ok && data.status) {
            set({
              user: data.user || (data.data as User) || null,
              isAuthenticated: true,
            });
          }
        } catch {
          // silent fail; keep existing state
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/v1/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data: AuthResponse = await response.json();

          if (!response.ok) {
            if (response.status === 422) {
              throw new Error(extractFirstError(data.errors));
            }
            throw new Error(data.message || "Login failed");
          }

          if (!data.status || !data.token) {
            throw new Error(data.message || "Login failed");
          }

          const user = data.user || (data.data as User) || null;

          set({
            user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // If API didn't return user on login, fetch it
          if (!user) {
            await get().fetchMe();
          }
        } catch (error: any) {
          set({
            error: error?.message || "An error occurred during login",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (fullname, email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/v1/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ fullname, email, password }),
          });

          const data: AuthResponse = await response.json();

          if (!response.ok) {
            if (response.status === 422) {
              throw new Error(extractFirstError(data.errors));
            }
            throw new Error(data.message || "Registration failed");
          }

          if (!data.status || !data.token) {
            throw new Error(data.message || "Registration failed");
          }

          const user = data.user || (data.data as User) || null;

          set({
            user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // If API didn't return user on register, fetch it
          if (!user) {
            await get().fetchMe();
          }
        } catch (error: any) {
          set({
            error: error?.message || "An error occurred during registration",
            isLoading: false,
          });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/v1/forgot-password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email }),
          });

          const data: AuthResponse = await response.json();

          if (!response.ok) {
            if (response.status === 422) {
              throw new Error(extractFirstError(data.errors));
            }
            throw new Error(
              messageToString(data.message, "Failed to send reset link"),
            );
          }

          set({ isLoading: false });
          return data.message || "Password reset link sent to your email.";
        } catch (error: any) {
          set({
            error: error?.message || "An error occurred",
            isLoading: false,
          });
          throw error;
        }
      },

      resetPassword: async (token, email, password, password_confirmation) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/v1/reset-password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              token,
              email,
              password,
              password_confirmation,
            }),
          });

          const data: AuthResponse = await response.json();

          if (!response.ok) {
            if (response.status === 422) {
              throw new Error(extractFirstError(data.errors));
            }
            throw new Error(
              messageToString(data.message, "Failed to reset password"),
            );
          }

          set({ isLoading: false });
          return data.message || "Password has been reset successfully.";
        } catch (error: any) {
          set({
            error: error?.message || "An error occurred",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
