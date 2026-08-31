import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Customer,
  LoginCredentials,
  RegisterData,
} from "@/src/types/customer";
import * as customerService from "@/src/services/customer.service";

// تعریف ساختار Store
interface CustomerAuthStore {
  // State
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  reset: () => void;
}

// Service-layer implementation lives in src/services/customer.service.ts
// which currently uses localStorage as a mock backing store and can be
// swapped for real HTTP calls when the backend is ready.

export const useCustomerAuthStore = create<CustomerAuthStore>()(
  persist(
    (set) => ({
      // Initial State
      customer: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login Action
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await customerService.login(credentials);

          set({
            customer: response.customer,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          // eslint-disable-next-line
        } catch (error: any) {
          set({
            error: error.message || "Login failed",
            isLoading: false,
          });
        }
      },

      // Register Action
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await customerService.register(data);

          set({
            customer: response.customer,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          // eslint-disable-next-line
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          });
        }
      },

      // Logout Action
      logout: () => {
        set({
          customer: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        if (typeof window !== "undefined") {
          customerService.signOut();
        }
      },

      // Clear Error
      clearError: () => set({ error: null }),

      // Reset Action (پاک‌سازی کامل برای Logout واقعی)
      reset: () => {
        set({
          customer: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("customer-auth-storage");
        }
      },
    }),
    {
      name: "customer-auth-storage", // نام کلید متفاوت از ادمین
      partialize: (state) => ({
        customer: state.customer,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
