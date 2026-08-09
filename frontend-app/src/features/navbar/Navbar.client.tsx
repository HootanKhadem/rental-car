"use client";
import { useState, useEffect } from "react";
import { Logo, DesktopNav, AuthButtons, MobileMenu } from "./components";
import type { MenuItem } from "./components";

export type NavbarProps = { menuItems?: MenuItem[] };

export default function NavbarClient({ menuItems }: NavbarProps) {
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

  const items = menuItems ?? [
    { label: "FLEET", href: "/#fleet" },
    { label: "AI ASSISTANT", href: "/#ai" },
    { label: "MEMBERSHIP", href: "/#membership" },
    { label: "SUPPORT", href: "/#support" },
  ];

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 text-white " +
        (scrolled
          ? "bg-background-main/80 backdrop-blur-sm border-b border-[#233026] shadow-md"
          : "bg-background-main border-b border-divider-line")
      }
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <DesktopNav items={items} />

          <AuthButtons />

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

      {open && <MobileMenu items={items} onClose={() => setOpen(false)} />}
    </header>
  );
}
