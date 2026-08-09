import React from "react";
import HeroClient from "./Hero.client";

export default function HeroServer() {
  // Render a client boundary for the entire hero so translations can be applied
  // client-side with react-i18next. This keeps server code minimal and avoids
  // server-side i18n complexity for this project scope.
  return (
    <section className="w-full bg-transparent text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <HeroClient />
      </div>
    </section>
  );
}
