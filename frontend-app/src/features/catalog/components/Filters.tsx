"use client";

type Category = { name: string; count: number };

import { useTranslation } from "react-i18next";
import { initI18n } from "@/src/i18n/i18n";

type Props = {
  categories: Category[];
  active: string;
  onSelect: (c: string) => void;
};

export default function Filters({ categories, active, onSelect }: Props) {
  initI18n();
  const { t } = useTranslation();
  const total = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={() => onSelect("All")}
        className={`px-3 py-1 rounded-full uppercase text-xs font-mono tracking-widest cursor-pointer ${
          active === "All"
            ? "bg-button-primary-yellow text-black"
            : "bg-transparent text-white/60 border border-white/10"
        }`}
      >
        {t("catalog.filters.all")}{" "}
        <span className="ml-2 text-[11px] text-zinc-600">{total}</span>
      </button>

      {categories.map((c) => (
        <button
          key={c.name}
          onClick={() => onSelect(c.name)}
          className={`px-3 py-1 rounded-full uppercase text-xs font-mono tracking-widest cursor-pointer flex items-center gap-2 ${
            active === c.name
              ? "bg-button-primary-yellow text-black"
              : "bg-transparent text-white/60 border border-white/10"
          }`}
        >
          <span>{t(`categories.${c.name}`, { defaultValue: c.name })}</span>
          <span className="text-[11px] text-zinc-600">{c.count}</span>
        </button>
      ))}
    </div>
  );
}
