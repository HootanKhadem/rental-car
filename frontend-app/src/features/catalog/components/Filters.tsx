"use client";
import React from "react";

type Props = {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
};

export default function Filters({ categories, active, onSelect }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={() => onSelect("All")}
        className={`px-3 py-1 rounded-full text-sm tracking-widest ${
          active === "All"
            ? "bg-[var(--color-background-icon-card)] text-white"
            : "bg-transparent text-zinc-400 border border-transparent"
        }`}
      >
        All
      </button>

      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-3 py-1 rounded-full text-sm tracking-widest ${
            active === c
              ? "bg-[var(--color-background-icon-card)] text-white"
              : "bg-transparent text-zinc-400"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
