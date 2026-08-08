import React from "react";
import dynamic from "next/dynamic";

// Import client component as a boundary. Next will treat this file as a Server Component.
const NavbarClient = dynamic(() =>
  import("./Navbar.client").then((m) => m.default),
);

export default function Navbar() {
  // Server component: could fetch menu items or user session here.
  return (
    // render the client boundary which contains interactive pieces
    <NavbarClient />
  );
}
