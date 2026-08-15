"use client";
type Props = {
  title: string;
  sub?: string;
  highlights?: string[];
  active?: boolean;
  onClick?: () => void;
};

export default function TierCard({
  title,
  sub,
  highlights = [],
  active = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={
        "w-full rounded-lg p-6 border transition-colors flex flex-col items-center cursor-pointer font-mono text-center " +
        (active ? "border-gold" : "border-line hover:border-emerald")
      }
      style={{
        background: active
          ? "linear-gradient(180deg, #16261F, #02150E)"
          : "transparent",
      }}
    >
      <div className="text-xs text-smoke tracking-widest">{sub}</div>
      <div className="mt-3 text-2xl font-serif text-ivory">{title}</div>

      <div className="mt-4 space-y-2 text-[13px] text-smoke w-full">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-3 justify-center">
            <div className="w-3 h-0.5 bg-gold rounded-sm" />
            <div>{h}</div>
          </div>
        ))}
      </div>
    </button>
  );
}
