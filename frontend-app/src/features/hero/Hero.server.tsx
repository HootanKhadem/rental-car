import React from "react";
import HeroClient from "./Hero.client";
import { StatItem, HeroImage } from "./components";

export default function HeroServer() {
  return (
    <section className="w-full bg-transparent text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-stretch">
        <div className="flex flex-col items-center text-center space-y-6 lg:col-span-1 col-span-2 lg:items-start lg:text-left">
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

          <h1 className="text-7xl font-serif leading-tight text-zinc-100">
            Your car comes to you,
          </h1>

          <p className="text-zinc-400 max-w-7xl">
            A curated fleet of the finest and newest cars, delivered to your
            door in 60 minutes. A smart assistant guides you, with notifications
            built around your interests. No queues, no counters.
          </p>

          <div className="w-full flex justify-center lg:justify-start">
            <HeroClient />
          </div>
        </div>

        <HeroImage
          src="/porsche-pic.jpg"
          alt="Toyota Land Cruiser 300"
          title="Porsche 911 GT3"
          priceLabel={
            <>
              <span className="font-medium">55</span> / day
            </>
          }
        />

        <div className="grid grid-cols-3 col-span-2 border-t border-b border-divider-line">
          <StatItem
            value="120+"
            label="CARS IN FLEET"
            className="border-r border-divider-line last:border-r-0"
          />
          <StatItem
            value={
              <>
                <span>60</span>
                <span className="text-sm text-zinc-400">min</span>
              </>
            }
            label="AVG. DELIVERY TIME"
            className="border-r border-divider-line last:border-r-0"
          />
          <StatItem value={"4.96"} label="MEMBER SATISFACTION" />
        </div>
      </div>
    </section>
  );
}
