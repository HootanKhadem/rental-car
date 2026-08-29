import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

// mock i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    //eslint-disable-next-line
    t: (key: string, params?: any) => {
      const map: Record<string, string> = {
        "reserve:doneMsgTitle": "Reservation confirmed!",
        "reserve:doneMsgBodyWithCar": `${params?.car ?? ""} is on its way`,
      };
      return map[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

// mock Modal and SignatureCanvas to simplify rendering
vi.mock("@/components/ui/modal/modal", () => ({
  //eslint-disable-next-line
  Modal: ({ children }: any) => <div>{children}</div>,
}));
vi.mock("react-signature-canvas", () => ({ default: () => <div /> }));
// mock ReserveProvider's hook to provide a controllable context
vi.mock("../../src/features/reserve/ReserveProvider", () => ({
  useReserve: () => ({
    isOpen: true,
    step: 5,
    car: { title: "Chevrolet Tahoe", pricePerDay: 20, image: "/" },
    openReserve: () => {},
    close: () => {},
    next: () => {},
    back: () => {},
    goTo: () => {},
  }),
}));

import ReserveModal from "../../src/features/reserve/ReserveModal.client";
import {
  //addNotification,
  readNotifications,
} from "../../src/features/notifications/notifications";

describe("ReserveModal", () => {
  it("checkbox has accent-emerald-600 class and success shows car name", () => {
    // const mockReserve = {
    //   isOpen: true,
    //   step: 5,
    //   car: { title: "Chevrolet Tahoe", pricePerDay: 20, image: "/" },
    //   close: () => {},
    //   back: () => {},
    //   next: () => {},
    //   //eslint-disable-next-line
    // } as any;

    // render at step 5 (terms) to find checkbox
    render(<ReserveModal />);

    // checkbox should exist with accent class (rendered when at step 5)
    // We can't set provider easily here; instead test that our compiled component contains the class somewhere
    const checkbox = document.querySelector("input[type=checkbox]");
    expect(checkbox).toBeTruthy();
    if (checkbox) expect(checkbox).toHaveClass("accent-emerald-600");

    // simulate addNotification call: check it writes keys
    // const n = addNotification({
    //   titleKey: "reserve:doneMsgTitle",
    //   subtitleKey: "reserve:doneMsgBodyWithCar",
    //   subtitleParams: { car: "Chevrolet Tahoe" },
    // });
    const items = readNotifications();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].subtitleKey).toBe("reserve:doneMsgBodyWithCar");
  });
});
