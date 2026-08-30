import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
};

export default function FeatureCard({
  icon,
  title,
  children,
}: FeatureCardProps) {
  return (
    <div
      className="rounded-xl p-6 bg-obsidian border border-line hover:border-emerald-deep transform transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ willChange: "transform" }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-[rgba(47,163,122,.12)]"
      >
        {icon}
      </div>

      <div className="text-lg font-semibold text-ivory">{title}</div>
      <div className="text-sm text-smoke mt-2">{children}</div>
    </div>
  );
}
