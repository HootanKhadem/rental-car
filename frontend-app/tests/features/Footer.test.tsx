import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));
vi.mock("@/src/i18n/i18n", () => ({
  __esModule: true,
  default: { isInitialized: true },
}));
vi.mock("next/link", () => ({
    __esModule: true,
    //eslint-disable-next-line
  default: ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import FooterClient from "../../src/features/footer/Footer.client";

describe("FooterClient", () => {
  it("renders brand and columns", () => {
    render(<FooterClient />);
    // component renders translation keys in test environment
    expect(screen.getByText(/brand.city/)).toBeInTheDocument();
    expect(screen.getByText(/footer.columns.fleet.title/)).toBeInTheDocument();
    expect(
      screen.getByText(/footer.columns.support.title/),
    ).toBeInTheDocument();
  });
});
