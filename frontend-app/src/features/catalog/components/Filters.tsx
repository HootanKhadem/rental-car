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
        className={`px-3 py-1 rounded-full uppercase text-xs font-mono tracking-widest cursor-pointer ${
          active === "All"
            ? "bg-button-primary-yellow text-black"
            : "bg-transparent text-white/60 border border-white/10"
        }`}
      >
        All
      </button>

      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-3 py-1 rounded-full uppercase text-xs font-mono tracking-widest cursor-pointer ${
            active === c
              ? "bg-button-primary-yellow text-black"
              : "bg-transparent text-white/60 border border-white/10"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
