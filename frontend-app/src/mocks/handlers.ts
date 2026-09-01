import { rest } from "msw";
import sampleCars from "@/src/data/catalog";
import type { Car } from "@/src/features/catalog/types";

const ALL_CARS: Car[] = sampleCars as Car[];

function filterAndSort(
  cars: Car[],
  q?: string,
  category?: string,
  sort?: string,
) {
  let base = cars.slice();

  if (category && category !== "All") {
    base = base.filter((c) => c.category === category);
  }

  if (q) {
    const qq = q.toLowerCase();
    base = base.filter(
      (c) =>
        c.title.toLowerCase().includes(qq) ||
        c.category.toLowerCase().includes(qq),
    );
  }

  if (sort === "price-asc") base.sort((a, b) => a.pricePerDay - b.pricePerDay);
  else if (sort === "price-desc")
    base.sort((a, b) => b.pricePerDay - a.pricePerDay);

  return base;
}

export const handlers = [
  rest.get("/api/cars", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page") || "1");
    const limit = Number(req.url.searchParams.get("limit") || "12");
    const q = req.url.searchParams.get("q") || undefined;
    const category = req.url.searchParams.get("category") || undefined;
    const sort = req.url.searchParams.get("sort") || undefined;

    const filtered = filterAndSort(ALL_CARS, q, category, sort);
    const total = filtered.length;
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);
    const hasMore = start + limit < total;

    return res(
      ctx.status(200),
      ctx.json({ items, page, total, pageSize: limit, hasMore }),
    );
  }),
];
