"use client";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";

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
  const mounted = useClientI18n();
  const { t } = useTranslation();

  return (
    <div
      className="rounded-xl border border-emerald-deep p-6 h-full font-mono flex flex-col justify-between text-ivory"
      style={{ background: "linear-gradient(150deg, #1d3329, #10201b)" }}
    >
      <div>
        <div className="text-xs text-gold tracking-widest">
          {mounted ? t("membership.currentTier") : ""}
        </div>
        <h2 className="mt-3 text-3xl font-serif">{tier}</h2>
        <div className="text-[12px] text-smoke mt-2">
          {mounted ? t("membership.memberNoPrefix") : ""} {memberNo} · {year}
        </div>

        <div className="mt-6">
          <div className="text-4xl font-serif text-gold">
            {points.toLocaleString()}
            <span className="text-xs text-smoke uppercase tracking-widest font-mono ml-2">
              {mounted ? t("membership.pointsLabel") : ""}
            </span>
          </div>

          <div className="mt-4">
            <div className="w-full bg-[rgba(0,0,0,0.25)] h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${percent}%`,
                  background: "linear-gradient(90deg, #C6A664, #1f2f27)",
                }}
              />
            </div>
            {nextLabel && (
              <div className="mt-3 text-xs text-smoke">{nextLabel}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
