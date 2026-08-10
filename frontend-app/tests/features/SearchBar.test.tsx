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

import SearchBar from "../../src/features/catalog/components/SearchBar";

describe("SearchBar", () => {
  it("renders and calls onChange", () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText(/catalog.search.placeholder|/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledWith("test");
  });
});
