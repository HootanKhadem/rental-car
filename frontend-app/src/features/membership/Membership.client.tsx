"use client";
import React from "react";
import CurrentTier from "./components/CurrentTier";
import TierCard from "./components/TierCard";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";

import { tiers, tierData } from "@/src/data/membership";

export default function MembershipClient() {
  const mounted = useClientI18n();
  const { t } = useTranslation();

  const [selected, setSelected] = React.useState("gold");

  const data = tierData[selected] ?? tierData["gold"];
  const nextThreshold =
    selected === "silver"
      ? 10000
      : selected === "gold"
        ? 16000
        : selected === "platinum"
          ? 30000
          : null;

  const nextLabel = mounted
    ? nextThreshold
      ? (() => {
          const remaining = Math.max(
            0,
            nextThreshold - data.points,
          ).toLocaleString();
          const levelKey =
            nextThreshold === 16000
              ? "platinum"
              : nextThreshold === 30000
                ? "elite"
                : "next";
          const levelLabel = t(`membership.levels.${levelKey}`);
          return t("membership.nextLabel", { remaining, level: levelLabel });
        })()
      : undefined
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <p className="text-sm text-title-yellow font-mono tracking-[2px]">
          {mounted ? t("membership.eyebrow") : ""}
        </p>
        <h1 className="text-5xl font-serif mt-8 mb-14 text-zinc-100">
          {mounted ? t("membership.title") : ""}
        </h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-center ">
        <div className="lg:col-span-1">
          <CurrentTier
            tier={
              mounted
                ? t(`membership.tiers.${selected}.title`, {
                    defaultValue:
                      selected.charAt(0).toUpperCase() + selected.slice(1),
                  })
                : selected.charAt(0).toUpperCase() + selected.slice(1)
            }
            memberNo={data.memberNo || "CD-00000"}
            year={data.year || 2023}
            points={data.points}
            nextLabel={nextLabel}
          />
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tiers.map((ti) => (
            <TierCard
              key={ti.id}
              title={
                mounted
                  ? t(`membership.tiers.${ti.id}.title`, {
                      defaultValue: ti.title,
                    })
                  : ti.title
              }
              sub={
                mounted
                  ? t(`membership.tiers.${ti.id}.sub`, { defaultValue: ti.sub })
                  : ti.sub
              }
              highlights={ti.highlights.map((h, i) =>
                mounted
                  ? t(`membership.tiers.${ti.id}.highlights.${i}`, {
                      defaultValue: h,
                    })
                  : h,
              )}
              active={ti.id === selected}
              onClick={() => setSelected(ti.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
