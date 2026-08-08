"use client";
import React, { useMemo, useState } from "react";
import { Car } from "./types";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import CarGrid from "./components/CarGrid";

const MOCK_CARS: Car[] = [
  {
    id: "1",
    title: "Toyota Land Cruiser 300",
    category: "Luxury SUV",
    seats: 7,
    fuel: "V8",
    transmission: "Auto",
    pricePerDay: 55,
    image: "/pictures/land-cruiser.jpg",
  },
  {
    id: "2",
    title: "Mercedes GLE",
    category: "Luxury SUV",
    seats: 5,
    fuel: "Diesel",
    transmission: "Auto",
    pricePerDay: 70,
    image: "/pictures/benz.jpg",
  },
  {
    id: "3",
    title: "Range Rover Vogue",
    category: "Luxury SUV",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Auto",
    pricePerDay: 90,
    image: "/pictures/range-rover.jpeg",
  },
  {
    id: "4",
    title: "Nissan Patrol",
    category: "Full-size SUV",
    seats: 8,
    fuel: "V8",
    transmission: "Auto",
    pricePerDay: 48,
    image: "/pictures/nissan-patrol.jpg",
  },
  {
    id: "5",
    title: "Hyundai Ioniq 5",
    category: "Electric",
    seats: 5,
    fuel: "Electric",
    transmission: "Auto",
    pricePerDay: 28,
    image: "/pictures/hyundai.jpg",
  },
];

export default function CatalogClient() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(MOCK_CARS.map((c) => c.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return MOCK_CARS.filter((c) => {
      if (active !== "All" && c.category !== active) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div className="lg:col-span-2">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="lg:col-span-1 flex justify-start lg:justify-end">
          <Filters
            categories={categories}
            active={active}
            onSelect={setActive}
          />
        </div>
      </div>

      <CarGrid cars={filtered} />
    </div>
  );
}
