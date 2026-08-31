"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import { Logo, DesktopNav, AuthButtons, MobileMenu } from "./components";
import AuthProvider from "@/src/features/auth/AuthProvider";
import RegisterModal from "./components/RegisterModal";
import SignInModal from "./components/SignInModal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import type { MenuItem } from "./components";
import { defaultMenu } from "@/src/data";
import NotificationsPanel from "./components/NotificationsPanel";

export type NavbarProps = { menuItems?: MenuItem[] };

export default function NavbarClient({ menuItems }: NavbarProps) {
  const mounted = useClientI18n();
  const { t } = useTranslation();

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

  const hrefToKey: Record<string, string> = {
    "/#fleet": "menu.fleet",
    "/#ai": "menu.assistant",
    "/#membership": "menu.membership",
    "/#support": "menu.support",
  };

  const items =
    menuItems ??
    defaultMenu.map((it) => ({
      ...it,
      label: mounted ? t(hrefToKey[it.href] ?? it.label) : it.label,
    }));

  const [registerOpen, setRegisterOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  // Listen for mobile menu event to open register modal
  useEffect(() => {
    function handler() {
      setRegisterOpen(true);
    }
    window.addEventListener("open-register-modal", handler as EventListener);
    return () =>
      window.removeEventListener(
        "open-register-modal",
        handler as EventListener,
      );
  }, []);

  // Listen for mobile menu event to open sign-in modal
  useEffect(() => {
    function handler() {
      setSignInOpen(true);
    }
    window.addEventListener("open-signin-modal", handler as EventListener);
    return () =>
      window.removeEventListener("open-signin-modal", handler as EventListener);
  }, []);

  return (
    <AuthProvider>
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

            <div suppressHydrationWarning>
              {mounted && <DesktopNav items={items} />}
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <NotificationsPanel />
              <AuthButtons
                onOpenRegister={() => setRegisterOpen(true)}
                onOpenSignIn={() => setSignInOpen(true)}
              />
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
                    d={
                      open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {open && <MobileMenu items={items} onClose={() => setOpen(false)} />}
        <RegisterModal
          isOpen={registerOpen}
          onClose={() => setRegisterOpen(false)}
        />
        <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
      </header>
    </AuthProvider>
  );
}
