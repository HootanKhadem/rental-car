"use client";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <p className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-600 to-yellow-600 flex items-center justify-center font-bold text-neutral-900">
        C
      </p>
      <p className="text-2xl font-semibold font-serif">
        City <span className="text-title-yellow">Drive</span>
      </p>
    </Link>
  );
}
