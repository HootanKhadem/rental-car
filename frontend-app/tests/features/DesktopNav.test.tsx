import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

import DesktopNav from "../../src/features/navbar/components/DesktopNav";

describe("DesktopNav", () => {
  it("renders menu items", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Catalog", href: "/catalog" },
    ];
    render(<DesktopNav items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Catalog")).toBeInTheDocument();
  });
});
