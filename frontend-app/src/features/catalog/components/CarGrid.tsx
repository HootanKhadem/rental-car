import React from "react";
import { Car } from "../types";
import CarCard from "./CarCard";

type Props = { cars: Car[] };

export default function CarGrid({ cars }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((c) => (
        <CarCard key={c.id} car={c} />
      ))}
    </div>
  );
}
