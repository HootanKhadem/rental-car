"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <input
          className="w-full rounded-md bg-transparent border border-[var(--color-border-card)] px-4 py-3 placeholder:text-zinc-500 focus:outline-none"
          placeholder="Search by name or category..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
