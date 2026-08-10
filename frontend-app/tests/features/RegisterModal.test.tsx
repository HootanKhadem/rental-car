import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";

// mock i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k: string) => {
      const map: Record<string, string> = {
        "modal.createAccount": "Create account",
        "modal.privacyNote":
          "Your data is protected and will never be shared with third parties.",
        privacyNote:
          "Your data is protected and will never be shared with third parties.",
      };
      return map[k] ?? k;
    },
  }),
}));

// mock Modal to avoid portal/timers
vi.mock("../../components/ui/Modal", () => ({
  //eslint-disable-next-line
  default: ({ children }: any) => <div>{children}</div>,
}));

import RegisterModal from "../../src/features/navbar/components/RegisterModal";

describe("RegisterModal", () => {
  it("shows translated privacy note", () => {
    render(<RegisterModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Your data is protected/i)).toBeInTheDocument();
  });
});
