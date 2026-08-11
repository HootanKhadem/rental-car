"use client";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <p className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald to-gold flex items-center justify-center font-bold font-serif text-ink">
        C
      </p>
      <p className="lg:text-2xl text-lg font-semibold font-serif">
        City <span className="text-gold">Drive</span>
      </p>
    </Link>
  );
}
