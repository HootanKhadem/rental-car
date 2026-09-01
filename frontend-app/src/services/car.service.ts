import axios from "axios";
import type { Car } from "@/src/features/catalog/types";
import sampleCars from "@/src/data/catalog";

export type CarsResponse = {
  items: Car[];
  page: number;
  total: number;
  pageSize: number;
  hasMore: boolean;
};

const API = axios.create({ baseURL: "/api" });

const inFlight = new Map<string, Promise<CarsResponse>>();
//eslint-disable-next-line
function keyFor(params: Record<string, any>) {
  return JSON.stringify(params);
}

function applyFiltersAndSort(
  cars: Car[],
  q?: string,
  category?: string,
  sort?: string,
) {
  let base = cars.slice();
  if (category && category !== "All")
    base = base.filter((c) => c.category === category);
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

async function fetchCarsMock({
  page = 1,
  limit = 12,
  q,
  category,
  sort,
}: {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  sort?: string;
}): Promise<CarsResponse> {
  const all = applyFiltersAndSort(sampleCars as Car[], q, category, sort);
  const total = all.length;
  const start = (page - 1) * limit;
  const items = all.slice(start, start + limit);
  const hasMore = start + limit < total;
  // simulate small latency
  await new Promise((res) => setTimeout(res, 120));
  return { items, page, total, pageSize: limit, hasMore };
}

export async function fetchCars({
  page = 1,
  limit = 12,
  q,
  category,
  sort,
}: {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  sort?: string;
}): Promise<CarsResponse> {
  const key = keyFor({ page, limit, q, category, sort });

  if (inFlight.has(key)) return inFlight.get(key)!;

  // Use mock data in development to avoid real network calls when backend is absent.
  const useMock =
    typeof window !== "undefined" && process.env.NODE_ENV === "development";

  const promise = (
    useMock
      ? fetchCarsMock({ page, limit, q, category, sort })
      : API.get("/cars", { params: { page, limit, q, category, sort } }).then(
          (r) => r.data,
        )
  )
    .then((data: CarsResponse) => {
      inFlight.delete(key);
      return data;
    })
    .catch((err) => {
      inFlight.delete(key);
      throw err;
    });

  inFlight.set(key, promise);
  return promise;
}
//eslint-disable-next-line
export default { fetchCars };
