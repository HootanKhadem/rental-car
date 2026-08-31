"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import type { Car } from "@/src/features/catalog/types";
import sampleCars from "@/src/data/catalog";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import CarGrid from "./CarGrid";
import SortDropdown from "./SortDropdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const MOCK_CARS: Car[] = sampleCars as Car[];

export default function CompactCatalog() {
  const mounted = useClientI18n();
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    MOCK_CARS.forEach((c) =>
      map.set(c.category, (map.get(c.category) || 0) + 1),
    );
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, []);

  const filtered = useMemo(() => {
    let base = MOCK_CARS.filter((c) => {
      if (active !== "All" && c.category !== active) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });

    // فقط ۶ خودروی اول را نشان بده
    base = base.slice(0, 3);

    const sorted = [...base];
    if (sort === "price-asc") {
      sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "price-desc") {
      sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return sorted;
  }, [query, active, sort]);

  return (
    <section id="fleet" className="w-full text-ivory py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <div className="mb-8">
            <p className="text-sm text-gold font-mono tracking-[2px]">
              {mounted ? t("catalog.badge") : "THE COLLECTION"}
            </p>
            <h1 className="text-5xl font-serif mt-5">
              {mounted ? t("catalog.title") : "Available now"}
            </h1>
          </div>

          <div className="rounded-lg border border-line bg-obsidian p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-9">
                <SearchBar value={query} onChange={setQuery} />
              </div>

              <div className="lg:col-span-3 flex items-center justify-start lg:justify-end gap-4">
                <SortDropdown value={sort} onChange={setSort} />
              </div>
            </div>

            <div className="mt-4">
              <Filters
                categories={categories}
                active={active}
                onSelect={setActive}
              />
            </div>
          </div>

          <div className="mt-4 text-xs text-smoke font-mono">
            {mounted
              ? t("catalog.showing", {
                  count: filtered.length,
                  total: MOCK_CARS.length,
                })
              : ""}
          </div>
        </div>

        <CarGrid cars={filtered} />

        {/* دکمه مشاهده همه */}
        <div className="mt-10 text-center">
          <Link href="/fleet">
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold bg-transparent hover:text-ink px-10 py-5 text-lg"
            >
              {mounted ? t("other.viewMore") : "View More"}
              {i18n.language === "ar" ? (
                <MoveLeft className="ml-2 w-4 h-4" />
              ) : (
                <MoveRight className="ml-2 w-4 h-4" />
              )}
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* ... (همان Features که در CatalogClient داری) ... */}
          </div>
        </div>
      </div>
    </section>
  );
}
