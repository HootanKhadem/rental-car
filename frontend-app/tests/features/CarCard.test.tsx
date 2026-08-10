import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

// mock i18n and helpers
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    //eslint-disable-next-line
    t: (k: string, opts?: any) => {
      const map: Record<string, string> = {
        "catalog.card.save": "Save",
        "catalog.card.unsave": "Unsave",
        "catalog.card.saveItem": "Save item",
        "catalog.card.unsaveItem": "Unsave item",
        "catalog.card.perDay": "/day",
        "other.KWD": "KWD",
      };
      return opts?.defaultValue ?? map[k] ?? k;
    },
    i18n: { language: "en" },
  }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));
vi.mock("@/src/i18n/i18n", () => ({
  __esModule: true,
  default: { language: "en" },
}));
// mock next/image as simple img
vi.mock("next/image", () => ({
  __esModule: true,
  //eslint-disable-next-line
  default: (props: any) => {
    //eslint-disable-next-line
    const { fill, ...rest } = props;
    //eslint-disable-next-line
    return <img {...rest} />;
  },
}));

import CarCard from "../../src/features/catalog/components/CarCard";

const car = {
  id: "chev-tahoe",
  title: "Chevrolet Tahoe",
  category: "suv",
  seats: 5,
  fuel: "Petrol",
  transmission: "Automatic",
  pricePerDay: 25,
  image: "/img.jpg",
  //eslint-disable-next-line
} as any;

describe("CarCard", () => {
  it("renders title and reserve button and like toggles", () => {
    const { container } = render(<CarCard car={car} />);

    // title
    expect(screen.getByText(/Chevrolet Tahoe/i)).toBeInTheDocument();

    // Reserve button text (fallback uses language)
    expect(screen.getByText(/Reserve|احجز/)).toBeInTheDocument();

    // like button has title and toggles aria-pressed
    const likeBtn = container.querySelector(
      "button[title]",
    ) as HTMLButtonElement | null;
    expect(likeBtn).toBeTruthy();
    if (likeBtn) {
      expect(likeBtn.getAttribute("aria-pressed")).toBe("false");
      fireEvent.click(likeBtn);
      expect(likeBtn.getAttribute("aria-pressed")).toBe("true");
    }
  });
});
