import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 text-zinc-200 bg-background-green-section2">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start font-mono">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <p className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-600 to-yellow-600 flex items-center justify-center font-bold text-neutral-900">
                C
              </p>
              <p className="text-2xl font-semibold font-serif">
                City <span className="text-title-yellow">Drive</span>
              </p>
            </Link>

            <p className="mt-4 text-zinc-400 max-w-xs text-sm">
              Kuwait & the Gulfs first AI-powered rental-car delivery service.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-zinc-300 tracking-widest uppercase mb-4">
                Fleet
              </div>
              <ul className="space-y-3 text-zinc-300">
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    Luxury
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    SUV
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    Electric
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm text-zinc-300 tracking-widest uppercase mb-4">
                Club
              </div>
              <ul className="space-y-3 text-zinc-300">
                <li>
                  <a
                    href="#membership"
                    className="hover:underline text-sm text-zinc-400"
                  >
                    Membership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    Rewards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm text-zinc-300 tracking-widest uppercase mb-4">
                Support
              </div>
              <ul className="space-y-3 text-zinc-300">
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm text-zinc-400">
                    Terms & conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 border-divider-line font-mono">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
            <div>© 2026 City Drive · Prototype</div>
            <div className="mt-3 md:mt-0">For demonstration purposes</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
