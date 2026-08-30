import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));
vi.mock("@/src/i18n/useI18n", () => ({ default: () => true }));
vi.mock("next/link", () => ({
  __esModule: true,
  //eslint-disable-next-line
  default: ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/ui/button", () => ({
  //eslint-disable-next-line
  Button: ({ children, ...p }: any) => <button {...p}>{children}</button>,
  //eslint-disable-next-line
  default: ({ children, ...p }: any) => <button {...p}>{children}</button>,
}));

import MobileMenu from "../../src/features/navbar/components/MobileMenu";

describe("MobileMenu", () => {
  it("renders items and close works and auth buttons dispatch events", () => {
    const items = [
      { href: "/a", label: "A" },
      { href: "/b", label: "B" },
    ];
    const onClose = vi.fn();

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const { unmount } = render(
      //eslint-disable-next-line
      <MobileMenu items={items as any} onClose={onClose} />,
    );

    // items rendered
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();

    // close button
    const closeBtn = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();

    // auth buttons click dispatch events
    const signInBtn = screen.getByText(/auth.signIn/i);
    fireEvent.click(signInBtn);
    expect(dispatchSpy).toHaveBeenCalled();

    const registerBtn = screen.getByText(/auth.register/i);
    fireEvent.click(registerBtn);
    expect(dispatchSpy).toHaveBeenCalled();

    // body overflow set to hidden while mounted
    expect(document.body.style.overflow).toBe("hidden");

    // unmount restores overflow
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
