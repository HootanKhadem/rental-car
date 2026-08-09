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
      className="rounded-xl p-6 bg-background-card border border-border-card hover:border-icon-card transform transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ willChange: "transform" }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--color-background-icon-card)" }}
      >
        {icon}
      </div>

      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-zinc-400 mt-2">{children}</div>
    </div>
  );
}
