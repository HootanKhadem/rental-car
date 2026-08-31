"use client";

import { Button } from "@/components/ui/custom/button/Button";
import { openReserve } from "@/src/features/reserve/bus";

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
        try {
          openReserve({ id: carId, title: carTitle, pricePerDay, image });
        } catch {
          // ignore
        }
      }}
    >
      Reserve Now
    </Button>
  );
}
