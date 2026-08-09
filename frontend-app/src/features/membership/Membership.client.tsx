"use client";
import React from "react";
import CurrentTier from "./components/CurrentTier";
import TierCard from "./components/TierCard";

import { tiers, tierData } from "@/src/data/membership";

export default function MembershipClient() {
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
  const nextLabel = nextThreshold
    ? `${Math.max(0, nextThreshold - data.points).toLocaleString()} PTS TO ${nextThreshold === 16000 ? "PLATINUM" : nextThreshold === 30000 ? "ELITE" : "NEXT"}`
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <p className="text-sm text-title-yellow font-mono tracking-[2px]">
          CITY DRIVE CLUB
        </p>
        <h1 className="text-5xl font-serif mt-8 mb-14 text-zinc-100">
          Your Membership
        </h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-center ">
        <div className="lg:col-span-1">
          <CurrentTier
            tier={
              selected === "gold"
                ? "Gold"
                : selected.charAt(0).toUpperCase() + selected.slice(1)
            }
            memberNo={data.memberNo || "CD-00000"}
            year={data.year || 2023}
            points={data.points}
            nextLabel={nextLabel}
          />
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tiers.map((t) => (
            <TierCard
              key={t.id}
              title={t.title}
              sub={t.sub}
              highlights={t.highlights}
              active={t.id === selected}
              onClick={() => setSelected(t.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
