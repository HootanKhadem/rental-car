"use client";

import { Button } from "@/components/ui/custom/button/Button";

interface ReserveButtonProps {
  carId: string;
  carTitle: string;
  pricePerDay: number;
  image?: string;
}

export default function ReserveButton({
  carId,
  carTitle,
  pricePerDay,
  image,
}: ReserveButtonProps) {
  return (
    <Button
      className="w-full bg-gold-bright text-ink hover:bg-gold-bright/90 h-12 text-base font-semibold"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("open-reserve", {
              detail: {
                id: carId,
                title: carTitle,
                pricePerDay: pricePerDay,
                image: image,
              },
            }),
          );
        }
      }}
    >
      Reserve Now
    </Button>
  );
}
