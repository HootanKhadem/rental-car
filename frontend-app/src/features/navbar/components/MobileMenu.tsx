"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { MenuItem } from "./DesktopNav";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";

// Mobile menu translations: menu items are passed translated by parent; auth buttons use i18n here

type Props = { items: MenuItem[]; onClose: () => void };

export default function MobileMenu({ items, onClose }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();
  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    // lock body scroll when menu is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, []);

  return (
    <div
      className="md:hidden fixed inset-0 z-50"
      style={{
        width: "100vw",
        height: "100dvh",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        className="w-full h-full flex flex-col"
        style={{
          // ensure a solid fallback color if CSS variable is missing or transparent
          backgroundColor:
            "var(--color-background-green-section2, rgba(3,38,26,0.98))",
          minHeight: "100dvh",
        }}
      >
        <div className="px-6 pt-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <p className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-600 to-yellow-600 flex items-center justify-center font-bold text-neutral-900">
              C
            </p>
            <p className="text-lg font-medium">
              City <span className="text-title-yellow">Drive</span>
            </p>
          </Link>
          <button
            aria-label="close menu"
            onClick={onClose}
            className="p-2 rounded-md border border-neutral-700"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-2xl">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block"
              onClick={onClose}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-10">
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              size="md"
              rounded="md"
              onClick={() => {
                const e = new CustomEvent("open-signin-modal");
                window.dispatchEvent(e);
              }}
            >
              {mounted ? t("auth.signIn") : ""}
            </Button>
            <Button
              variant="solid"
              size="md"
              rounded="md"
              bgClass="bg-button-primary-green"
              textClass="text-white"
              onClick={() => {
                const e = new CustomEvent("open-register-modal");
                window.dispatchEvent(e);
              }}
            >
              {mounted ? t("auth.register") : ""}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
