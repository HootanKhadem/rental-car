"use client";
import React from "react";

import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();

  const OPTIONS: { value: string; label: string }[] = [
    { value: "featured", label: mounted ? t("catalog.sort.featured") : "" },
    { value: "price-asc", label: mounted ? t("catalog.sort.priceAsc") : "" },
    { value: "price-desc", label: mounted ? t("catalog.sort.priceDesc") : "" },
  ];
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const current = OPTIONS.find((o) => o.value === value) || OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-background-main border border-border-card text-sm text-zinc-200 focus:outline-none font-mono cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{current.label}</span>
        <svg
          className="ml-2"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-background-main border border-border-card rounded-md shadow-lg z-50">
          <ul role="listbox" className="py-1">
            {OPTIONS.map((o) => (
              <li key={o.value} role="option">
                <button
                  type="button"
                  className={`w-full text-left px-3 py-2 cursor-pointer hover:bg-gold/10 text-sm ${o.value === value ? "text-gold" : "text-zinc-200"}`}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
