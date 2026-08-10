import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    //eslint-disable-next-line
    t: (k: string, opts?: any) => opts?.defaultValue ?? k,
  }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));
vi.mock("next/image", () => ({
  __esModule: true,
  //eslint-disable-next-line
  default: (props: any) => <img {...props} />,
}));

import CarGrid from "../../src/features/catalog/components/CarGrid";

const cars = [
  //eslint-disable-next-line
  { id: "1", title: "Car A", category: "suv", pricePerDay: 10 } as any,
  //eslint-disable-next-line
  { id: "2", title: "Car B", category: "sedan", pricePerDay: 12 } as any,
];

describe("CarGrid", () => {
  it("renders list of car cards", () => {
    render(<CarGrid cars={cars} />);
    expect(screen.getByText(/Car A/i)).toBeInTheDocument();
    expect(screen.getByText(/Car B/i)).toBeInTheDocument();
  });
});
