"use client";

import React from "react";
import Link from "next/link";

export type MenuItem = { label: string; href: string };

type Props = { items: MenuItem[] };

export default function DesktopNav({ items }: Props) {
  return (
    <nav className="hidden md:flex items-center gap-10 font-light font-[monospace] text-sm text-zinc-400">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="hover:text-gray-300">
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
