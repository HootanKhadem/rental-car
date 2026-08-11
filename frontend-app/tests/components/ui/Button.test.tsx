import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/button/button";
import { describe, expect, it } from "vitest";
describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button>Reserve now</Button>);
    expect(
      screen.getByRole("button", { name: /reserve now/i }),
    ).toBeInTheDocument();
  });
});
