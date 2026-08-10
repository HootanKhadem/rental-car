import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
vi.mock("next/image", () => ({
    __esModule: true,
    //eslint-disable-next-line
  default: (props: any) => <img {...props} />,
}));

import HeroImage from "../../src/features/hero/components/HeroImage";

describe("HeroImage", () => {
  it("renders title and priceLabel", () => {
    render(<HeroImage title="Test Car" priceLabel={<span>99</span>} />);
    expect(screen.getByText(/Test Car/)).toBeInTheDocument();
    expect(screen.getByText(/99/)).toBeInTheDocument();
  });
});
