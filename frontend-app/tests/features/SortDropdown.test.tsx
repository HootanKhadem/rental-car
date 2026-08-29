import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    //eslint-disable-next-line
    t: (k: string, opts?: any) => opts?.defaultValue ?? k,
  }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));
vi.mock("@/components/ui/selectField/selectField", () => ({
  // eslint-disable-next-line
  default: ({ value, options, onValueChange, triggerProps }: any) => (
    <div>
      <button
        type="button"
        role="combobox"
        aria-label={triggerProps?.["aria-label"]}
      >
        {options.find((o: { value: string }) => o.value === value)?.label}
      </button>
      <button type="button" onClick={() => onValueChange("featured")}>
        {options.find((o: { value: string }) => o.value === "featured")?.label}
      </button>
    </div>
  ),
}));

import SortDropdown from "../../src/features/catalog/components/SortDropdown";

describe("SortDropdown", () => {
  it("shows current option and allows changing", async () => {
    const onChange = vi.fn();
    render(<SortDropdown value="price-asc" onChange={onChange} />);

    // current label should render inside the combobox
    const btn = screen.getByRole("combobox", { name: /sort/i });
    expect(btn).toHaveTextContent("catalog.sort.priceAsc");

    const user = userEvent.setup();
    const opt = screen.getByText("catalog.sort.featured");
    await user.click(opt);

    expect(onChange).toHaveBeenCalledWith("featured");
  });
});
