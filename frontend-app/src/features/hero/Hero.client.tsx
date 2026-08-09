"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import HeroImage from "./components/HeroImage";
import StatItem from "./components/StatItem";
import { heroImage, heroStats } from "@/src/data/hero";
import i18n from "@/src/i18n/i18n";

export default function HeroClient() {
  const { t } = useTranslation();

  //eslint-disable-next-line
  const renderValue = (s: any) => {
    if (typeof s.value === "string" && s.value.endsWith("min")) {
      const number = s.value.replace("min", "");
      return (
        <>
          <span>{number}</span>
          <span className="text-sm text-zinc-400">{t("hero.min")}</span>
        </>
      );
    }
    return s.value;
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-stretch">
      <div className="flex flex-col items-center text-center space-y-6 lg:col-span-1 col-span-2 lg:items-start lg:text-left">
        <span
          className="inline-flex items-center gap-2 bg-background-hero-badge border-2 border-border-hero-badge rounded-4xl px-3 py-2 text-[11px] mb-5 text-button-primary-green tracking-[1px] font-mono"
          role="status"
          aria-label={t("hero.badge")}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping bg-emerald-500"
              aria-hidden="true"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
          </span>
          <span className="text-[11px] sm:text-xs">{t("hero.badge")}</span>
        </span>

        <h1 className="text-5xl sm:text-7xl font-serif leading-tight text-zinc-100">
          {t("hero.title")}
        </h1>

        <p className="text-zinc-400 max-w-7xl text-sm sm:text-md text-start">
          {t("hero.description")}
        </p>

        <div className="w-full flex justify-center lg:justify-start">
          <div className="space-x-4">
            <Button
              variant="solid"
              size="lg"
              rounded="lg"
              bgClass="bg-button-primary-yellow"
              textClass="text-black"
              className="hover:opacity-95 text-xs sm:text-sm"
            >
              {t("hero.cta.browse")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              rounded="lg"
              className="hover:border hover:border-title-yellow hover:text-title-yellow hover:bg-transparent text-xs sm:text-sm"
            >
              {t("hero.cta.assistant")}
            </Button>
          </div>
        </div>
      </div>

      <HeroImage
          src={heroImage.src}
          alt={t("hero.image.alt", { defaultValue: heroImage.alt })}
          title={t("hero.image.title", { defaultValue: heroImage.title })}
          priceLabel={
            <>
              <span className="font-medium">{heroImage.price}</span>{" "}
              {t("hero.perDay")}
            </>
          }
      />
      
      <div className="grid grid-cols-3 col-span-2 border-t border-b border-divider-line mt-6">
          {heroStats.map((s, idx) => {
            const isBorder = idx < heroStats.length - 1;
            const className = isBorder
              ? i18n.language === "ar" ? "border-l border-divider-line last:border-r-0" :"border-r border-divider-line last:border-r-0"
              : undefined;

            return (
              <StatItem
                key={s.label}
                value={renderValue(s)}
                label={t(s.label)}
                className={className}
              />
            );
          })}
        </div>
    </div>
  );
}
