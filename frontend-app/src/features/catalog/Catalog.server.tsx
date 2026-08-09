import React from "react";
import CatalogClient from "./Catalog.client";

export default function CatalogServer() {
  // Keep server component minimal and render the client boundary so
  // catalog header and translations are handled on the client like other sections.
  return <CatalogClient />;
}
