"use client";
import React from "react";
import Button from "@/components/ui/Button";

type Props = {
  tier: string;
  memberNo: string;
  year: number;
  points: number;
  nextLabel?: string;
};

export default function CurrentTier({
  tier,
  memberNo,
  year,
  points,
  nextLabel,
}: Props) {
  const percent = Math.min(100, Math.round((points / 30000) * 100));

  return (
    <div className="rounded-xl border border-icon-card p-6 h-full font-mono flex flex-col justify-between text-zinc-100 bg-gradient-to-br from-background-card to-emerald-950">
      <div>
        <div className="text-xs text-title-yellow tracking-widest">
          CURRENT TIER
        </div>
        <h2 className="mt-3 text-3xl font-serif">{tier}</h2>
        <div className="text-[12px] text-zinc-400 mt-2">
          No. {memberNo} · {year}
        </div>

        <div className="mt-6">
          <div className="text-4xl font-serif text-gradient-gold text-title-yellow">
            {points.toLocaleString()}
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono ml-2">POINTS</span>
          </div>


          <div className="mt-4">
            <div className="w-full bg-[rgba(0,0,0,0.25)] h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${percent}%`,
                  background:
                    "linear-gradient(90deg, var(--color-button-primary-yellow), #1f2f27)",
                }}
              />
            </div>
            {nextLabel && (
              <div className="mt-3 text-xs text-zinc-400">{nextLabel}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
