"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NavbarClient() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset || 0;
          setScrolled(y > 16);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 text-white " +
        (scrolled
          ? "bg-background-main/80 backdrop-blur-sm border-b border-[#233026] shadow-md"
          : "bg-background-main border-b border-[#1f2c25]")
      }
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <p className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-600 to-yellow-600 flex items-center justify-center font-bold text-neutral-900">
              C
            </p>
            <p className="text-2xl font-medium">
              City <span className="text-title-yellow">Drive</span>
            </p>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-light">
            <Link href="#fleet" className="hover:text-gray-300">
              Fleet
            </Link>
            <Link href="#ai" className="hover:text-gray-300">
              AI Assistant
            </Link>
            <Link href="#membership" className="hover:text-gray-300">
              Membership
            </Link>
            <Link href="#support" className="hover:text-gray-300">
              Support
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              rounded="md"
              className="hover:border hover:border-title-yellow hover:text-title-yellow hover:bg-transparent"
            >
              Sign in
            </Button>
            <Button
              variant="solid"
              size="md"
              rounded="md"
              bgClass="bg-button-primary-green"
              textClass="text-white"
            >
              Register
            </Button>
          </div>

          <div className="md:hidden">
            <button
              aria-label="menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md border border-neutral-800"
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
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="w-full h-full flex flex-col"
            style={{
              backgroundColor: "var(--color-background-green-section2)",
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
                onClick={() => setOpen(false)}
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
              <a href="#fleet" className="block">
                Fleet
              </a>
              <a href="#ai" className="block">
                AI Assistant
              </a>
              <a href="#membership" className="block">
                Membership
              </a>
              <a href="#support" className="block">
                Support
              </a>
            </nav>

            <div className="px-6 pb-10">
              <div className="flex flex-col gap-3">
                <Button variant="outline" size="md" rounded="md">
                  Sign in
                </Button>
                <Button
                  variant="solid"
                  size="md"
                  rounded="md"
                  bgClass="bg-button-primary-green"
                  textClass="text-white"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
