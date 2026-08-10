import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: "en" } }),
}));
// mock NotificationsPanel to simplify
vi.mock("../../src/features/navbar/components/NotificationsPanel", () => ({
    //eslint-disable-next-line
  default: ({ onClose }: any) => (
    <div data-testid="notifications-panel">panel</div>
  ),
}));

import NotificationButton from "../../src/features/navbar/components/NotificationButton";

describe("NotificationButton", () => {
  it("toggles panel on click", () => {
    render(<NotificationButton />);
    const btn = screen.getByRole("button", { name: /notifications/i });
    expect(btn).toBeInTheDocument();
    // panel not visible initially
    expect(screen.queryByTestId("notifications-panel")).toBeNull();

    fireEvent.click(btn);
    expect(screen.getByTestId("notifications-panel")).toBeInTheDocument();

    fireEvent.click(btn);
    expect(screen.queryByTestId("notifications-panel")).toBeNull();
  });
});
