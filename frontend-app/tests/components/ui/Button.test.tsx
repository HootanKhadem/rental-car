// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { Button } from "@/components/ui/button";
// import { describe, expect, it } from "vitest";
// describe("Button", () => {
//   it("renders the provided label", () => {
//     render(<Button>Reserve now</Button>);
//     expect(
//       screen.getByRole("button", { name: /reserve now/i }),
//     ).toBeInTheDocument();
//   });
// });

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  // agar component render nashavad, teste 1 khata mide
  it("renders button with children", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", {
      name: "Click me",
    });

    expect(button).toBeInTheDocument();
  });

  // yek function dadim be dokme va click kardim, agar bish az 1bar on function seda zade shavad, in test khata migirad
  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: "Click me",
    });

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // barresi kar nakardane dokme dar halate disable
  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: "Click me",
    });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("maps solid variant to default classes", () => {
    render(<Button variant="solid">Solid Button</Button>);

    const button = screen.getByRole("button", {
      name: "Solid Button",
    });

    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-primary-foreground");
  });

  it("applies outline variant classes", () => {
    render(<Button variant="outline">Outline Button</Button>);

    const button = screen.getByRole("button", {
      name: "Outline Button",
    });

    expect(button.className).toContain("border-border");
    expect(button.className).toContain("bg-background");
  });

  it("merges custom string className", () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole("button", {
      name: "Custom Button",
    });

    expect(button.className).toContain("custom-class");
  });

  it("supports className as function", () => {
    render(
      <Button className={() => "dynamic-class"}>Function Class Button</Button>,
    );

    const button = screen.getByRole("button", {
      name: "Function Class Button",
    });

    expect(button.className).toContain("dynamic-class");
  });
});
