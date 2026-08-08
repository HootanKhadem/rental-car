import React from "react";
import Hero from "@/src/features/hero/Hero.server";
import Assistant from "@/src/features/assistant/Assistant.server";
import Catalog from "@/src/features/catalog/Catalog.server";

const Home = () => {
  return (
    <main>
      <Hero />
      <Assistant />
      <Catalog />
    </main>
  );
};

export default Home;
