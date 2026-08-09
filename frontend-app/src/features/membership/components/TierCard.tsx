"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
type Props = {
  title: string;
  sub?: string;
  highlights?: string[];
  active?: boolean;
  onClick?: () => void;
};

export default function TierCard({
  title,
  sub,
  highlights = [],
  active = false,
  onClick,
}: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={
        "w-full rounded-xl p-6 border transition-colors flex flex-col items-center cursor-pointer font-mono text-center " +
        (active
          ? "border-button-primary-yellow"
          : "border-border-card hover:border-icon-card")
      }
      style={{
        background: active
          ? "linear-gradient(180deg, var(--color-background-card),#02150E)"
          : "transparent",
      }}
    >
      <div className="text-xs text-zinc-400 tracking-widest">{sub}</div>
      <div className="mt-3 text-2xl font-serif text-zinc-100">{title}</div>

      <div className="mt-4 space-y-2 text-[13px] text-zinc-300 w-full">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-3 justify-center">
            <div className="w-3 h-0.5 bg-title-yellow rounded-sm" />
            <div>{h}</div>
          </div>
        ))}
      </div>
    </button>
  );
}
