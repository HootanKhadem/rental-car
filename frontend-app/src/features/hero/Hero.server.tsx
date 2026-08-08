import React from "react";
import HeroClient from "./Hero.client";

export default function HeroServer() {
  return (
    <section className="w-full bg-transparent text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <span
            className="inline-flex items-center gap-2 bg-background-hero-badge border-2 border-border-hero-badge rounded-4xl px-3 py-2 text-[11px] mb-5 text-button-primary-green tracking-[1px] font-mono"
            role="status"
            aria-label="AI badge"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping bg-emerald-500"
                aria-hidden="true"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
            </span>
            <span className="text-xs">
              KUWAIT IS FIRST AI CAR-DELIVERY SYSTEM
            </span>
          </span>

          <h1 className="text-6xl font-serif leading-tight">
            Your car comes to
            <br />
            you,
          </h1>

          <p className="text-zinc-300 max-w-lg">
            A curated fleet of the finest and newest cars, delivered to your
            door in 60 minutes. A smart assistant guides you, with notifications
            built around your interests. No queues, no counters.
          </p>

          <HeroClient />

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="col-span-1 border-t border-zinc-800 pt-6">
              <div className="text-2xl font-semibold">120+</div>
              <div className="text-xs text-zinc-400 tracking-widest mt-1">
                CARS IN FLEET
              </div>
            </div>
            <div className="col-span-1 border-t border-zinc-800 pt-6">
              <div className="text-2xl font-semibold">
                60<span className="text-sm">min</span>
              </div>
              <div className="text-xs text-zinc-400 tracking-widest mt-1">
                AVG. DELIVERY TIME
              </div>
            </div>
            <div className="col-span-1 border-t border-zinc-800 pt-6">
              <div className="text-2xl font-semibold">4.96</div>
              <div className="text-xs text-zinc-400 tracking-widest mt-1">
                MEMBER SATISFACTION
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-zinc-900/30">
            <img
              src="/porsche-pic.jpg"
              alt="Toyota Land Cruiser 300"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-gradient-to-t from-black/60 text-white">
              <div className="text-xl font-serif">Toyota Land Cruiser 300</div>
              <div className="text-sm text-zinc-300 mt-1">
                KWD <span className="font-medium">55</span> / day
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
