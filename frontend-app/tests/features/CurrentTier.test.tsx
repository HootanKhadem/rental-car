import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));

import CurrentTier from "../../src/features/membership/components/CurrentTier";

describe("CurrentTier", () => {
  it("renders tier info and progress", () => {
    render(
      <CurrentTier
        tier="Gold"
        memberNo="M123"
        year={2026}
        points={15000}
        nextLabel="Next: Platinum"
      />,
    );

    expect(screen.getByText(/Gold/)).toBeInTheDocument();
    expect(screen.getByText(/M123/)).toBeInTheDocument();
    expect(screen.getByText(/Next: Platinum/)).toBeInTheDocument();
  });
});
