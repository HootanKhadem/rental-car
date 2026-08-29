"use client";

type Category = { name: string; count: number };

import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import { Button } from "@/components/ui/button/button";

type Props = {
  categories: Category[];
  active: string;
  onSelect: (c: string) => void;
};

export default function Filters({ categories, active, onSelect }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();
  const total = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button
        onClick={() => onSelect("All")}
        className={`px-4 py-2 rounded-full uppercase text-xs font-mono tracking-widest cursor-pointer ${
          active === "All"
            ? "bg-gold text-ink"
            : "bg-transparent text-smoke border border-line hover:border-gold hover:bg-transparent hover:text-gold"
        }`}
      >
        {mounted ? t("catalog.filters.all") : "All"}{" "}
        <span className="ml-2 text-[11px] text-zinc-600">{total}</span>
      </Button>

      {categories.map((c) => (
        <Button
          key={c.name}
          onClick={() => onSelect(c.name)}
          className={`px-4 py-2 rounded-full uppercase text-xs font-mono tracking-widest cursor-pointer flex items-center gap-2 ${
            active === c.name
              ? "bg-gold text-ink"
              : "bg-transparent text-smoke border border-line hover:border-gold hover:bg-transparent hover:text-gold"
          }`}
        >
          <span>
            {mounted
              ? t(`categories.${c.name}`, { defaultValue: c.name })
              : c.name}
          </span>
          <span className="text-[11px] text-zinc-600">{c.count}</span>
        </Button>
      ))}
    </div>
  );
}
