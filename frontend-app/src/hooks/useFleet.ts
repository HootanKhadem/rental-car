"use client";

import { useState, useMemo } from "react";
import { sampleCars } from "@/src/data/catalog";
import type { Car } from "@/src/features/catalog/types";

export function useFleet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">(
    "featured",
  );

  // استخراج دسته‌بندی‌های یکتا از داده‌های واقعی
  const uniqueCategories = useMemo(() => {
    const categories = new Set(sampleCars.map((car) => car.category));
    return ["ALL", ...Array.from(categories)];
  }, []);

  // منطق فیلتر و مرتب‌سازی
  const filteredCars = useMemo(() => {
    let result = sampleCars as Car[];

    // ۱. فیلتر جستجو (بر اساس title)
    if (searchTerm) {
      result = result.filter((car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // ۲. فیلتر دسته‌بندی (بر اساس category)
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (car) => car.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // ۳. مرتب‌سازی (بر اساس pricePerDay)
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  return {
    cars: filteredCars,
    categories: uniqueCategories, // دسته‌بندی‌های داینامیک
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  };
}
