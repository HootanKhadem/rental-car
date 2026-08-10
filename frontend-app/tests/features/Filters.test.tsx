import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
      //eslint-disable-next-line
    t: (k: string, opts?: any) => opts?.defaultValue ?? k,
  }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));

import Filters from "../../src/features/catalog/components/Filters";

describe("Filters", () => {
  it("renders categories and handles selection", () => {
    const categories = [
      { name: "suv", count: 2 },
      { name: "sedan", count: 3 },
    ];
    const onSelect = vi.fn();

    render(
      <Filters categories={categories} active="All" onSelect={onSelect} />,
    );

    // All button shows total
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();

    // category buttons
    const suvBtn = screen.getByText(/suv/i);
    expect(suvBtn).toBeInTheDocument();

    fireEvent.click(suvBtn);
    expect(onSelect).toHaveBeenCalledWith("suv");
  });
});
