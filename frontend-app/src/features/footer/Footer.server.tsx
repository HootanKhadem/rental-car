import React from "react";
import FooterClient from "./Footer.client";

export default function Footer() {
  // keep server file minimal and render the client boundary so
  // translations initialize on the client like other sections.
  return <FooterClient />;
}
