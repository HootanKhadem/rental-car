import React from "react";
import HeroClient from "./Hero.client";
import { StatItem, HeroImage } from "./components";
import {
  heroBadge,
  heroTitle,
  heroDescription,
  heroImage,
  heroStats,
} from "@/src/data/hero";

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
            <span className="text-xs">{heroBadge}</span>
          </span>

          <h1 className="text-7xl font-serif leading-tight text-zinc-100">
            {heroTitle}
          </h1>

          <p className="text-zinc-400 max-w-7xl">{heroDescription}</p>

          <div className="w-full flex justify-center lg:justify-start">
            <HeroClient />
          </div>
        </div>

        <HeroImage
          src={heroImage.src}
          alt={heroImage.alt}
          title={heroImage.title}
          priceLabel={
            <>
              <span className="font-medium">{heroImage.price}</span> / day
            </>
          }
        />

        <div className="grid grid-cols-3 col-span-2 border-t border-b border-divider-line">
          {heroStats.map((s, idx) => {
            const isBorder = idx < heroStats.length - 1;
            const className = isBorder
              ? "border-r border-divider-line last:border-r-0"
              : undefined;

            const renderValue = () => {
              if (typeof s.value === "string" && s.value.endsWith("min")) {
                const number = s.value.replace("min", "");
                return (
                  <>
                    <span>{number}</span>
                    <span className="text-sm text-zinc-400">min</span>
                  </>
                );
              }
              return s.value;
            };

            return (
              <StatItem
                key={s.label}
                value={renderValue()}
                label={s.label}
                className={className}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
