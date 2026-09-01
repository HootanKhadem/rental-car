"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CarGrid from "./CarGrid";
import CarSkeleton from "./CarSkeleton";
import type { Car } from "../types";
import { fetchCars } from "@/src/services/car.service";

type Props = {
  query: string;
  category: string;
  sort: string;
  pageSize?: number;
};

export default function InfiniteCarGrid({
  query,
  category,
  sort,
  pageSize = 12,
}: Props) {
  const [items, setItems] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const inFlightRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(
    async (p: number) => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCars({
          page: p,
          limit: pageSize,
          q: query,
          category,
          sort,
        });
        setItems((prev) => (p === 1 ? res.items : [...prev, ...res.items]));
        setHasMore(res.hasMore);
        setPage(p + 1);
        //eslint-disable-next-line
      } catch (e: any) {
        setError(e?.message || "Failed to load vehicles");
      } finally {
        inFlightRef.current = false;
        setLoading(false);
      }
    },
    [pageSize, query, category, sort],
  );

  // reset when filters change
  useEffect(() => {
    // Defer loading to the next microtask so state updates inside `loadPage`
    // don't run synchronously inside this effect (avoids React cascading render warning).
    let mounted = true;
    Promise.resolve().then(() => {
      if (!mounted) return;
      loadPage(1);
    });
    return () => {
      mounted = false;
    };
  }, [query, category, sort, loadPage]);

  // intersection observer
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          loadPage(page);
        }
      },
      { rootMargin: "200px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, loading, loadPage, page]);

  return (
    <div>
      <CarGrid cars={items} />

      {loading && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CarSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-rust mt-6">
          <p>{error}</p>
          <button className="mt-3 text-gold" onClick={() => loadPage(page)}>
            Retry
          </button>
        </div>
      )}

      <div ref={sentinelRef} />
    </div>
  );
}
