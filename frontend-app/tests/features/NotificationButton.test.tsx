import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "notifications.title": "Notifications",
        "notifications.close": "Close",
        "notifications.empty": "No notifications",
      };
      return map[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

import NotificationsPanel from "../../src/features/navbar/components/NotificationsPanel";
import { writeNotifications } from "../../src/features/notifications/notifications";

describe("NotificationsPanel trigger", () => {
  it("opens panel on click", async () => {
    writeNotifications([]);
    render(<NotificationsPanel />);

    const user = userEvent.setup();
    const btn = screen.getByRole("button", { name: /notifications/i });
    expect(btn).toBeInTheDocument();

    expect(screen.queryByText(/No notifications/i)).toBeNull();

    await user.click(btn);
    expect(screen.getByText(/No notifications/i)).toBeInTheDocument();
  });
});
