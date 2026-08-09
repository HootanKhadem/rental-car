import React from "react";
import NavbarClient from "./Navbar.client";

export default function Navbar() {
  // Server component: can fetch data here and pass as props to the client
  return <NavbarClient />;
}
