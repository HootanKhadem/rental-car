import React from "react";
import HeroClient from "./Hero.client";
import Image from "next/image";

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

        <div className="flex items-center justify-end lg:col-span-1 col-span-2">
          <div className="w-full h-full max-w-none rounded-xl overflow-hidden shadow-lg relative">
            <Image
              src="/porsche-pic.jpg"
              alt="Toyota Land Cruiser 300"
              className="w-full h-full object-cover"
              width={1200}
              height={800}
              priority
            />

            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="bg-black/30 backdrop-blur-sm rounded-md px-3 py-2">
                <div className="text-xl font-serif">Porsche 911 GT3</div>
                <div className="text-sm text-zinc-200 mt-1">
                  KWD <span className="font-medium">55</span> / day
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 col-span-2 border-t border-b border-divider-line">
          <div className="col-span-1 py-6 px-6 border-r border-divider-line last:border-r-0 flex flex-col justify-center">
            <div className="text-3xl font-serif">120+</div>
            <div className="text-xs text-zinc-400 tracking-widest mt-1 font-mono">
              CARS IN FLEET
            </div>
          </div>
          <div className="col-span-1 py-6 px-6 border-r border-divider-line last:border-r-0 flex flex-col justify-center">
            <div className="text-3xl font-serif">
              60<span className="text-sm text-zinc-400">min</span>
            </div>
            <div className="text-xs text-zinc-400 tracking-widest mt-1 font-mono">
              AVG. DELIVERY TIME
            </div>
          </div>
          <div className="col-span-1 py-6 px-6 flex flex-col justify-center">
            <div className="text-3xl font-serif">4.96</div>
            <div className="text-xs text-zinc-400 tracking-widest mt-1 font-mono">
              MEMBER SATISFACTION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
