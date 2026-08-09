"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  fullName: string;
  email: string;
  governorate?: string;
  area?: string;
};

const USERS_KEY = "rc_users";
const CURRENT_KEY = "rc_current_user";

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readCurrent(): User | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCurrent(user: User | null) {
  if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  else localStorage.removeItem(CURRENT_KEY);
}

type AuthContextShape = {
  user: User | null;
  isAuthenticated: boolean;
  register: (u: User) => User;
  signIn: (email: string) => User;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // initialize from localStorage on mount
    const id = window.setTimeout(() => setUser(readCurrent()), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    function onStorage() {
      setUser(readCurrent());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function register(newUser: User) {
    const users = readUsers();
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) {
      throw new Error("User already exists");
    }
    const next = [...users, newUser];
    writeUsers(next);
    writeCurrent(newUser);
    setUser(newUser);
    return newUser;
  }

  function signIn(email: string) {
    const users = readUsers();
    const found = users.find((u) => u.email === email);
    if (!found) throw new Error("User not found");
    writeCurrent(found);
    setUser(found);
    return found;
  }

  function signOut() {
    writeCurrent(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, register, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

// Non-throwing variant for components that need a safe fallback
export function useAuthContextMaybe() {
  return useContext(AuthContext) ?? null;
}

export default AuthProvider;
