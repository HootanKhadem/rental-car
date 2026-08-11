import React from "react";

type Props = {
  value: React.ReactNode;
  label: string;
  className?: string;
};

export default function StatItem({ value, label, className = "" }: Props) {
  return (
    <div
      className={`col-span-1 py-6 px-6 ${className} flex flex-col justify-center`}
    >
      <div className="text-3xl font-serif text-ivory">{value}</div>
      <div className="text-xs text-smoke tracking-widest mt-1 font-mono">
        {label}
      </div>
    </div>
  );
}
