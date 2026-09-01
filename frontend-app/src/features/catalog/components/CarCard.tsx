"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/custom/badge/badge";
import i18n from "@/src/i18n/i18n";
import type { Car } from "@/src/features/catalog/types";
import Link from "next/link";
import { openReserve } from "@/src/features/reserve/bus";
import { ArrowRight } from "lucide-react";

function LikeButton() {
  const [liked, setLiked] = React.useState(false);
  const mounted = useClientI18n();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      aria-pressed={liked}
      onClick={(e) => {
        e.stopPropagation();
        setLiked((v) => !v);
      }}
      title={
        mounted
          ? liked
            ? t("catalog.card.unsave")
            : t("catalog.card.save")
          : ""
      }
      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
    >
      {liked ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21s-7.5-4.35-9.5-7.05C-0.5 9.95 3 4 8 4c2.24 0 3.5 1.25 4 2.05C12.5 5.25 13.76 4 16 4c5 0 8.5 5.95 5.5 9.95C19.5 16.65 12 21 12 21z"
            fill="red"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
            stroke="var(--color-emerald)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="sr-only">
        {mounted
          ? liked
            ? t("catalog.card.unsaveItem")
            : t("catalog.card.saveItem")
          : ""}
      </span>
    </button>
  );
}

type Props = { car: Car };

export default function CarCard({ car }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();

  return (
    <article className="group rounded-xl overflow-hidden bg-[linear-gradient(180deg,var(--color-graphite),var(--color-obsidian))] border border-line transform transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:border-emerald">
      <div className="relative h-48 w-full bg-zinc-900/20">
        {car.image ? (
          <>
            <Image
              src={car.image}
              alt={
                mounted
                  ? t(`cars.${car.id}`, { defaultValue: car.title })
                  : car.title
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy" // تغییر به lazy برای بهینه‌تر شدن لود گرید
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70" />
            <LikeButton />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            {mounted ? t("catalog.card.noImage") : ""}
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div className="mb-2">
          <Badge
            variant="outline"
            className="border-emerald text-emerald bg-emerald-950 uppercase tracking-widest text-[10px] font-mono flex *:items-center *:justify-center"
          >
            {mounted
              ? t(`categories.${car.category}`, { defaultValue: car.category })
              : car.category}
          </Badge>
        </div>

        <h3 className="text-2xl font-medium mt-2 font-serif text-ivory line-clamp-1">
          {mounted
            ? t(`cars.${car.id}`, { defaultValue: car.title })
            : car.title}
        </h3>

        <div className="mt-3">
          <div className="w-full rounded-xl border border-line overflow-hidden bg-[rgba(0,0,0,.22)]">
            <div className="grid grid-cols-3 divide-x divide-border-card">
              <div className="px-4 py-2 text-center">
                <div className="text-sm font-semibold text-ivory">
                  {car.seats ?? "-"}
                </div>
                <div className="text-[9px] text-smoke tracking-widest mt-1 uppercase">
                  {mounted ? t("catalog.card.seats").toUpperCase() : ""}
                </div>
              </div>

              <div className="px-4 py-2 text-center">
                <div className="text-sm font-semibold text-ivory">
                  {mounted
                    ? t(`carsData.${String(car.fuel ?? "").toLowerCase()}`, {
                        defaultValue: car.fuel ?? "-",
                      })
                    : (car.fuel ?? "-")}
                </div>
                <div className="text-[9px] text-smoke tracking-widest mt-1 uppercase">
                  {mounted ? t("catalog.card.engine").toUpperCase() : ""}
                </div>
              </div>

              <div className="px-4 py-2 text-center">
                <div className="text-sm font-semibold text-ivory">
                  {mounted
                    ? t(
                        `carsData.${String(car.transmission ?? "").toLowerCase()}`,
                        { defaultValue: car.transmission ?? "-" },
                      )
                    : (car.transmission ?? "-")}
                </div>
                <div className="text-[9px] text-smoke tracking-widest mt-1 uppercase">
                  {mounted ? t("catalog.card.transmission").toUpperCase() : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-2xl text-ivory font-serif">
              {mounted ? t("other.KWD").toUpperCase() : ""} {car.pricePerDay}{" "}
              <span className="text-smoke text-xs">
                {mounted ? t("catalog.card.perDay") : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/fleet/${car.id}`}>
              <Button
                variant="ghost"
                className="border-gold/80 text-gold/80 hover:bg-transparent hover:text-gold-deep transition-colors duration-300 hover:border-gold-deep"
              >
                {mounted ? t("catalog.card.details") : "Details"}
              </Button>
            </Link>
            <Button
              variant="default"
              className="bg-gold hover:bg-gold-bright text-ink font-semibold px-6 py-4 shadow-md shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 ease-out hover:scale-105 active:scale-95 flex *:items-center *:justify-center"
              onClick={() => {
                try {
                  openReserve({
                    id: car.id,
                    title: mounted ? t(`cars.${car.id}`) : car.title,
                    pricePerDay: car.pricePerDay,
                    image: car.image,
                  });
                } catch {
                  // ignore
                }
              }}
            >
              {i18n.language === "ar" ? "احجز" : "Reserve"}
              <ArrowRight
                className={`${i18n.language === "ar" ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
