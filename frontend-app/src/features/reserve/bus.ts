import type { OpenReserveDetail } from "./types";

const EVENT = "open-reserve";

export function openReserve(detail: OpenReserveDetail) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent(EVENT, { detail }));
  } catch {
    // ignore
  }
}

// Subscribe to open-reserve events. Returns an unsubscribe function.
export function onOpenReserve(handler: (detail: OpenReserveDetail) => void) {
  if (typeof window === "undefined") return () => {};
  const wrap = (e: Event) => {
    const ev = e as CustomEvent;
    try {
      handler(ev.detail as OpenReserveDetail);
    } catch {
      // ignore
    }
  };
  window.addEventListener(EVENT, wrap as EventListener);
  return () => window.removeEventListener(EVENT, wrap as EventListener);
}
