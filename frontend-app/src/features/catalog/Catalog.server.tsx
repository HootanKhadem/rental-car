import React from "react";
import CatalogClient from "./Catalog.client";

export default function CatalogServer() {
  return (
    <section className="w-full text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-sm text-title-yellow font-mono tracking-[2px]">
            THE COLLECTION
          </p>
          <h1 className="text-5xl font-serif mt-5">Available now</h1>
        </div>

        <CatalogClient />
      </div>
    </section>
  );
}
