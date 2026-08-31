"use client";

import { usePathname } from "next/navigation";
import LandingAuthGuard from "@/src/components/auth/authGuard";

export default function AuthBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Allow unauthenticated access only to the auth page (and its subroutes)
  if (pathname?.startsWith("/auth")) {
    return <>{children}</>;
  }

  // Protect all other routes with the client-side guard
  return <LandingAuthGuard>{children}</LandingAuthGuard>;
}
