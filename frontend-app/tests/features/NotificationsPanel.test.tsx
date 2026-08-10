import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, beforeEach, it, expect, vi } from "vitest";

// mock i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    //eslint-disable-next-line
    t: (key: string, params?: any) => {
      const map: Record<string, string> = {
        "notifications.title": "Notifications",
        "reserve:doneMsgTitle": "Reservation confirmed!",
        "reserve:doneMsgBodyWithCar": `${params?.car ?? ""} is on its way`,
      };
      if (map[key]) return map[key];
      return key;
    },
  }),
}));

// render component
import NotificationsPanel from "../../src/features/navbar/components/NotificationsPanel";
import { writeNotifications } from "../../src/features/notifications/notifications";

describe("NotificationsPanel", () => {
  beforeEach(() => {
    localStorage.clear();
    writeNotifications([]);
  });

  it("renders translated notification from keys and params", () => {
    writeNotifications([
      {
        id: "1",
        titleKey: "reserve:doneMsgTitle",
        subtitleKey: "reserve:doneMsgBodyWithCar",
        subtitleParams: { car: "Chevrolet Tahoe" },
        read: false,
        ts: Date.now(),
      },
      //eslint-disable-next-line
    ] as any);

    render(<NotificationsPanel onClose={() => {}} />);

    expect(screen.getByText(/Reservation confirmed!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Chevrolet Tahoe is on its way/i),
    ).toBeInTheDocument();
  });
});
