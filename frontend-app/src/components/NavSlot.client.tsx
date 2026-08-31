"use client";

import { usePathname } from "next/navigation";
import NavbarClient from "@/src/features/navbar/Navbar.client";
import ReserveProvider from "@/src/features/reserve/ReserveProvider";

export default function NavSlot() {
  const pathname = usePathname();

  // Hide navbar on auth routes
  if (pathname?.startsWith("/auth")) return null;

  return (
    <ReserveProvider>
      <NavbarClient />
    </ReserveProvider>
  );
}
