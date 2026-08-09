"use client";
import React from "react";

type Props = { name: string; onSignOut: () => void };

export default function UserBadge({ name, onSignOut }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-sm font-medium">{name}</span>
      </div>
      <button
        onClick={onSignOut}
        className="ml-2 text-sm text-neutral-300 hover:text-white"
      >
        Sign out
      </button>
    </div>
  );
}
