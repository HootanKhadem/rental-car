"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/src/i18n/i18n";
import useClientI18n from "@/src/i18n/useI18n";

export default function FooterClient() {
  const mounted = useClientI18n();
  const { t } = useTranslation();
  //eslint-disable-next-line
  const ready = mounted && i18n && (i18n as any).isInitialized;

  const tr = (key: string, fallback: string) => (ready ? t(key) : fallback);

  return (
    <footer className="py-12 text-ivory bg-obsidian">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start font-mono">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <p className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald to-gold flex items-center justify-center font-bold font-serif text-ink">
                C
              </p>
              <p className="lg:text-2xl text-lg font-semibold font-serif">
                City <span className="text-gold">Drive</span>
              </p>
            </Link>

            <p className="mt-4 text-smoke max-w-xs text-sm">
              {tr(
                "footer.tagline",
                "Kuwait & the Gulfs first AI-powered rental-car delivery service.",
              )}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-ivory tracking-widest uppercase mb-4">
                {tr("footer.columns.fleet.title", "Fleet")}
              </div>
              <ul className="space-y-3 text-smoke">
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr("footer.columns.fleet.items.luxury", "Luxury")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr("footer.columns.fleet.items.suv", "SUV")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr("footer.columns.fleet.items.electric", "Electric")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm text-ivory tracking-widest uppercase mb-4">
                {tr("footer.columns.club.title", "Club")}
              </div>
              <ul className="space-y-3 text-smoke">
                <li>
                  <a href="#membership" className="hover:underline text-sm">
                    {tr("footer.columns.club.items.membership", "Membership")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr("footer.columns.club.items.rewards", "Rewards")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm text-ivory tracking-widest uppercase mb-4">
                {tr("footer.columns.support.title", "Support")}
              </div>
              <ul className="space-y-3 text-smoke">
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr(
                      "footer.columns.support.items.assistant",
                      "AI Assistant",
                    )}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr("footer.columns.support.items.contact", "Contact us")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    {tr(
                      "footer.columns.support.items.terms",
                      "Terms & conditions",
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 border-line font-mono">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-smoke-dim">
            <div>{tr("footer.copyright", "© 2026 City Drive · Prototype")}</div>
            <div className="mt-3 md:mt-0">
              {tr("footer.note", "For demonstration purposes")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
