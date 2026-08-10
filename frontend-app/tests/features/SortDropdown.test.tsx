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

import SortDropdown from "../../src/features/catalog/components/SortDropdown";

describe("SortDropdown", () => {
  it("shows current option and allows changing", () => {
    const onChange = vi.fn();
    render(<SortDropdown value="price-asc" onChange={onChange} />);

    // current label should render inside the button
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("catalog.sort.priceAsc");

    // open dropdown
    fireEvent.click(btn);

    // click featured option
    const opt = screen.getByText("catalog.sort.featured");
    fireEvent.click(opt);

    expect(onChange).toHaveBeenCalledWith("featured");
  });
});
