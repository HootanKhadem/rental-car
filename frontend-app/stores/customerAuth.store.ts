import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Customer,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/src/types/customer";

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

// --- Mock API (این بخش بعداً با API واقعی جایگزین می‌شود) ---

// شبیه‌سازی دیتابیس محلی برای کاربران ثبت‌نام‌شده
const mockUsersDB: Array<{
  email: string;
  password: string;
  customer: Customer;
}> = [];

const mockApiLogin = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // جستجو در "دیتابیس" محلی
  const found = mockUsersDB.find(
    (u) => u.email === credentials.email && u.password === credentials.password,
  );

  if (found) {
    return {
      customer: found.customer,
      token: `mock-jwt-token-${found.customer.id}`,
    };
  }

  throw new Error("Invalid email or password");
};

const mockApiRegister = async (data: RegisterData): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // بررسی تکراری نبودن ایمیل
  const exists = mockUsersDB.find((u) => u.email === data.email);
  if (exists) {
    throw new Error("This email is already registered");
  }

  // ساخت کاربر جدید
  const newCustomer: Customer = {
    id: `cust-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: "Customer",
  };

  // ذخیره در "دیتابیس" محلی
  mockUsersDB.push({
    email: data.email,
    password: data.password,
    customer: newCustomer,
  });

  return {
    customer: newCustomer,
    token: `mock-jwt-token-${newCustomer.id}`,
  };
};

// ----------------------------------------------------------------

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
          const response = await mockApiLogin(credentials);

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
          const response = await mockApiRegister(data);

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
