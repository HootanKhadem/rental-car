"use client";
import React from "react";
import { useAuthContextMaybe } from "@/src/features/auth/AuthProvider";

type CarRef = {
  id: string;
  title: string;
  pricePerDay: number;
  image?: string;
};

type ReserveContext = {
  isOpen: boolean;
  step: number;
  car?: CarRef | null;
  openReserve: (car: CarRef) => void;
  close: () => void;
  next: () => void;
  back: () => void;
  goTo: (s: number) => void;
};

const ctx = React.createContext<ReserveContext | null>(null);

export function useReserve() {
  const v = React.useContext(ctx);
  if (!v) throw new Error("useReserve must be used within ReserveProvider");
  return v;
}

export default function ReserveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [car, setCar] = React.useState<CarRef | null>(null);

  const auth = useAuthContextMaybe();

  const openReserve = (c: CarRef) => {
    setCar(c);
    // If user is authenticated start at step 1 (zero-based) so the
    // user lands on the "Civil ID" pane (displayed as step 2 to users).
    setStep(auth?.isAuthenticated ? 1 : 0);
    setIsOpen(true);
  };

  // If the modal is open but auth becomes available/true later,
  // advance the flow to step 2 so signed-in users skip account creation.
  React.useEffect(() => {
    if (!isOpen) return;
    // If auth becomes true while modal is open and we're still on the
    // create-account pane (0), advance to the civil-id pane (1).
    if (auth?.isAuthenticated && step === 0) {
      const id = window.setTimeout(() => setStep(1), 0);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [isOpen, auth?.isAuthenticated, step]);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCar(null);
      setStep(0);
    }, 250);
  };

  const next = () => setStep((s) => Math.min(8, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const goTo = (s: number) => setStep(() => Math.max(0, Math.min(8, s)));

  const value: ReserveContext = {
    isOpen,
    step,
    car,
    openReserve,
    close,
    next,
    back,
    goTo,
  };

  // Listen for global event to open reserve (used by non-hook consumers)
  React.useEffect(() => {
    function handler(e: Event) {
      const ev = e as CustomEvent;

      if (!ev?.detail) return;
      const { id, title, pricePerDay, image } = ev.detail;
      openReserve({ id, title, pricePerDay, image });
    }

    window.addEventListener("open-reserve", handler as EventListener);
    return () =>
      window.removeEventListener("open-reserve", handler as EventListener);
    //eslint-disable-next-line
  }, []);

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}
