"use client";
import { useEffect, useState } from "react";

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

export default function useAuth() {
  // avoid reading localStorage during render to prevent hydration mismatches
  const [user, setUser] = useState<User | null>(null);

  // populate current user after mount (schedule async to avoid sync setState in effect)
  useEffect(() => {
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

  useEffect(() => {
    // listen for custom events in same tab
    function onEvent() {
      setUser(readCurrent());
    }
    window.addEventListener("rc-auth-change", onEvent);
    return () => window.removeEventListener("rc-auth-change", onEvent);
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
    // notify
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("rc-auth-change"));
    return newUser;
  }

  function signIn(email: string) {
    const users = readUsers();
    const found = users.find((u) => u.email === email);
    if (!found) throw new Error("User not found");
    writeCurrent(found);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("rc-auth-change"));
    return found;
  }

  function signOut() {
    writeCurrent(null);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("rc-auth-change"));
    setUser(null);
  }

  return {
    user,
    isAuthenticated: !!user,
    register,
    signIn,
    signOut,
  } as const;
}
