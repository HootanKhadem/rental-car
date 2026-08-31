import type {
  Customer,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/src/types/customer";

const USERS_KEY = "rc_users";
const CURRENT_KEY = "rc_current_user";

function delay(ms = 600) {
  return new Promise((r) => setTimeout(r, ms));
}

type StoredUser = {
  email: string;
  password: string;
  customer: Customer;
};

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readCurrent(): Customer | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCurrent(user: Customer | null) {
  if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  else localStorage.removeItem(CURRENT_KEY);
}

/**
 * Mock service layer for customer auth.
 *
 * Swap these implementations with real API calls when backend is available.
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  await delay();

  const users = readUsers();
  const exists = users.find((u) => u.email === data.email);
  if (exists) {
    throw new Error("This email is already registered");
  }

  const newCustomer: Customer = {
    id: `cust-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: "Customer",
  };

  users.push({
    email: data.email,
    password: data.password,
    customer: newCustomer,
  });
  writeUsers(users);
  writeCurrent(newCustomer);

  return {
    customer: newCustomer,
    token: `mock-jwt-token-${newCustomer.id}`,
  };
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  await delay();

  const users = readUsers();
  const found = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password,
  );

  if (!found) {
    throw new Error("Invalid email or password");
  }

  writeCurrent(found.customer);

  return {
    customer: found.customer,
    token: `mock-jwt-token-${found.customer.id}`,
  };
}

export function signOut() {
  writeCurrent(null);
}
